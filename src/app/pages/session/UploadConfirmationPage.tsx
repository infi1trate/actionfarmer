import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadConfirmationPage() {
  const navigate = useNavigate();
  const [uploadComplete, setUploadComplete] = React.useState(false);

  // Simulate upload
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setUploadComplete(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Upload Animation */}
        <div className="relative mb-8">
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
              uploadComplete 
                ? "bg-success-subtle" 
                : "bg-secondary"
            }`}
          >
            {uploadComplete ? (
              <CheckCircle2 className="w-10 h-10 text-success" />
            ) : (
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 rounded-full border-2 border-muted-foreground/20" />
                <div className="absolute inset-0 rounded-full border-2 border-t-brand-primary animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Status Text */}
        <h1 className="font-display text-2xl font-bold text-center mb-2">
          {uploadComplete ? "All done" : "Uploading..."}
        </h1>
        <p className="text-muted-foreground text-center text-sm max-w-xs">
          {uploadComplete 
            ? "Your session data has been securely uploaded. Thank you for contributing."
            : "Securely transferring your session data..."
          }
        </p>

        {/* Privacy reassurance */}
        {uploadComplete && (
          <div className="mt-8 p-4 rounded-2xl bg-muted/30 border border-border max-w-sm">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-medium text-foreground">Privacy note:</span> Your data is encrypted and anonymized. No video is ever stored.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <Button 
          className="w-full" 
          size="lg"
          disabled={!uploadComplete}
          onClick={() => navigate("/app")}
        >
          {uploadComplete ? "Done" : "Please wait..."}
          {uploadComplete && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
