import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const ChallengeCompletedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  
  // Animated state for flourish effect
  const [showFlourish, setShowFlourish] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);

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

  // Mock progress - in real app, this would come from user state
  const challengesToEvolve = 2;
  const currentProgress = 1;

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
                <span>+{challenge.xpReward || 50} XP</span>
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
                  {currentProgress} / {challengesToEvolve}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-success to-primary transition-all duration-1000 ease-out"
                  style={{ width: `${(currentProgress / challengesToEvolve) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {challengesToEvolve - currentProgress} more {challengesToEvolve - currentProgress === 1 ? 'challenge' : 'challenges'} to evolve your plant
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
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full h-11 text-muted-foreground hover:text-foreground"
          onClick={handleViewEarnings}
        >
          <Wallet className="h-4 w-4 mr-2" />
          View Earnings
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCompletedPage;
