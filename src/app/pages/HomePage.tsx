import * as React from "react";
import { 
  Wifi, 
  Zap, 
  TrendingUp, 
  ChevronRight,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StreakBadge } from "@/components/ui/streak-indicator";
import { MissionCardCompact } from "@/components/ui/mission-card";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockStats = {
  totalEarned: "$127.45",
  todayEarned: "$4.82",
  devicesOnline: 3,
  totalDevices: 4,
  streak: 12,
  weeklyProgress: 68,
};

const mockMissions = [
  { id: 1, title: "Keep 3 devices online for 24h", progress: 18, max: 24, reward: 50 },
  { id: 2, title: "Complete first payout", progress: 1, max: 1, reward: 100, completed: true },
  { id: 3, title: "Refer a friend", progress: 0, max: 1, reward: 200 },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pb-4">
      {/* Hero Stats Section */}
      <section className="px-4 pt-4">
        <Card className="p-5 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 border-brand-yellow/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
              <h2 className="text-3xl font-display font-bold text-foreground">
                {mockStats.totalEarned}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-sm text-success font-medium">+12.3% this week</span>
              </div>
            </div>
            <ProgressRing 
              value={mockStats.weeklyProgress} 
              max={100} 
              variant="brand"
              size="lg"
              showValue
              label="weekly"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <StreakBadge count={mockStats.streak} variant="fire" />
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </Card>
      </section>

      {/* Quick Stats Grid */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Today"
            value={mockStats.todayEarned}
            variant="default"
            size="sm"
            delta={{ value: "+8%", type: "increase" }}
          />
          <StatCard
            label="Devices Online"
            value={`${mockStats.devicesOnline}/${mockStats.totalDevices}`}
            variant="default"
            size="sm"
            icon={Wifi}
          />
        </div>
      </section>

      {/* Device Status Banner */}
      <section className="px-4 mt-4">
        <Card 
          className="p-4 flex items-center gap-3 cursor-pointer hover:bg-card-hover transition-colors"
          onClick={() => navigate("/app/profile/devices")}
        >
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Wifi className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">All devices healthy</p>
            <p className="text-xs text-muted-foreground">3 online • 1 offline</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Card>
      </section>

      {/* Active Missions */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-display font-semibold">Active Missions</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/app/activity")}
            className="text-muted-foreground"
          >
            See all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {mockMissions.map((mission) => (
            <MissionCardCompact
              key={mission.id}
              title={mission.title}
              progress={mission.progress}
              progressMax={mission.max}
              reward={mission.reward}
              completed={mission.completed}
              onClick={() => navigate("/app/activity")}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-display font-semibold">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          <ActivityItem 
            icon={<Zap className="w-4 h-4" />}
            iconBg="bg-brand-yellow/10"
            iconColor="text-brand-yellow"
            title="Earned $0.42"
            subtitle="Device uptime reward"
            time="2 min ago"
          />
          <ActivityItem 
            icon={<Bell className="w-4 h-4" />}
            iconBg="bg-info/10"
            iconColor="text-info"
            title="Mission completed"
            subtitle="Keep 3 devices online for 24h"
            time="1 hour ago"
          />
          <ActivityItem 
            icon={<Wifi className="w-4 h-4" />}
            iconBg="bg-success/10"
            iconColor="text-success"
            title="Device came online"
            subtitle="Living Room Sensor"
            time="3 hours ago"
          />
        </div>
      </section>
    </div>
  );
}

// Activity Item Component
interface ActivityItemProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}

function ActivityItem({ icon, iconBg, iconColor, title, subtitle, time }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
    </div>
  );
}
