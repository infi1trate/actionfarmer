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
  CircleDot,
  Box,
  Layers,
  Hand,
  Footprints,
  CheckCircle2,
  ArrowRight,
  ScanLine,
  ShieldCheck,
  Timer,
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

interface Milestone {
  icon: React.ElementType;
  label: string;
}

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
  milestones: Milestone[];
}

const challenges: Challenge[] = [
  { 
    id: "1", 
    name: "Dishwasher Unload", 
    description: "Unload a full dishwasher efficiently", 
    duration: "5 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoDishwasher,
    milestones: [
      { icon: Box, label: "Open dishwasher" },
      { icon: Layers, label: "Sort items" },
      { icon: CheckCircle2, label: "Close & finish" },
    ]
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
    video: videoGroceries,
    milestones: [
      { icon: Box, label: "Unpack bags" },
      { icon: ScanLine, label: "Sort categories" },
      { icon: Layers, label: "Store items" },
    ]
  },
  { 
    id: "3", 
    name: "Fold Laundry", 
    description: "Fold a load of clean laundry neatly", 
    duration: "10 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoLaundry,
    milestones: [
      { icon: Hand, label: "Gather items" },
      { icon: Layers, label: "Fold neatly" },
      { icon: Box, label: "Stack & store" },
    ]
  },
  { 
    id: "4", 
    name: "Make Bed", 
    description: "Make your bed with fresh or existing linens", 
    duration: "3 min", 
    difficulty: "easy", 
    hasBonus: false,
    video: videoBed,
    milestones: [
      { icon: Layers, label: "Straighten sheets" },
      { icon: CheckCircle2, label: "Finish" },
    ]
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
    video: videoTable,
    milestones: [
      { icon: Hand, label: "Clear items" },
      { icon: ScanLine, label: "Wipe surface" },
      { icon: Layers, label: "Set places" },
    ]
  },
  { 
    id: "6", 
    name: "Carry Laundry Basket", 
    description: "Transport laundry between rooms safely", 
    duration: "2 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoBasket,
    milestones: [
      { icon: Hand, label: "Lift basket" },
      { icon: Footprints, label: "Navigate safely" },
    ]
  },
  { 
    id: "7", 
    name: "Organize Shelf", 
    description: "Reorganize items on a cluttered shelf", 
    duration: "6 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoShelf,
    milestones: [
      { icon: Box, label: "Remove items" },
      { icon: ScanLine, label: "Group by type" },
      { icon: Layers, label: "Arrange neatly" },
    ]
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
    video: videoFragile,
    milestones: [
      { icon: ShieldCheck, label: "Secure grip" },
      { icon: Footprints, label: "Move carefully" },
      { icon: CheckCircle2, label: "Place safely" },
    ]
  },
  { 
    id: "9", 
    name: "Trash & Recycling Sort", 
    description: "Sort waste into proper bins", 
    duration: "5 min", 
    difficulty: "medium", 
    hasBonus: false,
    video: videoRecycling,
    milestones: [
      { icon: ScanLine, label: "Identify materials" },
      { icon: Layers, label: "Separate items" },
      { icon: Box, label: "Place in bins" },
    ]
  },
  { 
    id: "10", 
    name: "Task Transitions", 
    description: "Complete a sequence of quick household tasks", 
    duration: "7 min", 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Multi-Task",
    video: videoMultitask,
    milestones: [
      { icon: Timer, label: "Start task 1" },
      { icon: ArrowRight, label: "Transition" },
      { icon: CheckCircle2, label: "Complete all" },
    ]
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
  const [showMilestoneLabels, setShowMilestoneLabels] = React.useState(false);
  
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden text-left
        transition-all duration-300 ease-out
        active:scale-[0.98]
        ${featured 
          ? 'min-h-[280px] rounded-3xl ring-1 ring-white/20 shadow-2xl shadow-black/40' 
          : 'min-h-[160px] rounded-2xl border border-border/50'
        }
      `}
      onMouseEnter={() => {
        videoRef.current?.play();
        setShowMilestoneLabels(true);
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
        setShowMilestoneLabels(false);
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
        className={`
          absolute inset-0 w-full h-full object-cover 
          group-hover:scale-105 transition-transform duration-700
          ${featured ? 'scale-100' : 'scale-105'}
        `}
      />
      
      {/* Gradient overlays - stronger for featured */}
      <div className={`absolute inset-0 ${
        featured 
          ? 'bg-gradient-to-t from-black via-black/60 to-black/30' 
          : 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
      }`} />
      <div className={`absolute inset-0 ${
        featured 
          ? 'bg-gradient-to-r from-black/70 via-black/20 to-transparent' 
          : 'bg-gradient-to-r from-black/50 via-transparent to-transparent'
      }`} />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
      
      {/* Floating bonus badge for featured */}
      {featured && challenge.hasBonus && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full scale-150" />
            <Badge className="relative text-xs px-3 py-1.5 bg-primary text-primary-foreground border-0 shadow-lg shadow-primary/50 font-semibold">
              <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
              {challenge.bonusLabel}
            </Badge>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={`
        relative z-10 h-full flex flex-col justify-end min-h-[inherit]
        ${featured ? 'p-6' : 'p-5'}
      `}>
        <div className="space-y-3">
          {/* Non-featured badges */}
          {!featured && challenge.hasBonus && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="text-[10px] px-2 py-0.5 bg-primary text-primary-foreground border-0 shadow-lg">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                {challenge.bonusLabel}
              </Badge>
            </div>
          )}
          
          {/* Featured label for featured cards */}
          {featured && (
            <Badge className="text-[10px] px-2.5 py-1 bg-white/10 text-white border border-white/20 backdrop-blur-md w-fit">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Weekly Spotlight
            </Badge>
          )}
          
          {/* Title */}
          <h3 className={`
            font-display font-bold text-white drop-shadow-lg leading-tight
            ${featured ? 'text-3xl' : 'text-xl'}
          `}>
            {challenge.name}
          </h3>
          
          {/* Description */}
          <p className={`
            text-white/80 drop-shadow
            ${featured ? 'text-base line-clamp-2 max-w-[90%]' : 'text-sm line-clamp-2 max-w-[85%]'}
          `}>
            {challenge.description}
          </p>
          
          {/* Milestone indicators */}
          <div className={`flex items-center ${featured ? 'gap-3' : 'gap-2'}`}>
            {challenge.milestones.map((milestone, index) => {
              const MilestoneIcon = milestone.icon;
              return (
                <div key={index} className="relative group/milestone">
                  {/* Dot/icon indicator */}
                  <div className={`
                    flex items-center justify-center rounded-full
                    bg-white/15 backdrop-blur-sm border border-white/20
                    transition-all duration-300
                    ${featured ? 'w-8 h-8' : 'w-6 h-6'}
                    ${showMilestoneLabels ? 'bg-white/25 scale-110' : ''}
                  `}>
                    <MilestoneIcon className={`text-white/90 ${featured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                  </div>
                  
                  {/* Connector line (not for last item) */}
                  {index < challenge.milestones.length - 1 && (
                    <div className={`
                      absolute top-1/2 -translate-y-1/2 bg-white/30
                      ${featured ? 'left-8 w-3 h-0.5' : 'left-6 w-2 h-px'}
                    `} />
                  )}
                  
                  {/* Label tooltip on hover */}
                  <div className={`
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-2 py-1 rounded-md text-[10px] font-medium
                    bg-black/80 text-white backdrop-blur-md whitespace-nowrap
                    transition-all duration-200 pointer-events-none
                    ${showMilestoneLabels 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-1'
                    }
                  `}>
                    {milestone.label}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom row - metadata + action */}
        <div className={`flex items-center justify-between ${featured ? 'mt-6' : 'mt-4'}`}>
          <div className="flex items-center gap-2">
            <div className={`
              flex items-center gap-1.5 text-white/90 bg-black/30 backdrop-blur-sm rounded-lg
              ${featured ? 'px-3 py-1.5' : 'px-2.5 py-1'}
            `}>
              <Clock className={featured ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
              <span className={`font-medium ${featured ? 'text-sm' : 'text-xs'}`}>{challenge.duration}</span>
            </div>
            <Badge variant="secondary" className={`border-0 ${diffConfig.className} ${featured ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5'}`}>
              <Zap className={featured ? 'h-3 w-3 mr-1' : 'h-2.5 w-2.5 mr-0.5'} />
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
            ${featured ? 'w-14 h-14' : 'w-10 h-10'}
          `}>
            <Play className={`${featured ? 'h-6 w-6' : 'h-4 w-4'} fill-current ml-0.5`} />
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
