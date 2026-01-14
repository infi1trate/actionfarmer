import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles,
  Hand,
  Move,
  RotateCcw,
  Grip,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";

interface InsightCard {
  id: string;
  category: "movement" | "handling" | "pattern";
  title: string;
  observation: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  isNew?: boolean;
}

// Neutral, positive observations - no advice, no diagnosis, no raw metrics
const insights: InsightCard[] = [
  {
    id: "1",
    category: "movement",
    title: "Consistent reach patterns",
    observation: "You tend to reach with smooth, flowing motions",
    detail: "When picking up items, your movements show a natural rhythm that stays consistent across different tasks.",
    icon: Move,
    isNew: true,
  },
  {
    id: "2",
    category: "handling",
    title: "Secure grip preference",
    observation: "You often use a full-hand grip for stability",
    detail: "When handling objects, you frequently choose grip styles that provide extra control and security.",
    icon: Grip,
  },
  {
    id: "3",
    category: "movement",
    title: "Efficient transitions",
    observation: "Your task-to-task transitions are fluid",
    detail: "Moving between different activities, you maintain a steady pace without rushing or hesitation.",
    icon: RotateCcw,
  },
  {
    id: "4",
    category: "handling",
    title: "Careful with fragile items",
    observation: "You naturally slow down for delicate objects",
    detail: "When working with breakable or fragile items, your handling pace adjusts to match the care needed.",
    icon: Hand,
    isNew: true,
  },
  {
    id: "5",
    category: "pattern",
    title: "Morning activity peak",
    observation: "You're often most active in the morning hours",
    detail: "Your recorded activity shows a tendency toward completing tasks during earlier parts of the day.",
    icon: Clock,
  },
  {
    id: "6",
    category: "pattern",
    title: "Steady improvement",
    observation: "Your familiarity with tasks is growing",
    detail: "Over recent challenges, your movements show increasing comfort with repeated activities.",
    icon: TrendingUp,
  },
];

const categoryLabels: Record<string, { label: string; className: string }> = {
  movement: { label: "Movement", className: "bg-blue-500/10 text-blue-600" },
  handling: { label: "Handling", className: "bg-emerald-500/10 text-emerald-600" },
  pattern: { label: "Pattern", className: "bg-violet-500/10 text-violet-600" },
};

export function InsightsPage() {
  const movementInsights = insights.filter(i => i.category === "movement");
  const handlingInsights = insights.filter(i => i.category === "handling");
  const patternInsights = insights.filter(i => i.category === "pattern");

  return (
    <div className="pb-24">
      {/* ==========================================
          EDITORIAL HERO HEADER - Insights
          Reflective, personal, minimal visual noise
          Height: 160px mobile
          ========================================== */}
      <header className="px-5 pt-8 pb-6">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">
          Your Patterns
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
          Insights
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
          Personal, private observations about how you move through your day.
        </p>
      </header>

      <div className="px-4 space-y-6">
        {/* About explanation card */}
        <Card className="p-4 bg-muted/30 border-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">About Your Insights</p>
              <p className="text-xs text-muted-foreground">
                These are neutral observations about your movement patterns and object handling tendencies. They're informational only—not medical or diagnostic.
              </p>
            </div>
          </div>
        </Card>

        {/* Movement Tendencies */}
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
            Movement Tendencies
          </h2>
          <div className="space-y-2">
            {movementInsights.map((insight) => (
              <InsightCardComponent key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Object Handling Strengths */}
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
            Object Handling Strengths
          </h2>
          <div className="space-y-2">
            {handlingInsights.map((insight) => (
              <InsightCardComponent key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Activity Patterns */}
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
            Activity Patterns
          </h2>
          <div className="space-y-2">
            {patternInsights.map((insight) => (
              <InsightCardComponent key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Privacy note */}
        <Card className="p-4 bg-muted/20 border-0">
          <p className="text-xs text-muted-foreground text-center">
            Insights are generated from your activity data and are visible only to you. They update as more data becomes available.
          </p>
        </Card>
      </div>
    </div>
  );
}

interface InsightCardComponentProps {
  insight: InsightCard;
}

const InsightCardComponent = ({ insight }: InsightCardComponentProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const IconComponent = insight.icon;
  const categoryConfig = categoryLabels[insight.category];

  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <IconComponent className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium text-foreground">{insight.title}</p>
              {insight.isNew && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{insight.observation}</p>
          </div>

          <ArrowRight 
            className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`} 
          />
        </div>

        {isExpanded && (
          <div className="pl-13 pt-2 border-t border-border ml-13">
            <div className="pl-[52px]">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insight.detail}
              </p>
              <Badge 
                variant="secondary" 
                className={`mt-3 text-xs border-0 ${categoryConfig.className}`}
              >
                {categoryConfig.label}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
