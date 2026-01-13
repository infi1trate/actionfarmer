import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Lightbulb,
  Repeat,
  Ban,
  ArrowLeft,
} from "lucide-react";
import { challengeData } from "./ChallengeBriefPage";

interface AnnotationOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  selected: boolean;
}

export const ChallengeAnnotationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const challenge = challengeData[id || "1"] || challengeData["1"];

  const [options, setOptions] = React.useState<AnnotationOption[]>([
    { id: "went-well", label: "Went smoothly", icon: ThumbsUp, selected: false },
    { id: "difficult", label: "Found it difficult", icon: ThumbsDown, selected: false },
    { id: "interrupted", label: "Got interrupted", icon: AlertCircle, selected: false },
    { id: "learned", label: "Learned something", icon: Lightbulb, selected: false },
    { id: "would-repeat", label: "Would do again", icon: Repeat, selected: false },
    { id: "nothing", label: "Nothing notable", icon: Ban, selected: false },
  ]);

  const toggleOption = (optionId: string) => {
    setOptions((prev) => {
      // If selecting "nothing notable", deselect all others
      if (optionId === "nothing") {
        return prev.map((opt) => ({
          ...opt,
          selected: opt.id === "nothing" ? !opt.selected : false,
        }));
      }
      
      // If selecting any other option, deselect "nothing notable"
      return prev.map((opt) => {
        if (opt.id === "nothing") return { ...opt, selected: false };
        if (opt.id === optionId) return { ...opt, selected: !opt.selected };
        return opt;
      });
    });
  };

  const handleSubmit = () => {
    // In real app, would save annotations
    const selected = options.filter(o => o.selected).map(o => o.id);
    console.log("Challenge annotations:", { challengeId: challenge.id, annotations: selected });
    navigate("/challenges");
  };

  const handleSkip = () => {
    navigate("/challenges");
  };

  const hasSelection = options.some((opt) => opt.selected);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b border-border">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Quick Feedback</h1>
          <p className="text-xs text-muted-foreground">{challenge.name}</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 space-y-6 pb-32">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            How did this challenge go? (Optional)
          </p>
        </div>

        {/* Annotation Grid */}
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all active:scale-[0.98] ${
                  option.selected
                    ? "bg-primary/10 border-primary ring-1 ring-primary"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => toggleOption(option.id)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <IconComponent
                    className={`h-6 w-6 ${
                      option.selected ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      option.selected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Note about privacy */}
        <Card className="p-4 bg-muted/30 border-0">
          <p className="text-xs text-muted-foreground text-center">
            Your feedback helps improve challenge recommendations. This is completely optional and private.
          </p>
        </Card>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border space-y-2">
        <Button 
          className="w-full h-12 text-base font-semibold"
          onClick={handleSubmit}
          disabled={!hasSelection}
        >
          Submit Feedback
        </Button>
        <Button 
          variant="ghost"
          className="w-full h-10 text-sm text-muted-foreground"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export default ChallengeAnnotationPage;
