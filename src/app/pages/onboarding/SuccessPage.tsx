import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SuccessPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/onboarding/camera");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-8">
          <Check className="w-12 h-12 text-success" strokeWidth={2} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-display font-bold text-center text-foreground mb-3">
          You're All Set
        </h1>

        {/* Subtitle - calm, friendly */}
        <p className="text-center text-muted-foreground text-lg max-w-xs leading-relaxed mb-8">
          Your account is ready. Let's get you moving.
        </p>

        {/* What's next card */}
        <Card className="w-full max-w-sm p-5 space-y-4">
          <h3 className="font-semibold text-foreground">What's next</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-brand-yellow-foreground">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Explore the app</p>
                <p className="text-xs text-muted-foreground">Get familiar with your dashboard</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-brand-yellow-foreground">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Start your first session</p>
                <p className="text-xs text-muted-foreground">Try a quick movement check</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-brand-yellow-foreground">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Track your progress</p>
                <p className="text-xs text-muted-foreground">See improvements over time</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleContinue}
        >
          Let's Go
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
