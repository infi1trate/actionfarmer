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
      <header className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
      {/* Illustrated Background - Full hero coverage */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url(${gardenBg})`,
            backgroundPosition: 'center 70%'
          }}
        />
        
        {/* A. Atmospheric wash - subtle mint-white, preserves color saturation */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{ 
            background: 'rgba(245, 252, 249, 0.08)'
          }}
        />
        
        {/* Layer B: Quick feather fade - short, fades fast */}
        <div 
          className="absolute inset-x-0 bottom-0 z-[4] pointer-events-none"
          style={{ 
            height: '90px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.55) 75%, rgba(255,255,255,0.98) 100%)'
          }}
        />
        
        {/* Layer A: Hard edge killer strip - very small, very strong */}
        <div 
          className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none"
          style={{ 
            height: '16px',
            background: 'rgba(255,255,255,0.98)'
          }}
        />
        
        {/* Integrated page header - Garden/progress framing */}
        <div className="relative z-10 px-5 pt-8 pb-4">
          <div className="flex justify-between items-start">
            {/* Left: Title content */}
            <div>
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
            
            {/* Right: Ambient status cluster */}
            <div className="flex flex-col items-end gap-2 pt-1">
              {/* Today's nourishment */}
              <div className="flex items-center gap-1.5 opacity-70">
                <Droplets className="h-3 w-3 text-sky-400" />
                <span className="text-[10px] font-medium text-foreground/70">+{ambientData.todayPoints}</span>
              </div>
              
              {/* Vitality multiplier */}
              <div className="flex items-center gap-1.5 opacity-70">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span className="text-[10px] font-medium text-foreground/70">{gardenData.multiplier}×</span>
              </div>
              
              {/* Growth stage */}
              <div className="flex items-center gap-1.5 opacity-70">
                <Leaf className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] font-medium text-foreground/70">Day {gardenData.currentStreak}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero container - balanced height showing greenspace */}
        <div className="relative z-10 px-5 -mt-6" style={{ height: '48vh', minHeight: '340px', maxHeight: '440px' }}>
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
                  {/* Arched Progress Gauge - Anchored at plant base, BEHIND plant, subordinated */}
                  <div 
                    className="absolute z-0 pointer-events-none"
                    style={{ 
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      opacity: 0.72,
                      filter: 'blur(0.5px)'
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
                  
                  {/* Plant image - DOMINANT, 3× scale, overlaps gauge */}
                  <div className="animate-sway origin-bottom relative z-20 scale-[3]">
                    <img 
                      src={stageInfo.image} 
                      alt={stageInfo.label}
                      className="object-contain"
                      style={{ 
                        height: '180px',
                        transformOrigin: 'bottom center',
                        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25)) drop-shadow(0 24px 48px rgba(16,185,129,0.12))'
                      }}
                    />
                  </div>
                </div>
                
                {/* Status Pill - Below plant, tightened spacing */}
                <div className="-mt-2 mb-4 z-20">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm">
                    <span className="text-sm">🌱</span>
                    <span className="text-xs font-medium text-foreground/90">{gardenData.challengesForNextStage} challenges to evolve</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        

      </header>

      {/* ========================================
          YOUR GARDEN THIS WEEK - Primary conceptual panel
          ======================================== */}
      <section className="px-5 pt-8 pb-6 relative z-10 bg-background">
        <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/10 overflow-hidden">
          
          {/* Panel Header - Generous spacing */}
          <div className="px-6 pt-7 pb-2">
            <div className="flex items-center gap-2.5 mb-2">
              <Leaf className="h-4 w-4 text-emerald-500 animate-leaf" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">Your Garden This Week</h2>
            </div>
          </div>
          
          {/* Narrative Summary - The emotional heart */}
          <div className="px-6 pb-6">
            <p className="text-[15px] text-foreground/80 leading-relaxed">
              You've shared <span className="font-medium text-sky-600">{challengeStats.completed} waterings</span> and 
              <span className="font-medium text-amber-600"> +{challengeStats.bonusEarned} rays of sunlight</span> with your plant. 
              {challengeStats.multiplierActive ? (
                <span className="text-emerald-600"> It's thriving.</span>
              ) : (
                <span> Steady growth continues.</span>
              )}
            </p>
          </div>
          
          {/* Growth Summary - Simplified, flowing */}
          <div className="mx-6 mb-6 flex items-center gap-6">
            {/* Waterings */}
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-sky-400/70" />
              <span className="text-sm text-foreground/70">{challengeStats.completed} waterings</span>
            </div>
            
            <div className="w-px h-4 bg-border/30" />
            
            {/* Sunlight */}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-400/70" />
              <span className="text-sm text-foreground/70">+{challengeStats.bonusEarned} light</span>
            </div>
            
            <div className="w-px h-4 bg-border/30" />
            
            {/* Vitality */}
            <div className="flex items-center gap-2">
              <Sparkles className={`h-4 w-4 ${challengeStats.multiplierActive ? 'text-emerald-400/70' : 'text-muted-foreground/50'}`} />
              <span className={`text-sm ${challengeStats.multiplierActive ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                {challengeStats.multiplierActive ? '1.5× vitality' : '1× vitality'}
              </span>
            </div>
          </div>
          
          {/* Progress to Next Bloom */}
          <div className="mx-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Next bloom</span>
              <span className="text-xs text-muted-foreground">{challengeStats.completed}/{challengeStats.nextMilestone}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 to-lime-400/80"
                style={{ width: `${(challengeStats.completed / challengeStats.nextMilestone) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Collected Plants - Minimal preview */}
          {gardenData.collectedPlants.length > 0 && (
            <div className="mx-6 pb-7">
              <button 
                onClick={() => navigate("/app/garden")}
                className="w-full group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-2">
                    {gardenData.collectedPlants.slice(0, 3).map((plant, i) => (
                      <div 
                        key={i}
                        className="w-10 h-10 rounded-full bg-muted/30 border-2 border-background flex items-center justify-center"
                      >
                        <img 
                          src={plant.image} 
                          alt={plant.name}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{gardenData.collectedPlants.length} past blooms</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================
          RECENT GROWTH - Secondary, quieter list
          ======================================== */}
      <section className="px-5 pb-8">
        <div className="flex items-center gap-2 mb-4 px-1">
          <Sprout className="h-3.5 w-3.5 text-muted-foreground/60" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent Activity</span>
        </div>
        
        <div className="space-y-2">
          {recentGrowthActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-muted/15 border border-border/10"
            >
              {/* Challenge icon */}
              <div className="w-9 h-9 rounded-xl bg-muted/30 flex items-center justify-center text-base">
                {activity.icon}
              </div>
              
              {/* Challenge info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/80 truncate">{activity.challenge}</p>
                <p className="text-[11px] text-muted-foreground/70">{activity.timeAgo}</p>
              </div>
              
              {/* Growth contribution */}
              <div className="text-right">
                <span className="text-sm font-medium text-emerald-600/80">+{activity.growthPoints}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          SECONDARY ACTIONS - Quiet, minimal
          ======================================== */}
      <section className="px-5 pb-10 space-y-3">
        {/* Monthly projection - inline, quiet */}
        <div className="flex items-center justify-between py-3 px-4 rounded-2xl bg-muted/10 border border-border/5">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Monthly projection</span>
          </div>
          <span className="text-sm text-foreground/70">~{projectionData.projectedPoints} pts</span>
        </div>
        
        {/* History link - minimal */}
        <button 
          onClick={() => {}}
          className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-muted/10 border border-border/5 hover:bg-muted/15 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Earnings history</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </section>

      {/* Disclaimer - quieter */}
      <div className="px-5 pb-8">
        <p className="text-[10px] text-muted-foreground/40 text-center leading-relaxed">
          Points represent activity credits. Values shown are for tracking purposes only.
        </p>
      </div>
    </div>
  );
}
