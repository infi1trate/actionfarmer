import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Zap, 
  Star, 
  ArrowLeft,
  CheckCircle2,
  Play,
  Sprout,
  Sparkles,
  Lightbulb,
  Target,
} from "lucide-react";
import { useChallengeTransition, challengeVideos } from "@/contexts/ChallengeTransitionContext";
import seedImage from "@/assets/home-seed.png";

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

type Difficulty = "easy" | "medium" | "hard";

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationSeconds: number;
  difficulty: Difficulty;
  hasBonus: boolean;
  bonusLabel?: string;
  objectives: string[];
  tips: string[];
  video: string;
  xpReward?: number;
}

// Shared challenge data - in a real app, this would come from an API/store
export const challengeData: Record<string, Challenge> = {
  "1": { 
    id: "1", 
    name: "Dishwasher Unload", 
    description: "Unload a full dishwasher efficiently", 
    duration: "5 min", 
    durationSeconds: 300, 
    difficulty: "easy", 
    hasBonus: false, 
    objectives: ["Remove all dishes from the dishwasher", "Place items in their proper cabinets", "Close all cabinet doors when done"], 
    tips: ["Start with the bottom rack", "Group similar items together before putting away"],
    video: videoDishwasher,
    xpReward: 50
  },
  "2": { 
    id: "2", 
    name: "Grocery Unload", 
    description: "Unpack groceries and organize in storage", 
    duration: "8 min", 
    durationSeconds: 480, 
    difficulty: "medium", 
    hasBonus: true, 
    bonusLabel: "2x XP", 
    objectives: ["Unload all grocery bags", "Sort items by storage location", "Put refrigerated items away first"], 
    tips: ["Prioritize cold and frozen items", "Break down boxes for recycling"],
    video: videoGroceries,
    xpReward: 80
  },
  "3": { 
    id: "3", 
    name: "Fold Laundry", 
    description: "Fold a load of clean laundry neatly", 
    duration: "10 min", 
    durationSeconds: 600, 
    difficulty: "easy", 
    hasBonus: false, 
    objectives: ["Fold all items from the laundry basket", "Stack items by category", "Place folded items in designated spots"], 
    tips: ["Fold on a flat surface", "Group matching socks as you go"],
    video: videoLaundry,
    xpReward: 60
  },
  "4": { 
    id: "4", 
    name: "Make Bed", 
    description: "Make your bed with fresh or existing linens", 
    duration: "3 min", 
    durationSeconds: 180, 
    difficulty: "easy", 
    hasBonus: false, 
    objectives: ["Straighten the fitted sheet", "Arrange top sheet and blankets", "Fluff and place pillows neatly"], 
    tips: ["Work from one side to the other", "Smooth wrinkles as you go"],
    video: videoBed,
    xpReward: 30
  },
  "5": { 
    id: "5", 
    name: "Reset Table", 
    description: "Clear and reset a dining table", 
    duration: "4 min", 
    durationSeconds: 240, 
    difficulty: "easy", 
    hasBonus: true, 
    bonusLabel: "Featured", 
    objectives: ["Clear all items from the table", "Wipe down the surface", "Set places for the next meal"], 
    tips: ["Stack plates carefully for transport", "Use a tray for multiple items"],
    video: videoTable,
    xpReward: 40
  },
  "6": { 
    id: "6", 
    name: "Carry Laundry Basket", 
    description: "Transport laundry between rooms safely", 
    duration: "2 min", 
    durationSeconds: 120, 
    difficulty: "medium", 
    hasBonus: false, 
    objectives: ["Lift the basket with proper form", "Navigate through doorways", "Set down basket gently at destination"], 
    tips: ["Bend at the knees, not the waist", "Keep the load close to your body"],
    video: videoBasket,
    xpReward: 25
  },
  "7": { 
    id: "7", 
    name: "Organize Shelf", 
    description: "Reorganize items on a cluttered shelf", 
    duration: "6 min", 
    durationSeconds: 360, 
    difficulty: "medium", 
    hasBonus: false, 
    objectives: ["Remove all items from the shelf", "Group similar items together", "Arrange items by size or frequency of use"], 
    tips: ["Dust the shelf while it's empty", "Place frequently used items at eye level"],
    video: videoShelf,
    xpReward: 55
  },
  "8": { 
    id: "8", 
    name: "Handle Fragile Items", 
    description: "Carefully move delicate glassware or ceramics", 
    duration: "4 min", 
    durationSeconds: 240, 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Precision", 
    objectives: ["Select 5 fragile items to relocate", "Move each item one at a time", "Place items securely in new location"], 
    tips: ["Use both hands for stability", "Clear the path before moving items"],
    video: videoFragile,
    xpReward: 70
  },
  "9": { 
    id: "9", 
    name: "Trash & Recycling Sort", 
    description: "Sort waste into proper bins", 
    duration: "5 min", 
    durationSeconds: 300, 
    difficulty: "medium", 
    hasBonus: false, 
    objectives: ["Gather items to be disposed", "Sort into trash, recycling, and compost", "Take bins out if full"], 
    tips: ["Rinse containers before recycling", "Break down cardboard boxes flat"],
    video: videoRecycling,
    xpReward: 50
  },
  "10": { 
    id: "10", 
    name: "Task Transitions", 
    description: "Complete a sequence of quick household tasks", 
    duration: "7 min", 
    durationSeconds: 420, 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Multi-Task", 
    objectives: ["Complete 3 different mini-tasks", "Transition smoothly between each", "Finish all tasks within the time limit"], 
    tips: ["Plan your route through the house", "Keep momentum between tasks"],
    video: videoMultitask,
    xpReward: 100
  },
};

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/30 text-emerald-100 border-emerald-400/30" },
  medium: { label: "Medium", className: "bg-amber-500/30 text-amber-100 border-amber-400/30" },
  hard: { label: "Hard", className: "bg-rose-500/30 text-rose-100 border-rose-400/30" },
};

