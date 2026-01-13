import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Camera,
  ChevronRight,
  Target,
  Flame,
  TrendingUp,
  TrendingDown,
  Zap,
  Sparkles,
  Star,
  Clock,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HomePage() {
  const navigate = useNavigate();
  const [ambientEnabled, setAmbientEnabled] = React.useState(false);
  const [ambientExpanded, setAmbientExpanded] = React.useState(false);

  // Mock user data
  const userName = "Alex";
  
  // Mock: set to true to simulate a new user who hasn't completed any challenges
  const hasCompletedFirstChallenge = false;

  // Mock momentum data
  const momentum = {
    challengesThisWeek: hasCompletedFirstChallenge ? 7 : 0,
    rewardMultiplier: 1.5,
    streakDays: hasCompletedFirstChallenge ? 5 : 0,
    streakTrend: "up" as const, // "up" | "down" | "stable"
    vsLastWeek: 2, // positive = ahead, negative = behind
  };

  const getTrendNarrative = () => {
    if (momentum.vsLastWeek > 0) {
      return `You're ${momentum.vsLastWeek} challenges ahead of last week`;
    } else if (momentum.vsLastWeek < 0) {
      return `${Math.abs(momentum.vsLastWeek)} more to match last week`;
    }
    return "You're on pace with last week";
  };

  const TrendIcon = momentum.streakTrend === "up" ? TrendingUp : TrendingDown;
  const trendColor = momentum.streakTrend === "up" ? "text-success" : "text-warning";

  return (
    <ContentSection className="space-y-6">
      {/* Greeting & Motivation */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()}, {userName}
        </h1>
        <p className="text-sm text-muted-foreground">
          You're on a roll — keep the momentum going.
        </p>
      </div>

      {/* Getting Started Panel - Only shown before first challenge */}
      {!hasCompletedFirstChallenge && (
        <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-foreground">Ready to get started?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Challenges are quick activities where you capture real moments. 
                  Each one takes just a few minutes and earns you rewards.
                </p>
              </div>
            </div>
            
            <div className="pl-[52px]">
              <p className="text-xs text-muted-foreground mb-3">
                We recommend starting with something simple — no pressure, just explore.
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/challenges")}
                leftIcon={<Target className="h-4 w-4" />}
              >
                Start first challenge
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Rich Momentum Card - Only shown after first challenge */}
      {hasCompletedFirstChallenge && (
      <Card className="p-5 bg-gradient-to-br from-primary/5 via-background to-brand-orange/5 border-primary/20 overflow-hidden relative">
        {/* Subtle animated background element */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-brand-orange/5 blur-xl" />
        
        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">This Week's Momentum</span>
            </div>
            <Badge variant="brand" size="sm" className="font-bold">
              {momentum.rewardMultiplier}x Multiplier
            </Badge>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">{momentum.challengesThisWeek}</p>
              <p className="text-xs text-muted-foreground">Challenges completed</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Flame className="h-5 w-5 text-brand-orange" />
                <p className="text-3xl font-bold text-foreground">{momentum.streakDays}</p>
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              </div>
              <p className="text-xs text-muted-foreground">Day streak</p>
            </div>
          </div>

          {/* Narrative Footer */}
          <div className="pt-3 border-t border-border/50">
            <p className="text-sm text-foreground font-medium flex items-center gap-2">
              <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              {getTrendNarrative()}
            </p>
          </div>
        </div>
      </Card>
      )}

      {/* Weekly Focus - 1-2 featured challenges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Weekly Focus</h2>
          <button 
            onClick={() => navigate("/challenges")}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            See all
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground -mt-1">
          Hand-picked challenges with bonus rewards this week
        </p>

        {/* Featured Challenge 1 */}
        <Card 
          className="p-4 cursor-pointer hover:border-primary/30 transition-colors"
          onClick={() => navigate("/challenge/morning-routine/brief")}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-brand-orange" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">Morning Routine</h3>
                <Badge variant="brand" size="sm">+50% XP</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Capture your morning habits — featured for its calming, reflective nature.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">5–10 min</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </Card>

        {/* Featured Challenge 2 */}
        <Card 
          className="p-4 cursor-pointer hover:border-primary/30 transition-colors"
          onClick={() => navigate("/challenge/workspace-tour/brief")}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground">Workspace Tour</h3>
                <Badge variant="secondary" size="sm">+25% XP</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Show us where you work — great for new users learning how challenges flow.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">3–5 min</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </Card>
      </div>

      {/* Ambient Capture - Optional collapsed card */}
      <Card 
        className={`p-4 transition-all ${ambientEnabled ? 'border-success/30' : ''}`}
        onClick={() => !ambientEnabled && setAmbientExpanded(!ambientExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            ambientEnabled ? 'bg-success/10' : 'bg-muted'
          }`}>
            <Camera className={`h-5 w-5 ${ambientEnabled ? 'text-success' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">Ambient Capture</p>
              <Badge variant="secondary" className="text-[10px]">
                Optional
              </Badge>
              {ambientEnabled && (
                <Badge variant="secondary" className="text-[10px] bg-success/10 text-success border-0">
                  On
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {ambientEnabled 
                ? "Earning passively in the background" 
                : "Earn extra points between challenges"
              }
            </p>
          </div>
          {!ambientEnabled && !ambientExpanded && (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
          {(ambientEnabled || ambientExpanded) && (
            <Switch
              checked={ambientEnabled}
              onCheckedChange={(checked) => {
                setAmbientEnabled(checked);
                if (!checked) setAmbientExpanded(false);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        {ambientEnabled && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate("/ambient");
            }}
            className="mt-3 text-xs text-primary hover:underline flex items-center gap-1"
          >
            Manage zones and schedule
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </Card>
    </ContentSection>
  );
}