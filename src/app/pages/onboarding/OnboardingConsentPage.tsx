import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Square, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingConsentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-8 pb-32">
        {/* Header */}
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-3">
          One challenge at a time
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-[280px] mx-auto">
          Recording only happens while you're doing a challenge
        </p>

        {/* Visual flow */}
        <div className="max-w-xs mx-auto w-full">
          {/* Step 1: Start */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-green-600 dark:text-green-400 ml-0.5" />
            </div>
            <div>
              <p className="text-foreground font-medium text-[15px]">You start a challenge</p>
              <p className="text-muted-foreground text-sm">Recording begins</p>
            </div>
          </div>

          {/* Connector line */}
          <div className="ml-6 w-px h-6 bg-border" />

          {/* Step 2: Finish */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <Square className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-foreground font-medium text-[15px]">You finish or stop</p>
              <p className="text-muted-foreground text-sm">Recording ends</p>
            </div>
          </div>

          {/* Connector line */}
          <div className="ml-6 w-px h-6 bg-border" />

          {/* Step 3: Growth */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium text-[15px]">Your garden grows</p>
              <p className="text-muted-foreground text-sm">And you earn rewards</p>
            </div>
          </div>
        </div>

        {/* Reassurance */}
        <p className="text-center text-muted-foreground text-sm mt-12 max-w-[260px] mx-auto leading-relaxed">
          Nothing happens in the background unless you choose it later.
        </p>
      </main>

      {/* Footer with CTA */}
      <footer className="p-6 pb-10">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/signup")}
        >
          Show me my first one
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
