import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gardenBg from "@/assets/garden-bg.png";

// Plant stage images
import plantDay1 from "@/assets/plants/day-1-seed.png";
import plantDay2 from "@/assets/plants/day-2-sprout.png";
import plantDay3 from "@/assets/plants/day-3-small-plant.png";
import plantDay4 from "@/assets/plants/day-4-leafy-plant.png";
import plantDay5 from "@/assets/plants/day-5-bud.png";
import plantDay6 from "@/assets/plants/day-6-flower.png";
import plantDay7 from "@/assets/plants/day-7-fruit.png";

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
  CheckCircle2,
  Timer,
  Sprout,
  Droplets,
  Sun,
  Leaf,
} from "lucide-react";

// 7-day growth stages mapping
const GROWTH_STAGES = [
  { day: 1, label: "Seed", image: plantDay1, color: "text-amber-600" },
  { day: 2, label: "Sprout", image: plantDay2, color: "text-lime-500" },
  { day: 3, label: "Small Plant", image: plantDay3, color: "text-lime-600" },
  { day: 4, label: "Leafy Plant", image: plantDay4, color: "text-emerald-500" },
  { day: 5, label: "Bud", image: plantDay5, color: "text-pink-400" },
  { day: 6, label: "Flower", image: plantDay6, color: "text-pink-500" },
  { day: 7, label: "Fruit", image: plantDay7, color: "text-rose-500" },
];

const getPlantStageInfo = (streakDay: number) => {
  // Normalize streak to 1-7 range (day 8+ starts new cycle)
  const normalizedDay = ((streakDay - 1) % 7) + 1;
  return GROWTH_STAGES[normalizedDay - 1];
};

