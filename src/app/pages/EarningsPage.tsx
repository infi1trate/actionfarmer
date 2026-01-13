import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const challengeStats = {
  completed: 8,
  bonusEarned: 156,
  multiplierActive: true,
};

export function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28">
      {/* Momentum Strip - instant emotional feedback */}
      <section className="flex items-stretch gap-3 p-5 bg-background">
        {/* Current Streak */}
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-orange-500/12 to-orange-500/4">
          <Flame className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.current}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">day streak</p>
          </div>
        </div>

        {/* Best Streak */}
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3.5 rounded-2xl bg-muted/30">
          <Trophy className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.best}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">best</p>
          </div>
        </div>

        {/* Multiplier */}
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-3.5 rounded-2xl bg-gradient-to-br from-primary/12 to-primary/4">
          <Percent className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground leading-none">{streakData.multiplier}x</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">bonus</p>
          </div>
        </div>
      </section>

      {/* Balance Section - on alternate background */}
      <section className="bg-muted/20 px-5 py-8">
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Your Balance</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-foreground">$47.50</span>
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

      {/* Challenge Bonuses - compact visual summary */}
      <section className="px-5 py-8 bg-background">
        <div className="flex items-center justify-between">
          {/* Completed */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              {challengeStats.completed >= 5 && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{challengeStats.completed}</p>
              <p className="text-[11px] text-muted-foreground font-medium">completed</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-20 w-px bg-border/40" />

          {/* Bonus Earned */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">+{challengeStats.bonusEarned}</p>
              <p className="text-[11px] text-muted-foreground font-medium">bonus pts</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-20 w-px bg-border/40" />

          {/* Multiplier Status */}
          <div className="flex flex-col items-center gap-2.5">
            <div className={`relative w-14 h-14 rounded-full flex items-center justify-center ${
              challengeStats.multiplierActive 
                ? 'bg-primary/10' 
                : 'bg-muted/40'
            }`}>
              <Percent className={`h-6 w-6 ${
                challengeStats.multiplierActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`} />
              {challengeStats.multiplierActive && (
                <span className="absolute inset-0 rounded-full bg-primary/15 animate-pulse" />
              )}
            </div>
            <div className="text-center">
              <p className={`text-xl font-bold ${
                challengeStats.multiplierActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}>
                {challengeStats.multiplierActive ? 'ON' : 'OFF'}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium">multiplier</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer section - projection + history on alternate bg */}
      <section className="bg-muted/20 px-5 py-6 space-y-4">
        {/* Projection - secondary, lighter */}
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs">On pace for <span className="font-medium text-foreground/80">~620 pts</span> this month</span>
          </div>
          <span className="text-xs tabular-nums">487 pts now</span>
        </div>

        {/* History - simple nav row */}
        <button 
          onClick={() => {}}
          className="w-full flex items-center justify-between py-3 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">View Full History</span>
          </div>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Disclaimer - unobtrusive */}
        <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed pt-2">
          Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
        </p>
      </section>
    </div>
  );
}
