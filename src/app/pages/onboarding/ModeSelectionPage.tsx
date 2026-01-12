import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Gamepad2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  enabled: boolean;
  onToggle: () => void;
}

function ModeCard({ 
  icon: Icon, 
  title, 
  subtitle, 
  description, 
  features, 
  enabled, 
  onToggle 
}: ModeCardProps) {
  return (
    <Card
      className={cn(
        "relative p-6 cursor-pointer transition-all duration-300",
        enabled 
          ? "border-brand-primary bg-brand-primary-subtle ring-2 ring-brand-primary/20" 
          : "border-border hover:border-muted-foreground/30"
      )}
      onClick={onToggle}
    >
      {/* Selection indicator */}
      <div 
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all",
          enabled 
            ? "bg-brand-primary text-white" 
            : "border-2 border-muted-foreground/30"
        )}
      >
        {enabled && <Check className="w-4 h-4" />}
      </div>

      {/* Icon */}
      <div 
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors",
          enabled 
            ? "bg-brand-primary text-white" 
            : "bg-secondary text-muted-foreground"
        )}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <div>
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <div 
              className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                enabled ? "bg-brand-primary/20 text-brand-primary" : "bg-secondary text-muted-foreground"
              )}
            >
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ModeSelectionPage() {
  const navigate = useNavigate();
  const [ambientEnabled, setAmbientEnabled] = React.useState(false);
  const [playEnabled, setPlayEnabled] = React.useState(false);

  const canContinue = ambientEnabled || playEnabled;

  const handleContinue = () => {
    // Navigate to main app
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="font-display text-2xl font-bold text-center mb-2">
          Choose your modes
        </h1>
        <p className="text-muted-foreground text-center text-sm max-w-xs mx-auto">
          Select how you'd like to participate. You can enable both or just one.
        </p>
      </div>

      {/* Mode Cards */}
      <div className="flex-1 px-6 space-y-4 pb-6">
        <ModeCard
          icon={Camera}
          title="Ambient Mode"
          subtitle="Passive contribution"
          description="Your camera quietly captures motion data in the background while you go about your day."
          features={[
            "Runs automatically when scheduled",
            "No active participation needed",
            "Pause or stop anytime",
            "Privacy-first design"
          ]}
          enabled={ambientEnabled}
          onToggle={() => setAmbientEnabled(!ambientEnabled)}
        />

        <ModeCard
          icon={Gamepad2}
          title="Play Mode"
          subtitle="Active challenges"
          description="Complete fun movement challenges and activities to contribute motion data your way."
          features={[
            "Choose from daily challenges",
            "Track your progress",
            "Play at your own pace",
            "Extra rewards for completion"
          ]}
          enabled={playEnabled}
          onToggle={() => setPlayEnabled(!playEnabled)}
        />
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 space-y-3">
        <Button 
          className="w-full" 
          size="lg"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          You can change these settings anytime in your profile
        </p>
      </div>
    </div>
  );
}
