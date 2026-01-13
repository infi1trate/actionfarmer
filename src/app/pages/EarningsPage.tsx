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
  Activity,
  Calendar,
  CheckCircle2,
  Timer,
} from "lucide-react";

// Placeholder data
const streakData = {
  current: 7,
  best: 14,
  multiplier: 1.2,
};

const balanceData = {
  current: 47.50,
  changePercent: 12,
  pending: 8.25,
};

const ambientData = {
  todayMinutes: 142,
  todayPoints: 28,
  weeklyMinutes: 840,
  weeklyPoints: 168,
  status: "active" as const,
};

const challengeStats = {
  completed: 8,
  attempted: 12,
  bonusEarned: 156,
  multiplierActive: true,
  nextMilestone: 10,
};

const projectionData = {
  currentPoints: 487,
  projectedPoints: 620,
  daysRemaining: 18,
  avgDaily: 24,
};

export function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-28">
      {/* ========================================
          SECTION 1: Momentum Status Header
          ======================================== */}
      <header className="bg-gradient-to-b from-muted/40 to-background border-b border-border/30">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            {/* Current Streak */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-orange-500/15 flex items-center justify-center">
                <Flame className="h-4.5 w-4.5 text-orange-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-tight">{streakData.current} days</p>
                <p className="text-[11px] text-muted-foreground font-medium">Current streak</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-border/50" />

            {/* Best Streak */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center">
                <Trophy className="h-4.5 w-4.5 text-amber-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-tight">{streakData.best} days</p>
                <p className="text-[11px] text-muted-foreground font-medium">Personal best</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-border/50" />

            {/* Multiplier */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <Zap className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary leading-tight">{streakData.multiplier}x</p>
                <p className="text-[11px] text-muted-foreground font-medium">Active bonus</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================
          SECTION 2: Current Balance & Payout
          ======================================== */}
      <section className="bg-muted/20 px-5 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Your Balance</h2>
        </div>

        <div className="space-y-4">
          {/* Main Balance */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                ${balanceData.current.toFixed(2)}
              </span>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs font-semibold">{balanceData.changePercent}%</span>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-background/60">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Timer className="h-3.5 w-3.5" />
              <span className="text-xs">Pending verification</span>
            </div>
            <span className="text-sm font-medium text-foreground">+${balanceData.pending.toFixed(2)}</span>
          </div>

          {/* Payout Button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => navigate("/payout")}
            leftIcon={<Wallet className="h-4 w-4" />}
          >
            Request Payout
          </Button>

          <p className="text-[11px] text-muted-foreground text-center">
            Minimum payout: $10.00 • Processing: 2-3 business days
          </p>
        </div>
      </section>

      {/* ========================================
          SECTION 3: Ongoing Ambient Contribution
          ======================================== */}
      <section className="px-5 py-6 bg-background">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-500" />
            <h2 className="text-sm font-semibold text-foreground">Ambient Contribution</h2>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wide">Active</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Today */}
          <div className="p-4 rounded-2xl bg-muted/30">
            <p className="text-xs text-muted-foreground font-medium mb-2">Today</p>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{ambientData.todayMinutes} min</p>
              <p className="text-sm text-emerald-600 font-medium">+{ambientData.todayPoints} pts earned</p>
            </div>
          </div>

          {/* This Week */}
          <div className="p-4 rounded-2xl bg-muted/30">
            <p className="text-xs text-muted-foreground font-medium mb-2">This Week</p>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{(ambientData.weeklyMinutes / 60).toFixed(1)} hrs</p>
              <p className="text-sm text-emerald-600 font-medium">+{ambientData.weeklyPoints} pts earned</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Ambient mode runs quietly in the background, earning points while you go about your day.
        </p>
      </section>

      {/* ========================================
          SECTION 4: Challenge Bonus Breakdown
          ======================================== */}
      <section className="bg-muted/20 px-5 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-foreground">Challenge Bonuses</h2>
        </div>

        <div className="space-y-4">
          {/* Stats Row */}
          <div className="flex items-center justify-between">
            {/* Completed */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-amber-600" />
                </div>
                {challengeStats.completed >= 5 && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{challengeStats.completed}/{challengeStats.attempted}</p>
                <p className="text-[11px] text-muted-foreground font-medium">completed</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-20 w-px bg-border/40" />

            {/* Bonus Earned */}
            <div className="flex flex-col items-center gap-2">
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
            <div className="flex flex-col items-center gap-2">
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

          {/* Next Milestone */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-background/60">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Next milestone</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{challengeStats.nextMilestone} challenges</span>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: Monthly Projection
          ======================================== */}
      <section className="px-5 py-6 bg-background">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Monthly Projection</h2>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Projected total</p>
              <p className="text-3xl font-bold text-foreground">~{projectionData.projectedPoints} pts</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <p className="text-xl font-semibold text-foreground">{projectionData.currentPoints} pts</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{projectionData.daysRemaining} days remaining</span>
            </div>
            <span>Avg: {projectionData.avgDaily} pts/day</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Based on your current activity pace. Keep contributing to reach your goal!
        </p>
      </section>

      {/* ========================================
          SECTION 6: Full History Link
          ======================================== */}
      <section className="bg-muted/20 px-5 py-5">
        <button 
          onClick={() => {}}
          className="w-full flex items-center justify-between py-4 px-4 rounded-2xl bg-background hover:bg-background/80 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">View Full History</p>
              <p className="text-xs text-muted-foreground">All contributions, challenges & payouts</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* Disclaimer */}
      <div className="px-5 py-4 bg-background">
        <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
          Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
        </p>
      </div>
    </div>
  );
}
