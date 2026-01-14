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
  todayPoints: 124,
  todayContributions: 847,
  weeklyPoints: 892,
  weeklyContributions: 5420,
  monthlyPoints: 3156,
  monthlyContributions: 21840,
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
          SECTION 2: Current Balance & Payout (Primary Anchor)
          ======================================== */}
      <section className="px-5 py-8 bg-background">
        <div className="space-y-5">
          {/* Main Balance Display */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">Available Balance</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                ${balanceData.current.toFixed(2)}
              </span>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/12 px-2.5 py-1 rounded-full">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">{balanceData.changePercent}% vs last month</span>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Timer className="h-3.5 w-3.5" />
            <span className="text-sm">+${balanceData.pending.toFixed(2)} pending verification</span>
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
          SECTION 3: Ambient Mode Earnings (Live Stream)
          ======================================== */}
      <section className="bg-muted/20 px-5 py-6">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Activity className="h-4.5 w-4.5 text-emerald-500" />
              {ambientData.status === "active" && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
            <h2 className="text-sm font-semibold text-foreground">Ambient Earnings</h2>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            ambientData.status === "active" 
              ? 'bg-emerald-500/12' 
              : 'bg-muted'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              ambientData.status === "active" 
                ? 'bg-emerald-500 animate-pulse' 
                : 'bg-muted-foreground'
            }`} />
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${
              ambientData.status === "active" 
                ? 'text-emerald-600' 
                : 'text-muted-foreground'
            }`}>
              {ambientData.status === "active" ? 'Earning now' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Live Points Today - Hero Display */}
        <div className="mb-5 py-5 px-4 rounded-2xl bg-gradient-to-br from-emerald-500/8 via-emerald-500/4 to-transparent">
          <p className="text-xs text-muted-foreground font-medium mb-1.5 text-center">Points earned today so far</p>
          <p className="text-4xl font-bold text-emerald-600 text-center tracking-tight">
            +{ambientData.todayPoints} pts
          </p>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            from {ambientData.todayContributions.toLocaleString()} contributions
          </p>
        </div>

        {/* Week & Month Context */}
        <div className="flex items-stretch gap-3">
          {/* This Week */}
          <div className="flex-1 py-3 px-4 rounded-xl bg-background/60">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">This week</p>
            <p className="text-lg font-bold text-foreground">+{ambientData.weeklyPoints} pts</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {ambientData.weeklyContributions.toLocaleString()} contributions
            </p>
          </div>

          {/* This Month */}
          <div className="flex-1 py-3 px-4 rounded-xl bg-background/60">
            <p className="text-[11px] text-muted-foreground font-medium mb-1">This month</p>
            <p className="text-lg font-bold text-foreground">+{ambientData.monthlyPoints.toLocaleString()} pts</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {ambientData.monthlyContributions.toLocaleString()} contributions
            </p>
          </div>
        </div>

        {/* Reassuring Message */}
        <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
          Points accumulate quietly while you go about your day—no action needed.
        </p>
      </section>

      {/* ========================================
          SECTION 4: Challenge Bonus Summary Card
          ======================================== */}
      <section className="px-5 py-6 bg-background">
        {/* Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent p-5 border border-amber-500/15">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Challenge Rewards</h2>
              <p className="text-[11px] text-muted-foreground">Your bonus achievements</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {/* Challenges Completed */}
            <div className="text-center py-4 px-2 rounded-xl bg-background/70">
              <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-amber-500/15 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{challengeStats.completed}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">Completed</p>
              <p className="text-[11px] text-muted-foreground mt-1">of {challengeStats.attempted} attempted</p>
            </div>

            {/* Bonus Points */}
            <div className="text-center py-4 px-2 rounded-xl bg-background/70">
              <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-600">+{challengeStats.bonusEarned}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">Bonus Pts</p>
              <p className="text-[11px] text-muted-foreground mt-1">earned this month</p>
            </div>

            {/* Multiplier Status */}
            <div className="text-center py-4 px-2 rounded-xl bg-background/70 relative overflow-hidden">
              {challengeStats.multiplierActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/8 to-transparent" />
              )}
              <div className={`relative w-10 h-10 mx-auto mb-2.5 rounded-full flex items-center justify-center ${
                challengeStats.multiplierActive 
                  ? 'bg-primary/15' 
                  : 'bg-muted/50'
              }`}>
                <Zap className={`h-5 w-5 ${
                  challengeStats.multiplierActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`} />
                {challengeStats.multiplierActive && (
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                )}
              </div>
              <p className={`text-2xl font-bold ${
                challengeStats.multiplierActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}>
                {challengeStats.multiplierActive ? '1.5×' : '—'}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">Multiplier</p>
              <p className={`text-[11px] mt-1 ${
                challengeStats.multiplierActive 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground'
              }`}>
                {challengeStats.multiplierActive ? 'Active now!' : 'Inactive'}
              </p>
            </div>
          </div>

          {/* Next Milestone Progress */}
          <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-background/50">
            <Target className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Next reward at {challengeStats.nextMilestone} challenges</span>
                <span className="text-xs font-semibold text-foreground">{challengeStats.completed}/{challengeStats.nextMilestone}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${(challengeStats.completed / challengeStats.nextMilestone) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: Monthly Projection (Secondary)
          ======================================== */}
      <section className="px-5 py-5 bg-muted/10 border-t border-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Monthly projection</span>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-sm font-semibold text-foreground">~{projectionData.projectedPoints} pts</p>
              <p className="text-[10px] text-muted-foreground">{projectionData.daysRemaining} days left</p>
            </div>
            <div className="h-6 w-px bg-border/40" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{projectionData.currentPoints} pts</p>
              <p className="text-[10px] text-muted-foreground">current</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: Full History Navigation Row
          ======================================== */}
      <button 
        onClick={() => {}}
        className="w-full flex items-center justify-between px-5 py-4 bg-background border-t border-border/20 hover:bg-muted/20 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">View Earnings History</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Disclaimer */}
      <div className="px-5 py-4 bg-background">
        <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
          Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
        </p>
      </div>
    </div>
  );
}
