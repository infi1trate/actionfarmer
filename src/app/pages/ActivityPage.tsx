import * as React from "react";
import { Target, Gift, Star, Zap, Clock, ChevronRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MissionCard } from "@/components/ui/mission-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";

export function ActivityPage() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { sessions, stats, loading: dataLoading } = useAppData();

  const isLoading = authLoading || dataLoading;

  // Compute weekly progress from real data
  const weeklyProgress = React.useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekSessions = sessions.filter(s => {
      const sessionDate = new Date(s.created_at);
      return sessionDate >= weekStart && (s.status === "completed" || s.status === "submitted");
    });

    const totalXP = weekSessions.reduce((acc, s) => acc + (s.points_earned || 0), 0);
    const targetXP = 500;

    return {
      current: totalXP,
      target: targetXP,
      percentage: Math.min(100, Math.round((totalXP / targetXP) * 100)),
      remaining: Math.max(0, targetXP - totalXP),
    };
  }, [sessions]);

  // Build missions from real challenge completion patterns
  const dailyMissions = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaySessions = sessions.filter(s => {
      const sessionDate = new Date(s.created_at);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime();
    });

    return [
      {
        id: 1,
        title: "Complete a Challenge",
        description: "Finish any challenge today",
        icon: "target" as const,
        progress: todaySessions.filter(s => s.status === "completed" || s.status === "submitted").length,
        progressMax: 1,
        reward: 20,
        completed: todaySessions.some(s => s.status === "completed" || s.status === "submitted"),
      },
      {
        id: 2,
        title: "Earn 50 XP",
        description: "Accumulate XP from challenges",
        icon: "star" as const,
        progress: Math.min(50, todaySessions.reduce((acc, s) => acc + (s.points_earned || 0), 0)),
        progressMax: 50,
        reward: 10,
        completed: todaySessions.reduce((acc, s) => acc + (s.points_earned || 0), 0) >= 50,
      },
    ];
  }, [sessions]);

  const weeklyMissions = React.useMemo(() => {
    return [
      {
        id: 4,
        title: "Weekly Champion",
        description: "Earn 500 XP this week",
        icon: "star" as const,
        progress: weeklyProgress.current,
        progressMax: weeklyProgress.target,
        reward: 100,
        timeRemaining: "Resets Sunday",
        completed: weeklyProgress.current >= weeklyProgress.target,
      },
    ];
  }, [weeklyProgress]);

  // Completed missions from this week
  const completedMissions = React.useMemo(() => {
    const allMissions = [...dailyMissions, ...weeklyMissions];
    return allMissions.filter(m => m.completed);
  }, [dailyMissions, weeklyMissions]);

  const handleMissionClick = (missionId: number) => {
    navigate("/challenges");
  };

  if (isLoading) {
    return (
      <div className="pb-4">
        <section className="px-4 pt-4">
          <Skeleton className="h-24 w-full rounded-xl" />
        </section>
        <section className="px-4 mt-4">
          <Skeleton className="h-10 w-full rounded-lg mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Weekly Progress Banner */}
      <section className="px-4 pt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Weekly Progress</span>
            </div>
            <Badge variant="secondary">{weeklyProgress.current}/{weeklyProgress.target} XP</Badge>
          </div>
          <Progress value={weeklyProgress.percentage} variant="brand" className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {weeklyProgress.remaining > 0 
              ? `Earn ${weeklyProgress.remaining} more XP to complete the weekly goal`
              : "🎉 Weekly goal complete!"}
          </p>
        </Card>
      </section>

      {/* Mission Tabs */}
      <section className="px-4 mt-4">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="flex-1">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Done</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-4 space-y-3">
            {dailyMissions.length > 0 ? (
              dailyMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  title={mission.title}
                  description={mission.description}
                  icon={mission.icon}
                  progress={mission.progress}
                  progressMax={mission.progressMax}
                  reward={mission.reward}
                  completed={mission.completed}
                  onCtaClick={() => handleMissionClick(mission.id)}
                  ctaLabel={mission.completed ? "Complete" : "Start"}
                />
              ))
            ) : (
              <EmptyState
                icon={Target}
                title="No daily missions"
                description="Check back tomorrow for new missions"
                variant="default"
                size="sm"
              />
            )}
          </TabsContent>

          <TabsContent value="weekly" className="mt-4 space-y-3">
            {weeklyMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                progress={mission.progress}
                progressMax={mission.progressMax}
                reward={mission.reward}
                timeRemaining={mission.timeRemaining}
                completed={mission.completed}
                variant="highlighted"
                onCtaClick={() => handleMissionClick(mission.id)}
                ctaLabel={mission.completed ? "Complete" : "View"}
              />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedMissions.length > 0 ? (
              completedMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  title={mission.title}
                  description={mission.description}
                  icon={mission.icon}
                  progress={mission.progress}
                  progressMax={mission.progressMax}
                  reward={mission.reward}
                  completed={mission.completed}
                />
              ))
            ) : (
              <EmptyState
                icon={Sprout}
                title="No completed missions"
                description="Complete missions to see them here"
                variant="default"
                size="sm"
              />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
