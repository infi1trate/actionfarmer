import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Clock,
  Zap,
  Star,
  Play,
} from "lucide-react";

// Asset imports
import homeGardenBg from "@/assets/home-garden-bg.png";
import homeSeed from "@/assets/home-seed.png";

// Video imports for challenge cards
import videoDishwasher from "@/assets/videos/challenge-dishwasher.mp4";
import videoGroceries from "@/assets/videos/challenge-groceries.mp4";
import videoTable from "@/assets/videos/challenge-table.mp4";

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

const featuredChallenges: FeaturedChallenge[] = [
  {
    id: "2",
    name: "Grocery Unload",
    description: "Unpack groceries and organize in storage",
    duration: "8 min",
    difficulty: "medium",
    hasBonus: true,
    bonusLabel: "2x XP",
    video: videoGroceries,
  },
  {
    id: "5",
    name: "Reset Table",
    description: "Clear and reset a dining table",
    duration: "4 min",
    difficulty: "easy",
    hasBonus: true,
    bonusLabel: "Featured",
    video: videoTable,
  },
];

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/20 text-emerald-100" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-100" },
  hard: { label: "Hard", className: "bg-rose-500/20 text-rose-100" },
};

// Ambient activity messages
const activityMessages = [
  "Someone just completed Kitchen Cleanup",
  "A garden grew to stage 5",
  "Someone unlocked their daily bonus",
  "A friend completed Grocery Unload",
];

export function HomePage() {
  const navigate = useNavigate();
  const [activityIndex, setActivityIndex] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Rotate activity messages
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityMessages.length);
    }, 5000);
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
          GARDEN HERO - Entry point into the world
          ========================================== */}
      <section 
        className="relative overflow-hidden"
        style={{ height: "45vh", minHeight: "320px", maxHeight: "400px" }}
      >
        {/* Garden background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${homeGardenBg})` }}
        />
        
        {/* Soft overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Floating seed CTA - centered, gentle animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Seed container with float animation */}
          <button
            onClick={handleSeedTap}
            className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            aria-label="Start today's challenge"
          >
            {/* Subtle glow behind seed */}
            <div className="absolute inset-0 -m-4 rounded-full bg-white/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Seed image with float animation */}
            <img
              src={homeSeed}
              alt="Seed"
              className="relative w-24 h-24 object-contain drop-shadow-lg animate-seed-float cursor-pointer
                         transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
            />
            
            {/* Subtle pulse ring */}
            <div className="absolute inset-0 -m-2 rounded-full border-2 border-white/30 animate-seed-pulse" />
          </button>
          
          {/* Label beneath seed */}
          <p className="mt-5 text-sm font-medium text-foreground/90 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/40">
            Tap to start today's challenge
          </p>
        </div>

        {/* Ambient activity line - bottom of hero */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-sm text-xs text-foreground/70 shadow-sm border border-white/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
            <span className="animate-fade-in" key={activityIndex}>
              {activityMessages[activityIndex]}
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURED TODAY - Cinematic challenge cards
          ========================================== */}
      <section className="px-5 py-8">
        {/* Section header with growth language */}
        <div className="flex items-end justify-between mb-5">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">
              Featured Today
            </p>
            <h2 className="text-lg font-bold text-foreground">Every challenge grows your garden</h2>
          </div>
          <button 
            onClick={() => navigate("/challenges")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            See all →
          </button>
        </div>

        {/* Challenge cards */}
        <div className="space-y-4">
          {featuredChallenges.map((challenge, index) => {
            const diffConfig = difficultyConfig[challenge.difficulty];
            const isFeatured = index === 0;
            
            return (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge.id)}
                className={`
                  relative overflow-hidden rounded-2xl cursor-pointer group
                  transition-transform duration-200 active:scale-[0.98]
                  ${isFeatured ? 'aspect-[16/10]' : 'aspect-[16/7]'}
                `}
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
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                
                {/* Metadata chips - top right */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{challenge.duration}</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 text-xs ${diffConfig.className}`}>
                    <Zap className="h-3 w-3" />
                    <span className="font-medium">{diffConfig.label}</span>
                  </div>
                </div>
                
                {/* Bonus badge */}
                {challenge.hasBonus && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-xs shadow-lg shadow-primary/30">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="font-semibold">{challenge.bonusLabel}</span>
                    </div>
                  </div>
                )}
                
                {/* Content - bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <h3 className={`font-bold text-white drop-shadow-lg ${isFeatured ? 'text-xl' : 'text-base'}`}>
                        {challenge.name}
                      </h3>
                      {isFeatured && (
                        <p className="text-white/70 text-sm max-w-[85%] line-clamp-1">
                          {challenge.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Play indicator */}
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          GENTLE GROWTH REMINDER - Light, optional
          ========================================== */}
      <section className="px-5 pb-8">
        <div className="flex items-center justify-center gap-2 py-4 text-center">
          <span className="text-sm text-muted-foreground">🌱</span>
          <p className="text-sm text-muted-foreground">
            Plant a seed today. Watch your garden grow.
          </p>
        </div>
      </section>
    </div>
  );
}
