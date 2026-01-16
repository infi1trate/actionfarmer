import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-seed-secret",
};

// Demo challenge IDs from challenges_catalog
const CHALLENGE_IDS = [
  "11111111-1111-1111-1111-111111111111", // Grocery Unload
  "22222222-2222-2222-2222-222222222222", // Kitchen Cleanup
  "33333333-3333-3333-3333-333333333333", // Fold Laundry
  "44444444-4444-4444-4444-444444444444", // Reset Table
  "55555555-5555-5555-5555-555555555555", // Sort Recycling
  "66666666-6666-6666-6666-666666666666", // Make the Bed
  "77777777-7777-7777-7777-777777777777", // Handle Fragile Items
  "88888888-8888-8888-8888-888888888888", // Fill Dishwasher
];

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate secret
    const seedSecret = req.headers.get("x-seed-secret");
    const expectedSecret = Deno.env.get("DEMO_SEED_SECRET");

    if (!expectedSecret || seedSecret !== expectedSecret) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid or missing x-seed-secret header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get email from request body (default to demo account)
    const body = await req.json().catch(() => ({}));
    const email = body.email || "brandon+demo@piplabs.xyz";

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Look up user by email
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      return new Response(
        JSON.stringify({ error: "Failed to list users", details: userError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const user = userData.users.find((u) => u.email === email);

    if (!user) {
      return new Response(
        JSON.stringify({ 
          error: "User not found", 
          message: `No account exists for ${email}. Create the account first by signing up in the app.` 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;

    // Step 1: Wipe existing demo data for this user
    console.log(`Wiping existing data for user ${userId}...`);
    
    await supabaseAdmin.from("insights_weekly").delete().eq("user_id", userId);
    await supabaseAdmin.from("challenge_sessions").delete().eq("user_id", userId);
    await supabaseAdmin.from("plants").delete().eq("user_id", userId);

    // Step 2: Update profile
    console.log("Updating profile...");
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        first_name: "Brandon",
        push_notifications_enabled: true,
        analytics_enabled: true,
      })
      .eq("user_id", userId);

    if (profileError) {
      console.error("Profile update error:", profileError);
    }

    // Step 3: Create plants (3 plants at different stages)
    console.log("Creating plants...");
    const plantsData = [
      { user_id: userId, current_stage: 7 }, // Fully grown (fruit)
      { user_id: userId, current_stage: 6 }, // Flower stage
      { user_id: userId, current_stage: 4 }, // Mid-growth (leafy plant)
    ];

    const { error: plantsError } = await supabaseAdmin.from("plants").insert(plantsData);
    if (plantsError) {
      console.error("Plants insert error:", plantsError);
    }

    // Step 4: Create challenge sessions (8 completed over last 14 days)
    console.log("Creating challenge sessions...");
    const now = new Date();
    const sessionsData = [
      // Day 1 (today)
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[0], // Grocery Unload
        status: "completed" as const,
        points_earned: 48,
        xp_multiplier: 1.2,
        vitality_multiplier: 1.0,
        sunlight_points: 15,
        watering_points: 12,
        duration_seconds: 285,
        started_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 285000).toISOString(),
      },
      // Day 2
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[1], // Kitchen Cleanup
        status: "completed" as const,
        points_earned: 55,
        xp_multiplier: 1.5,
        vitality_multiplier: 1.1,
        sunlight_points: 18,
        watering_points: 14,
        duration_seconds: 320,
        started_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 320000).toISOString(),
      },
      // Day 3
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[2], // Fold Laundry
        status: "completed" as const,
        points_earned: 42,
        xp_multiplier: 1.0,
        vitality_multiplier: 1.0,
        sunlight_points: 12,
        watering_points: 10,
        duration_seconds: 260,
        started_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 260000).toISOString(),
      },
      // Day 4
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[3], // Reset Table
        status: "completed" as const,
        points_earned: 35,
        xp_multiplier: 1.0,
        vitality_multiplier: 1.0,
        sunlight_points: 10,
        watering_points: 8,
        duration_seconds: 180,
        started_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 180000).toISOString(),
      },
      // Day 6
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[4], // Sort Recycling
        status: "completed" as const,
        points_earned: 38,
        xp_multiplier: 1.2,
        vitality_multiplier: 1.0,
        sunlight_points: 11,
        watering_points: 9,
        duration_seconds: 220,
        started_at: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 220000).toISOString(),
      },
      // Day 8
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[5], // Make the Bed
        status: "completed" as const,
        points_earned: 28,
        xp_multiplier: 1.0,
        vitality_multiplier: 1.0,
        sunlight_points: 8,
        watering_points: 6,
        duration_seconds: 150,
        started_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000 + 150000).toISOString(),
      },
      // Day 10
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[6], // Handle Fragile Items
        status: "completed" as const,
        points_earned: 52,
        xp_multiplier: 1.3,
        vitality_multiplier: 1.2,
        sunlight_points: 16,
        watering_points: 13,
        duration_seconds: 300,
        started_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 + 300000).toISOString(),
      },
      // Day 12
      {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[7], // Fill Dishwasher
        status: "completed" as const,
        points_earned: 45,
        xp_multiplier: 1.1,
        vitality_multiplier: 1.0,
        sunlight_points: 14,
        watering_points: 11,
        duration_seconds: 270,
        started_at: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        ended_at: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000 + 270000).toISOString(),
      },
    ];

    const { error: sessionsError } = await supabaseAdmin.from("challenge_sessions").insert(sessionsData);
    if (sessionsError) {
      console.error("Sessions insert error:", sessionsError);
    }

    // Step 5: Create weekly insights (since we have 8 challenges, insights should be unlocked)
    console.log("Creating weekly insights...");
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week (Sunday)
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // End of week (Saturday)

    const insightsData = {
      user_id: userId,
      week_start: weekStart.toISOString().split("T")[0],
      week_end: weekEnd.toISOString().split("T")[0],
      headline: "Your best week yet! 🌱",
      highlights: JSON.stringify([
        "Completed 8 challenges across different categories",
        "Earned 343 total points with great consistency",
        "Kitchen tasks are your sweet spot—keep it up!",
        "Your 1.5x multiplier on Kitchen Cleanup was impressive",
      ]),
      patterns: JSON.stringify({
        movement: [
          { title: "Morning momentum", description: "You tend to complete challenges earlier in the day", icon: "sunrise" },
          { title: "Steady rhythm", description: "Consistent 4-5 minute sessions show focused effort", icon: "activity" },
        ],
        handling: [
          { title: "Kitchen confidence", description: "Your kitchen tasks show the most precision", icon: "chef-hat" },
          { title: "Gentle precision", description: "Fragile items handled with care and attention", icon: "heart" },
        ],
      }),
    };

    const { error: insightsError } = await supabaseAdmin.from("insights_weekly").insert(insightsData);
    if (insightsError) {
      console.error("Insights insert error:", insightsError);
    }

    console.log("Demo data seeding complete!");

    return new Response(
      JSON.stringify({
        success: true,
        message: `Demo data seeded for ${email}`,
        summary: {
          profile: "Updated to Brandon",
          plants: "3 plants created (stages 7, 6, 4)",
          sessions: "8 completed challenges over 14 days",
          insights: "1 weekly recap created",
          totalPoints: 343,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Internal server error", details: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
