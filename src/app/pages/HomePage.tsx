import * as React from "react";
import { useNavigate } from "react-router-dom";
import { EventChallengeCard } from "./home/EventChallengeCard";
import { 
  Clock,
  Zap,
  Star,
  Play,
  Sparkles,
  Gift,
  ChevronRight,
} from "lucide-react";
import { FloatingSeed, FloatingWaterDroplet } from "@/components/ui/editorial-hero-header";
import { CommunityActivityTicker } from "@/components/ui/community-activity-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData, ChallengeFromCatalog } from "@/contexts/AppDataContext";

// Asset imports
import homeGardenBg from "@/assets/home-garden-bg.png";
import homeSeed from "@/assets/home-seed.png";

// Video imports for challenge cards
import videoGroceries from "@/assets/videos/challenge-groceries.mp4";
import videoTable from "@/assets/videos/challenge-table.mp4";
import videoLaundry from "@/assets/videos/challenge-laundry.mp4";

type Difficulty = "easy" | "medium" | "hard";

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/20 text-emerald-100" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-100" },
  hard: { label: "Hard", className: "bg-rose-500/20 text-rose-100" },
};

// Map challenge IDs to local video assets
const videoMap: Record<string, string> = {
  "11111111-1111-1111-1111-111111111111": videoGroceries,
  "22222222-2222-2222-2222-222222222222": videoTable,
  "33333333-3333-3333-3333-333333333333": videoLaundry,
  "44444444-4444-4444-4444-444444444444": videoTable,
  "55555555-5555-5555-5555-555555555555": videoGroceries,
  "66666666-6666-6666-6666-666666666666": videoLaundry,
  "77777777-7777-7777-7777-777777777777": videoGroceries,
  "88888888-8888-8888-8888-888888888888": videoTable,
  "99999999-9999-9999-9999-999999999999": videoLaundry,
  "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": videoGroceries,
};

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  const navigate = useNavigate();
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  
  const { profile, loading: authLoading } = useAuth();
  const { challenges, plant, stats, loading: dataLoading } = useAppData();

  // Get user's first name or fallback to "there"
  const userName = profile?.first_name || "there";

  // Determine if user is brand new (no plant or stage 0)
  const hasPlant = plant !== null && plant.current_stage >= 1;
  const currentStage = plant?.current_stage || 0;
  
  // Calculate challenges needed to evolve (simple formula: next stage requires 2 more challenges)
  const completedCount = stats.totalCompleted;
  const challengesForNextStage = hasPlant 
    ? Math.max(0, (currentStage + 1) * 2 - completedCount) 
    : 0;

  // Pick featured and secondary challenges from catalog
  const featuredChallenge = challenges[0];
  const secondaryChallenges = challenges.slice(1, 3);

  const handleSeedTap = () => {
    if (featuredChallenge) {
      navigate(`/challenge/${featuredChallenge.id}/brief`);
    } else {
      navigate("/challenges");
    }
  };

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}/brief`);
  };

  const getVideoForChallenge = (challenge: ChallengeFromCatalog) => {
    return videoMap[challenge.id] || videoGroceries;
  };

  // Loading state with skeletons
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero skeleton */}
        <header 
          className="relative overflow-hidden"
          style={{ height: "clamp(240px, 45vh, 320px)" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-50"
            style={{ backgroundImage: `url(${homeGardenBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent via-60% to-background z-0" />
          
          <div className="relative z-10 px-5 pt-8 pb-2">
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6 z-10">
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="mt-4 h-10 w-40 rounded-full" />
          </div>
        </header>

        {/* Challenge skeleton */}
        <section className="px-5 pt-6 pb-4">
          <Skeleton className="h-3 w-12 mb-1" />
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="aspect-[16/10] rounded-2xl" />
        </section>

        {/* Secondary challenges skeleton */}
        <section className="px-5 pb-6">
          <Skeleton className="h-4 w-32 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="aspect-[4/3] rounded-xl" />
            <Skeleton className="aspect-[4/3] rounded-xl" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ==========================================
          EDITORIAL HERO HEADER - Farm scene
          Height: 200px mobile, 260px desktop
          ========================================== */}
      <header 
        className="relative overflow-hidden"
        style={{ 
          height: "clamp(240px, 45vh, 320px)",
        }}
      >
        {/* Farm background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${homeGardenBg})` }}
        />
        
        {/* Soft gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent via-60% to-background z-0" />
        
        {/* Editorial Text Content - Top left */}
        <div className="relative z-10 px-5 pt-8 pb-2">
          <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1.5">
            {getGreeting()}
          </p>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
            {userName}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
            {hasPlant 
              ? "Your garden is growing. Keep it going."
              : "Plant something small today. We'll help it grow."
            }
          </p>
        </div>

        {/* Floating Hero Element - Seed for new users, Water Droplet for growing gardens */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6 z-10">
          {hasPlant ? (
            <FloatingWaterDroplet
              size="lg"
              onClick={handleSeedTap}
            />
          ) : (
            <FloatingSeed
              src={homeSeed}
              size="lg"
              onClick={handleSeedTap}
            />
          )}
          
          {/* CTA pill below seed - different text based on plant status */}
          <button
            onClick={handleSeedTap}
            className="mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            {hasPlant ? "🌱 Start today's challenge" : "🌱 Plant your first seed"}
          </button>

          {/* Status chip for returning users */}
          {hasPlant && challengesForNextStage > 0 && (
            <div className="mt-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm">
              <span className="text-[11px] font-medium text-foreground/80">
                {challengesForNextStage} challenge{challengesForNextStage !== 1 ? "s" : ""} to evolve
              </span>
            </div>
          )}

        </div>
      </header>

      {/* ==========================================
          COMMUNITY ACTIVITY TICKER - Between hero and content
          Horizontal scrolling, ambient, social feel
          ========================================== */}
      <div className="-mt-4 relative z-20 pb-2">
        <CommunityActivityTicker />
      </div>

      {/* ==========================================
          TODAY - Featured challenge, editorial feel
          ========================================== */}
      {featuredChallenge && (
        <section className="px-5 pt-6 pb-4">
          {/* Section header */}
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">
                Today
              </p>
              <h2 className="text-lg font-bold text-foreground">
                {hasPlant ? "Your next challenge" : "Start here"}
              </h2>
            </div>
          </div>

          {/* Featured challenge - cinematic, dominant */}
          <div
            onClick={() => handleChallengeClick(featuredChallenge.id)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[16/10] mb-2"
          >
            {/* Video background */}
            <video
              src={getVideoForChallenge(featuredChallenge)}
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            
            {/* Metadata chips - top */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs">
                <Clock className="h-3 w-3" />
                <span className="font-medium">{featuredChallenge.duration_minutes} min</span>
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 text-xs ${difficultyConfig[featuredChallenge.difficulty as Difficulty].className}`}>
                <Zap className="h-3 w-3" />
                <span className="font-medium">{difficultyConfig[featuredChallenge.difficulty as Difficulty].label}</span>
              </div>
            </div>
            
            {/* Bonus badge - show XP multiplier for medium/hard challenges */}
            {featuredChallenge.difficulty !== "easy" && featuredChallenge.xp_base > 20 && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs shadow-lg shadow-primary/30">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="font-semibold">+{featuredChallenge.xp_base} XP</span>
                </div>
              </div>
            )}
            
            {/* Content - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="flex items-end justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {featuredChallenge.title}
                  </h3>
                  <p className="text-white/70 text-sm max-w-[85%] line-clamp-2">
                    {featuredChallenge.description}
                  </p>
                </div>
                
                {/* Play indicator */}
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-colors ml-3 shrink-0">
                  <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          ALSO WORTH YOUR TIME - Secondary challenges
          ========================================== */}
      {secondaryChallenges.length > 0 && (
        <section className="px-5 pb-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">Also worth your time</p>
            <button 
              onClick={() => navigate("/challenges")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
            >
              See all <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Compact challenge cards - horizontal scroll feel */}
          <div className="grid grid-cols-2 gap-3">
            {secondaryChallenges.map((challenge, index) => (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge.id)}
                className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[4/3]"
              >
                {/* Video background */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={getVideoForChallenge(challenge)}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                
                {/* Duration chip */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px]">
                    <Clock className="h-2.5 w-2.5" />
                    <span>{challenge.duration_minutes} min</span>
                  </div>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <h4 className="text-sm font-semibold text-white drop-shadow-md">
                    {challenge.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state when no challenges */}
      {challenges.length === 0 && (
        <section className="px-5 pt-6 pb-8">
          <div className="rounded-2xl bg-muted/30 border border-border/50 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No challenges yet</h3>
            <p className="text-sm text-muted-foreground">
              Check back soon for new challenges to grow your garden.
            </p>
          </div>
        </section>
      )}

      {/* ==========================================
          WEEKLY EVENT - Distinct visual treatment
          ========================================== */}
      <section className="px-5 pb-6">
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            This Week
          </p>
        </div>
        <EventChallengeCard onNavigate={navigate} />
      </section>

      {/* ==========================================
          AMBIENT EARNING - Subtle secondary panel
          ========================================== */}
      <section className="px-5 pb-8">
        <div 
          className="relative rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-muted/30 via-background to-muted/20 p-5 cursor-pointer group"
          onClick={() => navigate("/ambient")}
        >
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                Earn more, just living your day
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Let everyday moments count. The longer you go about your day, the bigger your bonus on the next challenge.
              </p>
            </div>
            
            {/* Chevron */}
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </section>

      {/* ==========================================
          GENTLE GROWTH FOOTER
          ========================================== */}
      <section className="px-5 pb-6">
        <div className="flex items-center justify-center gap-2 py-3 text-center">
          <span className="text-sm">🌱</span>
          <p className="text-xs text-muted-foreground">
            Every challenge helps your garden grow
          </p>
        </div>
      </section>
    </div>
  );
}
