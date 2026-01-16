import * as React from "react";
import { useNavigate } from "react-router-dom";
import gardenBg from "@/assets/garden-bg.png";
import plantDay1 from "@/assets/plants/day-1-seed.png";
import plantDay2 from "@/assets/plants/day-2-sprout.png";
import plantDay3 from "@/assets/plants/day-3-small-plant.png";
import plantDay4 from "@/assets/plants/day-4-leafy-plant.png";
import plantDay5 from "@/assets/plants/day-5-bud.png";
import plantDay6 from "@/assets/plants/day-6-flower.png";
import plantDay7 from "@/assets/plants/day-7-fruit.png";
import { Droplets, Sun, Sparkles, Leaf, Clock, ChevronRight, Wallet, Gift, X, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData, ChallengeSession, isSessionCompleted, getSessionActivityDate } from "@/contexts/AppDataContext";

const GROWTH_STAGES = [
  { day: 0, label: "No Plant", image: plantDay1, color: "text-muted-foreground" },
  { day: 1, label: "Seed", image: plantDay1, color: "text-amber-600" },
  { day: 2, label: "Sprout", image: plantDay2, color: "text-lime-500" },
  { day: 3, label: "Small Plant", image: plantDay3, color: "text-lime-600" },
  { day: 4, label: "Leafy Plant", image: plantDay4, color: "text-emerald-500" },
  { day: 5, label: "Bud", image: plantDay5, color: "text-pink-400" },
  { day: 6, label: "Flower", image: plantDay6, color: "text-pink-500" },
  { day: 7, label: "Fruit", image: plantDay7, color: "text-rose-500" },
];

const getPlantStageInfo = (stage: number) => {
  const clampedStage = Math.min(Math.max(stage, 0), 7);
  return GROWTH_STAGES[clampedStage];
};

// Helper to check if date is today (uses activity date)
const isToday = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Helper to check if date is this week (uses activity date)
const isThisWeek = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  return date >= weekStart && date < weekEnd;
};

