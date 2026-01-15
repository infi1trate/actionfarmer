import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

// =============================================
// Types
// =============================================

export interface Plant {
  id: string;
  user_id: string;
  current_stage: number;
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

// =============================================
// Context
// =============================================

interface AppDataContextType {
  // Data
  plant: Plant | null;
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
  };
  
  // Loading states
  loading: boolean;
  
  // Actions
  refreshData: () => Promise<void>;
  createPlant: () => Promise<Plant | null>;
  updatePlantStage: (stage: number) => Promise<void>;
  startChallengeSession: (challengeId: string) => Promise<ChallengeSession | null>;
  completeChallengeSession: (sessionId: string, points: number, watering: number, sunlight: number) => Promise<void>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// =============================================
// Provider
// =============================================

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  
  const [plant, setPlant] = useState<Plant | null>(null);
  const [challenges, setChallenges] = useState<ChallengeFromCatalog[]>([]);
  const [sessions, setSessions] = useState<ChallengeSession[]>([]);
  const [currentWeekInsight, setCurrentWeekInsight] = useState<WeeklyInsight | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate stats from sessions
  const stats = React.useMemo(() => {
    const completedSessions = sessions.filter(s => s.status === "completed");
    
    return {
      totalCompleted: completedSessions.length,
      totalPoints: completedSessions.reduce((acc, s) => acc + (s.points_earned || 0), 0),
      currentStreak: plant?.current_stage || 0,
      longestStreak: plant?.current_stage || 0, // TODO: Track historical streaks
      totalWatering: completedSessions.reduce((acc, s) => acc + (s.watering_points || 0), 0),
      totalSunlight: completedSessions.reduce((acc, s) => acc + (s.sunlight_points || 0), 0),
    };
  }, [sessions, plant]);

  // Fetch all user data
  const fetchData = async () => {
    if (!user) {
      setPlant(null);
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

      // Fetch user's plant
      const { data: plantData } = await supabase
        .from("plants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setPlant(plantData as Plant | null);

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

    const { error } = await supabase
      .from("challenge_sessions")
      .update({
        status: "completed",
        ended_at: new Date().toISOString(),
        points_earned: points,
        watering_points: watering,
        sunlight_points: sunlight,
      })
      .eq("id", sessionId);

    if (!error) {
      setSessions(prev => 
        prev.map(s => 
          s.id === sessionId 
            ? { ...s, status: "completed" as const, points_earned: points, watering_points: watering, sunlight_points: sunlight }
            : s
        )
      );
    }
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
