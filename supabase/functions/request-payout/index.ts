import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MIN_PAYOUT_CENTS = 1000; // $10 minimum

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[REQUEST-PAYOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Get request body
    const body = await req.json();
    const amountCents = body.amount_cents;

    if (!amountCents || typeof amountCents !== "number") {
      throw new Error("Invalid amount");
    }

    // Fetch user profile and wallet
    const [profileResult, walletResult] = await Promise.all([
      supabaseClient
        .from("profiles")
        .select("stripe_account_id, payouts_enabled")
        .eq("user_id", user.id)
        .single(),
      supabaseClient
        .from("wallets")
        .select("id, available_balance_cents, pending_balance_cents")
        .eq("user_id", user.id)
        .single(),
    ]);

    if (profileResult.error) throw new Error(`Profile fetch error: ${profileResult.error.message}`);
    if (walletResult.error) throw new Error(`Wallet fetch error: ${walletResult.error.message}`);

    const profile = profileResult.data;
    const wallet = walletResult.data;

    logStep("Fetched profile and wallet", {
      payoutsEnabled: profile?.payouts_enabled,
      availableBalance: wallet?.available_balance_cents,
    });

    // Validations
    if (!profile?.payouts_enabled) {
      throw new Error("Payouts not enabled. Please complete Stripe onboarding.");
    }

    if (amountCents < MIN_PAYOUT_CENTS) {
      throw new Error(`Minimum payout is $${(MIN_PAYOUT_CENTS / 100).toFixed(2)}`);
    }

    if (amountCents > (wallet?.available_balance_cents || 0)) {
      throw new Error("Insufficient balance");
    }

    // Check for existing pending payout
    const { data: pendingPayouts } = await supabaseClient
      .from("payout_requests")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["requested", "processing"])
      .limit(1);

    if (pendingPayouts && pendingPayouts.length > 0) {
      throw new Error("You already have a pending payout request");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Create a transfer to the connected account
    // Note: In production, you'd want to verify you have sufficient platform balance
    let transferId: string | null = null;
    
    try {
      const transfer = await stripe.transfers.create({
        amount: amountCents,
        currency: "usd",
        destination: profile.stripe_account_id!,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      transferId = transfer.id;
      logStep("Stripe transfer created", { transferId });
    } catch (stripeError) {
      // If transfer fails, still create the payout request but mark as processing
      // This allows for manual reconciliation
      logStep("Stripe transfer failed, creating payout request anyway", { 
        error: stripeError instanceof Error ? stripeError.message : String(stripeError)
      });
    }

    // Atomically move funds from available to pending and create payout request
    const newAvailable = (wallet?.available_balance_cents || 0) - amountCents;
    const newPending = (wallet?.pending_balance_cents || 0) + amountCents;

    // Update wallet
    const { error: walletUpdateError } = await supabaseClient
      .from("wallets")
      .update({
        available_balance_cents: newAvailable,
        pending_balance_cents: newPending,
      })
      .eq("id", wallet!.id);

    if (walletUpdateError) {
      throw new Error(`Failed to update wallet: ${walletUpdateError.message}`);
    }

    // Create payout request
    const { data: payoutRequest, error: payoutError } = await supabaseClient
      .from("payout_requests")
      .insert({
        user_id: user.id,
        amount_cents: amountCents,
        status: transferId ? "processing" : "requested",
        stripe_transfer_id: transferId,
      })
      .select()
      .single();

    if (payoutError) {
      // Rollback wallet update
      await supabaseClient
        .from("wallets")
        .update({
          available_balance_cents: wallet?.available_balance_cents,
          pending_balance_cents: wallet?.pending_balance_cents,
        })
        .eq("id", wallet!.id);
      
      throw new Error(`Failed to create payout request: ${payoutError.message}`);
    }

    logStep("Payout request created", { 
      payoutRequestId: payoutRequest.id,
      amountCents,
      transferId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        payout_request_id: payoutRequest.id,
        amount_cents: amountCents,
        status: payoutRequest.status,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
