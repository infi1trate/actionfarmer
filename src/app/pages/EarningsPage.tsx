import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  TrendingUp,
  ChevronRight,
  Sparkles,
  Clock,
  Wallet,
  Zap,
  Target,
  ArrowUpRight,
  Trophy,
  Activity,
  CheckCircle2,
  Timer,
  Sprout,
  Flower2,
  TreeDeciduous,
} from "lucide-react";

// Garden/Streak data
const gardenData = {
  currentStreak: 7,
  currentPlantStage: 3, // 1=seed, 2=sprout, 3=growing, 4=blooming, 5=full tree
  currentPlantName: "Sunflower",
  daysToNextStage: 3,
  collectedPlants: [
    { name: "Daisy", days: 7, icon: "🌼" },
    { name: "Tulip", days: 14, icon: "🌷" },
    { name: "Rose", days: 21, icon: "🌹" },
  ],
  multiplier: 1.2,
};

const getPlantStageInfo = (stage: number) => {
  const stages = [
    { label: "Seed", icon: Sprout, color: "text-amber-600", bg: "bg-amber-500/15" },
    { label: "Sprout", icon: Sprout, color: "text-lime-600", bg: "bg-lime-500/15" },
    { label: "Growing", icon: Flower2, color: "text-emerald-600", bg: "bg-emerald-500/15" },
    { label: "Blooming", icon: Flower2, color: "text-pink-500", bg: "bg-pink-500/15" },
    { label: "Full Bloom", icon: TreeDeciduous, color: "text-green-600", bg: "bg-green-500/15" },
  ];
  return stages[Math.min(stage - 1, 4)];
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
    <div className="min-h-screen pb-28 bg-background">
      {/* ========================================
          SECTION 1: Garden of Progress
          ======================================== */}
      <header className="bg-gradient-to-b from-emerald-500/8 via-lime-500/5 to-transparent">
        <div className="px-5 pt-6 pb-5">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-5">
            <Sprout className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-foreground">Garden of Progress</h2>
          </div>

          {/* Current Growing Plant - Hero */}
          <div className="relative mb-6">
            {(() => {
              const stageInfo = getPlantStageInfo(gardenData.currentPlantStage);
              const PlantIcon = stageInfo.icon;
              const progress = (gardenData.currentPlantStage / 5) * 100;
              
              return (
                <div className="flex items-center gap-5">
                  {/* Plant Visualization */}
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl ${stageInfo.bg} flex items-center justify-center relative overflow-hidden`}>
                      {/* Growth rings animation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full border-2 border-dashed ${stageInfo.color.replace('text-', 'border-')} opacity-20 animate-pulse`} />
                      </div>
                      <PlantIcon className={`h-9 w-9 ${stageInfo.color} relative z-10`} />
                    </div>
                    {/* Day counter badge */}
                    <div className="absolute -bottom-1.5 -right-1.5 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Day {gardenData.currentStreak}
                    </div>
                  </div>

                  {/* Plant Info */}
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Currently growing</p>
                    <p className="text-xl font-bold text-foreground mb-1">{gardenData.currentPlantName}</p>
                    <p className={`text-sm font-medium ${stageInfo.color}`}>{stageInfo.label}</p>
                    
                    {/* Growth Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
                        <span>Growth progress</span>
                        <span>{gardenData.daysToNextStage} days to next stage</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multiplier Badge */}
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-1">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-primary">{gardenData.multiplier}x</p>
                    <p className="text-[9px] text-muted-foreground">bonus</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Collected Plants Gallery */}
          {gardenData.collectedPlants.length > 0 && (
            <div className="pt-4 border-t border-border/20">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-3">
                Your collected plants
              </p>
              <div className="flex items-center gap-2">
                {gardenData.collectedPlants.map((plant, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 py-2 px-3 rounded-xl bg-background/60 border border-border/20"
                  >
                    <span className="text-lg">{plant.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-foreground">{plant.name}</p>
                      <p className="text-[10px] text-muted-foreground">{plant.days}-day streak</p>
                    </div>
                  </div>
                ))}
                <div className="py-2 px-3 rounded-xl border border-dashed border-border/30 text-center">
                  <p className="text-xs text-muted-foreground">+{3 - gardenData.collectedPlants.length} more</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ========================================
          SECTION 2: Current Balance & Payout (Primary Anchor)
          ======================================== */}
      <section className="px-5 pt-6 pb-8">
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

      {/* Subtle Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* ========================================
          SECTION 3: Ambient Mode Earnings (Live Stream)
          ======================================== */}
      <section className="px-5 py-8">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-6">
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
        <div className="mb-6 py-6 px-5 rounded-2xl bg-gradient-to-br from-emerald-500/8 via-emerald-500/4 to-transparent border border-emerald-500/10">
          <p className="text-xs text-muted-foreground font-medium mb-2 text-center">Points earned today so far</p>
          <p className="text-4xl font-bold text-emerald-600 text-center tracking-tight">
            +{ambientData.todayPoints} pts
          </p>
          <p className="text-xs text-muted-foreground mt-2.5 text-center">
            from {ambientData.todayContributions.toLocaleString()} contributions
          </p>
        </div>

        {/* Week & Month Context */}
        <div className="flex items-stretch gap-4">
          {/* This Week */}
          <div className="flex-1 py-4 px-4 rounded-xl bg-muted/30">
            <p className="text-[11px] text-muted-foreground font-medium mb-1.5">This week</p>
            <p className="text-xl font-bold text-foreground">+{ambientData.weeklyPoints} pts</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {ambientData.weeklyContributions.toLocaleString()} contributions
            </p>
          </div>

          {/* This Month */}
          <div className="flex-1 py-4 px-4 rounded-xl bg-muted/30">
            <p className="text-[11px] text-muted-foreground font-medium mb-1.5">This month</p>
            <p className="text-xl font-bold text-foreground">+{ambientData.monthlyPoints.toLocaleString()} pts</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {ambientData.monthlyContributions.toLocaleString()} contributions
            </p>
          </div>
        </div>

        {/* Reassuring Message */}
        <p className="text-xs text-muted-foreground mt-5 text-center leading-relaxed">
          Points accumulate quietly while you go about your day—no action needed.
        </p>
      </section>

      {/* Subtle Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* ========================================
          SECTION 4: Challenge Bonus Summary Card
          ======================================== */}
      <section className="px-5 py-8">
        {/* Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/8 via-amber-400/4 to-transparent p-6 border border-amber-500/12">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Trophy className="h-4.5 w-4.5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Challenge Rewards</h2>
              <p className="text-[11px] text-muted-foreground">Your bonus achievements</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Challenges Completed */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80">
              <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-amber-500/15 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{challengeStats.completed}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Completed</p>
              <p className="text-[11px] text-muted-foreground mt-1.5">of {challengeStats.attempted} attempted</p>
            </div>

            {/* Bonus Points */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80">
              <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-600">+{challengeStats.bonusEarned}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Bonus Pts</p>
              <p className="text-[11px] text-muted-foreground mt-1.5">earned this month</p>
            </div>

            {/* Multiplier Status */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              {challengeStats.multiplierActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/6 to-transparent" />
              )}
              <div className={`relative w-11 h-11 mx-auto mb-3 rounded-full flex items-center justify-center ${
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
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Multiplier</p>
              <p className={`text-[11px] mt-1.5 ${
                challengeStats.multiplierActive 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground'
              }`}>
                {challengeStats.multiplierActive ? 'Active now!' : 'Inactive'}
              </p>
            </div>
          </div>

          {/* Next Milestone Progress */}
          <div className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-background/60">
            <Target className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
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
      <section className="mx-5 mb-4 px-4 py-4 rounded-xl bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">Monthly projection</span>
          </div>
          <div className="flex items-center gap-5 text-right">
            <div>
              <p className="text-base font-semibold text-foreground">~{projectionData.projectedPoints} pts</p>
              <p className="text-[10px] text-muted-foreground">{projectionData.daysRemaining} days left</p>
            </div>
            <div className="h-8 w-px bg-border/30" />
            <div>
              <p className="text-base font-medium text-muted-foreground">{projectionData.currentPoints} pts</p>
              <p className="text-[10px] text-muted-foreground">current</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: Full History Navigation Row
          ======================================== */}
      <div className="px-5 mb-6">
        <button 
          onClick={() => {}}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">View Earnings History</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Disclaimer */}
      <div className="px-5 pb-6">
        <p className="text-[11px] text-muted-foreground/50 text-center leading-relaxed">
          Points represent activity credits within the app. Values shown are for tracking purposes and do not represent monetary amounts or guaranteed rewards.
        </p>
      </div>
    </div>
  );
}
