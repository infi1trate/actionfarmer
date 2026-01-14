import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Badge } from "@/components/ui/badge";
import { useChallengeTransition, registerChallengeVideo } from "@/contexts/ChallengeTransitionContext";
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

// Seed image for garden connection
import seedImage from "@/assets/seed.png";
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
  onCardClick: (challenge: Challenge, element: HTMLElement) => void;
  featured?: boolean;
}

const SceneCard = ({ challenge, onCardClick, featured = false }: SceneCardProps) => {
  const diffConfig = difficultyConfig[challenge.difficulty];
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const [showMilestoneLabels, setShowMilestoneLabels] = React.useState(false);
  
  
  const handleClick = () => {
    if (cardRef.current) {
      onCardClick(challenge, cardRef.current);
    }
  };
  
  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      className={`
        group relative w-full overflow-hidden text-left
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-black/30
        active:scale-[0.98] active:shadow-lg
        ${featured 
          ? 'min-h-[280px] rounded-3xl ring-1 ring-white/10 hover:ring-white/20' 
          : 'min-h-[160px] rounded-2xl ring-1 ring-white/5 hover:ring-white/15'
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
          transition-transform duration-700 ease-out
          group-hover:scale-[1.03]
        `}
      />
      
      {/* Gradient overlay - refined */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />
      
      {/* Floating metadata chips - top left */}
      <div className={`absolute z-20 flex items-center gap-2 ${featured ? 'top-5 left-5' : 'top-4 left-4'}`}>
        {/* Time chip */}
        <div className={`
          flex items-center gap-1.5 
          bg-black/40 backdrop-blur-md text-white/90
          rounded-full border border-white/10
          transition-all duration-300
          group-hover:bg-black/50 group-hover:border-white/20
          ${featured ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'}
        `}>
          <Clock className={featured ? 'h-3.5 w-3.5' : 'h-3 w-3'} />
          <span className="font-medium">{challenge.duration}</span>
        </div>
        
        {/* Difficulty chip */}
        <div className={`
          flex items-center gap-1 
          backdrop-blur-md rounded-full border border-white/10
          transition-all duration-300
          group-hover:border-white/20
          ${diffConfig.className}
          ${featured ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'}
        `}>
          <Zap className={featured ? 'h-3 w-3' : 'h-2.5 w-2.5'} />
          <span className="font-medium">{diffConfig.label}</span>
        </div>
      </div>
      
      {/* Floating badges - top right */}
      <div className={`absolute z-20 flex items-center gap-2 ${featured ? 'top-5 right-5' : 'top-4 right-4'}`}>
        {/* Seed/Growth badge - always present */}
        <div className={`
          flex items-center gap-1.5
          bg-emerald-500/80 backdrop-blur-md text-white
          rounded-full border border-emerald-300/30
          shadow-lg shadow-emerald-500/20
          transition-all duration-300
          group-hover:shadow-xl group-hover:shadow-emerald-500/30 group-hover:bg-emerald-500/90
          ${featured ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'}
        `}>
          <img 
            src={seedImage} 
            alt="" 
            className={`object-contain brightness-0 invert ${featured ? 'w-3.5 h-3.5' : 'w-3 h-3'}`}
          />
          <span className="font-semibold">+1</span>
        </div>
        
        {/* Bonus badge */}
        {challenge.hasBonus && (
          <div className={`
            flex items-center gap-1.5
            bg-primary/90 backdrop-blur-md text-primary-foreground
            rounded-full border border-primary-foreground/20
            shadow-lg shadow-primary/30
            transition-all duration-300
            group-hover:shadow-xl group-hover:shadow-primary/40
            ${featured ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'}
          `}>
            <Star className={`fill-current ${featured ? 'h-3.5 w-3.5' : 'h-3 w-3'}`} />
            <span className="font-semibold">{challenge.bonusLabel}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className={`
        relative z-10 h-full flex flex-col justify-end min-h-[inherit]
        ${featured ? 'p-6' : 'p-5'}
      `}>
        <div className="space-y-3">
          {/* Featured label */}
          {featured && (
            <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium tracking-wide uppercase">
              <Sparkles className="h-3 w-3" />
              Weekly Spotlight
            </div>
          )}
          
          {/* Title */}
          <h3 className={`
            font-display font-bold text-white leading-tight
            transition-transform duration-300
            group-hover:translate-x-0.5
            ${featured ? 'text-3xl' : 'text-xl'}
          `}>
            {challenge.name}
          </h3>
          
          {/* Description */}
          <p className={`
            text-white/70
            transition-all duration-300
            group-hover:text-white/85
            ${featured ? 'text-base line-clamp-2 max-w-[85%]' : 'text-sm line-clamp-1 max-w-[80%]'}
          `}>
            {challenge.description}
          </p>
          
          {/* Milestone indicators */}
          <div className={`flex items-center ${featured ? 'gap-3 pt-1' : 'gap-2'}`}>
            {challenge.milestones.map((milestone, index) => {
              const MilestoneIcon = milestone.icon;
              return (
                <div key={index} className="relative">
                  {/* Dot/icon indicator */}
                  <div className={`
                    flex items-center justify-center rounded-full
                    bg-white/10 backdrop-blur-sm border border-white/15
                    transition-all duration-300 ease-out
                    ${featured ? 'w-8 h-8' : 'w-6 h-6'}
                    ${showMilestoneLabels ? 'bg-white/20 border-white/30 scale-105' : ''}
                  `}>
                    <MilestoneIcon className={`text-white/80 transition-colors duration-300 ${showMilestoneLabels ? 'text-white' : ''} ${featured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                  </div>
                  
                  {/* Connector line (not for last item) */}
                  {index < challenge.milestones.length - 1 && (
                    <div className={`
                      absolute top-1/2 -translate-y-1/2 bg-white/20
                      transition-all duration-300
                      ${showMilestoneLabels ? 'bg-white/35' : ''}
                      ${featured ? 'left-8 w-3 h-px' : 'left-6 w-2 h-px'}
                    `} />
                  )}
                  
                  {/* Label tooltip on hover */}
                  <div className={`
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-2.5 py-1 rounded-lg text-[10px] font-medium
                    bg-white/95 text-black backdrop-blur-md whitespace-nowrap
                    shadow-lg
                    transition-all duration-200 ease-out pointer-events-none
                    ${showMilestoneLabels 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-1'
                    }
                  `}>
                    {milestone.label}
                  </div>
                </div>
              );
            })}
            
            {/* Play indicator - right side */}
            <div className={`
              ml-auto flex items-center justify-center rounded-full
              bg-white/10 backdrop-blur-sm
              transition-all duration-300 ease-out
              group-hover:bg-primary group-hover:scale-110
              ${featured ? 'w-12 h-12' : 'w-9 h-9'}
            `}>
              <Play className={`
                text-white/80 fill-current ml-0.5
                transition-colors duration-300
                group-hover:text-primary-foreground
                ${featured ? 'h-5 w-5' : 'h-4 w-4'}
              `} />
            </div>
          </div>
        </div>
        
      </div>
    </button>
  );
};

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { setTransitionData, setIsTransitioning } = useChallengeTransition();

  // Register all challenge videos on mount
  React.useEffect(() => {
    challenges.forEach(c => registerChallengeVideo(c.id, c.video));
  }, []);

  const handleChallengeClick = (challenge: Challenge, cardElement: HTMLElement) => {
    const rect = cardElement.getBoundingClientRect();
    setTransitionData({
      challengeId: challenge.id,
      video: challenge.video,
      name: challenge.name,
      rect,
    });
    setIsTransitioning(true);
    
    // Small delay for transition setup
    setTimeout(() => {
      navigate(`/challenge/${challenge.id}`);
    }, 50);
  };

  const weeklyFeatured = challenges.filter(c => c.isWeeklyFeatured);
  const allChallenges = challenges.filter(c => !c.isWeeklyFeatured);

  return (
    <MainAppShell
      tabs={tabs}
    >
      {/* ==========================================
          EDITORIAL HERO HEADER - Challenges
          Height: 180px mobile, 220px desktop
          ========================================== */}
      <header className="px-5 pt-8 pb-6">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">
          This Week
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">
          Challenges
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          Small actions. Real progress.
        </p>
      </header>

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
                onCardClick={handleChallengeClick}
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
                onCardClick={handleChallengeClick}
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