export const ChallengeBriefPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { transitionData, setTransitionData, isTransitioning, setIsTransitioning } = useChallengeTransition();
  const [isEntering, setIsEntering] = React.useState(true);
  const [showContent, setShowContent] = React.useState(false);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  const diffConfig = difficultyConfig[challenge.difficulty];
  
  // Get video from transition data or fallback to challenge data
  const videoSrc = transitionData?.video || challengeVideos[challenge.id] || challenge.video;

  // Handle entrance animation
  React.useEffect(() => {
    // Start content reveal after video expands
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 400);
    
    // Complete transition
    const transitionTimer = setTimeout(() => {
      setIsEntering(false);
      setIsTransitioning(false);
    }, 600);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(transitionTimer);
    };
  }, [setIsTransitioning]);

  // Cleanup transition data on unmount
  React.useEffect(() => {
    return () => {
      setTransitionData(null);
    };
  }, [setTransitionData]);

  const handleStart = () => {
    navigate(`/challenge/${challenge.id}/permission`);
  };

  const handleBack = () => {
    setTransitionData(null);
    navigate("/challenges");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cinematic Video Header with improved contrast */}
      <div 
        className={`
          relative overflow-hidden
          transition-all duration-500 ease-out
          ${isEntering ? 'h-[50vh]' : 'h-[42vh]'}
        `}
      >
        {/* Video background */}
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-transform duration-700 ease-out
            ${isEntering ? 'scale-110' : 'scale-100'}
          `}
        />
        
        {/* Dark gradient scrim for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        
        {/* Elegant fade at bottom - smooth multi-stop blend */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.05) 25%, hsl(var(--background) / 0.2) 45%, hsl(var(--background) / 0.5) 65%, hsl(var(--background) / 0.8) 82%, hsl(var(--background)) 100%)'
          }}
        />
        
        {/* Back button */}
        <button 
          onClick={handleBack}
          className={`
            absolute top-4 left-4 z-20
            p-3 rounded-full
            bg-black/40 backdrop-blur-md border border-white/20
            hover:bg-black/60 transition-all duration-300
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        
        {/* Floating metadata chips with better contrast */}
        <div className={`
          absolute top-4 right-4 z-20 flex items-center gap-2
          transition-all duration-500 delay-100
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>{challenge.duration}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border text-sm font-medium ${diffConfig.className}`}>
            <Zap className="h-4 w-4" />
            <span>{diffConfig.label}</span>
          </div>
        </div>
        
        {/* Bonus badge */}
        {challenge.hasBonus && (
          <div className={`
            absolute top-16 right-4 z-20
            transition-all duration-500 delay-150
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-sm shadow-lg shadow-primary/30 font-semibold">
              <Star className="h-4 w-4 fill-current" />
              <span>{challenge.bonusLabel}</span>
            </div>
          </div>
        )}
        
        {/* Title overlay at bottom of video - larger, clearer typography */}
        <div className={`
          absolute bottom-0 left-0 right-0 px-5 pb-8 pt-16
          transition-all duration-500 delay-200
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h1 className="text-[32px] sm:text-[38px] font-display font-bold text-white mb-2.5 leading-[1.1] tracking-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)' }}>
            {challenge.name}
          </h1>
          <p className="text-white text-lg sm:text-xl max-w-[95%] leading-relaxed font-medium"
             style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5), 0 2px 16px rgba(0,0,0,0.3)' }}>
            {challenge.description}
          </p>
        </div>
      </div>

      {/* Content - improved spacing and typography */}
      <main className={`
        flex-1 px-4 pt-5 pb-40 space-y-4
        transition-all duration-500 delay-300
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}>
        {/* Card A: Objectives */}
        <Card className="p-5 space-y-4 bg-card border-border/60 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">What you'll do</h3>
          </div>
          <ul className="space-y-3">
            {challenge.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <span className="text-[16px] text-foreground leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Card B: Tips */}
        <Card className="p-5 space-y-4 bg-muted/40 border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Helpful tips</h3>
          </div>
          <ul className="space-y-3">
            {challenge.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge variant="warning-subtle" size="sm" className="mt-1 shrink-0">
                  Tip {index + 1}
                </Badge>
                <span className="text-[16px] text-muted-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Card C: Garden Reward (NEW) */}
        <Card className="p-5 bg-gradient-to-br from-success/10 via-background to-primary/5 border-success/30 shadow-sm overflow-hidden relative">
          <div className="flex items-start gap-4">
            {/* Seed illustration */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center shrink-0 border border-success/20">
              <img 
                src={seedImage} 
                alt="Seed" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback to icon if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Sprout className="h-6 w-6 text-success absolute" style={{ display: 'none' }} />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-success" />
                <h3 className="text-lg font-semibold text-foreground">This grows your garden</h3>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Completing this challenge nurtures your plant and earns growth credit toward evolution.
              </p>
              
              {/* Reward details */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 text-success text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>+{challenge.xpReward || 50} XP</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-sm font-medium">
                  <Sprout className="h-3.5 w-3.5" />
                  <span>+1 Growth</span>
                </div>
                {challenge.hasBonus && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/15 text-warning text-sm font-medium">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>Streak boost applies</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-success/5 blur-xl" />
        </Card>
      </main>

      {/* Footer CTA - Fixed horizontal alignment */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4
        bg-gradient-to-t from-background via-background to-transparent
        pt-10
        transition-all duration-500 delay-400
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <Button 
          className="w-full h-[56px] text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
          onClick={handleStart}
          leftIcon={<Play className="h-5 w-5 fill-current" />}
        >
          Start Challenge
        </Button>
        <p className="text-center text-[13px] text-muted-foreground mt-3">
          You're always in control — stop anytime.
        </p>
      </div>
    </div>
  );
};

export default ChallengeBriefPage;
