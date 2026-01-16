import * as React from "react";
import { useNavigate } from "react-router-dom";
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
  Loader2,
  Lock,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";

// =====================================
// Weekly Garden Journal - Insights Page
// Gated until 5 completed challenges
// =====================================

const UNLOCK_THRESHOLD = 5;

export function InsightsPage() {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const { currentWeekInsight, sessions, loading: dataLoading } = useAppData();
  const [whyExpanded, setWhyExpanded] = React.useState(false);

  // Loading state with skeletons
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-primary/2 to-transparent" />
          <div className="relative px-6 pt-12 pb-10">
            <Skeleton className="h-3 w-32 mb-5" />
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-4 w-40" />
          </div>
        </header>
        <section className="px-5 pb-6">
          <Skeleton className="h-48 rounded-3xl" />
        </section>
        <section className="px-5 pb-6">
          <Skeleton className="h-32 rounded-2xl" />
        </section>
      </div>
    );
  }

  // Count completed/submitted sessions
  const completedCount = sessions.filter(
    s => s.status === "completed" || s.status === "submitted"
  ).length;

  // ==========================================
  // LOCKED STATE - Less than 5 challenges
  // ==========================================
  if (completedCount < UNLOCK_THRESHOLD) {
    const progress = Math.min(completedCount, UNLOCK_THRESHOLD);
    const progressPercent = (progress / UNLOCK_THRESHOLD) * 100;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-primary/2 to-transparent" />
          
          <div className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-5">
              Weekly Garden Recap
            </p>
            
            <h1 className="text-[32px] md:text-[42px] font-bold text-foreground tracking-tight leading-[1.1] mb-4">
              Insights
            </h1>
            
            <p className="text-sm text-muted-foreground/70">
              Discover patterns in how you move and work
            </p>
          </div>
        </header>

        {/* Locked state card */}
        <section className="px-5 pb-6">
          <div className="rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 border border-border/30 p-8 text-center">
            {/* Lock icon */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
              <Lock className="h-10 w-10 text-primary/50" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Unlock your weekly recap
            </h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-8">
              Complete 5 challenges to unlock your first weekly garden recap with personalized patterns and insights.
            </p>

            {/* Progress meter */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Progress</span>
                <span className="text-xs font-semibold text-foreground">{progress}/{UNLOCK_THRESHOLD} challenges</span>
              </div>
              <div className="h-3 rounded-full bg-muted/60 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 rounded-full" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              {progress > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  {UNLOCK_THRESHOLD - progress} more to go!
                </p>
              )}
            </div>

            {/* Primary CTA */}
            <button
              onClick={() => navigate("/challenges")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              🌱 Browse challenges
            </button>
          </div>
        </section>

        {/* Why this matters - Accordion */}
        <section className="px-5 pb-10">
          <button
            onClick={() => setWhyExpanded(!whyExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/30 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary/70" />
              </div>
              <span className="text-sm font-medium text-foreground">Why this matters</span>
            </div>
            {whyExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          {whyExpanded && (
            <div className="mt-3 p-5 rounded-2xl bg-muted/10 border border-border/20">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div className="flex gap-3">
                  <Eye className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-medium text-foreground">Private to you.</span> Your insights are personal and never shared with anyone. Only you can see your patterns.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-medium text-foreground">Patterns, not judgments.</span> We observe how you naturally move and work—not to grade you, but to help you understand yourself better.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Leaf className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-medium text-foreground">5 challenges minimum.</span> We need enough data to find meaningful patterns. Quality insights take time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Privacy footer */}
        <footer className="px-6 pb-28 text-center">
          <p className="text-[11px] text-muted-foreground/40">
            Your observations are personal and private — only you can see them.
          </p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // UNLOCKED BUT NO INSIGHTS YET
  // ==========================================
  if (!currentWeekInsight) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-primary/2 to-transparent" />
          
          <div className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-5">
              Weekly Garden Recap
            </p>
            
            <h1 className="text-[32px] md:text-[42px] font-bold text-foreground tracking-tight leading-[1.1] mb-4">
              Insights
            </h1>
            
            <p className="text-sm text-muted-foreground/70">
              Your personalized weekly recap
            </p>
          </div>
        </header>

        {/* Preparing state */}
        <section className="px-5 pb-10">
          <div className="rounded-3xl bg-gradient-to-b from-primary/8 to-primary/2 border border-primary/10 p-8 text-center">
            {/* Gentle animation */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
              <Sparkles className="h-10 w-10 text-primary/60 animate-pulse" />
            </div>
            
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Your first recap is being prepared
            </h2>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-4">
              We're analyzing your {completedCount} completed challenges to find meaningful patterns. Check back soon!
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              <Leaf className="h-4 w-4" />
              <span>Usually ready within a day</span>
            </div>
          </div>
        </section>

        {/* Privacy footer */}
        <footer className="px-6 pb-28 text-center">
          <p className="text-[11px] text-muted-foreground/40">
            Your observations are personal and private — only you can see them.
          </p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // FULL INSIGHTS VIEW - Real data
  // ==========================================
  const insight = currentWeekInsight;
  
  // Parse week dates
  const weekStart = new Date(insight.week_start);
  const weekEnd = new Date(insight.week_end);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const weekLabel = `Week of ${formatDate(weekStart)}–${formatDate(weekEnd)}`;
  
  // Headline from insight or fallback
  const headline = insight.headline || "A week of steady growth 🌿";
  
  // Highlights from insight
  const highlights = insight.highlights || [];
  const heroHighlight = highlights[0];
  const supportingNotes = highlights.slice(1);
  
  // Patterns from insight
  const movementPatterns = insight.patterns?.movement || [];
  const handlingPatterns = insight.patterns?.handling || [];

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    Feather,
    Sun,
    Move,
    TrendingUp,
    Hand,
    Heart,
    Sparkles,
    Leaf,
    Eye,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ==========================================
          EDITORIAL HEADER
          ========================================== */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-primary/2 to-transparent" />
        
        <div className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-5">
            This Week in Your Garden
          </p>
          
          <h1 className="text-[32px] md:text-[42px] font-bold text-foreground tracking-tight leading-[1.1] mb-4">
            {headline}
          </h1>
          
          <p className="text-sm text-muted-foreground/70">
            {weekLabel}
          </p>
        </div>
      </header>

      {/* ==========================================
          HERO INSIGHT
          ========================================== */}
      {heroHighlight && (
        <section className="px-5 pb-6">
          {(() => {
            const HeroIcon = iconMap[heroHighlight.icon || "Zap"] || Zap;
            return (
              <div className={`relative rounded-3xl bg-gradient-to-br ${heroHighlight.accent || "from-amber-500/20 to-amber-500/5"} p-8 overflow-hidden`}>
                <div className="absolute -top-4 -right-4 opacity-[0.07]">
                  <HeroIcon className="h-40 w-40" />
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-5">
                  <HeroIcon className="h-8 w-8 text-amber-600" />
                </div>
                
                <h2 className="text-2xl md:text-[28px] font-semibold text-foreground tracking-tight mb-2">
                  {heroHighlight.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
                  {heroHighlight.description}
                </p>
              </div>
            );
          })()}
        </section>
      )}

      {/* ==========================================
          SUPPORTING NOTES
          ========================================== */}
      {supportingNotes.length > 0 && (
        <section className="px-5 pb-10">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Also this week
          </p>
          <div className="space-y-2">
            {supportingNotes.map((note) => {
              const NoteIcon = iconMap[note.icon || "Zap"] || Zap;
              return (
                <div 
                  key={note.id}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-muted/30"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted/80 flex items-center justify-center flex-shrink-0">
                    <NoteIcon className="h-4 w-4 text-muted-foreground" />
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
      )}

      {/* Soft divider */}
      {(movementPatterns.length > 0 || handlingPatterns.length > 0) && (
        <div className="mx-6 h-px bg-border/50 mb-8" />
      )}

      {/* ==========================================
          PATTERNS
          ========================================== */}
      {(movementPatterns.length > 0 || handlingPatterns.length > 0) && (
        <section className="px-5 pb-10">
          <div className="flex items-center gap-2.5 mb-8">
            <Eye className="h-4 w-4 text-primary" />
            <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
              Your Patterns
            </h2>
          </div>

          {movementPatterns.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                How You Move
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {movementPatterns.map((pattern) => (
                  <InsightCard key={pattern.id} pattern={pattern} iconMap={iconMap} />
                ))}
              </div>
            </div>
          )}

          {handlingPatterns.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                How You Handle Things
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {handlingPatterns.map((pattern) => (
                  <InsightCard key={pattern.id} pattern={pattern} iconMap={iconMap} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Soft divider */}
      <div className="mx-6 h-px bg-border/40 mb-10" />

      {/* ==========================================
          REFLECTION
          ========================================== */}
      <section className="px-5 pb-12">
        <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-4 px-1">
          Weekly Reflection
        </p>
        
        <div className="relative rounded-3xl bg-gradient-to-b from-primary/6 via-primary/3 to-primary/1 px-7 py-8 md:px-10 md:py-10">
          <div className="absolute top-6 right-6 opacity-[0.08]">
            <Leaf className="h-16 w-16" />
          </div>
          
          <p className="text-primary/40 text-2xl mb-4 font-serif italic">"</p>
          
          <p className="text-[17px] md:text-lg text-foreground/85 leading-[1.8] tracking-wide font-light mb-5">
            {currentWeekInsight?.headline || "Your garden grew through steady care this week."}
          </p>
          
          <p className="text-[15px] md:text-base text-muted-foreground leading-[1.9] tracking-wide font-light">
            You completed {sessions.filter(s => s.status === "completed" || s.status === "submitted").length} challenge{sessions.filter(s => s.status === "completed" || s.status === "submitted").length !== 1 ? "s" : ""} this week—each one adding a little more growth to your garden journey. 🌱
          </p>
        </div>
      </section>

      {/* ==========================================
          LOOKING AHEAD
          ========================================== */}
      <section className="px-5 pb-10">
        <div className="rounded-2xl bg-gradient-to-br from-muted/50 via-muted/30 to-transparent p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary/60" />
            </div>
          </div>
          
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
// =====================================
interface InsightCardProps {
  pattern: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    isNew?: boolean;
    context?: string;
  };
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

const InsightCard = ({ pattern, iconMap }: InsightCardProps) => {
  const IconComponent = iconMap[pattern.icon || "Move"] || Move;
  
  return (
    <div className="rounded-2xl bg-card/70 p-4 hover:bg-card transition-colors">
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
      
      <p className="text-sm font-medium text-foreground mb-1 leading-snug">
        {pattern.title}
      </p>
      
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {pattern.description}
      </p>
      
      {pattern.context && (
        <p className="text-[10px] text-muted-foreground/50 font-medium">
          {pattern.context}
        </p>
      )}
    </div>
  );
};
