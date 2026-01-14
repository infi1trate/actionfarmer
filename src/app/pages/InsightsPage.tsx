import * as React from "react";
import { Card } from "@/components/ui/card";
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
  ChevronRight,
} from "lucide-react";

// =====================================
// Weekly Garden Journal - Insights Page
// Editorial, playful, reflective design
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
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "h2",
    title: "Gentle with fragile items",
    description: "You naturally slowed down when it mattered",
    icon: Feather,
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    id: "h3",
    title: "Morning momentum",
    description: "Your best energy showed up early",
    icon: Sun,
    color: "bg-orange-500/10 text-orange-600",
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
    <div className="pb-24 bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      {/* ==========================================
          EDITORIAL HERO HEADER - Garden Journal
          Weekly recap style, warm and reflective
          ========================================== */}
      <header className="px-5 pt-8 pb-8">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-1">
          This Week in Your Garden
        </p>
        <p className="text-[10px] text-muted-foreground mb-3">
          {weekLabel}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
          {headline}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
          Here's what we noticed from how you completed your challenges.
        </p>
      </header>

      <div className="px-4 space-y-8">
        {/* ==========================================
            SECTION 1: This Week's Highlights
            2-4 playful insight cards
            ========================================== */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              This Week's Highlights
            </h2>
          </div>
          
          <div className="grid gap-3">
            {weeklyHighlights.map((highlight) => {
              const IconComponent = highlight.icon;
              return (
                <Card 
                  key={highlight.id}
                  className="p-4 border-0 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${highlight.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-foreground mb-0.5">
                        {highlight.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            SECTION 2: Your Patterns
            Grouped by human categories
            ========================================== */}
        <section className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <Eye className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Your Patterns
            </h2>
          </div>

          {/* How You Move */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
              How You Move
            </p>
            <div className="space-y-2">
              {movementPatterns.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </div>
          </div>

          {/* How You Handle Things */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
              How You Handle Things
            </p>
            <div className="space-y-2">
              {handlingPatterns.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 3: Weekly Garden Reflection
            Narrative tying behavior to garden metaphor
            ========================================== */}
        <section>
          <Card className="p-5 border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Weekly Garden Reflection
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your garden thrived on steady care this week. Each challenge you completed added a little more growth — 
                  not through big leaps, but through small, consistent moments of showing up. 
                  That's how gardens flourish. 🌱
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ==========================================
            SECTION 4: Looking Ahead
            Gentle anticipation copy
            ========================================== */}
        <section>
          <Card className="p-5 border-0 bg-muted/30">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                ✨ New insights unlock as you complete more challenges
              </p>
              <p className="text-xs text-muted-foreground/70">
                Next week we'll watch how your pace changes
              </p>
            </div>
          </Card>
        </section>

        {/* Privacy footer */}
        <p className="text-xs text-muted-foreground/60 text-center px-4 pb-4">
          These observations are personal and private — only you can see them.
        </p>
      </div>
    </div>
  );
}

// =====================================
// Pattern Card Component
// Soft card with icon, name, explanation
// =====================================
interface PatternCardProps {
  pattern: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isNew?: boolean;
    context?: string;
  };
}

const PatternCard = ({ pattern }: PatternCardProps) => {
  const IconComponent = pattern.icon;
  
  return (
    <Card className="p-4 border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors group cursor-default">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center flex-shrink-0 group-hover:bg-muted transition-colors">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="text-sm font-medium text-foreground">{pattern.title}</p>
            {pattern.isNew && (
              <Badge 
                variant="secondary" 
                className="text-[10px] px-1.5 py-0 h-4 bg-primary/15 text-primary border-0 font-medium"
              >
                New this week
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-snug">
            {pattern.description}
          </p>
          {pattern.context && (
            <p className="text-xs text-muted-foreground/60 mt-1">
              {pattern.context}
            </p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
      </div>
    </Card>
  );
};
