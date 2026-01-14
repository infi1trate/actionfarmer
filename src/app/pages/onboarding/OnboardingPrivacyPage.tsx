import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Pause, Eye, Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingPrivacyPage() {
  const navigate = useNavigate();

  const trustPoints = [
    {
      icon: Pause,
      text: "You decide when to participate"
    },
    {
      icon: Eye,
      text: "Your insights are private to you"
    },
    {
      icon: Trash2,
      text: "Delete your data anytime"
    },
    {
      icon: Lock,
      text: "Nothing leaves your control"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-8 pb-32">
        {/* Header */}
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-12">
          You're always in control
        </h1>

        {/* Trust points */}
        <div className="space-y-4 max-w-sm mx-auto w-full">
          {trustPoints.map((point, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              
              {/* Text */}
              <p className="text-foreground text-[15px] font-medium">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with CTA */}
      <footer className="p-6 pb-10">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/signup")}
        >
          Sounds good
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
