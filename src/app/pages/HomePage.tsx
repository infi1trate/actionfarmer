import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Asset imports
import homeGardenBg from "@/assets/home-garden-bg.png";
import homeSeed from "@/assets/home-seed.png";

// Video imports for challenge cards
import videoGroceries from "@/assets/videos/challenge-groceries.mp4";
import videoTable from "@/assets/videos/challenge-table.mp4";
import videoLaundry from "@/assets/videos/challenge-laundry.mp4";

type Difficulty = "easy" | "medium" | "hard";

interface FeaturedChallenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  hasBonus: boolean;
  bonusLabel?: string;
  video: string;
}

const featuredChallenge: FeaturedChallenge = {
  id: "2",
  name: "Grocery Unload",
  description: "Unpack groceries and organize in storage. A calm, focused task to start your day.",
  duration: "8 min",
  difficulty: "medium",
  hasBonus: true,
  bonusLabel: "2x XP",
  video: videoGroceries,
};

const secondaryChallenges: FeaturedChallenge[] = [
  {
    id: "5",
    name: "Reset Table",
    description: "Clear and reset a dining table",
    duration: "4 min",
    difficulty: "easy",
    hasBonus: false,
    video: videoTable,
  },
  {
    id: "3",
    name: "Fold Laundry",
    description: "Fold a load of clean laundry neatly",
    duration: "10 min",
    difficulty: "easy",
    hasBonus: false,
    video: videoLaundry,
  },
];

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/20 text-emerald-100" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-100" },
  hard: { label: "Hard", className: "bg-rose-500/20 text-rose-100" },
};

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// Ambient activity messages
const activityMessages = [
  "Someone just completed Kitchen Cleanup",
  "A garden grew to stage 5",
  "Someone unlocked their daily bonus",
];

export function HomePage() {
  const navigate = useNavigate();
  const [activityIndex, setActivityIndex] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Mock user data
  const userName = "Alex";

  // Rotate activity messages
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSeedTap = () => {
    navigate("/challenges");
  };

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}/brief`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ==========================================
          GARDEN HERO - Calm, meditative entry
          ========================================== */}
      <section 
        className="relative overflow-hidden"
        style={{ height: "42vh", minHeight: "300px", maxHeight: "380px" }}
      >
        {/* Garden background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${homeGardenBg})` }}
        />
        
        {/* Soft gradient fade to content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Personal greeting - top left */}
        <div className="absolute top-5 left-5 z-10">
          <p className="text-sm font-medium text-foreground/70 mb-0.5">
            {getGreeting()},
          </p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {userName}
          </h1>
        </div>

        {/* Floating seed CTA - centered, calm animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <button
            onClick={handleSeedTap}
            className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            aria-label="Plant a seed today"
          >
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 -m-6 rounded-full bg-white/15 blur-2xl opacity-50" />
            
            {/* Seed image with slow float animation */}
            <img
              src={homeSeed}
              alt="Seed"
              className="relative w-20 h-20 object-contain drop-shadow-lg animate-seed-float cursor-pointer
                         transition-transform duration-500 group-hover:scale-105 group-active:scale-95"
            />
            
            {/* Very subtle pulse ring */}
            <div className="absolute inset-0 -m-3 rounded-full border border-white/20 animate-seed-pulse" />
          </button>
          
          {/* Gentle label */}
          <p className="mt-4 text-sm font-medium text-foreground/80 bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/30">
            Plant a seed today
          </p>
        </div>

        {/* Ambient activity - subtle community signal */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm text-xs text-foreground/60 border border-white/20">
            <div className="w-1.5 h-1.5 rounded-full bg-success/60 animate-pulse" />
            <span key={activityIndex} className="animate-fade-in">
              {activityMessages[activityIndex]}
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          TODAY - Featured challenge, editorial feel
          ========================================== */}
      <section className="px-5 pt-6 pb-4">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">
              Today
            </p>
            <h2 className="text-lg font-bold text-foreground">Your next challenge</h2>
          </div>
        </div>

        {/* Featured challenge - cinematic, dominant */}
        <div
          onClick={() => handleChallengeClick(featuredChallenge.id)}
          className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-[16/10] mb-2"
        >
          {/* Video background */}
          <video
            src={featuredChallenge.video}
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
              <span className="font-medium">{featuredChallenge.duration}</span>
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 text-xs ${difficultyConfig[featuredChallenge.difficulty].className}`}>
              <Zap className="h-3 w-3" />
              <span className="font-medium">{difficultyConfig[featuredChallenge.difficulty].label}</span>
            </div>
          </div>
          
          {/* Bonus badge */}
          {featuredChallenge.hasBonus && (
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs shadow-lg shadow-primary/30">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-semibold">{featuredChallenge.bonusLabel}</span>
              </div>
            </div>
          )}
          
          {/* Content - bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-end justify-between">
              <div className="space-y-1 flex-1">
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  {featuredChallenge.name}
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

      {/* ==========================================
          ALSO WORTH YOUR TIME - Secondary challenges
          ========================================== */}
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
                src={challenge.video}
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
                  <span>{challenge.duration}</span>
                </div>
              </div>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <h4 className="text-sm font-semibold text-white drop-shadow-md">
                  {challenge.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

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
