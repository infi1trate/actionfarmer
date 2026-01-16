import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.text();
    let event: Stripe.Event;

    // Verify webhook signature if secret is set
    if (webhookSecret) {
      const signature = req.headers.get("stripe-signature");
      if (!signature) {
        return new Response("No signature", { status: 400 });
      }
      
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        logStep("Webhook signature verification failed", { error: err instanceof Error ? err.message : String(err) });
        return new Response("Invalid signature", { status: 400 });
      }
    } else {
      // Parse without verification (for development)
      event = JSON.parse(body);
    }

    logStep("Event received", { type: event.type, id: event.id });

    // Handle transfer events
    if (event.type === "transfer.paid" || event.type === "transfer.reversed" || event.type === "transfer.failed") {
      const transfer = event.data.object as Stripe.Transfer;
      const userId = transfer.metadata?.supabase_user_id;

      if (!userId) {
        logStep("No user ID in transfer metadata", { transferId: transfer.id });
        return new Response("OK", { status: 200 });
      }

      // Find the payout request
      const { data: payoutRequest, error: fetchError } = await supabaseClient
        .from("payout_requests")
        .select("id, amount_cents, status")
        .eq("stripe_transfer_id", transfer.id)
        .single();

      if (fetchError || !payoutRequest) {
        logStep("Payout request not found", { transferId: transfer.id });
        return new Response("OK", { status: 200 });
      }

      // Get wallet
      const { data: wallet, error: walletError } = await supabaseClient
        .from("wallets")
        .select("id, available_balance_cents, pending_balance_cents")
        .eq("user_id", userId)
        .single();

      if (walletError || !wallet) {
        logStep("Wallet not found", { userId });
        return new Response("OK", { status: 200 });
      }

      if (event.type === "transfer.paid") {
        // Transfer succeeded - update payout request to paid and reduce pending
        const newPending = Math.max(0, (wallet.pending_balance_cents || 0) - payoutRequest.amount_cents);

        await supabaseClient
          .from("payout_requests")
          .update({ status: "paid" })
          .eq("id", payoutRequest.id);

        await supabaseClient
          .from("wallets")
          .update({ pending_balance_cents: newPending })
          .eq("id", wallet.id);

        logStep("Transfer paid - updated payout request and wallet", { 
          payoutRequestId: payoutRequest.id,
          newPending,
        });
      } else if (event.type === "transfer.failed" || event.type === "transfer.reversed") {
        // Transfer failed - return funds to available balance
        const newAvailable = (wallet.available_balance_cents || 0) + payoutRequest.amount_cents;
        const newPending = Math.max(0, (wallet.pending_balance_cents || 0) - payoutRequest.amount_cents);

        await supabaseClient
          .from("payout_requests")
          .update({ status: "failed" })
          .eq("id", payoutRequest.id);

        await supabaseClient
          .from("wallets")
          .update({
            available_balance_cents: newAvailable,
            pending_balance_cents: newPending,
          })
          .eq("id", wallet.id);

        logStep("Transfer failed/reversed - returned funds to available", { 
          payoutRequestId: payoutRequest.id,
          newAvailable,
          newPending,
        });
      }
    }

    // Handle account updated events (for onboarding status)
    if (event.type === "account.updated") {
      const account = event.data.object as Stripe.Account;
      const userId = account.metadata?.supabase_user_id;

      if (userId) {
        let onboardingStatus: "pending" | "enabled" = "pending";
        let payoutsEnabled = false;

        if (account.payouts_enabled && account.details_submitted) {
          onboardingStatus = "enabled";
          payoutsEnabled = true;
        }

        await supabaseClient
          .from("profiles")
          .update({
            stripe_onboarding_status: onboardingStatus,
            payouts_enabled: payoutsEnabled,
          })
          .eq("user_id", userId);

        logStep("Account updated - synced onboarding status", { 
          userId,
          onboardingStatus,
          payoutsEnabled,
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(errorMessage, { status: 500 });
  }
});
