import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SessionCompletedPage() {
  const navigate = useNavigate();

  // Mock duration data
  const duration = "12 min";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Success Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-20 h-20 rounded-full bg-success-subtle flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <h1 className="font-display text-2xl font-bold text-center mb-2">
          Challenge complete
        </h1>
        <p className="text-muted-foreground text-center text-sm max-w-xs mb-8">
          Thank you for contributing. Your data helps improve how machines understand movement.
        </p>

        {/* Summary Card */}
        <Card className="w-full max-w-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{duration}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 space-y-3">
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => navigate("/session/annotate")}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Quick feedback helps improve accuracy
        </p>
      </div>
    </div>
  );
}
