import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { challengeData } from "./ChallengeBriefPage";

export const ChallengeCountdownPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [count, setCount] = React.useState(3);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];

  React.useEffect(() => {
    if (count === 0) {
      navigate(`/challenge/${challenge.id}/active`, { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate, challenge.id]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      {/* Countdown Display */}
      <div className="text-center space-y-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Get Ready
        </p>
        
        <div className="relative">
          <div 
            key={count}
            className="text-[120px] font-bold text-primary leading-none animate-in zoom-in-50 duration-300"
          >
            {count}
          </div>
          
          {/* Pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              key={`ring-${count}`}
              className="w-40 h-40 rounded-full border-4 border-primary/20 animate-ping"
              style={{ animationDuration: '1s' }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">{challenge.name}</p>
          <p className="text-sm text-muted-foreground">{challenge.duration}</p>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground">
          Challenge starting...
        </p>
      </div>
    </div>
  );
};

export default ChallengeCountdownPage;
