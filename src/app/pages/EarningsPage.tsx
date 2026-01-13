import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Flame,
  ChevronRight,
  Sparkles,
  Clock,
  Wallet,
  Zap,
  Target,
  ArrowUpRight,
  Trophy,
  Percent,
} from "lucide-react";

// Placeholder data
const streakData = {
  current: 7,
  best: 14,
  multiplier: 1.2,
};

const recentMilestones = [
  { id: "1", label: "7-day streak unlocked", value: "+1.2x bonus", icon: Flame, recent: true },
  { id: "2", label: "42 contributions this month", value: "487 pts", icon: Target, recent: false },
  { id: "3", label: "8 challenges completed", value: "+156 pts", icon: Zap, recent: false },
];

export function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Momentum Strip - instant emotional feedback */}
      <section className="flex items-stretch gap-2">
        {/* Current Streak */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-3 rounded-2xl bg-gradient-to-br from-orange-500/15 to-orange-500/5">
          <Flame className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.current}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">day streak</p>
          </div>
        </div>

        {/* Best Streak */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-3 rounded-2xl bg-muted/40">
          <Trophy className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.best}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">best</p>
          </div>
        </div>

        {/* Multiplier */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-3 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5">
          <Percent className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.multiplier}x</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">bonus</p>
          </div>
        </div>
      </section>

      {/* Balance Section - cleaner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-5">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative space-y-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Your Balance</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-foreground">$47.50</span>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs font-semibold">12%</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => navigate("/payout")}
            leftIcon={<Wallet className="h-4 w-4" />}
          >
            Request Payout
          </Button>
        </div>
      </section>

      {/* Momentum Indicators - flowing, not boxed */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Your Momentum</h2>
        </div>

        <div className="space-y-2">
          {recentMilestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div 
                key={milestone.id}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl transition-all duration-200
                  ${milestone.recent 
                    ? 'bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20' 
                    : 'bg-muted/30 hover:bg-muted/50'
                  }
                `}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${milestone.recent 
                    ? 'bg-orange-500/20' 
                    : 'bg-muted'
                  }
                `}>
                  <Icon className={`h-5 w-5 ${milestone.recent ? 'text-orange-500' : 'text-muted-foreground'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{milestone.label}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {milestone.recent && (
                    <Badge className="text-[10px] bg-orange-500/10 text-orange-600 border-0 px-2">
                      Active
                    </Badge>
                  )}
                  <span className={`text-sm font-semibold ${milestone.recent ? 'text-orange-600' : 'text-foreground'}`}>
                    {milestone.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projection - subtle, encouraging */}
      <section className="relative rounded-2xl bg-gradient-to-r from-muted/50 to-muted/30 p-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">On pace for</span>
            </div>
            <p className="text-2xl font-bold text-foreground">~620 pts</p>
            <p className="text-xs text-muted-foreground">this month at current activity</p>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Current</div>
            <div className="text-lg font-semibold text-foreground">487 pts</div>
          </div>
        </div>
      </section>

      {/* History - gentle nudge */}
      <button 
        onClick={() => {}}
        className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Full History</p>
            <p className="text-xs text-muted-foreground">All contributions & earnings</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Disclaimer - unobtrusive */}
      <p className="text-[11px] text-muted-foreground/70 text-center px-4 leading-relaxed">
        Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
      </p>
    </div>
  );
}
