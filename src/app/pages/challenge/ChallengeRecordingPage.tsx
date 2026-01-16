import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Square,
  Pause,
  Play,
} from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

export const ChallengeRecordingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];
  
  const [timeRemaining, setTimeRemaining] = React.useState(challenge.durationSeconds);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showConfirmEnd, setShowConfirmEnd] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);

  // Initialize camera and start recording
  React.useEffect(() => {
    const initCameraAndRecord = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, 
          audio: true 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Start recording
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9,opus'
        });
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(blob);
          // Navigate to review page with the recorded video
          navigate(`/challenge/${challenge.id}/review`, { 
            state: { recordedVideoUrl: videoUrl },
            replace: true 
          });
        };

        mediaRecorder.start(1000); // Capture in 1-second chunks
        setIsRecording(true);
      } catch (error) {
        console.error("Failed to start recording:", error);
        navigate(`/challenge/${challenge.id}/permission`, { replace: true });
      }
    };

    initCameraAndRecord();

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [challenge.id, navigate]);

  // Timer logic
  React.useEffect(() => {
    if (isPaused || timeRemaining <= 0 || !isRecording) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - finish recording
          handleFinishRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeRemaining, isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePauseResume = () => {
    if (!mediaRecorderRef.current) return;
    
    if (isPaused) {
      mediaRecorderRef.current.resume();
    } else {
      mediaRecorderRef.current.pause();
    }
    setIsPaused(!isPaused);
  };

  const handleFinishRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleDiscardRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    chunksRef.current = [];
    navigate(`/challenge/${challenge.id}/camera`, { replace: true });
  };

  const progress = ((challenge.durationSeconds - timeRemaining) / challenge.durationSeconds) * 100;

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Live Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)'
        }}
      />

      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timer pill - centered, high contrast */}
      <div className="relative z-10 flex justify-center pt-6">
        <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 shadow-lg">
          {/* Recording indicator */}
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="absolute w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
          </div>
          
          {/* Timer */}
          <span className="text-2xl font-bold text-white tabular-nums tracking-wider">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Challenge name */}
      <div className="relative z-10 px-4 mt-3">
        <p className="text-white/70 text-center text-sm font-medium drop-shadow-md">
          {challenge.name}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom controls */}
      <div className="relative z-10 p-4 pb-safe">
        <div className="flex items-center justify-center gap-4">
          {/* Pause button */}
          <button
            onClick={handlePauseResume}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPaused ? (
              <Play className="h-6 w-6 text-white ml-0.5" />
            ) : (
              <Pause className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Finish Recording button */}
          <Button 
            className="h-14 px-8 text-lg font-semibold rounded-full shadow-lg shadow-primary/30"
            onClick={handleFinishRecording}
            leftIcon={<Square className="h-4 w-4 fill-current" />}
          >
            Finish Recording
          </Button>
        </div>

        {/* Discard option - subtle */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowConfirmEnd(true)}
            className="text-sm text-white/60 hover:text-white/90 transition-colors"
          >
            Discard & restart
          </button>
        </div>
      </div>

      {/* Confirm Discard Modal */}
      {showConfirmEnd && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-display font-bold text-foreground">Stop recording?</h3>
              <p className="text-sm text-muted-foreground">
                Your recording will be discarded.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                className="flex-1"
                onClick={() => setShowConfirmEnd(false)}
              >
                Keep recording
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleDiscardRecording}
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Paused overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto">
              <Pause className="h-10 w-10 text-white" />
            </div>
            <p className="text-white text-lg font-medium">Paused</p>
            <Button 
              className="px-8"
              onClick={handlePauseResume}
              leftIcon={<Play className="h-4 w-4" />}
            >
              Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeRecordingPage;
