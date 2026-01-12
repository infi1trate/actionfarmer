import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Smartphone, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingExplainPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Smartphone,
      title: "Use your phone naturally",
      description: "Just keep your phone with you as you go about your day."
    },
    {
      icon: Activity,
      title: "We learn from movement",
      description: "Your motion patterns help improve how devices understand people."
    },
    {
      icon: TrendingUp,
      title: "Earn as you move",
      description: "Get rewarded for the time your phone contributes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Progress indicator */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-12 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          How MoveAI works
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          A simple way to contribute and earn.
        </p>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
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
          onClick={() => navigate("/onboarding/privacy")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
