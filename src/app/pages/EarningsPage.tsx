import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Gamepad2,
  TrendingUp,
  Flame,
  Calendar,
  ChevronRight,
  Sparkles,
  Clock,
  Wallet,
} from "lucide-react";

interface EarningItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  trend?: "up" | "stable";
}

interface StreakData {
  current: number;
  best: number;
  lastActive: string;
}

// Placeholder data - no token prices, no promised returns
const ambientEarnings: EarningItem[] = [
  { id: "1", label: "This Week", value: "124 pts", subtext: "From 12 contributions", trend: "up" },
  { id: "2", label: "Last Week", value: "98 pts", subtext: "From 9 contributions" },
  { id: "3", label: "This Month", value: "487 pts", subtext: "From 42 contributions", trend: "up" },
];

const challengeBonuses: EarningItem[] = [
  { id: "1", label: "Challenges Completed", value: "8", subtext: "This month" },
  { id: "2", label: "Bonus Points Earned", value: "156 pts", subtext: "From bonuses", trend: "up" },
  { id: "3", label: "Featured Challenge", value: "2x", subtext: "Multiplier active" },
];

const monthlyProjection = {
  estimated: "~620 pts",
  basedOn: "Based on your current activity pace",
  disclaimer: "Projections are estimates only and may vary",
};

const streakData: StreakData = {
  current: 7,
  best: 14,
  lastActive: "Today",
};

export function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Summary Card with Payout CTA */}
      <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold text-foreground">$47.50</p>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">12% from last month</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
        </div>
        <Button 
          className="w-full mt-4" 
          onClick={() => navigate("/payout")}
          leftIcon={<Wallet className="h-4 w-4" />}
        >
          Request Payout
        </Button>
      </Card>

      {/* Ambient Earnings */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Camera className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Ambient Mode Earnings
          </h2>
        </div>
        <Card className="divide-y divide-border">
          {ambientEarnings.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                {item.subtext && (
                  <p className="text-xs text-muted-foreground">{item.subtext}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.trend === "up" && (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                )}
                <span className="text-sm font-semibold text-foreground">{item.value}</span>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Challenge Bonuses */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Challenge Bonuses
          </h2>
        </div>
        <Card className="divide-y divide-border">
          {challengeBonuses.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                {item.subtext && (
                  <p className="text-xs text-muted-foreground">{item.subtext}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.trend === "up" && (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                )}
                <span className="text-sm font-semibold text-foreground">{item.value}</span>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Monthly Projection */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Monthly Projection
          </h2>
        </div>
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Estimated Month-End</p>
              <p className="text-xs text-muted-foreground">{monthlyProjection.basedOn}</p>
            </div>
            <span className="text-lg font-bold text-foreground">{monthlyProjection.estimated}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              {monthlyProjection.disclaimer}
            </p>
          </div>
        </Card>
      </section>

      {/* Consistency Streaks */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Flame className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Consistency Streaks
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-xs text-muted-foreground">Current Streak</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{streakData.current}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Last active: {streakData.lastActive}
            </p>
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-xs text-muted-foreground">Best Streak</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{streakData.best}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Personal record
            </p>
          </Card>
        </div>
        
        {/* Streak bonus info */}
        <Card className="p-3 bg-orange-500/5 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">7-Day Streak Active</p>
              <p className="text-xs text-muted-foreground">Keep it going to maintain your bonus multiplier</p>
            </div>
            <Badge className="text-xs bg-orange-500/10 text-orange-600 border-0">1.2x</Badge>
          </div>
        </Card>
      </section>

      {/* History Link */}
      <Card 
        className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => {}}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">View Full History</p>
              <p className="text-xs text-muted-foreground">See all your past earnings</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="p-4 bg-muted/20 border-0">
        <p className="text-xs text-muted-foreground text-center">
          Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
        </p>
      </Card>
    </div>
  );
}
