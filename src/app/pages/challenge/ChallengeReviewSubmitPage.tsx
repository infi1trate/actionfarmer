import * as React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Play,
  Pause,
  RotateCcw,
  Send,
  Clock,
  Zap,
  Sparkles,
  Sprout,
  Loader2,
} from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";
import { useAppData } from "@/contexts/AppDataContext";

type Difficulty = "easy" | "medium" | "hard";

const difficultyConfig: Record<Difficulty, { label: string }> = {
  easy: { label: "Easy" },
  medium: { label: "Medium" },
  hard: { label: "Hard" },
};

export const ChallengeReviewSubmitPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { startChallengeSession, challenges, createPlant, plant } = useAppData();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  const diffConfig = difficultyConfig[challenge.difficulty];
  
  // Get recorded video URL from navigation state
  const recordedVideoUrl = (location.state as { recordedVideoUrl?: string })?.recordedVideoUrl;
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Use recorded video or fallback to challenge example video
  const videoSrc = recordedVideoUrl || challenge.video;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRetake = () => {
    // Clean up recorded video URL
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    navigate(`/challenge/${challenge.id}/camera`, { replace: true });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Find the catalog challenge by matching the static ID to the database challenges
      const catalogChallenge = challenges.find(c => c.title === challenge.name);
      
      if (catalogChallenge) {
        // Create plant if user doesn't have one
        if (!plant) {
          await createPlant();
        }
        
        // Start a challenge session in the database
        const session = await startChallengeSession(catalogChallenge.id);
        
        // Clean up recorded video URL
        if (recordedVideoUrl) {
          URL.revokeObjectURL(recordedVideoUrl);
        }
        
        // Navigate to complete screen with session ID
        navigate(`/challenge/${challenge.id}/complete`, { 
          replace: true,
          state: { note, sessionId: session?.id, challengeId: catalogChallenge.id }
        });
      } else {
        // Fallback if challenge not found in catalog
        if (recordedVideoUrl) {
          URL.revokeObjectURL(recordedVideoUrl);
        }
        navigate(`/challenge/${challenge.id}/complete`, { 
          replace: true,
          state: { note }
        });
      }
    } catch (error) {
      console.error("Error submitting challenge:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 space-y-1">
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          Nice work <span className="text-xl">🌱</span>
        </h1>
        <p className="text-base text-muted-foreground">
          Review and submit your recording.
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 pb-40 space-y-4">
        {/* Video Preview Card */}
        <Card className="overflow-hidden bg-card border-border shadow-sm">
          {/* Video player */}
          <div className="relative aspect-video bg-muted">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              style={recordedVideoUrl ? { transform: "scaleX(-1)" } : undefined}
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Play/Pause overlay */}
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-foreground" />
                ) : (
                  <Play className="h-7 w-7 text-foreground ml-1" />
                )}
              </div>
            </button>
          </div>

          {/* Metadata row */}
          <div className="p-4 flex items-center gap-4 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>{diffConfig.label}</span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-sm font-medium text-foreground">{challenge.name}</span>
            </div>
          </div>
        </Card>

        {/* Rewards preview */}
        <Card className="p-4 bg-success/5 border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/15 flex items-center justify-center shrink-0">
              <Sprout className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">You'll earn</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-medium">
                  <Sparkles className="h-3 w-3" />
                  +{challenge.xpReward || 50} XP
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium">
                  <Sprout className="h-3 w-3" />
                  +1 Growth
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Optional note */}
        <Card className="p-4 bg-muted/30 border-border/50">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything to know about this run?"
            className="w-full h-20 px-3 py-2 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Card>
      </main>

      {/* Footer actions - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-gradient-to-t from-background via-background to-transparent pt-8">
        <div className="space-y-3">
          <Button 
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit
              </>
            )}
          </Button>
          
          <Button 
            variant="ghost"
            className="w-full h-11 text-muted-foreground hover:text-foreground"
            onClick={handleRetake}
            disabled={isSubmitting}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeReviewSubmitPage;
