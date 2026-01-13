import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pause, Play, X } from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

export const ChallengeActivePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  
  const [timeRemaining, setTimeRemaining] = React.useState(challenge.durationSeconds);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmEnd, setShowConfirmEnd] = React.useState(false);

  // Timer logic
  React.useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Challenge complete
          navigate(`/challenge/${challenge.id}/complete`, { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeRemaining, navigate, challenge.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((challenge.durationSeconds - timeRemaining) / challenge.durationSeconds) * 100;

  const handleEndChallenge = () => {
    setShowConfirmEnd(true);
    setIsPaused(true);
  };

  const confirmEnd = () => {
    navigate(`/challenge/${challenge.id}/complete`, { replace: true });
  };

  const cancelEnd = () => {
    setShowConfirmEnd(false);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Minimal UI - Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content - Minimal during active challenge */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Timer */}
        <div className="text-center space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {isPaused ? "Paused" : "Time Remaining"}
          </p>
          <div className="text-6xl font-bold text-foreground tabular-nums">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-sm text-muted-foreground">
            {challenge.name}
          </p>
        </div>

        {/* Pause/Resume button */}
        <div className="mt-12">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            {isPaused ? (
              <Play className="h-7 w-7 text-foreground ml-1" />
            ) : (
              <Pause className="h-7 w-7 text-foreground" />
            )}
          </button>
        </div>
      </main>

      {/* End button - subtle placement */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={handleEndChallenge}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
          End Challenge
        </button>
      </div>

      {/* Confirm End Modal */}
      {showConfirmEnd && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-lg">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">End Challenge?</h3>
              <p className="text-sm text-muted-foreground">
                You still have {formatTime(timeRemaining)} remaining. Are you sure you want to end now?
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={cancelEnd}
              >
                Continue
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={confirmEnd}
              >
                End Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeActivePage;
