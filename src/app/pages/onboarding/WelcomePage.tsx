import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/onboarding/signup");
  };

  const handleSignIn = () => {
    navigate("/onboarding/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
        {/* Logo/Brand placeholder */}
        <div className="w-20 h-20 rounded-2xl bg-brand-yellow flex items-center justify-center mb-8">
          <span className="text-3xl font-display font-bold text-brand-yellow-foreground">M</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-display font-bold text-center text-foreground mb-3">
          MoveAI
        </h1>

        {/* Tagline */}
        <p className="text-center text-muted-foreground text-lg max-w-sm leading-relaxed">
          Move better. Earn rewards.
        </p>
      </main>

      {/* Footer with buttons */}
      <footer className="p-6 pb-10 space-y-3">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleGetStarted}
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="lg" 
          className="w-full"
          onClick={handleSignIn}
        >
          I already have an account
        </Button>
      </footer>
    </div>
  );
}
