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
  Target,
  CheckCircle2,
} from "lucide-react";

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
    tips: ["Start with the bottom rack", "Group similar items together before putting away"] 
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
    tips: ["Prioritize cold and frozen items", "Break down boxes for recycling"] 
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
    tips: ["Fold on a flat surface", "Group matching socks as you go"] 
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
    tips: ["Work from one side to the other", "Smooth wrinkles as you go"] 
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
    tips: ["Stack plates carefully for transport", "Use a tray for multiple items"] 
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
    tips: ["Bend at the knees, not the waist", "Keep the load close to your body"] 
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
    tips: ["Dust the shelf while it's empty", "Place frequently used items at eye level"] 
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
    tips: ["Use both hands for stability", "Clear the path before moving items"] 
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
    tips: ["Rinse containers before recycling", "Break down cardboard boxes flat"] 
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
    tips: ["Plan your route through the house", "Keep momentum between tasks"] 
  },
};

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/10 text-emerald-600" },
  medium: { label: "Medium", className: "bg-amber-500/10 text-amber-600" },
  hard: { label: "Hard", className: "bg-rose-500/10 text-rose-600" },
};

export const ChallengeBriefPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  const diffConfig = difficultyConfig[challenge.difficulty];

  const handleStart = () => {
    navigate(`/challenge/${challenge.id}/countdown`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b border-border">
        <button 
          onClick={() => navigate("/challenges")}
          className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Challenge Brief</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 space-y-6 pb-32">
        {/* Challenge Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">{challenge.name}</h2>
              {challenge.hasBonus && (
                <Badge className="text-xs bg-brand-yellow text-brand-yellow-foreground border-0">
                  <Star className="h-3 w-3 mr-0.5 fill-current" />
                  {challenge.bonusLabel}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{challenge.description}</p>
          </div>
          
          {/* Meta */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{challenge.duration}</span>
            </div>
            <Badge variant="secondary" className={`text-xs border-0 ${diffConfig.className}`}>
              <Zap className="h-3 w-3 mr-1" />
              {diffConfig.label}
            </Badge>
          </div>
        </div>

        {/* Objectives */}
        <Card className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Objectives</h3>
          <ul className="space-y-2">
            {challenge.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{objective}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Tips */}
        <Card className="p-4 space-y-3 bg-muted/30 border-0">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Tips</h3>
          <ul className="space-y-2">
            {challenge.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-sm text-primary font-medium">•</span>
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          className="w-full h-12 text-base font-semibold"
          onClick={handleStart}
        >
          Start Challenge
        </Button>
      </div>
    </div>
  );
};

export default ChallengeBriefPage;
