import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Pause, Trash2, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingConsentPage() {
  const navigate = useNavigate();

  const controls = [
    {
      icon: Pause,
      title: "Pause anytime",
      description: "Stop contributing with a single tap—no questions asked."
    },
    {
      icon: Trash2,
      title: "Delete your data",
      description: "Request deletion of all your data at any time."
    },
    {
      icon: Download,
      title: "See what's collected",
      description: "View and export your own data whenever you want."
    },
    {
      icon: Bell,
      title: "Stay informed",
      description: "We'll always tell you before making changes to how data is used."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Progress indicator */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
        </div>
      </div>

      {/* Back button */}
      <div className="px-6 pt-4">
        <button 
          onClick={() => navigate("/onboarding/privacy")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          You're in control
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Your data, your rules. Always.
        </p>

        <div className="space-y-4">
          {controls.map((control, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <control.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-foreground mb-0.5">
                  {control.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {control.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="mt-10 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-foreground leading-relaxed text-center">
            We believe privacy is a right, not a privilege. Your trust is the foundation of everything we build.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/signup")}
        >
          Create Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
