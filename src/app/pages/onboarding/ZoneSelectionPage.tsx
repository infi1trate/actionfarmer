import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Plus, Check, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Zone {
  id: string;
  name: string;
  description: string;
  estimatedEarnings: string;
  selected: boolean;
}

export function ZoneSelectionPage() {
  const navigate = useNavigate();
  
  const [zones, setZones] = React.useState<Zone[]>([
    {
      id: "living",
      name: "Living Area",
      description: "High-traffic common spaces",
      estimatedEarnings: "$2-5/day",
      selected: true
    },
    {
      id: "hallway",
      name: "Hallway",
      description: "Transition zones between rooms",
      estimatedEarnings: "$1-3/day",
      selected: false
    },
    {
      id: "kitchen",
      name: "Kitchen",
      description: "Active movement during meals",
      estimatedEarnings: "$1-4/day",
      selected: false
    },
    {
      id: "workspace",
      name: "Workspace",
      description: "Desk and work areas",
      estimatedEarnings: "$1-2/day",
      selected: false
    }
  ]);

  const toggleZone = (id: string) => {
    setZones(zones.map(zone => 
      zone.id === id ? { ...zone, selected: !zone.selected } : zone
    ));
  };

  const selectedCount = zones.filter(z => z.selected).length;
  const totalEstimate = selectedCount > 0 ? `$${selectedCount * 2}-${selectedCount * 4}/day` : "$0/day";

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Header */}
      <div className="px-6 pt-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Camera Setup • Step 2 of 3
        </p>
      </div>

      {/* Back button */}
      <div className="px-6 pt-4">
        <button 
          onClick={() => navigate("/onboarding/camera")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Select zones
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Choose which areas you'd like to monitor. You can change this anytime.
        </p>

        {/* Estimated earnings summary */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Estimated earnings</span>
            </div>
            <span className="text-lg font-semibold text-primary">{totalEstimate}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on typical activity levels. Actual earnings may vary.
          </p>
        </div>

        {/* Zone selection */}
        <div className="space-y-3">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                zone.selected 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  zone.selected 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {zone.selected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-foreground">{zone.name}</h3>
                    <span className="text-sm font-medium text-primary">{zone.estimatedEarnings}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{zone.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* User control emphasis */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          You're always in control. Skip zones or adjust selections in Settings.
        </p>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10 space-y-3">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/schedule")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/schedule")}
        >
          Skip for now
        </Button>
      </footer>
    </div>
  );
}
