import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-CONNECT-ACCOUNT] ${step}${detailsStr}`);
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
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Fetch user profile to check if they already have a Stripe account
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("stripe_account_id, stripe_onboarding_status, first_name")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw new Error(`Profile fetch error: ${profileError.message}`);
    logStep("Profile fetched", { stripeAccountId: profile?.stripe_account_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    let accountId = profile?.stripe_account_id;

    // Create Stripe Connect Express account if not exists
    if (!accountId) {
      logStep("Creating new Stripe Connect account");
      
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
        capabilities: {
          transfers: { requested: true },
        },
        business_type: "individual",
        individual: {
          email: user.email,
          first_name: profile?.first_name || undefined,
        },
        metadata: {
          supabase_user_id: user.id,
        },
      });

      accountId = account.id;
      logStep("Stripe account created", { accountId });

      // Save to profile
      const { error: updateError } = await supabaseClient
        .from("profiles")
        .update({
          stripe_account_id: accountId,
          stripe_onboarding_status: "pending",
        })
        .eq("user_id", user.id);

      if (updateError) throw new Error(`Profile update error: ${updateError.message}`);
      logStep("Profile updated with Stripe account ID");
    }

    return new Response(
      JSON.stringify({ account_id: accountId }),
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
