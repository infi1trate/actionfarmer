import * as React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { challengeData } from "./ChallengeBriefPage";

export const ChallengeCountdownPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [count, setCount] = React.useState(3);
  const [cameraReady, setCameraReady] = React.useState(false);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  
  // Check if coming from camera screen
  const fromCamera = (location.state as { fromCamera?: boolean })?.fromCamera;

  // Initialize camera for background
  React.useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, 
          audio: true 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraReady(true);
      } catch (error) {
        console.error("Failed to access camera:", error);
        // If no camera, redirect to permission
        navigate(`/challenge/${challenge.id}/permission`, { replace: true });
      }
    };

    if (fromCamera) {
      initCamera();
    } else {
      // If not from camera, go to permission first
      navigate(`/challenge/${challenge.id}/permission`, { replace: true });
    }

    return () => {
      // Don't stop the stream - we'll pass it to recording page
    };
  }, [fromCamera, challenge.id, navigate]);

  // Countdown logic
  React.useEffect(() => {
    if (!cameraReady) return;
    
    if (count === 0) {
      // Navigate to recording page
      navigate(`/challenge/${challenge.id}/recording`, { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, cameraReady, navigate, challenge.id]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Live Camera Feed in background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Dark overlay for countdown visibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Countdown Display */}
      <div className="relative z-10 text-center space-y-6">
        <p className="text-sm font-medium text-white/80 uppercase tracking-widest">
          Get Ready
        </p>
        
        <div className="relative">
          <div 
            key={count}
            className="text-[140px] font-bold text-white leading-none animate-in zoom-in-50 duration-300"
            style={{ 
              textShadow: '0 0 60px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.5)'
            }}
          >
            {count || "GO"}
          </div>
          
          {/* Pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              key={`ring-${count}`}
              className="w-48 h-48 rounded-full border-4 border-white/30 animate-ping"
              style={{ animationDuration: '1s' }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-semibold text-white drop-shadow-lg">{challenge.name}</p>
          <p className="text-sm text-white/70">{challenge.duration}</p>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-white/60">
          Recording starting...
        </p>
      </div>
    </div>
  );
};

export default ChallengeCountdownPage;
