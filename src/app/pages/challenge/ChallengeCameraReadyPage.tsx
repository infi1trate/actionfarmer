import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  Play,
  Lightbulb,
  X,
  Smartphone,
  Sun,
  Move,
} from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

type Difficulty = "easy" | "medium" | "hard";

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/80 text-white border-emerald-400/30" },
  medium: { label: "Medium", className: "bg-amber-500/80 text-white border-amber-400/30" },
  hard: { label: "Hard", className: "bg-rose-500/80 text-white border-rose-400/30" },
};

export const ChallengeCameraReadyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [showTips, setShowTips] = React.useState(false);
  const [showExample, setShowExample] = React.useState(false);
  const [cameraError, setCameraError] = React.useState(false);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  const diffConfig = difficultyConfig[challenge.difficulty];

  // Initialize camera
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
      } catch (error) {
        console.error("Failed to access camera:", error);
        setCameraError(true);
        // Redirect to permission page if camera access fails
        navigate(`/challenge/${challenge.id}/permission`, { replace: true });
      }
    };

    initCamera();

    return () => {
      // Cleanup: stop all tracks when leaving
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [challenge.id, navigate]);

  const handleStartRecording = () => {
    // Pass the stream to the countdown/recording page via state
    navigate(`/challenge/${challenge.id}/countdown`, { 
      state: { fromCamera: true }
    });
  };

  const handleBack = () => {
    // Stop camera before navigating
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    navigate(`/challenge/${challenge.id}`);
  };

  const tips = [
    { icon: Smartphone, text: "Place phone on a stable surface" },
    { icon: Sun, text: "Good lighting helps quality" },
    { icon: Move, text: "Keep the full movement area visible" },
  ];

  if (cameraError) {
    return null; // Will redirect
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Live Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }} // Mirror the camera
      />

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-start justify-between p-4 pt-safe">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        {/* Metadata chips */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{challenge.duration}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border text-sm font-medium ${diffConfig.className}`}>
              <Zap className="h-4 w-4" />
              <span>{diffConfig.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge name - subtle at top */}
      <div className="relative z-10 px-4 mt-2">
        <p className="text-white/80 text-center text-base font-medium drop-shadow-lg">
          {challenge.name}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom overlay panel - glassy */}
      <div className="relative z-10 p-4 pb-safe">
        <div className="rounded-3xl bg-white/95 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-5 space-y-5">
            {/* Top row: Example video + Ready text */}
            <div className="flex gap-4">
              {/* Example video thumbnail */}
              <button 
                onClick={() => setShowExample(true)}
                className="relative w-24 h-24 rounded-2xl overflow-hidden bg-muted shrink-0 group"
              >
                <video
                  src={challenge.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Play className="h-6 w-6 text-white fill-white opacity-90" />
                </div>
                {/* Label */}
                <div className="absolute bottom-1 left-1 right-1">
                  <span className="text-[10px] font-medium text-white bg-black/50 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                    Example
                  </span>
                </div>
              </button>

              {/* Ready text + helper */}
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-display font-bold text-foreground">
                  Ready when you are
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Keep your full body in frame. You can stop anytime.
                </p>
                <button 
                  onClick={() => setShowTips(true)}
                  className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                >
                  <Lightbulb className="h-4 w-4" />
                  Tips
                </button>
              </div>
            </div>

            {/* Start Recording button */}
            <Button 
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
              onClick={handleStartRecording}
              leftIcon={<Play className="h-5 w-5 fill-current" />}
            >
              Start Recording
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Bottom Sheet */}
      {showTips && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end"
          onClick={() => setShowTips(false)}
        >
          <div 
            className="w-full bg-background rounded-t-3xl p-6 pb-safe animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-foreground">Recording Tips</h3>
              <button 
                onClick={() => setShowTips(false)}
                className="p-2 -mr-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <ul className="space-y-4">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-base text-foreground">{tip.text}</span>
                  </li>
                );
              })}
            </ul>
            <Button 
              variant="secondary"
              className="w-full h-12 mt-6 rounded-xl"
              onClick={() => setShowTips(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Example Video Modal */}
      {showExample && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowExample(false)}
        >
          <div 
            className="relative w-full max-w-lg animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowExample(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
              <p className="text-white text-sm font-medium px-4 py-3 bg-white/10">
                How it looks
              </p>
              <video
                src={challenge.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCameraReadyPage;
