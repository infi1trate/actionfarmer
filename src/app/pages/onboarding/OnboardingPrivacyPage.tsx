import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Eye, VideoOff, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingPrivacyPage() {
  const navigate = useNavigate();

  const privacyPoints = [
    {
      icon: VideoOff,
      title: "No video is ever stored",
      description: "We only capture motion data—never images or recordings."
    },
    {
      icon: Eye,
      title: "Motion patterns only",
      description: "We analyze how you move, not what you look like or where you are."
    },
    {
      icon: Shield,
      title: "Data is anonymized",
      description: "Your identity is never attached to the data we collect."
    },
    {
      icon: Lock,
      title: "Encrypted & secure",
      description: "All data is encrypted in transit and at rest."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Progress indicator */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>
      </div>

      {/* Back button */}
      <div className="px-6 pt-4">
        <button 
          onClick={() => navigate("/onboarding/explain")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Your privacy matters
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Here's exactly how we handle your data.
        </p>

        <div className="space-y-5">
          {privacyPoints.map((point, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-2xl bg-muted/50">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-0.5">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/consent")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
