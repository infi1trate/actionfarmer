import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Target,
  Flame,
  TrendingUp,
  TrendingDown,
  Zap,
  Sparkles,
  Star,
  Clock,
  Gift,
  Timer,
  Pause,
  Users,
  Trophy,
  UserPlus,
  QrCode,
  Smartphone,
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

  // Mock activity feed data
  const activityItems = [
    { type: "challenge", text: "Someone completed Morning Routine", time: "2m ago" },
    { type: "join", text: "A new member joined", time: "5m ago" },
    { type: "challenge", text: "Someone completed Workspace Tour", time: "8m ago" },
    { type: "challenge", text: "Someone hit a 7-day streak", time: "12m ago" },
    { type: "join", text: "3 new members joined today", time: "1h ago" },
  ];

  const [currentActivityIndex, setCurrentActivityIndex] = React.useState(0);

  // Rotate through activity items
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % activityItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activityItems.length]);

  const currentActivity = activityItems[currentActivityIndex];
  const ActivityIcon = currentActivity.type === "join" ? UserPlus : Trophy;

  // Get contextual momentum message
  const getMomentumMessage = () => {
    if (!hasCompletedFirstChallenge) {
      return "Your first challenge is waiting. No pressure — take your time.";
    }
    if (momentum.streakDays > 0) {
      return `${momentum.streakDays} days strong. You're doing great.`;
    }
    return "Ready when you are. One challenge at a time.";
  };

  return (
    <div className="min-h-screen">
      {/* Editorial Hero - Warm, human, breathing room */}
      <section className="relative px-6 pt-12 pb-16 overflow-hidden">
        {/* Subtle warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/4 via-primary/2 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative space-y-8">
          {/* Greeting - Large, warm, personal */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-brand-orange tracking-wide">
              {getGreeting()}
            </p>
            <h1 className="text-5xl font-bold text-foreground tracking-tight leading-[1.05]">
              {userName}
            </h1>
          </div>
          
          {/* Momentum copy - Calm, confident */}
          <div className="space-y-4 max-w-[320px]">
            <p className="text-lg text-foreground/80 leading-relaxed font-medium">
              {getMomentumMessage()}
            </p>
            
            {/* Inline stats for returning users - no cards, just text */}
            {hasCompletedFirstChallenge && (
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-brand-orange" />
                  <span><span className="font-semibold text-foreground">{momentum.streakDays}</span> day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span><span className="font-semibold text-foreground">{momentum.rewardMultiplier}x</span> bonus</span>
                </div>
              </div>
            )}
          </div>

          {/* Single primary CTA */}
          <div className="pt-2">
            <Button 
              size="lg"
              onClick={() => navigate("/challenges")}
              className="shadow-lg shadow-primary/20"
            >
              Start today's challenge
            </Button>
          </div>

          {/* Social Activity Ticker - Subtle, grounding */}
          <div 
            className="flex items-center gap-2 text-xs text-muted-foreground/70 pt-4"
            key={currentActivityIndex}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success/60 animate-pulse" />
            <span className="animate-fade-in">{currentActivity.text}</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-muted-foreground/40">{currentActivity.time}</span>
          </div>
        </div>
      </section>

      {/* Weekly Focus - Editorial section header */}
      <section className="mb-10">
        <div className="px-5 mb-5">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">
                Featured
              </p>
              <h2 className="text-lg font-bold text-foreground">Weekly Focus</h2>
            </div>
            <button 
              onClick={() => navigate("/challenges")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors pb-0.5"
            >
              View all →
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Hand-picked with bonus rewards
          </p>
        </div>
        
        {/* Horizontal scroll for featured challenges */}
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 -mx-1 scrollbar-hide">
          {/* Featured Challenge 1 - Larger hero card */}
          <div 
            className="shrink-0 w-[280px] cursor-pointer group"
            onClick={() => navigate("/challenge/morning-routine/brief")}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-orange/15 via-brand-orange/8 to-transparent border border-brand-orange/20 p-5 flex flex-col justify-between group-hover:border-brand-orange/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-brand-orange" />
                </div>
                <Badge variant="brand" size="sm" className="font-bold">+50% XP</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Morning Routine</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Capture your morning habits — calming and reflective.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>5–10 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Challenge 2 */}
          <div 
            className="shrink-0 w-[280px] cursor-pointer group"
            onClick={() => navigate("/challenge/workspace-tour/brief")}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 flex flex-col justify-between group-hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" size="sm">+25% XP</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">Workspace Tour</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Show us where you work — perfect for learning the flow.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>3–5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Challenge - Distinct visual zone */}
      <section className="px-5 mb-10">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/8 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative border border-brand-orange/15 rounded-2xl p-6 space-y-5">
            {/* Section label */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-medium">
                <Users className="h-3.5 w-3.5" />
                Team Challenge
              </div>
              <Badge variant="outline" size="sm" className="text-muted-foreground border-border">
                This week only
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">Cook Together</h3>
                <Badge variant="brand" size="sm" className="font-bold">+100% XP</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
                Team up with a friend to cook the same recipe — both of you earn double rewards.
              </p>
            </div>

            {/* Pairing methods - minimal */}
            <div className="flex items-center gap-4 py-3 border-y border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <QrCode className="h-4 w-4" />
                <span className="text-xs">QR code</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                <span className="text-xs">NFC tap</span>
              </div>
            </div>

            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate("/challenge/cook-together/pair")}
              leftIcon={<Users className="h-4 w-4" />}
            >
              Find a partner
            </Button>
          </div>
        </div>
      </section>

      {/* Reward Multiplier - Quieter utility zone */}
      <section className="px-5 pb-8">
        <div className={`rounded-2xl p-5 transition-all ${
          ambientEnabled 
            ? 'bg-success/5 border border-success/20' 
            : 'bg-muted/20 border border-border/50'
        }`}>
          <div className="space-y-4">
            {/* Compact header */}
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                ambientEnabled ? 'bg-success/10' : 'bg-primary/10'
              }`}>
                <Gift className={`h-5 w-5 ${ambientEnabled ? 'text-success' : 'text-primary'}`} />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Reward Multiplier</h3>
                  {ambientEnabled && (
                    <Badge variant="secondary" size="sm" className="bg-success/10 text-success border-0">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ambientEnabled 
                    ? "Your challenges earn bonus XP based on session length" 
                    : "Unlock multipliers by running optional sessions"
                  }
                </p>
              </div>
            </div>

            {/* Multiplier Tiers - Horizontal inline */}
            {!ambientEnabled && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-background border border-border/50">
                  <Timer className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">2h</span>
                  <span className="text-xs text-muted-foreground">→ 1.25x</span>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-background border border-border/50">
                  <Timer className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">4h</span>
                  <span className="text-xs text-muted-foreground">→ 1.5x</span>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
                  <Timer className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-foreground">8h</span>
                  <span className="text-xs text-primary font-medium">→ 2x</span>
                </div>
              </div>
            )}

            {/* Active State */}
            {ambientEnabled && (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <Badge variant="brand" size="sm" className="font-bold">1.5x Active</Badge>
                  <span className="text-xs text-muted-foreground">4h 23m • Next at 8h</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate("/ambient")}
                    className="text-xs text-primary hover:underline"
                  >
                    Adjust
                  </button>
                  <button 
                    onClick={() => setAmbientEnabled(false)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <Pause className="h-3 w-3" />
                    Pause
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            {!ambientEnabled && (
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setAmbientEnabled(true)}
                className="w-full justify-center"
                leftIcon={<Gift className="h-4 w-4" />}
              >
                Enable multiplier
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}