import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Zap,
  Star,
  Home,
  Target,
  DollarSign,
  BarChart3,
  Settings,
  Play,
  Sparkles,
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

// Video imports
import videoDishwasher from "@/assets/videos/challenge-dishwasher.mp4";
import videoGroceries from "@/assets/videos/challenge-groceries.mp4";
import videoLaundry from "@/assets/videos/challenge-laundry.mp4";
import videoBed from "@/assets/videos/challenge-bed.mp4";
import videoTable from "@/assets/videos/challenge-table.mp4";
import videoBasket from "@/assets/videos/challenge-basket.mp4";
import videoShelf from "@/assets/videos/challenge-shelf.mp4";
import videoFragile from "@/assets/videos/challenge-fragile.mp4";
import videoRecycling from "@/assets/videos/challenge-recycling.mp4";
import videoMultitask from "@/assets/videos/challenge-multitask.mp4";

const tabs: TabItem[] = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: Target, label: "Challenges", href: "/challenges" },
  { icon: DollarSign, label: "Earnings", href: "/app/earnings" },
  { icon: BarChart3, label: "Insights", href: "/app/insights" },
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

type Difficulty = "easy" | "medium" | "hard";

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  hasBonus: boolean;
  bonusLabel?: string;
  isWeeklyFeatured?: boolean;
  video: string;
}

const challenges: Challenge[] = [
  { 
    id: "1", 
    name: "Dishwasher Unload", 
    description: "Unload a full dishwasher efficiently", 
    duration: "5 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoDishwasher
  },
  { 
    id: "2", 
    name: "Grocery Unload", 
    description: "Unpack groceries and organize in storage", 
    duration: "8 min", 
    difficulty: "medium", 
    hasBonus: true, 
    bonusLabel: "2x XP", 
    isWeeklyFeatured: true,
    video: videoGroceries
  },
  { 
    id: "3", 
    name: "Fold Laundry", 
    description: "Fold a load of clean laundry neatly", 
    duration: "10 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoLaundry
  },
  { 
    id: "4", 
    name: "Make Bed", 
    description: "Make your bed with fresh or existing linens", 
    duration: "3 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoBed
  },
  { 
    id: "5", 
    name: "Reset Table", 
    description: "Clear and reset a dining table", 
    duration: "4 min", 
    difficulty: "easy", 
    hasBonus: true, 
    bonusLabel: "Featured", 
    isWeeklyFeatured: true,
    video: videoTable
  },
  { 
    id: "6", 
    name: "Carry Laundry Basket", 
    description: "Transport laundry between rooms safely", 
    duration: "2 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoBasket
  },
  { 
    id: "7", 
    name: "Organize Shelf", 
    description: "Reorganize items on a cluttered shelf", 
    duration: "6 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoShelf
  },
  { 
    id: "8", 
    name: "Handle Fragile Items", 
    description: "Carefully move delicate glassware or ceramics", 
    duration: "4 min", 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Precision", 
    isWeeklyFeatured: true,
    video: videoFragile
  },
  { 
    id: "9", 
    name: "Trash & Recycling Sort", 
    description: "Sort waste into proper bins", 
    duration: "5 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoRecycling
  },
  { 
    id: "10", 
    name: "Task Transitions", 
    description: "Complete a sequence of quick household tasks", 
    duration: "7 min", 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Multi-Task",
    video: videoMultitask
  },
];

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/20 text-emerald-100 backdrop-blur-sm" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-100 backdrop-blur-sm" },
  hard: { label: "Hard", className: "bg-rose-500/20 text-rose-100 backdrop-blur-sm" },
};

interface SceneCardProps {
  challenge: Challenge;
  onClick: () => void;
  featured?: boolean;
}

const SceneCard = ({ challenge, onClick, featured = false }: SceneCardProps) => {
  const diffConfig = difficultyConfig[challenge.difficulty];
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden rounded-2xl text-left
        transition-all duration-300 ease-out
        active:scale-[0.98]
        ${featured 
          ? 'min-h-[200px] ring-2 ring-primary/40 ring-offset-2 ring-offset-background' 
          : 'min-h-[160px] border border-border/50'
        }
      `}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={challenge.video}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
      />
      
      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
      
      {/* Content */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between min-h-[inherit]">
        <div className="space-y-2">
          {/* Top badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {challenge.hasBonus && (
              <Badge className="text-[10px] px-2 py-0.5 bg-primary text-primary-foreground border-0 shadow-lg">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                {challenge.bonusLabel}
              </Badge>
            )}
            {featured && (
              <Badge className="text-[10px] px-2 py-0.5 bg-white/20 text-white border-0 backdrop-blur-sm">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          {/* Title */}
          <h3 className={`
            font-display font-bold text-white drop-shadow-lg
            ${featured ? 'text-2xl' : 'text-xl'}
          `}>
            {challenge.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-white/80 line-clamp-2 max-w-[85%] drop-shadow">
            {challenge.description}
          </p>
        </div>
        
        {/* Bottom row - metadata + action */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{challenge.duration}</span>
            </div>
            <Badge variant="secondary" className={`text-[10px] px-2 py-0.5 border-0 ${diffConfig.className}`}>
              <Zap className="h-2.5 w-2.5 mr-0.5" />
              {diffConfig.label}
            </Badge>
          </div>
          
          {/* Play button */}
          <div className={`
            flex items-center justify-center rounded-full
            bg-primary text-primary-foreground
            shadow-lg shadow-primary/40
            group-hover:shadow-xl group-hover:shadow-primary/50
            group-hover:scale-110 transition-all duration-300
            ${featured ? 'w-12 h-12' : 'w-10 h-10'}
          `}>
            <Play className={`${featured ? 'h-5 w-5' : 'h-4 w-4'} fill-current ml-0.5`} />
          </div>
        </div>
      </div>
    </button>
  );
};

const ChallengesPage = () => {
  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: string) => {
    navigate(`/challenge/${challengeId}`);
  };

  const weeklyFeatured = challenges.filter(c => c.isWeeklyFeatured);
  const allChallenges = challenges.filter(c => !c.isWeeklyFeatured);

  return (
    <MainAppShell
      title="Challenges"
      tabs={tabs}
    >
      <ContentSection className="space-y-8 pb-6">
        {/* Hero Featured Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-primary" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">This Week's Spotlight</h2>
          </div>
          
          <div className="space-y-3">
            {weeklyFeatured.map((challenge) => (
              <SceneCard 
                key={challenge.id}
                challenge={challenge}
                onClick={() => handleChallengeClick(challenge.id)}
                featured
              />
            ))}
          </div>
        </div>

        {/* All Challenges Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full bg-muted-foreground/30" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">All Challenges</h2>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{challenges.length} available</span>
          </div>
          
          <div className="grid gap-3">
            {allChallenges.map((challenge) => (
              <SceneCard 
                key={challenge.id}
                challenge={challenge}
                onClick={() => handleChallengeClick(challenge.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            New challenges added weekly • Recording starts automatically
          </p>
        </div>
      </ContentSection>
    </MainAppShell>
  );
};

export { ChallengesPage };
export default ChallengesPage;
