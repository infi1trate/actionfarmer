import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Smartphone, Sun, Users, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CameraPlacementPage() {
  const navigate = useNavigate();

  const tips = [
    {
      icon: Smartphone,
      title: "Stable surface",
      description: "Place your phone on a flat, steady surface—a shelf or stand works great."
    },
    {
      icon: Sun,
      title: "Good lighting",
      description: "Natural or indoor lighting helps. Avoid pointing directly at windows."
    },
    {
      icon: Users,
      title: "Capture movement areas",
      description: "Aim where you naturally walk or move—hallways, living rooms, or workspaces."
    },
    {
      icon: RotateCcw,
      title: "Landscape mode",
      description: "Turning your phone sideways captures a wider view."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Header */}
      <div className="px-6 pt-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Camera Setup • Step 1 of 3
        </p>
      </div>

      {/* Back button */}
      <div className="px-6 pt-4">
        <button 
          onClick={() => navigate("/onboarding/success")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Position your phone
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          A few tips to get the best results.
        </p>

        {/* Camera preview placeholder */}
        <div className="aspect-video bg-muted rounded-2xl mb-8 flex items-center justify-center border-2 border-dashed border-border">
          <div className="text-center">
            <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Camera preview</p>
            <p className="text-xs text-muted-foreground/70">Will appear here during setup</p>
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <tip.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tip.description}
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
          onClick={() => navigate("/onboarding/zones")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
