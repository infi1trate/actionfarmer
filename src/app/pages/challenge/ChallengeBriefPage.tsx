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
  "1": { id: "1", name: "Kitchen Grab", description: "Pick up 5 kitchen items", duration: "2 min", durationSeconds: 120, difficulty: "easy", hasBonus: false, objectives: ["Pick up 5 different kitchen items", "Place them on the counter", "Return to starting position"], tips: ["Start with items closest to you", "Use both hands efficiently"] },
  "2": { id: "2", name: "Desk Organizer", description: "Arrange items on your desk", duration: "3 min", durationSeconds: 180, difficulty: "easy", hasBonus: true, bonusLabel: "2x XP", objectives: ["Clear your desk surface", "Organize items by category", "Create a clean workspace"], tips: ["Group similar items together", "Keep frequently used items within reach"] },
  "3": { id: "3", name: "Quick Stack", description: "Stack 3 objects carefully", duration: "1 min", durationSeconds: 60, difficulty: "easy", hasBonus: false, objectives: ["Find 3 stackable objects", "Stack them vertically", "Keep the stack balanced for 5 seconds"], tips: ["Start with the largest item at the bottom", "Move slowly and deliberately"] },
  "4": { id: "4", name: "Tool Swap", description: "Switch between 4 tools", duration: "4 min", durationSeconds: 240, difficulty: "medium", hasBonus: false, objectives: ["Select 4 different tools", "Use each tool briefly", "Switch between them smoothly"], tips: ["Lay out tools in advance", "Practice the sequence mentally first"] },
  "5": { id: "5", name: "Precision Place", description: "Place items in marked zones", duration: "5 min", durationSeconds: 300, difficulty: "medium", hasBonus: true, bonusLabel: "Featured", objectives: ["Identify the target zones", "Place items precisely", "Minimize adjustments"], tips: ["Take your time with placement", "Use visual guides"] },
  "6": { id: "6", name: "Speed Sort", description: "Sort items by category", duration: "3 min", durationSeconds: 180, difficulty: "medium", hasBonus: false, objectives: ["Gather mixed items", "Create category groups", "Sort all items correctly"], tips: ["Decide categories first", "Work quickly but accurately"] },
  "7": { id: "7", name: "One-Handed", description: "Complete tasks single-handed", duration: "4 min", durationSeconds: 240, difficulty: "hard", hasBonus: false, objectives: ["Choose your dominant hand", "Complete 3 simple tasks", "Don't use your other hand"], tips: ["Start with easier tasks", "Plan your movements"] },
  "8": { id: "8", name: "Blindfold Reach", description: "Find objects without looking", duration: "2 min", durationSeconds: 120, difficulty: "hard", hasBonus: true, bonusLabel: "New", objectives: ["Close your eyes", "Locate 3 familiar objects", "Pick them up safely"], tips: ["Know your space well", "Move slowly and carefully"] },
  "9": { id: "9", name: "Multi-Task", description: "Handle 3 items at once", duration: "5 min", durationSeconds: 300, difficulty: "hard", hasBonus: false, objectives: ["Pick up 3 items simultaneously", "Transport them together", "Place them in designated spots"], tips: ["Choose items that fit together", "Plan your grip"] },
  "10": { id: "10", name: "Mystery Box", description: "Random challenge surprise", duration: "3 min", durationSeconds: 180, difficulty: "medium", hasBonus: true, bonusLabel: "Mystery", objectives: ["Open the mystery challenge", "Complete the revealed task", "Adapt to the surprise"], tips: ["Stay flexible", "Expect the unexpected"] },
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
          onClick={() => navigate("/play")}
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
