import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Flower2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingExplainPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Sparkles,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      title: "Complete small challenges",
      description: "Fun, quick tasks you can do around your home"
    },
    {
      icon: Flower2,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      title: "Grow your garden",
      description: "Watch your plants bloom as you stay active"
    },
    {
      icon: Eye,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      title: "Discover your patterns",
      description: "Learn how you move through your everyday life"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-8 pb-32">
        {/* Friendly header */}
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-2">
          Here's how it works
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          Simple steps, real rewards
        </p>

        {/* Steps */}
        <div className="space-y-5 max-w-sm mx-auto w-full">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30"
            >
              {/* Soft icon */}
              <div className={`w-11 h-11 rounded-xl ${step.iconBg} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-5 h-5 ${step.iconColor}`} />
              </div>
              
              {/* Copy */}
              <div className="flex-1 pt-0.5">
                <h3 className="font-semibold text-foreground text-[15px] mb-0.5">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
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
          onClick={() => navigate("/onboarding/privacy")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
