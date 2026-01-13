import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ContentSection } from "@/components/shells";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { EventChallengeCard } from "./home/EventChallengeCard";
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
  
  Pause,
  Users,
  Trophy,
  UserPlus,
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

      {/* Weekly Focus - Featured Story Layout */}
      <section className="px-6 mb-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest">
              This Week
            </p>
            <h2 className="text-xl font-bold text-foreground">Featured Challenge</h2>
          </div>
          <button 
            onClick={() => navigate("/challenges")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>
        
        {/* Dominant Featured Challenge - Story card */}
        <div 
          className="relative rounded-3xl overflow-hidden cursor-pointer group mb-4"
          onClick={() => navigate("/challenge/morning-routine/brief")}
        >
          {/* Visual cover placeholder */}
          <div className="aspect-[16/10] bg-gradient-to-br from-brand-orange/20 via-brand-orange/10 to-primary/5 relative">
            {/* Placeholder illustration area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-brand-orange/15 flex items-center justify-center">
                <Star className="h-12 w-12 text-brand-orange/60" />
              </div>
            </div>
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            
            {/* Bonus badge - positioned on cover */}
            <div className="absolute top-4 right-4">
              <Badge variant="brand" size="sm" className="font-bold text-sm px-3 py-1 shadow-lg">
                +50% XP
              </Badge>
            </div>
          </div>
          
          {/* Story content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Morning Routine
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[85%]">
              Start your day with intention. Capture the quiet rituals that ground you — calming, reflective, yours.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>5–10 min</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Target className="h-3.5 w-3.5" />
                <span>Beginner friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary challenge - Compact, supporting */}
        <div 
          className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/50 cursor-pointer group hover:bg-muted/30 transition-colors"
          onClick={() => navigate("/challenge/workspace-tour/brief")}
        >
          {/* Small visual thumbnail */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0">
            <Star className="h-7 w-7 text-primary/70" />
          </div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                Workspace Tour
              </h4>
              <Badge variant="secondary" size="sm" className="text-[10px]">+25% XP</Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              Show us where you work — perfect for learning the flow.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>3–5 min</span>
            </div>
          </div>
          
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
        </div>
      </section>

      {/* Social Challenge - Event-style card */}
      <section className="px-5 mb-10">
        <EventChallengeCard onNavigate={navigate} />
      </section>

      {/* Ambient Multiplier - Lifestyle Visual Upsell */}
      <section className="px-5 pb-10">
        <div className="rounded-3xl overflow-hidden border border-border/40">
          {/* Lifestyle visual header - No camera symbolism */}
          <div className="relative h-40 bg-gradient-to-br from-brand-orange/10 via-primary/5 to-accent/10 overflow-hidden">
            {/* Abstract lifestyle imagery - home, movement, everyday */}
            <div className="absolute inset-0 flex items-center justify-center gap-6">
              {/* Morning sun / warmth */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-orange/30 to-brand-orange/5 blur-sm" />
              {/* Calm wave / flow */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
              {/* Soft organic shapes suggesting home life */}
              <div className="absolute top-6 left-8 w-12 h-12 rounded-2xl bg-success/15 rotate-12" />
              <div className="absolute bottom-8 right-12 w-16 h-16 rounded-full bg-brand-orange/20" />
              <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-xl bg-primary/15 -rotate-6" />
            </div>
            
            {/* Soft radial overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
            
            {/* Headline on visual */}
            <div className="absolute bottom-4 left-5 right-5">
              <h3 className="text-lg font-bold text-foreground">
                Earn more, just living your day
              </h3>
            </div>
          </div>
          
          {/* Content area */}
          <div className="p-5 space-y-5 bg-gradient-to-b from-muted/10 to-transparent">
            {/* Value proposition - human, clear */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Let your everyday moments count. The longer you go about your day, 
              the bigger your bonus on the next challenge.
            </p>
            
            {/* Milestone ladder - Visual journey */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Your bonus grows
              </p>
              
              {/* Visual milestone track */}
              <div className="relative">
                {/* Progress track background */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-muted/40 rounded-full" />
                
                {/* Active progress if enabled */}
                {ambientEnabled && (
                  <div className="absolute top-4 left-6 h-1 bg-gradient-to-r from-success to-primary rounded-full" style={{ width: '55%' }} />
                )}
                
                {/* Milestone nodes */}
                <div className="relative flex items-start justify-between px-2">
                  {/* Start */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      ambientEnabled ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      0h
                    </div>
                    <span className="text-[10px] text-muted-foreground">Start</span>
                  </div>
                  
                  {/* 2 hours */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      ambientEnabled ? 'bg-success text-success-foreground' : 'bg-muted/60 border-2 border-muted text-muted-foreground'
                    }`}>
                      2h
                    </div>
                    <span className={`text-[10px] ${ambientEnabled ? 'text-success font-medium' : 'text-muted-foreground'}`}>1.25x</span>
                  </div>
                  
                  {/* 4 hours - current if active */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      ambientEnabled 
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background' 
                        : 'bg-muted/60 border-2 border-muted text-muted-foreground'
                    }`}>
                      4h
                    </div>
                    <span className={`text-[10px] ${ambientEnabled ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>1.5x</span>
                  </div>
                  
                  {/* 8 hours - goal */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-orange/40 border-2 border-brand-orange/50 flex items-center justify-center text-xs font-bold text-brand-orange">
                      8h
                    </div>
                    <span className="text-[10px] text-brand-orange font-semibold">2x</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active state info */}
            {ambientEnabled && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Bonus active</p>
                    <p className="text-xs text-muted-foreground">4h 23m in — next tier at 8h</p>
                  </div>
                </div>
                <Badge variant="brand" className="font-bold">1.5x</Badge>
              </div>
            )}
            
            {/* CTA - Framed as enabling a bonus, not capture */}
            {!ambientEnabled ? (
              <Button 
                onClick={() => setAmbientEnabled(true)}
                className="w-full"
                size="lg"
              >
                <Gift className="h-4 w-4 mr-2" />
                Unlock my bonus
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/ambient")}
                  className="flex-1"
                >
                  View details
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setAmbientEnabled(false)}
                  className="text-muted-foreground"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}