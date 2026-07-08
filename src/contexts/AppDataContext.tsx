import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

// =============================================
// Types & Helpers
// =============================================

/**
 * EVOLUTION PROGRESS SOURCE OF TRUTH:
 * - Active plant: Selected as the most recently updated `plants` row for the user
 * - Completion criteria: A session is "completed" if status === "completed" || "submitted"
 * - Progress is USER-SCOPED (challenge_sessions has no plant_id)
 */

/** Shared helper: determines if a session counts as "completed" for progress */
export const isSessionCompleted = (status: string): boolean =>
  status === "completed" || status === "submitted";

/** Shared helper: gets the activity timestamp from a session for date-based calculations */
export const getSessionActivityDate = (session: { started_at: string; ended_at?: string | null; created_at: string }): string =>
  session.started_at || session.ended_at || session.created_at;

/**
 * Shared helper: maps completed challenge count to current plant stage.
 *  - 0 completions => stage 0
 *  - 1..7 completions => stage 1..7
 *  - 8th completion starts a new plant cycle => stage 1
 */
export const getPlantStageFromCompletedCount = (completedCount: number): number => {
  if (completedCount <= 0) return 0;
  return ((completedCount - 1) % 7) + 1;
};


export interface Plant {
  id: string;
  user_id: string;
  current_stage: number;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  available_balance_cents: number;
  pending_balance_cents: number;
  lifetime_earned_cents: number;
  first_reward_claimed: boolean;
  first_reward_amount_cents: number;
  created_at: string;
  updated_at: string;
}

export interface ChallengeFromCatalog {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  difficulty: "easy" | "medium" | "hard";
  video_url: string | null;
  thumbnail_url: string | null;
  icon_emoji: string | null;
  xp_base: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChallengeSession {
  id: string;
  user_id: string;
  challenge_id: string;
  status: "started" | "submitted" | "completed";
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  xp_multiplier: number;
  points_earned: number;
  watering_points: number;
  sunlight_points: number;
  vitality_multiplier: number;
  created_at: string;
  // Joined data
  challenge?: ChallengeFromCatalog;
}

export interface WeeklyInsight {
  id: string;
  user_id: string;
  week_start: string;
  week_end: string;
  headline: string | null;
  highlights: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    accent?: string;
  }>;
  patterns: Record<string, Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    isNew?: boolean;
    context?: string;
  }>>;
  created_at: string;
}

// Reward amount in cents for each completed plant (after first)
const PLANT_REWARD_CENTS = 500; // $5.00 per plant

// =============================================
// Context
// =============================================

interface AppDataContextType {
  // Data
  plant: Plant | null;
  wallet: Wallet | null;
  challenges: ChallengeFromCatalog[];
  sessions: ChallengeSession[];
  currentWeekInsight: WeeklyInsight | null;
  
  // Computed stats
  stats: {
    totalCompleted: number;
    totalPoints: number;
    currentStreak: number;
    longestStreak: number;
    totalWatering: number;
    totalSunlight: number;
    completedPlantCount: number;
  };
  
  // Loading states
  loading: boolean;
  
  // Actions
  refreshData: () => Promise<void>;
  createPlant: () => Promise<Plant | null>;
  updatePlantStage: (stage: number) => Promise<void>;
  startChallengeSession: (challengeId: string) => Promise<ChallengeSession | null>;
  completeChallengeSession: (sessionId: string, points: number, watering: number, sunlight: number) => Promise<void>;
  claimFirstReward: () => Promise<boolean>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// =============================================
// Provider
// =============================================

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [challenges, setChallenges] = useState<ChallengeFromCatalog[]>([]);
  const [sessions, setSessions] = useState<ChallengeSession[]>([]);
  const [currentWeekInsight, setCurrentWeekInsight] = useState<WeeklyInsight | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate stats from sessions using shared completion criteria
  const stats = React.useMemo(() => {
    const completedSessions = sessions.filter(s => isSessionCompleted(s.status));
    const completedPlantCount = Math.floor(completedSessions.length / 7);
    
    return {
      totalCompleted: completedSessions.length,
      totalPoints: completedSessions.reduce((acc, s) => acc + (s.points_earned || 0), 0),
      currentStreak: plant?.current_stage || 0,
      longestStreak: plant?.current_stage || 0, // TODO: Track historical streaks
      totalWatering: completedSessions.reduce((acc, s) => acc + (s.watering_points || 0), 0),
      totalSunlight: completedSessions.reduce((acc, s) => acc + (s.sunlight_points || 0), 0),
      completedPlantCount,
    };
  }, [sessions, plant]);

