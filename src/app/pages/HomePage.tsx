import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Target,
  Camera,
  ChevronRight,
  Zap,
  Trophy,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();
  // Ambient Mode is OFF by default - optional background feature
  const [ambientEnabled, setAmbientEnabled] = React.useState(false);
  const [ambientExpanded, setAmbientExpanded] = React.useState(false);

  // Mock stats
  const stats = {
    challengesCompleted: 12,
    weeklyStreak: 5,
    totalPoints: 2450,
  };

  // Mock recent challenge
  const featuredChallenge = {
    id: "2",
    name: "Grocery Unload",
    duration: "8 min",
    bonus: "2x XP",
  };

  return (
    <ContentSection className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <Trophy className="h-5 w-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.challengesCompleted}</p>
          <p className="text-[10px] text-muted-foreground">Completed</p>
        </Card>
        <Card className="p-3 text-center">
          <Zap className="h-5 w-5 text-brand-yellow mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.weeklyStreak}</p>
          <p className="text-[10px] text-muted-foreground">Day Streak</p>
        </Card>
        <Card className="p-3 text-center">
          <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.totalPoints.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Points</p>
        </Card>
      </div>

      {/* Quick Start Challenge */}
      <div className="space-y-2">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quick Start</h2>
        <Card 
          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors active:scale-[0.98]"
          onClick={() => navigate(`/challenge/${featuredChallenge.id}`)}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{featuredChallenge.name}</p>
                <Badge className="text-[10px] bg-brand-yellow text-brand-yellow-foreground border-0">
                  {featuredChallenge.bonus}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{featuredChallenge.duration}</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Ambient Capture - Collapsed optional card */}
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

      {/* Browse All */}
      <Card 
        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => navigate("/challenges")}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Browse All Challenges</p>
            <p className="text-xs text-muted-foreground">10 challenges available</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </Card>
    </ContentSection>
  );
}
