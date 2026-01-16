import * as React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Sprout, 
  ArrowRight,
  Wallet,
} from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";
import seedImage from "@/assets/home-seed.png";
import { useAppData } from "@/contexts/AppDataContext";

export const ChallengeCompletedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { completeChallengeSession, updatePlantStage, plant, sessions, refreshData } = useAppData();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  
  // Get session info from navigation state
  const { sessionId, challengeId, xpReward: stateXpReward } = (location.state as { sessionId?: string; challengeId?: string; note?: string; xpReward?: number }) || {};
  
  // Use xpReward from state if available, otherwise fallback to challenge data
  const xpReward = stateXpReward || challenge.xpReward || 50;
  
  // Animated state for flourish effect
  const [showFlourish, setShowFlourish] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const [hasCompleted, setHasCompleted] = React.useState(false);

  // Complete the session when page loads
  React.useEffect(() => {
    const completeSession = async () => {
      if (sessionId && !hasCompleted) {
        setHasCompleted(true);
        
        // Calculate points based on challenge
        const wateringPoints = Math.floor(xpReward * 0.4);
        const sunlightPoints = Math.floor(xpReward * 0.6);
        
        // Complete the session in database
        await completeChallengeSession(sessionId, xpReward, wateringPoints, sunlightPoints);
        
        // Update plant stage (7 challenges to full plant, then cycle restarts)
        const alreadyCompleted = sessions.filter(
          (s) => (s.status === "completed" || s.status === "submitted") && s.id !== sessionId
        ).length;
        const completedCount = alreadyCompleted + 1; // include the session we just completed

        const derivedStage = completedCount <= 0 ? 0 : ((completedCount - 1) % 7) + 1;

        if (plant && derivedStage !== plant.current_stage) {
          await updatePlantStage(derivedStage);
        }
        
        // Refresh data to get updated state
        await refreshData();
      }
    };
    
    completeSession();
  }, [sessionId, hasCompleted, completeChallengeSession, updatePlantStage, plant, sessions, refreshData, xpReward]);

  React.useEffect(() => {
    // Stagger animations
    const flourishTimer = setTimeout(() => setShowFlourish(true), 200);
    const contentTimer = setTimeout(() => setShowContent(true), 400);
    
    return () => {
      clearTimeout(flourishTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleContinue = () => {
    navigate(`/challenge/${challenge.id}/feedback`);
  };

  const handleViewEarnings = () => {
    navigate("/app/earnings");
  };

  // Calculate real progress from sessions
  const completedCount = sessions.filter(s => s.status === "completed" || s.status === "submitted").length + (sessionId ? 1 : 0);
  const currentStage = plant?.current_stage || (completedCount > 0 ? 1 : 0);
  const challengesForNextStage = currentStage >= 7 ? 0 : ((currentStage + 1) * 2) - completedCount;
  const progressToNextStage = currentStage >= 7 ? 1 : completedCount / ((currentStage + 1) * 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Garden reward illustration */}
        <div className="relative mb-8">
          {/* Seed/Plant icon with glow */}
          <div 
            className={`
              relative w-32 h-32 rounded-3xl bg-gradient-to-br from-success/20 via-primary/10 to-success/20 
              flex items-center justify-center border border-success/30
              transition-all duration-700 ease-out
              ${showFlourish ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            `}
          >
            <img 
              src={seedImage} 
              alt="Growing plant" 
              className="w-20 h-20 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <Sprout className="h-12 w-12 text-success absolute" style={{ display: 'none' }} />
            
            {/* Sparkle effects */}
            {showFlourish && (
              <>
                <Sparkles 
                  className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-pulse" 
                  style={{ animationDelay: '0.2s' }}
                />
                <Sparkles 
                  className="absolute -bottom-1 -left-1 h-5 w-5 text-success animate-pulse" 
                  style={{ animationDelay: '0.5s' }}
                />
                <Sparkles 
                  className="absolute top-1/2 -right-4 h-4 w-4 text-warning animate-pulse" 
                  style={{ animationDelay: '0.8s' }}
                />
              </>
            )}
          </div>
          
          {/* Soft glow behind */}
          <div 
            className={`
              absolute inset-0 rounded-3xl bg-success/10 blur-2xl scale-150 -z-10
              transition-opacity duration-1000
              ${showFlourish ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </div>

        {/* Title & subtitle */}
        <div 
          className={`
            text-center space-y-2 mb-8
            transition-all duration-500 delay-200
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <h1 className="text-2xl font-display font-bold text-foreground">
            Challenge submitted!
          </h1>
          <p className="text-base text-muted-foreground max-w-[280px] mx-auto">
            Your garden got a little stronger today.
          </p>
        </div>

        {/* Growth reward card */}
        <Card 
          className={`
            w-full max-w-sm p-5 bg-gradient-to-br from-success/10 via-background to-primary/5 
            border-success/30 shadow-sm
            transition-all duration-500 delay-300
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="space-y-4">
            {/* Rewards earned */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/15 text-success text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>+{xpReward} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold">
                <Sprout className="h-4 w-4" />
                <span>+1 Growth</span>
              </div>
            </div>

            {/* Evolution progress */}
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Evolution progress</span>
                <span className="text-sm font-medium text-foreground">
                  {currentStage >= 7 ? "Max!" : `Stage ${currentStage}`}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-success to-primary transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(progressToNextStage * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {currentStage >= 7 
                  ? "Your plant is fully evolved!" 
                  : `${challengesForNextStage} more ${challengesForNextStage === 1 ? 'challenge' : 'challenges'} to evolve your plant`
                }
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer actions */}
      <div 
        className={`
          p-4 pb-safe space-y-3
          transition-all duration-500 delay-500
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <Button 
          className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
          onClick={handleContinue}
          rightIcon={<ArrowRight className="h-5 w-5" />}
        >
          Continue
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full h-11 text-muted-foreground hover:text-foreground"
          onClick={handleViewEarnings}
          leftIcon={<Wallet className="h-4 w-4" />}
        >
          View Earnings
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCompletedPage;