  // Fetch all user data
  const fetchData = async () => {
    if (!user) {
      setPlant(null);
      setWallet(null);
      setSessions([]);
      setCurrentWeekInsight(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Fetch challenges catalog (public)
      const { data: catalogData } = await supabase
        .from("challenges_catalog")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (catalogData) {
        setChallenges(catalogData as ChallengeFromCatalog[]);
      }

      // Fetch user's plant - select the most recently updated one to handle multiple plants
      const { data: plantData } = await supabase
        .from("plants")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setPlant(plantData as Plant | null);

      // Fetch user's wallet (or create if doesn't exist)
      let { data: walletData } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Create wallet if it doesn't exist (for existing users before migration)
      if (!walletData) {
        const { data: newWallet } = await supabase
          .from("wallets")
          .insert({ user_id: user.id })
          .select()
          .single();
        walletData = newWallet;
      }

      setWallet(walletData as Wallet | null);

      // Fetch user's challenge sessions with challenge data
      const { data: sessionData } = await supabase
        .from("challenge_sessions")
        .select(`
          *,
          challenge:challenges_catalog(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (sessionData) {
        setSessions(sessionData as ChallengeSession[]);

        // Keep plant stage synced to progress (7 challenges => full plant)
        // If stage drifts (older logic), correct it here so UI images match.
        if (plantData) {
          const completedCount = (sessionData as ChallengeSession[]).filter(s => isSessionCompleted(s.status)).length;
          const derivedStage = getPlantStageFromCompletedCount(completedCount);

          if (typeof (plantData as any).current_stage === "number" && (plantData as any).current_stage !== derivedStage) {
            const { error: plantSyncError } = await supabase
              .from("plants")
              .update({ current_stage: derivedStage })
              .eq("id", (plantData as any).id);

            if (!plantSyncError) {
              setPlant({ ...(plantData as Plant), current_stage: derivedStage });
            }
          }
        }
      }

      // Fetch current week's insight
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekStartStr = weekStart.toISOString().split("T")[0];

      const { data: insightData } = await supabase
        .from("insights_weekly")
        .select("*")
        .eq("user_id", user.id)
        .eq("week_start", weekStartStr)
        .maybeSingle();

      if (insightData) {
        setCurrentWeekInsight({
          ...insightData,
          highlights: Array.isArray(insightData.highlights) ? insightData.highlights : [],
          patterns: typeof insightData.patterns === "object" && insightData.patterns !== null 
            ? insightData.patterns as WeeklyInsight["patterns"]
            : {},
        } as WeeklyInsight);
      } else {
        setCurrentWeekInsight(null);
      }
    } catch (error) {
      console.error("Error fetching app data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new plant for the user
  const createPlant = async (): Promise<Plant | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("plants")
      .insert({ user_id: user.id, current_stage: 0 })
      .select()
      .single();

    if (error) {
      console.error("Error creating plant:", error);
      return null;
    }

    const newPlant = data as Plant;
    setPlant(newPlant);
    return newPlant;
  };

  // Update plant stage
  const updatePlantStage = async (stage: number) => {
    if (!user || !plant) return;

    const { error } = await supabase
      .from("plants")
      .update({ current_stage: stage })
      .eq("id", plant.id);

    if (!error) {
      setPlant({ ...plant, current_stage: stage });
    }
  };

  // Start a challenge session
  const startChallengeSession = async (challengeId: string): Promise<ChallengeSession | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("challenge_sessions")
      .insert({
        user_id: user.id,
        challenge_id: challengeId,
        status: "started",
      })
      .select(`
        *,
        challenge:challenges_catalog(*)
      `)
      .single();

    if (error) {
      console.error("Error starting session:", error);
      return null;
    }

    const newSession = data as ChallengeSession;
    setSessions(prev => [newSession, ...prev]);
    return newSession;
  };

  // Complete a challenge session
  const completeChallengeSession = async (
    sessionId: string, 
    points: number, 
    watering: number, 
    sunlight: number
  ) => {
    if (!user) return;

    const { data: completedSession, error } = await supabase
      .from("challenge_sessions")
      .update({
        status: "completed",
        ended_at: new Date().toISOString(),
        points_earned: points,
        watering_points: watering,
        sunlight_points: sunlight,
      })
      .eq("id", sessionId)
      .select(`
        *,
        challenge:challenges_catalog(*)
      `)
      .single();

    if (!error) {
      const completed = completedSession as ChallengeSession;

      // Update local sessions, including the just-created session even if React state
      // had not yet included it when this completion call started.
      const updatedSessions = sessions.some(s => s.id === sessionId)
        ? sessions.map(s => s.id === sessionId ? completed : s)
        : [completed, ...sessions];
      setSessions(updatedSessions);

      const completedCount = updatedSessions.filter(s => isSessionCompleted(s.status)).length;
      const derivedStage = getPlantStageFromCompletedCount(completedCount);

      if (derivedStage > 0) {
        if (plant) {
          setPlant({ ...plant, current_stage: derivedStage });
        } else {
          const { data: syncedPlant } = await supabase
            .from("plants")
            .select("*")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (syncedPlant) {
            setPlant(syncedPlant as Plant);
          }
        }
      }

      // Check if this completion finishes a plant (every 7th challenge)
      const justFinishedPlant = completedCount > 0 && completedCount % 7 === 0;

      // If plant just finished AND first reward already claimed, auto-add earnings
      if (justFinishedPlant && wallet?.first_reward_claimed) {
        const newBalance = (wallet.available_balance_cents || 0) + PLANT_REWARD_CENTS;
        const newLifetime = (wallet.lifetime_earned_cents || 0) + PLANT_REWARD_CENTS;

        const { error: walletError } = await supabase
          .from("wallets")
          .update({
            available_balance_cents: newBalance,
            lifetime_earned_cents: newLifetime,
          })
          .eq("id", wallet.id);

        if (!walletError) {
          setWallet({
            ...wallet,
            available_balance_cents: newBalance,
            lifetime_earned_cents: newLifetime,
          });
          toast.success(`Plant fully grown 🌱 +$${(PLANT_REWARD_CENTS / 100).toFixed(2)} added to your balance`);
        }
      }
    }
  };

  // Claim first reward
  const claimFirstReward = async (): Promise<boolean> => {
    if (!user || !wallet || wallet.first_reward_claimed) return false;

    const rewardAmount = wallet.first_reward_amount_cents || 1500;
    const newBalance = (wallet.available_balance_cents || 0) + rewardAmount;
    const newLifetime = (wallet.lifetime_earned_cents || 0) + rewardAmount;

    const { error } = await supabase
      .from("wallets")
      .update({
        first_reward_claimed: true,
        available_balance_cents: newBalance,
        lifetime_earned_cents: newLifetime,
      })
      .eq("id", wallet.id);

    if (error) {
      console.error("Error claiming first reward:", error);
      return false;
    }

    setWallet({
      ...wallet,
      first_reward_claimed: true,
      available_balance_cents: newBalance,
      lifetime_earned_cents: newLifetime,
    });

    toast.success(`$${(rewardAmount / 100).toFixed(2)} added to your balance`);
    return true;
  };

  // Refresh data
  const refreshData = async () => {
    await fetchData();
  };

  // Fetch data when user changes
  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  return (
    <AppDataContext.Provider
      value={{
        plant,
        wallet,
        challenges,
        sessions,
        currentWeekInsight,
        stats,
        loading,
        refreshData,
        createPlant,
        updatePlantStage,
        startChallengeSession,
        completeChallengeSession,
        claimFirstReward,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

// =============================================
// Hook
// =============================================

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}