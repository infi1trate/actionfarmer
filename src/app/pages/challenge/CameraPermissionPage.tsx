import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, ShieldCheck, ArrowLeft } from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

export const CameraPermissionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isRequesting, setIsRequesting] = React.useState(false);
  
  const challenge = challengeData[id || "1"] || challengeData["1"];

  const handleAllowCamera = async () => {
    setIsRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());
      // Navigate to camera ready screen
      navigate(`/challenge/${challenge.id}/camera`, { replace: true });
    } catch (error) {
      console.error("Camera permission denied:", error);
      setIsRequesting(false);
      // Stay on this page, user can try again or go back
    }
  };

  const handleNotNow = () => {
    navigate(`/challenge/${challenge.id}`, { 
      replace: true,
      state: { cameraRequired: true }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center p-4">
        <button 
          onClick={handleNotNow}
          className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </header>

      {/* Main content - centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Camera icon with soft glow */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Camera className="h-14 w-14 text-primary" />
          </div>
          {/* Soft glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-xl scale-150" />
        </div>

        {/* Text content */}
        <div className="text-center space-y-3 max-w-sm mb-10">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Let's set up your camera
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We use the camera to record your challenge. Nothing records until you tap Start.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-success/10 border border-success/20 mb-10">
          <ShieldCheck className="h-4 w-4 text-success shrink-0" />
          <span className="text-sm text-success-text font-medium">
            Your recordings are private and secure
          </span>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button 
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
            onClick={handleAllowCamera}
            disabled={isRequesting}
            loading={isRequesting}
            leftIcon={!isRequesting ? <Camera className="h-5 w-5" /> : undefined}
          >
            {isRequesting ? "Requesting access..." : "Allow Camera"}
          </Button>
          
          <Button 
            variant="ghost"
            className="w-full h-12 text-muted-foreground hover:text-foreground"
            onClick={handleNotNow}
          >
            Not now
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CameraPermissionPage;