// Garden/Streak data
const gardenData = {
  currentStreak: 4, // Example: Day 4 = Leafy Plant
  collectedPlants: [
    { name: "Cherry Tree", days: 7, image: plantDay7 },
    { name: "Sunflower", days: 7, image: plantDay7 },
    { name: "Rose Bush", days: 7, image: plantDay7 },
  ],
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
    <div className="min-h-screen pb-28 bg-background">
      {/* Inline keyframes for garden animations */}
      <style>{`
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes gentle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes leaf-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          75% { transform: translateY(2px) rotate(-1deg); }
        }
        @keyframes water-drip {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(2px); }
        }
        @keyframes subtle-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-sway { animation: gentle-sway 4s ease-in-out infinite; }
        .animate-breathe { animation: gentle-breathe 3s ease-in-out infinite; }
        .animate-leaf { animation: leaf-float 5s ease-in-out infinite; }
        .animate-water { animation: water-drip 2.5s ease-in-out infinite; }
        .animate-glow { animation: subtle-glow 3s ease-in-out infinite; }
      `}</style>

      {/* ========================================
          SECTION 1: Garden of Progress Header
          ======================================== */}
      <header className="relative overflow-hidden">
        {/* Illustrated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-90"
          style={{ backgroundImage: `url(${gardenBg})` }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        
        <div className="relative z-10 px-5 pt-8 pb-10">
          {/* Section Title */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sprout className="h-4 w-4 text-emerald-600 animate-leaf" />
            <h2 className="text-sm font-semibold text-foreground drop-shadow-sm">Garden of Progress</h2>
          </div>

          {/* Current Growing Plant - Hero */}
          <div className="flex flex-col items-center text-center">
            {(() => {
              const stageInfo = getPlantStageInfo(gardenData.currentStreak);
              const normalizedDay = ((gardenData.currentStreak - 1) % 7) + 1;
              const progress = (normalizedDay / 7) * 100;
              const daysToComplete = 7 - normalizedDay;
              
              return (
                <>
                  {/* Plant Visualization - Centered Hero */}
                  <div className="relative mb-5">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-t from-emerald-500/25 to-lime-400/15 blur-2xl animate-breathe" />
                    
                    {/* Plant Image Container */}
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      {/* Animated plant image with sway */}
                      <div className="animate-sway origin-bottom">
                        <img 
                          src={stageInfo.image} 
                          alt={stageInfo.label}
                          className="w-32 h-32 object-contain drop-shadow-xl"
                        />
                      </div>
                    </div>
                    
                    {/* Day counter badge */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                      Day {gardenData.currentStreak}
                    </div>
                  </div>

                  {/* Plant Info */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Currently growing</p>
                    <p className={`text-2xl font-bold drop-shadow-sm ${stageInfo.color}`}>{stageInfo.label}</p>
                  </div>
                  
                  {/* Growth Progress - 7 Day Visualization */}
                  <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2.5">
                      <span>Growth progress</span>
                      <span className="font-medium">
                        {daysToComplete === 0 
                          ? "Ready to collect!" 
                          : `${daysToComplete} day${daysToComplete !== 1 ? 's' : ''} to full bloom`}
                      </span>
                    </div>
                    
                    {/* 7-day dot progress */}
                    <div className="flex items-center justify-between gap-1.5">
                      {GROWTH_STAGES.map((stage, i) => (
                        <div 
                          key={stage.day}
                          className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${
                            i < normalizedDay 
                              ? 'bg-gradient-to-r from-lime-400 to-emerald-500' 
                              : 'bg-background/60'
                          } ${i === normalizedDay - 1 ? 'ring-2 ring-emerald-400/50 ring-offset-1 ring-offset-transparent' : ''}`}
                        />
                      ))}
                    </div>
                    
                    {/* Stage labels */}
                    <div className="flex items-center justify-between mt-2 px-0.5">
                      <span className="text-[9px] text-muted-foreground">Seed</span>
                      <span className="text-[9px] text-muted-foreground">Fruit</span>
                    </div>
                  </div>

                  {/* Multiplier Badge - Floating */}
                  <div className="absolute top-8 right-5 animate-breathe" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-primary/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-primary/30 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold text-primary">{gardenData.multiplier}x</span>
                      </div>
                      <p className="text-[9px] text-primary/70 text-center mt-0.5">bonus</p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Collected Plants Gallery - Bottom Row */}
        {gardenData.collectedPlants.length > 0 && (
          <div className="relative z-10 px-5 pb-6">
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-3 text-center">
              Your collected plants • {gardenData.collectedPlants.length} complete
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {gardenData.collectedPlants.map((plant, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center py-3 px-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/30 shadow-sm"
                >
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-12 h-12 object-contain mb-1.5"
                  />
                  <p className="text-[11px] font-medium text-foreground">{plant.name}</p>
                  <p className="text-[10px] text-muted-foreground">{plant.days}-day streak</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
          SECTION 3: Garden Nourishment (Ambient Background Growth)
          ======================================== */}
      <section className="px-5 py-8">
        {/* Header with Nurturing Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Droplets className="h-4.5 w-4.5 text-sky-500" />
              {ambientData.status === "active" && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 animate-water" />
              )}
            </div>
            <h2 className="text-sm font-semibold text-foreground">Garden Nourishment</h2>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            ambientData.status === "active" 
              ? 'bg-sky-500/12' 
              : 'bg-muted'
          }`}>
            <Leaf className={`h-3 w-3 ${
              ambientData.status === "active" 
                ? 'text-emerald-500 animate-leaf' 
                : 'text-muted-foreground'
            }`} />
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${
              ambientData.status === "active" 
                ? 'text-emerald-600' 
                : 'text-muted-foreground'
            }`}>
              {ambientData.status === "active" ? 'Growing quietly' : 'Resting'}
            </span>
          </div>
        </div>

        {/* Today's Nurturing - Hero Display with Garden Theme */}
        <div className="relative mb-6 py-6 px-5 rounded-2xl bg-gradient-to-br from-sky-500/8 via-emerald-500/6 to-lime-500/4 border border-sky-500/10 overflow-hidden">
          {/* Subtle background growth indicators */}
          <div className="absolute top-3 right-4 opacity-20">
            <Sun className="h-8 w-8 text-amber-400 animate-glow" />
          </div>
          <div className="absolute bottom-3 left-4 opacity-15">
            <Sprout className="h-6 w-6 text-emerald-500 animate-leaf" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Droplets className="h-3.5 w-3.5 text-sky-500 animate-water" />
              <p className="text-xs text-muted-foreground font-medium">Today's quiet growth</p>
            </div>
            <p className="text-4xl font-bold text-emerald-600 text-center tracking-tight">
              +{ambientData.todayPoints} pts
            </p>
            <p className="text-xs text-muted-foreground mt-2.5 text-center">
              nurturing your garden in the background
            </p>
          </div>
        </div>

        {/* Week & Month Context - Reframed as growth over time */}
        <div className="flex items-stretch gap-4">
          {/* This Week */}
          <div className="flex-1 py-4 px-4 rounded-xl bg-gradient-to-br from-sky-500/5 to-transparent border border-sky-500/8">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Leaf className="h-3 w-3 text-emerald-500/70" />
              <p className="text-[11px] text-muted-foreground font-medium">This week</p>
            </div>
            <p className="text-xl font-bold text-foreground">+{ambientData.weeklyPoints} pts</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              steady nourishment
            </p>
          </div>

          {/* This Month */}
          <div className="flex-1 py-4 px-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/8">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sprout className="h-3 w-3 text-emerald-500/70" />
              <p className="text-[11px] text-muted-foreground font-medium">This month</p>
            </div>
            <p className="text-xl font-bold text-foreground">+{ambientData.monthlyPoints.toLocaleString()} pts</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              continuous care
            </p>
          </div>
        </div>

        {/* Reassuring Message - Garden focused */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center leading-relaxed">
          <Droplets className="h-3 w-3 text-sky-400/60 animate-water" />
          <span>Your garden grows gently while you go about your day</span>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      {/* ========================================
          SECTION 4: Growth Bursts (Challenge Bonuses)
          ======================================== */}
      <section className="px-5 py-8">
        {/* Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/8 via-lime-500/6 to-emerald-500/4 p-6 border border-amber-500/12 relative overflow-hidden">
          {/* Decorative burst elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <Sparkles className="h-16 w-16 text-amber-400 animate-glow" />
          </div>
          
          {/* Header */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-lime-500/20 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Growth Bursts</h2>
              <p className="text-[11px] text-muted-foreground">Challenges accelerate your garden</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="relative grid grid-cols-3 gap-3 mb-6">
            {/* Challenges Completed - Growth Spurts */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-lime-500/5 to-transparent" />
              <div className="relative">
                <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-gradient-to-br from-lime-500/20 to-emerald-500/15 flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-lime-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">{challengeStats.completed}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Growth Spurts</p>
                <p className="text-[11px] text-muted-foreground mt-1.5">of {challengeStats.attempted} attempted</p>
              </div>
            </div>

            {/* Bonus Points - Sunshine Boost */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent" />
              <div className="relative">
                <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/15 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-amber-500 animate-glow" />
                </div>
                <p className="text-2xl font-bold text-amber-600">+{challengeStats.bonusEarned}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Bonus Pts</p>
                <p className="text-[11px] text-muted-foreground mt-1.5">extra sunshine</p>
              </div>
            </div>

            {/* Multiplier Status - Super Growth */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              {challengeStats.multiplierActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/8 to-transparent" />
              )}
              <div className="relative">
                <div className={`w-11 h-11 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  challengeStats.multiplierActive 
                    ? 'bg-gradient-to-br from-emerald-500/25 to-lime-500/20' 
                    : 'bg-muted/50'
                }`}>
                  <Zap className={`h-5 w-5 ${
                    challengeStats.multiplierActive 
                      ? 'text-emerald-500' 
                      : 'text-muted-foreground'
                  }`} />
                  {challengeStats.multiplierActive && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500/15 animate-breathe" />
                  )}
                </div>
                <p className={`text-2xl font-bold ${
                  challengeStats.multiplierActive 
                    ? 'text-emerald-600' 
                    : 'text-muted-foreground'
                }`}>
                  {challengeStats.multiplierActive ? '1.5×' : '—'}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Growth Rate</p>
                <p className={`text-[11px] mt-1.5 ${
                  challengeStats.multiplierActive 
                    ? 'text-emerald-600 font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {challengeStats.multiplierActive ? 'Supercharged!' : 'Normal pace'}
                </p>
              </div>
            </div>
          </div>

          {/* Next Milestone Progress - Path to next bloom */}
          <div className="relative flex items-center gap-3 py-3.5 px-4 rounded-xl bg-background/60">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/15 to-lime-500/10 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-lime-600 animate-leaf" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Next growth boost at {challengeStats.nextMilestone}</span>
                <span className="text-xs font-semibold text-foreground">{challengeStats.completed}/{challengeStats.nextMilestone}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-lime-500 via-emerald-500 to-lime-400 transition-all duration-500"
                  style={{ width: `${(challengeStats.completed / challengeStats.nextMilestone) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Encouraging message */}
          <p className="text-[11px] text-muted-foreground text-center mt-4">
            Each challenge gives your garden a burst of accelerated growth
          </p>
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