// Helper to calculate day streak from sessions (using shared completion + activity date)
const calculateDayStreak = (sessions: ChallengeSession[]): number => {
  if (sessions.length === 0) return 0;
  
  const completedSessions = sessions.filter(s => isSessionCompleted(s.status));
  if (completedSessions.length === 0) return 0;
  
  // Get unique dates with activity (sorted newest first) - use started_at as activity date
  const uniqueDates = [...new Set(
    completedSessions.map(s => new Date(getSessionActivityDate(s)).toDateString())
  )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  if (uniqueDates.length === 0) return 0;
  
  // Check if most recent activity was today or yesterday
  const today = new Date();
  const mostRecentDate = new Date(uniqueDates[0]);
  const daysDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // If last activity was more than 1 day ago, streak is broken
  if (daysDiff > 1) return 0;
  
  // Count consecutive days
  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Format relative time
const formatTimeAgo = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Format cents to dollars
const formatCents = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

export function EarningsPage() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { plant, wallet, sessions, challenges, loading: dataLoading, claimFirstReward, stats } = useAppData();
  
  // Session-dismissed state for "Not now" on first reward
  const [firstRewardDismissedSession, setFirstRewardDismissedSession] = React.useState(false);
  const [claimingReward, setClaimingReward] = React.useState(false);

  // Loading state with skeletons
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen pb-28 bg-background">
        <header className="relative overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0 opacity-50" style={{ backgroundImage: `url(${gardenBg})`, backgroundPosition: 'center 70%' }} />
          <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(245, 252, 249, 0.08)' }} />
          <div className="absolute inset-x-0 bottom-0 z-[4]" style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 100%)' }} />
          <div className="relative z-10 px-5 pt-8 pb-4">
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-7 w-24 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="relative z-10 px-5 flex flex-col items-center justify-center" style={{ height: '30vh' }}>
            <Skeleton className="w-40 h-60 rounded-2xl" />
          </div>
        </header>
        <section className="px-5 pt-8 pb-6 relative z-10 bg-background">
          <Skeleton className="h-64 rounded-3xl" />
        </section>
      </div>
    );
  }

  // Calculate real stats from sessions using shared completion criteria + activity date
  const completedSessions = sessions.filter(s => isSessionCompleted(s.status));
  
  // Today's stats (use activity date = started_at)
  const todaySessions = completedSessions.filter(s => isToday(getSessionActivityDate(s)));
  const todayPoints = todaySessions.reduce((acc, s) => acc + (s.points_earned || 0), 0);
  
  // This week's stats (use activity date = started_at)
  const weekSessions = completedSessions.filter(s => isThisWeek(getSessionActivityDate(s)));
  const weekWatering = weekSessions.reduce((acc, s) => acc + (s.watering_points || 0), 0);
  const weekSunlight = weekSessions.reduce((acc, s) => acc + (s.sunlight_points || 0), 0);
  const weekCompleted = weekSessions.length;
  
  // Multiplier from most recent session
  const latestSession = completedSessions[0];
  const currentMultiplier = latestSession?.xp_multiplier || 1.0;
  
  // Day streak
  const dayStreak = calculateDayStreak(sessions);
  
  // Plant info
  const hasPlant = plant !== null && plant.current_stage >= 1;
  const currentStage = plant?.current_stage || 0;
  const stageInfo = getPlantStageInfo(currentStage);
  
  // Vitality (derived from weekly activity)
  const vitality = weekCompleted > 0 ? Math.min(2.0, 1.0 + (weekWatering + weekSunlight) / 200) : 1.0;
  
  // Progress calculation
  const totalCompleted = completedSessions.length;
  const completedPlantCount = stats.completedPlantCount;

  // Stage is 0..7 where 1..7 maps to the 7 plant images.
  // We show countdown to FULL plant (stage 7).
  const challengesForNextStage = currentStage >= 7 ? 0 : Math.max(0, 7 - currentStage);
  const stageProgress = currentStage >= 7 ? 100 : Math.min(100, (currentStage / 7) * 100);

  // Recent growth (last 5 completed sessions with challenge info)
  const recentGrowth = completedSessions.slice(0, 5).map(session => {
    const challenge = challenges.find(c => c.id === session.challenge_id);
    return {
      ...session,
      challengeTitle: challenge?.title || "Challenge",
      challengeEmoji: challenge?.icon_emoji || "🌱",
    };
  });

  // First reward eligibility: user has completed at least 1 plant AND hasn't claimed
  const hasCompletedFirstPlant = completedPlantCount >= 1;
  const showFirstRewardCard = hasCompletedFirstPlant && wallet && !wallet.first_reward_claimed && !firstRewardDismissedSession;
  const firstRewardAmount = wallet?.first_reward_amount_cents || 1500;

  // Balance info
  const availableBalance = wallet?.available_balance_cents || 0;
  const pendingBalance = wallet?.pending_balance_cents || 0;

  // Handle claim first reward
  const handleClaimFirstReward = async () => {
    setClaimingReward(true);
    await claimFirstReward();
    setClaimingReward(false);
  };

  // Empty state - no plant and no sessions
  if (!hasPlant && completedSessions.length === 0) {
    return (
      <div className="min-h-screen pb-28 bg-background">
        <header className="relative overflow-hidden" style={{ minHeight: '50vh' }}>
          <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0" style={{ backgroundImage: `url(${gardenBg})`, backgroundPosition: 'center 70%' }} />
          <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(245, 252, 249, 0.08)' }} />
          <div className="absolute inset-x-0 bottom-0 z-[4]" style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 100%)' }} />
          
          <div className="relative z-10 px-5 pt-8 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">Your Growth</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">Earnings</h1>
                <p className="text-sm text-muted-foreground">Nurture your garden with every challenge</p>
              </div>
              {/* Empty stats - show zeros */}
              <div className="flex flex-col items-end gap-2 pt-1 opacity-40">
                <div className="flex items-center gap-1.5"><Droplets className="h-3 w-3 text-sky-400" /><span className="text-[10px] font-medium text-foreground/70">+0</span></div>
                <div className="flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-amber-400" /><span className="text-[10px] font-medium text-foreground/70">1.0×</span></div>
                <div className="flex items-center gap-1.5"><Leaf className="h-3 w-3 text-emerald-400" /><span className="text-[10px] font-medium text-foreground/70">Day 0</span></div>
              </div>
            </div>
          </div>
          
          {/* Empty hero - no plant, just a centered CTA */}
          <div className="relative z-10 px-5 flex flex-col items-center justify-center" style={{ height: '30vh', minHeight: '200px' }}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/60 backdrop-blur-sm border-2 border-dashed border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-10 w-10 text-primary/40" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">Your garden is waiting</p>
              <button 
                onClick={() => navigate("/challenges")} 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
              >
                🌱 Plant your first seed
              </button>
            </div>
          </div>
        </header>
        
        {/* Empty week panel */}
        <section className="px-5 pt-8 pb-6 relative z-10 bg-background">
          <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/30 overflow-hidden">
            <div className="px-6 pt-7 pb-2">
              <div className="flex items-center gap-2.5 mb-2">
                <Leaf className="h-4 w-4 text-emerald-500/50" />
                <h2 className="text-lg font-semibold text-foreground tracking-tight">Your Garden This Week</h2>
              </div>
            </div>
            <div className="px-6 pb-8 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                No growth yet—complete a challenge to start nourishing your garden.
              </p>
              {/* Placeholder bars */}
              <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-sky-400" />
                  <span className="text-sm text-muted-foreground">0 waterings</span>
                </div>
                <div className="w-px h-4 bg-border/30" />
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-muted-foreground">+0 light</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Empty recent growth */}
        <section className="px-5 pb-6 relative z-10 bg-background">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Growth</h3>
          <div className="rounded-2xl bg-muted/20 border border-border/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">No recent growth yet.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 bg-background">
      <style>{`
        @keyframes gentle-sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        .animate-sway { animation: gentle-sway 4s ease-in-out infinite; }
      `}</style>
      
      <header className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat z-0" style={{ backgroundImage: `url(${gardenBg})`, backgroundPosition: 'center 70%' }} />
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(245, 252, 249, 0.08)' }} />
        {/* Soft gradient fade - matches home hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent via-60% to-background z-[4]" />
        
        <div className="relative z-10 px-5 pt-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">Your Growth</p>
              <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Earnings</h1>
              <p className="text-sm text-muted-foreground">Nurture your garden with every challenge</p>
            </div>
            {/* Real stats from user data - glassy elevated pills */}
            <div className="flex flex-col items-end gap-1.5 pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                <Droplets className="h-3.5 w-3.5 text-sky-500" />
                <span className="text-xs font-semibold text-foreground/90">+{todayPoints}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-foreground/90">{currentMultiplier.toFixed(1)}×</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
                <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-foreground/90">Day {dayStreak}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Plant hero with progress gauge */}
        <div className="relative z-10 px-5 -mt-12 flex flex-col items-center justify-center" style={{ height: '42vh', minHeight: '280px', maxHeight: '380px' }}>
          {/* Progress ring wrapping the plant */}
          <div className="relative">
            <ProgressRing 
              value={currentStage} 
              max={7} 
              size="xl" 
              variant="success"
              className="absolute -inset-6 z-10"
            />
            <div className="animate-sway origin-bottom relative z-20">
              <img 
                src={stageInfo.image} 
                alt={stageInfo.label} 
                className="object-contain" 
                style={{ height: '280px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))' }} 
              />
            </div>
          </div>
          <div className="mt-3 z-20">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm">
              <span className="text-sm">🌱</span>
              <span className="text-xs font-medium text-foreground/90">
                {currentStage === 7 ? "Fully grown!" : `${challengesForNextStage} challenge${challengesForNextStage !== 1 ? "s" : ""} to evolve`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* First Reward Claim Card - One-time only */}
      {showFirstRewardCard && (
        <section className="px-5 pt-6 pb-2 relative z-10 bg-background">
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/20 via-yellow-400/15 to-orange-400/10 border border-amber-400/40 p-5 overflow-hidden">
            {/* Dismiss button */}
            <button 
              onClick={() => setFirstRewardDismissedSession(true)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Dismiss for now"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
            
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Gift className="h-24 w-24 text-amber-600" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎉</span>
                <h3 className="text-lg font-bold text-foreground">First harvest!</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your first plant is fully grown. Claim your first reward.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleClaimFirstReward}
                  disabled={claimingReward}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-lg shadow-amber-500/25"
                >
                  {claimingReward ? "Claiming..." : `Claim ${formatCents(firstRewardAmount)}`}
                </Button>
                <button 
                  onClick={() => setFirstRewardDismissedSession(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Balance Module - Always visible */}
      <section className="px-5 pt-6 pb-4 relative z-10 bg-background">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/5 border border-emerald-500/20 p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Available Balance</span>
              </div>
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {formatCents(availableBalance)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Ready to payout</p>
              {pendingBalance > 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  +{formatCents(pendingBalance)} pending verification
                </p>
              )}
            </div>
            <Button
              onClick={() => navigate("/app/payout")}
              disabled={availableBalance < 1000}
              variant={availableBalance >= 1000 ? "default" : "outline"}
              className={availableBalance >= 1000 ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Request payout
            </Button>
          </div>
          {availableBalance < 1000 && (
            <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/30">
              Minimum payout $10.00 • 2–3 business days
            </p>
          )}
        </div>
      </section>
      
      {/* Your Garden This Week - Real data */}
      <section className="px-5 pt-4 pb-6 relative z-10 bg-background">
        <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/10 overflow-hidden">
          <div className="px-6 pt-7 pb-2">
            <div className="flex items-center gap-2.5 mb-2">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">Your Garden This Week</h2>
            </div>
          </div>
          
          {weekCompleted === 0 ? (
            // Empty week state
            <div className="px-6 pb-8 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                No growth yet this week—complete a challenge to start nourishing your garden.
              </p>
              <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-sky-400" />
                  <span className="text-sm text-muted-foreground">0 waterings</span>
                </div>
                <div className="w-px h-4 bg-border/30" />
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-muted-foreground">+0 light</span>
                </div>
              </div>
            </div>
          ) : (
            // Week with activity
            <>
              <div className="px-6 pb-6">
                <p className="text-[15px] text-foreground/80 leading-relaxed">
                  You've shared <span className="font-medium text-sky-600">{weekCompleted} watering{weekCompleted !== 1 ? "s" : ""}</span> and 
                  <span className="font-medium text-amber-600"> +{weekSunlight} rays of sunlight</span> with your plant.
                  {vitality >= 1.5 ? <span className="text-emerald-600"> It's thriving!</span> : <span> Steady growth continues.</span>}
                </p>
              </div>
              
              <div className="mx-6 mb-6 flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-sky-400/70" />
                  <span className="text-sm text-foreground/70">{weekWatering} watering pts</span>
                </div>
                <div className="w-px h-4 bg-border/30" />
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-400/70" />
                  <span className="text-sm text-foreground/70">+{weekSunlight} light</span>
                </div>
                <div className="w-px h-4 bg-border/30" />
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400/70" />
                  <span className="text-sm text-foreground/70">{vitality.toFixed(1)}× vitality</span>
                </div>
              </div>
              
              <div className="mx-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Progress to next bloom</span>
                  <span className="text-xs font-semibold text-foreground">{Math.round(stageProgress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 transition-all duration-500" 
                    style={{ width: `${stageProgress}%` }} 
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Garden Collection - show if user has completed plants */}
      {completedPlantCount > 0 && (
        <section className="px-5 pb-6 relative z-10 bg-background">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">Your Garden</h3>
            </div>
            <button 
              onClick={() => navigate("/app/garden")}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
            >
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          
          <div 
            onClick={() => navigate("/app/garden")}
            className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-lime-500/5 to-amber-500/5 border border-emerald-500/20 p-4 cursor-pointer hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Plant thumbnails - show up to 3 */}
              <div className="flex -space-x-3">
                {Array.from({ length: Math.min(completedPlantCount, 3) }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/80 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
                  >
                    <img 
                      src={plantDay7} 
                      alt="Collected plant" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                ))}
                {completedPlantCount > 3 && (
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="text-xs font-semibold text-emerald-700">+{completedPlantCount - 3}</span>
                  </div>
                )}
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {completedPlantCount} plant{completedPlantCount !== 1 ? 's' : ''} collected
                </p>
                <p className="text-xs text-muted-foreground">
                  Each represents a completed 7-day streak
                </p>
              </div>
              
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Growth - Real sessions */}
      <section className="px-5 pb-6 relative z-10 bg-background">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Recent Growth</h3>
          {recentGrowth.length > 0 && (
            <button 
              onClick={() => navigate("/app/garden")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
            >
              View all <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
        
        {recentGrowth.length === 0 ? (
          <div className="rounded-2xl bg-muted/20 border border-border/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">No recent growth yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentGrowth.map((session) => (
              <div 
                key={session.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-lg shrink-0">
                  {session.challengeEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {session.challengeTitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(session.created_at)}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-emerald-600">+{session.points_earned}</p>
                  {session.xp_multiplier > 1 && (
                    <p className="text-[10px] text-amber-600">{session.xp_multiplier}× bonus</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}