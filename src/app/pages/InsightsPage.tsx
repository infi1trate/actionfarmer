import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles,
  Hand,
  Move,
  Zap,
  Feather,
  Sun,
  Leaf,
  TrendingUp,
  Heart,
  Eye,
  BookOpen,
  ArrowRight,
} from "lucide-react";

// =====================================
// Weekly Garden Journal - Insights Page
// Editorial digest layout with storytelling hierarchy
// =====================================

// Dynamic weekly headline options
const weeklyHeadlines = [
  "You moved with intention 🌱",
  "A week of steady growth 🌿",
  "Your rhythm found its flow 💫",
  "Gentle progress, real results ✨",
];

// This week's highlights - playful insight cards
const weeklyHighlights = [
  {
    id: "h1",
    title: "Your smoothest week yet",
    description: "Transitions between tasks felt effortless",
    icon: Zap,
    accent: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
  {
    id: "h2",
    title: "Gentle with fragile items",
    description: "You naturally slowed down when it mattered",
    icon: Feather,
    accent: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-600",
  },
  {
    id: "h3",
    title: "Morning momentum",
    description: "Your best energy showed up early",
    icon: Sun,
    accent: "from-orange-500/20 to-orange-500/5",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-600",
  },
];

// Pattern insights grouped by human category
const movementPatterns = [
  {
    id: "m1",
    title: "Flowing reach",
    description: "Your reaching motions have a natural, relaxed quality",
    icon: Move,
    isNew: true,
    context: "Seen in 8 challenges",
  },
  {
    id: "m2",
    title: "Steady pacing",
    description: "You maintain a consistent rhythm throughout tasks",
    icon: TrendingUp,
    context: "Seen in 12 challenges",
  },
];

const handlingPatterns = [
  {
    id: "hd1",
    title: "Secure grip",
    description: "You favor grip styles that provide extra stability",
    icon: Hand,
    context: "Seen in 6 challenges",
  },
  {
    id: "hd2",
    title: "Careful precision",
    description: "Delicate items get the attention they deserve",
    icon: Heart,
    isNew: true,
    context: "Seen in 4 challenges",
  },
];

export function InsightsPage() {
  // Get current week label
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const weekLabel = `Week of ${formatDate(weekStart)}–${formatDate(weekEnd)}`;
  
  // Pick a consistent headline for the week
  const weekNumber = Math.floor(today.getTime() / (7 * 24 * 60 * 60 * 1000));
  const headline = weeklyHeadlines[weekNumber % weeklyHeadlines.length];

  return (
    <div className="min-h-screen bg-background">
      {/* ==========================================
          EDITORIAL MASTHEAD
          Magazine-style header with generous spacing
          ========================================== */}
      <header className="relative overflow-hidden">
        {/* Soft gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent" />
        
        <div className="relative px-6 pt-10 pb-12 md:pt-14 md:pb-16">
          {/* Journal icon + eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-[0.15em]">
              This Week in Your Garden
            </span>
          </div>
          
          {/* Main headline - editorial scale */}
          <h1 className="text-[28px] md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-3">
            {headline}
          </h1>
          
          {/* Subhead with date */}
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm mb-2">
            Here's what we noticed from how you completed your challenges.
          </p>
          <p className="text-xs text-muted-foreground/60 font-medium">
            {weekLabel}
          </p>
        </div>
      </header>

      {/* ==========================================
          HIGHLIGHTS - Featured story cards
          Large, visually distinct cards
          ========================================== */}
      <section className="px-5 pb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
            This Week's Highlights
          </h2>
        </div>
        
        {/* Featured highlight - hero card */}
        {weeklyHighlights[0] && (() => {
          const FeaturedIcon = weeklyHighlights[0].icon;
          return (
            <div className={`relative rounded-2xl bg-gradient-to-br ${weeklyHighlights[0].accent} p-6 mb-4 overflow-hidden`}>
              <div className="absolute top-4 right-4 opacity-10">
                <FeaturedIcon className="h-24 w-24" />
              </div>
              <div className={`w-14 h-14 rounded-2xl ${weeklyHighlights[0].iconBg} flex items-center justify-center mb-4`}>
                <FeaturedIcon className={`h-7 w-7 ${weeklyHighlights[0].iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1.5">
                {weeklyHighlights[0].title}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {weeklyHighlights[0].description}
              </p>
            </div>
          );
        })()}
        
        {/* Secondary highlights - compact grid */}
        <div className="grid grid-cols-2 gap-3">
          {weeklyHighlights.slice(1).map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div 
                key={highlight.id}
                className={`rounded-xl bg-gradient-to-br ${highlight.accent} p-4`}
              >
                <div className={`w-10 h-10 rounded-xl ${highlight.iconBg} flex items-center justify-center mb-3`}>
                  <IconComponent className={`h-5 w-5 ${highlight.iconColor}`} />
                </div>
                <p className="text-sm font-medium text-foreground mb-0.5 leading-snug">
                  {highlight.title}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Soft divider */}
      <div className="mx-6 h-px bg-border/50 mb-10" />

      {/* ==========================================
          PATTERNS - Grouped editorial sections
          Clean typography hierarchy
          ========================================== */}
      <section className="px-5 pb-10">
        <div className="flex items-center gap-2.5 mb-6">
          <Eye className="h-4 w-4 text-primary" />
          <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
            Your Patterns
          </h2>
        </div>

        {/* How You Move - Pattern group */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Move className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              How You Move
            </h3>
          </div>
          <div className="space-y-3">
            {movementPatterns.map((pattern) => (
              <PatternRow key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>

        {/* How You Handle Things - Pattern group */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Hand className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              How You Handle Things
            </h3>
          </div>
          <div className="space-y-3">
            {handlingPatterns.map((pattern) => (
              <PatternRow key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>
      </section>

      {/* Soft divider */}
      <div className="mx-6 h-px bg-border/50 mb-10" />

      {/* ==========================================
          REFLECTION - Narrative section
          Full-width, editorial prose feel
          ========================================== */}
      <section className="px-6 pb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Leaf className="h-4 w-4 text-primary" />
          <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
            Weekly Reflection
          </h2>
        </div>
        
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-6">
          <p className="text-[15px] text-foreground/90 leading-relaxed mb-4">
            Your garden thrived on steady care this week.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each challenge you completed added a little more growth — not through big leaps, 
            but through small, consistent moments of showing up. That's how gardens flourish. 🌱
          </p>
        </div>
      </section>

      {/* ==========================================
          LOOKING AHEAD - Anticipation footer
          Gentle, forward-looking
          ========================================== */}
      <section className="px-6 pb-8">
        <div className="rounded-xl bg-muted/40 p-5 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ✨ New insights unlock as you complete more challenges
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
            <span>Next week we'll watch how your pace changes</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </section>

      {/* Privacy footer */}
      <footer className="px-6 pb-28 text-center">
        <p className="text-[11px] text-muted-foreground/50">
          These observations are personal and private — only you can see them.
        </p>
      </footer>
    </div>
  );
}

// =====================================
// Pattern Row Component
// Clean, readable pattern display
// =====================================
interface PatternRowProps {
  pattern: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isNew?: boolean;
    context?: string;
  };
}

const PatternRow = ({ pattern }: PatternRowProps) => {
  const IconComponent = pattern.icon;
  
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card/60 hover:bg-card/80 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <IconComponent className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-[15px] font-medium text-foreground">{pattern.title}</span>
          {pattern.isNew && (
            <Badge 
              variant="secondary" 
              className="text-[10px] px-1.5 py-0 h-4 bg-primary/12 text-primary border-0 font-medium"
            >
              New
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pattern.description}
        </p>
        {pattern.context && (
          <p className="text-xs text-muted-foreground/50 mt-1.5">
            {pattern.context}
          </p>
        )}
      </div>
    </div>
  );
};
