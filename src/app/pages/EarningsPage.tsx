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

// Recent growth activities from challenges
const recentGrowthActivities = [
  { 
    id: 1, 
    challenge: "Kitchen Cleanup", 
    timeAgo: "2 hours ago", 
    growthPoints: 45, 
    bonusApplied: true,
    bonusMultiplier: 1.2,
    icon: "🍳"
  },
  { 
    id: 2, 
    challenge: "Laundry Sort", 
    timeAgo: "Yesterday", 
    growthPoints: 32, 
    bonusApplied: false,
    bonusMultiplier: 1,
    icon: "👕"
  },
  { 
    id: 3, 
    challenge: "Grocery Unload", 
    timeAgo: "2 days ago", 
    growthPoints: 28, 
    bonusApplied: true,
    bonusMultiplier: 1.2,
    icon: "🛒"
  },
];

// Garden/Streak data
const gardenData = {
  currentStreak: 4, // Example: Day 4 = Leafy Plant
  collectedPlants: [
    { name: "Cherry Tree", days: 7, image: plantDay7 },
    { name: "Sunflower", days: 7, image: plantDay7 },
    { name: "Rose Bush", days: 7, image: plantDay7 },
  ],
  multiplier: 1.2,
  // Progress toward next growth stage (0-100)
  stageProgress: 68, // 68% toward next stage
  challengesForNextStage: 2, // challenges needed
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
        @keyframes progress-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes ring-rotate {
          0% { transform: rotate(-90deg); }
          100% { transform: rotate(270deg); }
        }
        @keyframes stage-complete {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.08); filter: brightness(1.2); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        .animate-sway { animation: gentle-sway 4s ease-in-out infinite; }
        .animate-breathe { animation: gentle-breathe 3s ease-in-out infinite; }
        .animate-leaf { animation: leaf-float 5s ease-in-out infinite; }
        .animate-water { animation: water-drip 2.5s ease-in-out infinite; }
        .animate-glow { animation: subtle-glow 3s ease-in-out infinite; }
        .animate-progress-pulse { animation: progress-pulse 2s ease-in-out infinite; }
        .animate-stage-complete { animation: stage-complete 0.6s ease-out; }
      `}</style>

      {/* ========================================
          SECTION 1: Garden of Progress Header - REFINED
          ======================================== */}
      <header className="relative overflow-hidden">
        {/* Illustrated Background - Full hero coverage */}
        <div 
          className="absolute inset-x-0 top-0 h-[55vh] bg-cover bg-bottom bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url(${gardenBg})`,
            backgroundPosition: 'center 70%'
          }}
        />
        {/* Fade to content - gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-background/40 via-transparent via-50% to-background z-0" />
        
        {/* Integrated page header - Garden/progress framing */}
        <div className="relative z-10 px-5 pt-8 pb-4">
          <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">
            Your Growth
          </p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
            Earnings
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nurture your garden with every challenge
          </p>
        </div>
        
        {/* Hero container - fixed height for consistent composition */}
        <div className="relative z-10 px-5" style={{ height: '42vh', minHeight: '280px', maxHeight: '360px' }}>
          {(() => {
            const stageInfo = getPlantStageInfo(gardenData.currentStreak);
            // Arc gauge: 200° sweep (from -100° to +100°, centered at top)
            const arcRadius = 130;
            const arcStrokeWidth = 10;
            const arcSweep = 200; // degrees
            const startAngle = -100; // degrees from top (12 o'clock)
            const progressAngle = (gardenData.stageProgress / 100) * arcSweep;
            
            // Convert degrees to radians, with 0° at top
            const degToRad = (deg: number) => (deg - 90) * (Math.PI / 180);
            
            // Calculate arc path points
            const arcPath = (startDeg: number, endDeg: number, radius: number) => {
              const start = {
                x: 150 + radius * Math.cos(degToRad(startDeg)),
                y: 150 + radius * Math.sin(degToRad(startDeg))
              };
              const end = {
                x: 150 + radius * Math.cos(degToRad(endDeg)),
                y: 150 + radius * Math.sin(degToRad(endDeg))
              };
              const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
              return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
            };
            
            return (
              <div className="relative h-full flex flex-col items-center justify-end">
                {/* Subtle ambient glow behind plant */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full bg-gradient-radial from-emerald-400/10 via-lime-300/5 to-transparent blur-2xl z-0" />
                
                {/* Contact shadow where plant meets ground */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/25 rounded-[100%] blur-md z-10" />
                
                {/* Plant + Gauge Container - Gauge anchored at plant base, rising behind */}
                <div className="relative flex items-end justify-center mb-2">
                  {/* Arched Progress Gauge - Anchored at plant base, emerges from ground BEHIND plant */}
                  <div 
                    className="absolute z-0 pointer-events-none"
                    style={{ 
                      bottom: '8px', // Align with plant pot base
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <svg 
                      className="w-[320px] h-[280px]"
                      viewBox="0 0 300 260"
                      style={{ overflow: 'visible' }}
                    >
                      {/* Gradient definitions with faded ends */}
                      <defs>
                        <linearGradient id="arcProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
                          <stop offset="15%" stopColor="#84cc16" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
                          <stop offset="85%" stopColor="#10b981" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="arcTrackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="white" stopOpacity="0" />
                          <stop offset="15%" stopColor="white" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                          <stop offset="85%" stopColor="white" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Background arc track - fades at ends */}
                      <path
                        d={arcPath(startAngle, startAngle + arcSweep, arcRadius)}
                        fill="none"
                        stroke="url(#arcTrackGradient)"
                        strokeWidth={arcStrokeWidth + 8}
                        strokeLinecap="round"
                      />
                      {/* Progress arc - thick, glowing, fades at ends */}
                      <path
                        d={arcPath(startAngle, startAngle + progressAngle, arcRadius)}
                        fill="none"
                        stroke="url(#arcProgressGradient)"
                        strokeWidth={arcStrokeWidth + 10}
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.5))' }}
                      />
                    </svg>
                  </div>
                  
                  {/* Plant image - DOMINANT, overlaps gauge significantly */}
                  <div className="animate-sway origin-bottom relative z-10">
                    <img 
                      src={stageInfo.image} 
                      alt={stageInfo.label}
                      className="object-contain"
                      style={{ 
                        height: 'calc(50vh * 0.72)',
                        minHeight: '240px',
                        maxHeight: '300px',
                        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25)) drop-shadow(0 24px 48px rgba(16,185,129,0.12))'
                      }}
                    />
                  </div>
                </div>
                
                {/* Status Pill - Below plant */}
                <div className="-mt-4 z-20">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm">
                    <span className="text-sm">🌱</span>
                    <span className="text-xs font-medium text-foreground/90">{gardenData.challengesForNextStage} challenges to evolve</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        

        {/* ========================================
            RECENT GROWTH - Challenges that fed the plant
            ======================================== */}
        <div className="relative z-10 px-5 py-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Recent Growth</h3>
          </div>
          
          <div className="space-y-2.5">
            {recentGrowthActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-background/70 backdrop-blur-sm border border-border/30"
              >
                {/* Challenge icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/15 to-lime-500/10 flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                
                {/* Challenge info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.challenge}</p>
                  <p className="text-[11px] text-muted-foreground">{activity.timeAgo}</p>
                </div>
                
                {/* Growth contribution */}
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Sprout className="h-3 w-3 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">+{activity.growthPoints}</span>
                  </div>
                  {activity.bonusApplied && (
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                      <span className="text-[10px] font-medium text-amber-600">{activity.bonusMultiplier}× boost</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Connection message */}
          <p className="text-[11px] text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
            <Target className="h-3 w-3 text-emerald-500/60" />
            <span>Each challenge nurtures your plant's growth</span>
          </p>
        </div>

        {gardenData.collectedPlants.length > 0 && (
          <div className="relative z-10 px-5 pb-6">
            <button 
              onClick={() => navigate("/app/garden")}
              className="w-full text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                  Your collected plants • {gardenData.collectedPlants.length} complete
                </p>
                <span className="text-[11px] text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View garden
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {gardenData.collectedPlants.slice(0, 3).map((plant, i) => (
                  <div 
                    key={i}
                    className="flex flex-col items-center py-3 px-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/30 shadow-sm group-hover:border-primary/20 transition-colors"
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
                {gardenData.collectedPlants.length > 3 && (
                  <div className="flex flex-col items-center justify-center py-3 px-4 rounded-2xl bg-muted/30 backdrop-blur-sm border border-border/20">
                    <span className="text-lg font-bold text-muted-foreground mb-0.5">+{gardenData.collectedPlants.length - 3}</span>
                    <p className="text-[10px] text-muted-foreground">more</p>
                  </div>
                )}
              </div>
            </button>
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
          SECTION 4: Accelerated Growth (Challenge Bonuses)
          ======================================== */}
      <section className="px-5 py-8">
        {/* Card Container */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/8 via-lime-500/6 to-emerald-500/4 p-6 border border-amber-500/12 relative overflow-hidden">
          {/* Decorative nurturing elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <Sun className="h-16 w-16 text-amber-400 animate-glow" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-8">
            <Leaf className="h-10 w-10 text-emerald-500 animate-leaf" />
          </div>
          
          {/* Header */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-lime-500/20 flex items-center justify-center">
              <Sprout className="h-4.5 w-4.5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Accelerated Growth</h2>
              <p className="text-[11px] text-muted-foreground">Challenges nurture your plant faster</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="relative grid grid-cols-3 gap-3 mb-6">
            {/* Challenges Completed - Nurturing Sessions */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-lime-500/5 to-transparent" />
              <div className="relative">
                <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-gradient-to-br from-lime-500/20 to-emerald-500/15 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-sky-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{challengeStats.completed}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Waterings</p>
                <p className="text-[11px] text-muted-foreground mt-1.5">{challengeStats.attempted} sessions</p>
              </div>
            </div>

            {/* Bonus Points - Extra Sunshine */}
            <div className="text-center py-5 px-3 rounded-xl bg-background/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent" />
              <div className="relative">
                <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/15 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-amber-500 animate-glow" />
                </div>
                <p className="text-2xl font-bold text-amber-600">+{challengeStats.bonusEarned}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Sunlight</p>
                <p className="text-[11px] text-muted-foreground mt-1.5">bonus warmth</p>
              </div>
            </div>

            {/* Multiplier Status - Thriving Mode */}
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
                  <Sparkles className={`h-5 w-5 ${
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
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">Vitality</p>
                <p className={`text-[11px] mt-1.5 ${
                  challengeStats.multiplierActive 
                    ? 'text-emerald-600 font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {challengeStats.multiplierActive ? 'Thriving!' : 'Steady growth'}
                </p>
              </div>
            </div>
          </div>

          {/* Next Milestone Progress - Path to next bloom */}
          <div className="relative flex items-center gap-3 py-3.5 px-4 rounded-xl bg-background/60">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/15 to-lime-500/10 flex items-center justify-center">
              <Sprout className="h-4 w-4 text-emerald-600 animate-leaf" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Next bloom boost at {challengeStats.nextMilestone} waterings</span>
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
