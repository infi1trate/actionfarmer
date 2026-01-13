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
  Target,
  DollarSign,
  BarChart3,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import type { TabItem } from "@/components/ui/bottom-tab-bar";

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
}

const challenges: Challenge[] = [
  { id: "1", name: "Dishwasher Unload", description: "Unload a full dishwasher efficiently", duration: "5 min", difficulty: "easy", hasBonus: false },
  { id: "2", name: "Grocery Unload", description: "Unpack groceries and organize in storage", duration: "8 min", difficulty: "medium", hasBonus: true, bonusLabel: "2x XP", isWeeklyFeatured: true },
  { id: "3", name: "Fold Laundry", description: "Fold a load of clean laundry neatly", duration: "10 min", difficulty: "easy", hasBonus: false },
  { id: "4", name: "Make Bed", description: "Make your bed with fresh or existing linens", duration: "3 min", difficulty: "easy", hasBonus: false },
  { id: "5", name: "Reset Table", description: "Clear and reset a dining table", duration: "4 min", difficulty: "easy", hasBonus: true, bonusLabel: "Featured", isWeeklyFeatured: true },
  { id: "6", name: "Carry Laundry Basket", description: "Transport laundry between rooms safely", duration: "2 min", difficulty: "medium", hasBonus: false },
  { id: "7", name: "Organize Shelf", description: "Reorganize items on a cluttered shelf", duration: "6 min", difficulty: "medium", hasBonus: false },
  { id: "8", name: "Handle Fragile Items", description: "Carefully move delicate glassware or ceramics", duration: "4 min", difficulty: "hard", hasBonus: true, bonusLabel: "Precision", isWeeklyFeatured: true },
  { id: "9", name: "Trash & Recycling Sort", description: "Sort waste into proper bins", duration: "5 min", difficulty: "medium", hasBonus: false },
  { id: "10", name: "Task Transitions", description: "Complete a sequence of quick household tasks", duration: "7 min", difficulty: "hard", hasBonus: true, bonusLabel: "Multi-Task" },
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
          <Target className="h-5 w-5 text-primary" />
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
      <ContentSection className="space-y-6">
        {/* Weekly Featured Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">This Week's Featured</h2>
          </div>
          
          <div className="space-y-2">
            {weeklyFeatured.map((challenge) => (
              <Card 
                key={challenge.id}
                className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 cursor-pointer hover:from-primary/10 hover:to-primary/15 transition-colors active:scale-[0.98]"
                onClick={() => handleChallengeClick(challenge.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">{challenge.name}</p>
                      {challenge.hasBonus && (
                        <Badge className="text-[10px] bg-brand-yellow text-brand-yellow-foreground border-0">
                          <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                          {challenge.bonusLabel}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{challenge.description}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{challenge.duration}</span>
                      </div>
                      <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 border-0 ${difficultyConfig[challenge.difficulty].className}`}>
                        <Zap className="h-2.5 w-2.5 mr-0.5" />
                        {difficultyConfig[challenge.difficulty].label}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Challenges */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All Challenges</h2>
            <span className="text-xs text-muted-foreground">{challenges.length} available</span>
          </div>
          
          <div className="space-y-2">
            {allChallenges.map((challenge) => (
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
            New challenges added weekly. Recording happens automatically during each challenge.
          </p>
        </Card>
      </ContentSection>
    </MainAppShell>
  );
};

export { ChallengesPage };
export default ChallengesPage;
