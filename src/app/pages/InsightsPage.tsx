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

  // Hero insight - the most notable pattern this week
  const heroInsight = weeklyHighlights[0];
  const HeroIcon = heroInsight.icon;
  const supportingNotes = weeklyHighlights.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* ==========================================
          EDITORIAL HEADER
          Single eyebrow + large headline + week date
          ========================================== */}
      <header className="relative overflow-hidden">
        {/* Soft gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-primary/2 to-transparent" />
        
        <div className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14">
          {/* Eyebrow only */}
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-5">
            This Week in Your Garden
          </p>
          
          {/* Large editorial headline */}
          <h1 className="text-[32px] md:text-[42px] font-bold text-foreground tracking-tight leading-[1.1] mb-4">
            {headline}
          </h1>
          
          {/* Week date - muted subline */}
          <p className="text-sm text-muted-foreground/70">
            {weekLabel}
          </p>
        </div>
      </header>

      {/* ==========================================
          HERO INSIGHT
          Large featured card for most notable pattern
          ========================================== */}
      <section className="px-5 pb-6">
        <div className={`relative rounded-3xl bg-gradient-to-br ${heroInsight.accent} p-8 overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute -top-4 -right-4 opacity-[0.07]">
            <HeroIcon className="h-40 w-40" />
          </div>
          
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl ${heroInsight.iconBg} flex items-center justify-center mb-5`}>
            <HeroIcon className={`h-8 w-8 ${heroInsight.iconColor}`} />
          </div>
          
          {/* Content */}
          <h2 className="text-2xl md:text-[28px] font-semibold text-foreground tracking-tight mb-2">
            {heroInsight.title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
            {heroInsight.description}
          </p>
        </div>
      </section>

      {/* ==========================================
          SUPPORTING NOTES
          Smaller secondary insights beneath hero
          ========================================== */}
      <section className="px-5 pb-10">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
          Also this week
        </p>
        <div className="space-y-2">
          {supportingNotes.map((note) => {
            const NoteIcon = note.icon;
            return (
              <div 
                key={note.id}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-muted/30"
              >
                <div className={`w-9 h-9 rounded-xl ${note.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <NoteIcon className={`h-4.5 w-4.5 ${note.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {note.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                    {note.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Soft divider */}
      <div className="mx-6 h-px bg-border/50 mb-8" />

      {/* ==========================================
          PATTERNS - Clustered insight groups
          Browsable, exploratory grid layout
          ========================================== */}
      <section className="px-5 pb-10">
        <div className="flex items-center gap-2.5 mb-8">
          <Eye className="h-4 w-4 text-primary" />
          <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
            Your Patterns
          </h2>
        </div>

        {/* How You Move - Cluster */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            How You Move
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {movementPatterns.map((pattern) => (
              <InsightCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>

        {/* How You Handle Things - Cluster */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            How You Handle Things
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {handlingPatterns.map((pattern) => (
              <InsightCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </div>
      </section>

      {/* Soft divider */}
      <div className="mx-6 h-px bg-border/40 mb-10" />

      {/* ==========================================
          REFLECTION - Editorial journal block
          Soft, reflective, personal note feeling
          ========================================== */}
      <section className="px-5 pb-12">
        {/* Section label - subtle */}
        <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-4 px-1">
          Weekly Reflection
        </p>
        
        {/* Journal entry card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-primary/6 via-primary/3 to-primary/1 px-7 py-8 md:px-10 md:py-10">
          {/* Decorative leaf */}
          <div className="absolute top-6 right-6 opacity-[0.08]">
            <Leaf className="h-16 w-16" />
          </div>
          
          {/* Opening flourish */}
          <p className="text-primary/40 text-2xl mb-4 font-serif italic">"</p>
          
          {/* Main reflection text - journal typography */}
          <p className="text-[17px] md:text-lg text-foreground/85 leading-[1.8] tracking-wide font-light mb-5">
            Your garden thrived on steady care this week.
          </p>
          
          <p className="text-[15px] md:text-base text-muted-foreground leading-[1.9] tracking-wide font-light">
            Each challenge you completed added a little more growth — not through big leaps, 
            but through small, consistent moments of showing up. That's how gardens flourish. 🌱
          </p>
        </div>
      </section>

      {/* ==========================================
          LOOKING AHEAD - Curiosity teaser
          Encouraging, gradual, not gated
          ========================================== */}
      <section className="px-5 pb-10">
        <div className="rounded-2xl bg-gradient-to-br from-muted/50 via-muted/30 to-transparent p-6 text-center">
          {/* Gentle growing icon */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary/60" />
            </div>
          </div>
          
          {/* Curious, forward-looking copy */}
          <p className="text-[15px] text-foreground/80 leading-relaxed mb-2">
            Your story is still being written
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
            Each challenge reveals a little more about how you move through your day. 
            We're curious to see what patterns emerge next.
          </p>
        </div>
      </section>

      {/* Privacy footer */}
      <footer className="px-6 pb-28 text-center">
        <p className="text-[11px] text-muted-foreground/40">
          These observations are personal and private — only you can see them.
        </p>
      </footer>
    </div>
  );
}

// =====================================
// Insight Card Component
// Browsable card for pattern clusters
// No chevrons - exploratory, not navigational
// =====================================
interface InsightCardProps {
  pattern: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isNew?: boolean;
    context?: string;
  };
}

const InsightCard = ({ pattern }: InsightCardProps) => {
  const IconComponent = pattern.icon;
  
  return (
    <div className="rounded-2xl bg-card/70 p-4 hover:bg-card transition-colors cursor-pointer">
      {/* Icon + New badge row */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        </div>
        {pattern.isNew && (
          <Badge 
            variant="secondary" 
            className="text-[9px] px-1.5 py-0.5 h-auto bg-primary/12 text-primary border-0 font-medium"
          >
            New
          </Badge>
        )}
      </div>
      
      {/* Title */}
      <p className="text-sm font-medium text-foreground mb-1 leading-snug">
        {pattern.title}
      </p>
      
      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {pattern.description}
      </p>
      
      {/* Context */}
      {pattern.context && (
        <p className="text-[10px] text-muted-foreground/50 font-medium">
          {pattern.context}
        </p>
      )}
    </div>
  );
};
