import * as React from "react";
import { Target, Gift, Star, Zap, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MissionCard } from "@/components/ui/mission-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";

// Mock data
const dailyMissions = [
  {
    id: 1,
    title: "Stay Online 24 Hours",
    description: "Keep at least one device connected for a full day",
    icon: "zap" as const,
    progress: 18,
    progressMax: 24,
    reward: 50,
    timeRemaining: "6h left",
  },
  {
    id: 2,
    title: "Peak Hours Bonus",
    description: "Be online during peak demand (2PM - 8PM)",
    icon: "star" as const,
    progress: 4,
    progressMax: 6,
    reward: 30,
    timeRemaining: "2h left",
  },
  {
    id: 3,
    title: "Network Stability",
    description: "Maintain 99% uptime across all devices",
    icon: "target" as const,
    progress: 100,
    progressMax: 100,
    reward: 75,
    completed: true,
  },
];

const weeklyMissions = [
  {
    id: 4,
    title: "Weekly Champion",
    description: "Earn 500 XP this week to claim the champion bonus",
    icon: "star" as const,
    progress: 320,
    progressMax: 500,
    reward: 200,
    timeRemaining: "3 days left",
  },
  {
    id: 5,
    title: "Refer 2 Friends",
    description: "Invite friends to join the network and earn together",
    icon: "gift" as const,
    progress: 1,
    progressMax: 2,
    reward: 500,
  },
];

const specialMissions = [
  {
    id: 6,
    title: "First Payout",
    description: "Complete your first withdrawal",
    icon: "gift" as const,
    progress: 0,
    progressMax: 1,
    reward: 100,
  },
  {
    id: 7,
    title: "Device Master",
    description: "Connect 5 devices to the network",
    icon: "zap" as const,
    progress: 3,
    progressMax: 5,
    reward: 250,
    locked: true,
    lockedMessage: "Connect 3 devices first",
  },
];

const completedMissions = [
  {
    id: 101,
    title: "Welcome Bonus",
    description: "Complete account setup",
    icon: "gift" as const,
    progress: 1,
    progressMax: 1,
    reward: 50,
    completed: true,
  },
  {
    id: 102,
    title: "First Device",
    description: "Connect your first device",
    icon: "zap" as const,
    progress: 1,
    progressMax: 1,
    reward: 100,
    completed: true,
  },
];

export function ActivityPage() {
  const navigate = useNavigate();
  
  const handleMissionClick = (missionId: number) => {
    // In a real app, this would open mission details or claim rewards
    console.log("Mission clicked:", missionId);
  };

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
            <Badge variant="secondary">320/500 XP</Badge>
          </div>
          <Progress value={64} variant="brand" className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Earn 180 more XP to unlock the weekly bonus
          </p>
        </Card>
      </section>

      {/* Mission Tabs */}
      <section className="px-4 mt-4">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="flex-1">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
            <TabsTrigger value="special" className="flex-1">Special</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Done</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-4 space-y-3">
            {dailyMissions.map((mission) => (
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
                onCtaClick={() => handleMissionClick(mission.id)}
                ctaLabel={mission.completed ? "Claim" : "View"}
              />
            ))}
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
                variant="highlighted"
                onCtaClick={() => handleMissionClick(mission.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="special" className="mt-4 space-y-3">
            {specialMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                progress={mission.progress}
                progressMax={mission.progressMax}
                reward={mission.reward}
                locked={mission.locked}
                lockedMessage={mission.lockedMessage}
                onCtaClick={mission.locked ? undefined : () => handleMissionClick(mission.id)}
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
