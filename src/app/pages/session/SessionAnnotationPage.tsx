import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Hand, RotateCcw, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnnotationOption {
  id: string;
  label: string;
  icon: React.ElementType;
  selected: boolean;
}

export function SessionAnnotationPage() {
  const navigate = useNavigate();

  const [options, setOptions] = React.useState<AnnotationOption[]>([
    { id: "slipped", label: "Object slipped", icon: Hand, selected: false },
    { id: "regrip", label: "Re-grip needed", icon: RotateCcw, selected: false },
    { id: "interrupted", label: "Interrupted", icon: AlertCircle, selected: false },
    { id: "nothing", label: "Nothing notable", icon: CheckCircle, selected: false },
  ]);

  const toggleOption = (id: string) => {
    setOptions(options.map(opt => {
      // If selecting "nothing notable", deselect others
      if (id === "nothing" && !options.find(o => o.id === "nothing")?.selected) {
        return opt.id === "nothing" ? { ...opt, selected: true } : { ...opt, selected: false };
      }
      // If selecting another option while "nothing" is selected, deselect "nothing"
      if (id !== "nothing" && options.find(o => o.id === "nothing")?.selected) {
        if (opt.id === "nothing") return { ...opt, selected: false };
        if (opt.id === id) return { ...opt, selected: true };
        return opt;
      }
      // Normal toggle
      return opt.id === id ? { ...opt, selected: !opt.selected } : opt;
    }));
  };

  const handleSubmit = () => {
    navigate("/session/confirm");
  };

  const handleSkip = () => {
    navigate("/session/confirm");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="font-display text-2xl font-bold text-center mb-2">
          Quick feedback
        </h1>
        <p className="text-muted-foreground text-center text-sm max-w-xs mx-auto">
          Did anything happen during this challenge? Select all that apply.
        </p>
      </div>

      {/* Annotation Options */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <Card
              key={option.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200",
                option.selected 
                  ? "border-brand-primary bg-brand-primary-subtle ring-2 ring-brand-primary/20" 
                  : "border-border hover:border-muted-foreground/30"
              )}
              onClick={() => toggleOption(option.id)}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    option.selected 
                      ? "bg-brand-primary text-white" 
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <option.icon className="w-6 h-6" />
                </div>
                <span 
                  className={cn(
                    "text-sm font-medium",
                    option.selected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {option.label}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Helper text */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          This is optional and only takes a second
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 space-y-3">
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
        >
          Submit
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button 
          variant="ghost" 
          className="w-full" 
          size="lg"
          onClick={handleSkip}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
