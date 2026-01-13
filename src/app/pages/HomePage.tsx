import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Camera,
  ChevronRight,
  Zap,
  Trophy,
  TrendingUp,
  Flame,
  Target,
  Sparkles,
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
  
  // Mock momentum stats
  const momentum = {
    weeklyStreak: 5,
    totalXP: 2450,
    weeklyGoal: 1000,
    weeklyProgress: 680,
    recentMilestone: "5-day streak!",
  };

  const weeklyPercentage = Math.min((momentum.weeklyProgress / momentum.weeklyGoal) * 100, 100);

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

      {/* Momentum Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-5 w-5 text-brand-orange" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{momentum.weeklyStreak} days</p>
          {momentum.recentMilestone && (
            <Badge variant="secondary" className="mt-2 text-[10px] bg-brand-orange/10 text-brand-orange border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              {momentum.recentMilestone}
            </Badge>
          )}
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total XP</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{momentum.totalXP.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Weekly Goal</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {momentum.weeklyProgress.toLocaleString()} / {momentum.weeklyGoal.toLocaleString()} XP
          </span>
        </div>
        <Progress value={weeklyPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {weeklyPercentage >= 100 
            ? "Goal reached! Keep pushing for more." 
            : `${Math.round(momentum.weeklyGoal - momentum.weeklyProgress)} XP to go`
          }
        </p>
      </Card>

      {/* Primary CTA - Go to Challenges */}
      <Button 
        className="w-full h-14 text-base"
        onClick={() => navigate("/challenges")}
        leftIcon={<Target className="h-5 w-5" />}
      >
        Start a Challenge
      </Button>

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