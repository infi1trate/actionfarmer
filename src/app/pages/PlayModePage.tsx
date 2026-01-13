import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MainAppShell, ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Zap,
  Star,
  Home,
  Camera,
  Gamepad2,
  User,
  ChevronRight,
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

const tabs: TabItem[] = [
  { label: "Home", icon: Home, href: "/app" },
  { label: "Ambient", icon: Camera, href: "/ambient" },
  { label: "Play", icon: Gamepad2, href: "/play" },
  { label: "Profile", icon: User, href: "/profile" },
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
}

const challenges: Challenge[] = [
  { id: "1", name: "Kitchen Grab", description: "Pick up 5 kitchen items", duration: "2 min", difficulty: "easy", hasBonus: false },
  { id: "2", name: "Desk Organizer", description: "Arrange items on your desk", duration: "3 min", difficulty: "easy", hasBonus: true, bonusLabel: "2x XP" },
  { id: "3", name: "Quick Stack", description: "Stack 3 objects carefully", duration: "1 min", difficulty: "easy", hasBonus: false },
  { id: "4", name: "Tool Swap", description: "Switch between 4 tools", duration: "4 min", difficulty: "medium", hasBonus: false },
  { id: "5", name: "Precision Place", description: "Place items in marked zones", duration: "5 min", difficulty: "medium", hasBonus: true, bonusLabel: "Featured" },
  { id: "6", name: "Speed Sort", description: "Sort items by category", duration: "3 min", difficulty: "medium", hasBonus: false },
  { id: "7", name: "One-Handed", description: "Complete tasks single-handed", duration: "4 min", difficulty: "hard", hasBonus: false },
  { id: "8", name: "Blindfold Reach", description: "Find objects without looking", duration: "2 min", difficulty: "hard", hasBonus: true, bonusLabel: "New" },
  { id: "9", name: "Multi-Task", description: "Handle 3 items at once", duration: "5 min", difficulty: "hard", hasBonus: false },
  { id: "10", name: "Mystery Box", description: "Random challenge surprise", duration: "? min", difficulty: "medium", hasBonus: true, bonusLabel: "Mystery" },
];

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/10 text-emerald-600" },
  medium: { label: "Medium", className: "bg-amber-500/10 text-amber-600" },
  hard: { label: "Hard", className: "bg-rose-500/10 text-rose-600" },
};

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

const ChallengeCard = ({ challenge, onClick }: ChallengeCardProps) => {
  const diffConfig = difficultyConfig[challenge.difficulty];
  
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Gamepad2 className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{challenge.name}</p>
                {challenge.hasBonus && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-brand-yellow/20 text-brand-yellow-foreground border-0">
                    <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                    {challenge.bonusLabel}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{challenge.duration}</span>
            </div>
            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 border-0 ${diffConfig.className}`}>
              <Zap className="h-2.5 w-2.5 mr-0.5" />
              {diffConfig.label}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

const PlayModePage = () => {
  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: string) => {
    // Placeholder - would navigate to challenge detail
    console.log("Challenge clicked:", challengeId);
  };

  const featuredChallenge = challenges.find(c => c.bonusLabel === "Featured");
  const otherChallenges = challenges.filter(c => c.bonusLabel !== "Featured");

  return (
    <MainAppShell
      title="Play Mode"
      tabs={tabs}
    >
      <ContentSection className="space-y-6">
        {/* Featured Challenge */}
        {featuredChallenge && (
          <div className="space-y-2">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Featured</h2>
            <Card 
              className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 cursor-pointer hover:from-primary/10 hover:to-primary/15 transition-colors"
              onClick={() => handleChallengeClick(featuredChallenge.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Star className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{featuredChallenge.name}</p>
                    <Badge className="text-[10px] bg-brand-yellow text-brand-yellow-foreground border-0">
                      2x XP
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{featuredChallenge.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-xs">{featuredChallenge.duration}</span>
                    </div>
                    <Badge variant="secondary" className={`text-xs border-0 ${difficultyConfig[featuredChallenge.difficulty].className}`}>
                      {difficultyConfig[featuredChallenge.difficulty].label}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}

        {/* All Challenges */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All Challenges</h2>
            <span className="text-xs text-muted-foreground">{challenges.length} available</span>
          </div>
          
          <div className="space-y-2">
            {otherChallenges.map((challenge) => (
              <ChallengeCard 
                key={challenge.id} 
                challenge={challenge} 
                onClick={() => handleChallengeClick(challenge.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <Card className="p-4 bg-muted/20 border-0">
          <p className="text-xs text-muted-foreground text-center">
            New challenges added weekly. Complete challenges to earn rewards.
          </p>
        </Card>
      </ContentSection>
    </MainAppShell>
  );
};

export default PlayModePage;
