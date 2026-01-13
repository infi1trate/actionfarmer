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
} from "lucide-react";
import { useChallengeTransition, challengeVideos } from "@/contexts/ChallengeTransitionContext";

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
    video: videoDishwasher
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
    video: videoGroceries
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
    video: videoLaundry
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
    video: videoBed
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
    video: videoTable
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
    video: videoBasket
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
    video: videoShelf
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
    video: videoFragile
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
    video: videoRecycling
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
    video: videoMultitask
  },
};

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/20 text-emerald-100" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-100" },
  hard: { label: "Hard", className: "bg-rose-500/20 text-rose-100" },
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
    navigate(`/challenge/${challenge.id}/countdown`);
  };

  const handleBack = () => {
    setTransitionData(null);
    navigate("/challenges");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cinematic Video Header */}
      <div 
        className={`
          relative overflow-hidden
          transition-all duration-500 ease-out
          ${isEntering ? 'h-[50vh]' : 'h-[40vh]'}
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
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Back button */}
        <button 
          onClick={handleBack}
          className={`
            absolute top-4 left-4 z-20
            p-2.5 rounded-full
            bg-black/30 backdrop-blur-md border border-white/10
            hover:bg-black/50 transition-all duration-300
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        
        {/* Floating metadata chips */}
        <div className={`
          absolute top-4 right-4 z-20 flex items-center gap-2
          transition-all duration-500 delay-100
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium">{challenge.duration}</span>
          </div>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-sm ${diffConfig.className}`}>
            <Zap className="h-3 w-3" />
            <span className="font-medium">{diffConfig.label}</span>
          </div>
        </div>
        
        {/* Bonus badge */}
        {challenge.hasBonus && (
          <div className={`
            absolute top-16 right-4 z-20
            transition-all duration-500 delay-150
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-sm shadow-lg shadow-primary/30">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-semibold">{challenge.bonusLabel}</span>
            </div>
          </div>
        )}
        
        {/* Title overlay at bottom of video */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-6
          transition-all duration-500 delay-200
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h1 className="text-3xl font-display font-bold text-white drop-shadow-lg mb-2">
            {challenge.name}
          </h1>
          <p className="text-white/80 text-base max-w-[90%]">
            {challenge.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className={`
        flex-1 px-4 pt-6 pb-32 space-y-5
        transition-all duration-500 delay-300
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}>
        {/* Objectives */}
        <Card className="p-4 space-y-3 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Objectives</h3>
          <ul className="space-y-2.5">
            {challenge.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-foreground leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Tips */}
        <Card className="p-4 space-y-3 bg-muted/30 border-0">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tips</h3>
          <ul className="space-y-2">
            {challenge.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </main>

      {/* Footer CTA */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4
        bg-gradient-to-t from-background via-background to-transparent
        pt-8
        transition-all duration-500 delay-400
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <Button 
          className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg shadow-primary/20 gap-2"
          onClick={handleStart}
        >
          <Play className="h-5 w-5 fill-current" />
          Start Challenge
        </Button>
      </div>
    </div>
  );
};

export default ChallengeBriefPage;
