import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Zap, Star } from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

export const ChallengeCompletedPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];

  const handleContinue = () => {
    navigate(`/challenge/${challenge.id}/annotate`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Success Animation */}
        <div className="text-center space-y-6">
          {/* Checkmark */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            {/* Celebration particles would go here */}
          </div>

          {/* Message */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <h1 className="text-2xl font-bold text-foreground">Challenge Complete!</h1>
            <p className="text-muted-foreground">Great work on finishing {challenge.name}</p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="mt-8 p-5 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Challenge</span>
              <span className="text-sm font-medium text-foreground">{challenge.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Duration</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{challenge.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <Badge variant="secondary" className="text-xs border-0 bg-muted">
                <Zap className="h-3 w-3 mr-1" />
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </Badge>
            </div>

            {challenge.hasBonus && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Bonus</span>
                <Badge className="text-xs bg-brand-yellow text-brand-yellow-foreground border-0">
                  <Star className="h-3 w-3 mr-0.5 fill-current" />
                  {challenge.bonusLabel}
                </Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Data Notice */}
        <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs animate-in fade-in duration-500 delay-500">
          Your session data has been saved. Tap continue to add any notes.
        </p>
      </main>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button 
          className="w-full h-12 text-base font-semibold"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCompletedPage;
