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
    // The active plant is the one with most recent updated_at - set stage 4 as the "active" one
    console.log("Creating plants...");
    const now = new Date();
    const plantsData = [
      { user_id: userId, current_stage: 7, updated_at: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString() }, // Fully grown - older
      { user_id: userId, current_stage: 6, updated_at: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString() }, // Flower - older
      { user_id: userId, current_stage: 4, updated_at: new Date().toISOString() }, // Mid-growth - ACTIVE (most recent)
    ];

    const { error: plantsError } = await supabaseAdmin.from("plants").insert(plantsData);
    if (plantsError) {
      console.error("Plants insert error:", plantsError);
    }

    // Step 4: Create challenge sessions (8 completed over last 14 days)
    // IMPORTANT: created_at must match started_at for accurate date-based UI calculations
    console.log("Creating challenge sessions...");
    
    // Helper to create session with matching created_at
    const makeSession = (
      challengeIdx: number,
      daysAgo: number,
      points: number,
      xpMult: number,
      vitalityMult: number,
      sunlight: number,
      watering: number,
      durationSecs: number
    ) => {
      const sessionTime = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      return {
        user_id: userId,
        challenge_id: CHALLENGE_IDS[challengeIdx],
        status: "completed" as const,
        points_earned: points,
        xp_multiplier: xpMult,
        vitality_multiplier: vitalityMult,
        sunlight_points: sunlight,
        watering_points: watering,
        duration_seconds: durationSecs,
        started_at: sessionTime.toISOString(),
        ended_at: new Date(sessionTime.getTime() + durationSecs * 1000).toISOString(),
        created_at: sessionTime.toISOString(), // Match started_at for accurate date calcs
      };
    };

    const sessionsData = [
      makeSession(0, 1, 48, 1.2, 1.0, 15, 12, 285),  // Yesterday - Grocery Unload
      makeSession(1, 2, 55, 1.5, 1.1, 18, 14, 320),  // 2 days ago - Kitchen Cleanup  
      makeSession(2, 3, 42, 1.0, 1.0, 12, 10, 260),  // 3 days ago - Fold Laundry
      makeSession(3, 5, 35, 1.0, 1.0, 10, 8, 180),   // 5 days ago - Reset Table
      makeSession(4, 6, 38, 1.2, 1.0, 11, 9, 220),   // 6 days ago - Sort Recycling
      makeSession(5, 8, 28, 1.0, 1.0, 8, 6, 150),    // 8 days ago - Make the Bed
      makeSession(6, 10, 52, 1.3, 1.2, 16, 13, 300), // 10 days ago - Handle Fragile
      makeSession(7, 12, 45, 1.1, 1.0, 14, 11, 270), // 12 days ago - Fill Dishwasher
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

    // IMPORTANT: highlights and patterns are JSONB - pass as objects, NOT JSON.stringify
    const insightsData = {
      user_id: userId,
      week_start: weekStart.toISOString().split("T")[0],
      week_end: weekEnd.toISOString().split("T")[0],
      headline: "Your best week yet! 🌱",
      highlights: [
        { id: "h1", title: "8 Challenges", description: "Completed 8 challenges across different categories", icon: "trophy", accent: "emerald" },
        { id: "h2", title: "343 Points", description: "Earned 343 total points with great consistency", icon: "star", accent: "amber" },
        { id: "h3", title: "Kitchen Pro", description: "Kitchen tasks are your sweet spot—keep it up!", icon: "chef-hat", accent: "sky" },
        { id: "h4", title: "1.5x Multiplier", description: "Your 1.5x multiplier on Kitchen Cleanup was impressive", icon: "zap", accent: "violet" },
      ],
      patterns: {
        movement: [
          { id: "m1", title: "Morning momentum", description: "You tend to complete challenges earlier in the day", icon: "sunrise", isNew: true },
          { id: "m2", title: "Steady rhythm", description: "Consistent 4-5 minute sessions show focused effort", icon: "activity" },
        ],
        handling: [
          { id: "h1", title: "Kitchen confidence", description: "Your kitchen tasks show the most precision", icon: "chef-hat", isNew: true },
          { id: "h2", title: "Gentle precision", description: "Fragile items handled with care and attention", icon: "heart" },
        ],
      },
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
