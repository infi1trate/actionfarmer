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
  scene: {
    gradient: string;
    icon: string;
    accent: string;
  };
}

const challenges: Challenge[] = [
  { 
    id: "1", 
    name: "Dishwasher Unload", 
    description: "Unload a full dishwasher efficiently", 
    duration: "5 min", 
    difficulty: "easy", 
    hasBonus: false,
    scene: { gradient: "from-sky-500/20 via-blue-500/10 to-transparent", icon: "💧", accent: "bg-sky-500/20" }
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
    scene: { gradient: "from-emerald-500/20 via-green-500/10 to-transparent", icon: "🥬", accent: "bg-emerald-500/20" }
  },
  { 
    id: "3", 
    name: "Fold Laundry", 
    description: "Fold a load of clean laundry neatly", 
    duration: "10 min", 
    difficulty: "easy", 
    hasBonus: false,
    scene: { gradient: "from-violet-500/20 via-purple-500/10 to-transparent", icon: "👕", accent: "bg-violet-500/20" }
  },
  { 
    id: "4", 
    name: "Make Bed", 
    description: "Make your bed with fresh or existing linens", 
    duration: "3 min", 
    difficulty: "easy", 
    hasBonus: false,
    scene: { gradient: "from-amber-500/20 via-orange-500/10 to-transparent", icon: "🛏️", accent: "bg-amber-500/20" }
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
    scene: { gradient: "from-rose-500/20 via-pink-500/10 to-transparent", icon: "🍽️", accent: "bg-rose-500/20" }
  },
  { 
    id: "6", 
    name: "Carry Laundry Basket", 
    description: "Transport laundry between rooms safely", 
    duration: "2 min", 
    difficulty: "medium", 
    hasBonus: false,
    scene: { gradient: "from-teal-500/20 via-cyan-500/10 to-transparent", icon: "🧺", accent: "bg-teal-500/20" }
  },
  { 
    id: "7", 
    name: "Organize Shelf", 
    description: "Reorganize items on a cluttered shelf", 
    duration: "6 min", 
    difficulty: "medium", 
    hasBonus: false,
    scene: { gradient: "from-indigo-500/20 via-blue-500/10 to-transparent", icon: "📚", accent: "bg-indigo-500/20" }
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
    scene: { gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent", icon: "🏺", accent: "bg-fuchsia-500/20" }
  },
  { 
    id: "9", 
    name: "Trash & Recycling Sort", 
    description: "Sort waste into proper bins", 
    duration: "5 min", 
    difficulty: "medium", 
    hasBonus: false,
    scene: { gradient: "from-lime-500/20 via-green-500/10 to-transparent", icon: "♻️", accent: "bg-lime-500/20" }
  },
  { 
    id: "10", 
    name: "Task Transitions", 
    description: "Complete a sequence of quick household tasks", 
    duration: "7 min", 
    difficulty: "hard", 
    hasBonus: true, 
    bonusLabel: "Multi-Task",
    scene: { gradient: "from-orange-500/20 via-red-500/10 to-transparent", icon: "⚡", accent: "bg-orange-500/20" }
  },
];

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  medium: { label: "Medium", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  hard: { label: "Hard", className: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
};

interface SceneCardProps {
  challenge: Challenge;
  onClick: () => void;
  featured?: boolean;
}

const SceneCard = ({ challenge, onClick, featured = false }: SceneCardProps) => {
  const diffConfig = difficultyConfig[challenge.difficulty];
  
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden rounded-2xl text-left
        transition-all duration-300 ease-out
        active:scale-[0.98]
        ${featured 
          ? 'min-h-[180px] border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10' 
          : 'min-h-[140px] border border-border bg-card hover:border-primary/20'
        }
      `}
    >
      {/* Ambient gradient background */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${challenge.scene.gradient}
        opacity-60 group-hover:opacity-80 transition-opacity duration-500
      `} />
      
      {/* Subtle scene pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--foreground))_1px,_transparent_1px)] bg-[length:24px_24px]" />
      
      {/* Large floating icon */}
      <div className={`
        absolute -right-4 -bottom-4 text-[80px] leading-none
        opacity-20 group-hover:opacity-30 group-hover:scale-110
        transition-all duration-500 ease-out
        ${featured ? 'text-[100px] -right-2 -bottom-2' : ''}
      `}>
        {challenge.scene.icon}
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div className="space-y-2">
          {/* Top badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {challenge.hasBonus && (
              <Badge className="text-[10px] px-2 py-0.5 bg-primary text-primary-foreground border-0 shadow-sm">
                <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                {challenge.bonusLabel}
              </Badge>
            )}
            {featured && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/40 text-primary">
                <Sparkles className="h-2.5 w-2.5 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          {/* Title */}
          <h3 className={`
            font-display font-bold text-foreground
            ${featured ? 'text-xl' : 'text-lg'}
          `}>
            {challenge.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 max-w-[85%]">
            {challenge.description}
          </p>
        </div>
        
        {/* Bottom row - metadata + action */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-lg">
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
            shadow-md shadow-primary/25
            group-hover:shadow-lg group-hover:shadow-primary/30
            group-hover:scale-110 transition-all duration-300
            ${featured ? 'w-11 h-11' : 'w-9 h-9'}
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
