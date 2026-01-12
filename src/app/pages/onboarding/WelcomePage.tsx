import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wifi, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    icon: Wifi,
    title: "Connect Your Devices",
    description: "Turn your idle devices into earning machines. Join a decentralized network that rewards you for contributing resources.",
    color: "bg-info/10",
    iconColor: "text-info",
  },
  {
    icon: DollarSign,
    title: "Earn Passively",
    description: "Get paid for device uptime and network contributions. The longer you stay connected, the more you earn.",
    color: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your privacy is protected. We never access your personal data or files. Only network resources are shared.",
    color: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description: "Withdraw your earnings anytime to your bank account, card, or crypto wallet. No minimum thresholds.",
    color: "bg-brand-yellow/10",
    iconColor: "text-brand-yellow",
  },
];

export function WelcomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/onboarding/signup");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/signup");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <header className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
        {/* Icon */}
        <div className={cn(
          "w-32 h-32 rounded-3xl flex items-center justify-center mb-10",
          slide.color
        )}>
          <Icon className={cn("w-16 h-16", slide.iconColor)} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-display font-bold text-center text-foreground mb-4">
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-center text-muted-foreground text-lg max-w-sm leading-relaxed">
          {slide.description}
        </p>
      </main>

      {/* Footer with pagination and button */}
      <footer className="p-6 pb-10">
        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentSlide 
                  ? "w-6 bg-brand-yellow" 
                  : "bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Continue button */}
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={handleNext}
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}
