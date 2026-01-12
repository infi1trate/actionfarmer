import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  id: string;
  name: string;
  timeRange: string;
  icon: React.ElementType;
  selected: boolean;
}

export function ScheduleSelectionPage() {
  const navigate = useNavigate();
  
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([
    {
      id: "morning",
      name: "Morning",
      timeRange: "6 AM – 12 PM",
      icon: Sunrise,
      selected: true
    },
    {
      id: "afternoon",
      name: "Afternoon",
      timeRange: "12 PM – 6 PM",
      icon: Sun,
      selected: true
    },
    {
      id: "evening",
      name: "Evening",
      timeRange: "6 PM – 10 PM",
      icon: Sunset,
      selected: true
    },
    {
      id: "night",
      name: "Night",
      timeRange: "10 PM – 6 AM",
      icon: Moon,
      selected: false
    }
  ]);

  const [alwaysOn, setAlwaysOn] = React.useState(false);

  const toggleTimeSlot = (id: string) => {
    if (alwaysOn) return;
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, selected: !slot.selected } : slot
    ));
  };

  const toggleAlwaysOn = () => {
    setAlwaysOn(!alwaysOn);
    if (!alwaysOn) {
      setTimeSlots(timeSlots.map(slot => ({ ...slot, selected: true })));
    }
  };

  const selectedHours = timeSlots.filter(s => s.selected).length * 6;

  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset">
      {/* Header */}
      <div className="px-6 pt-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Camera Setup • Step 3 of 3
        </p>
      </div>

      {/* Back button */}
      <div className="px-6 pt-4">
        <button 
          onClick={() => navigate("/onboarding/zones")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-32">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Set your schedule
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Choose when MoveAI is active. Adjust anytime in Settings.
        </p>

        {/* Active hours summary */}
        <div className="bg-muted/50 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {alwaysOn ? "24 hours" : `${selectedHours} hours`} per day
            </p>
            <p className="text-xs text-muted-foreground">
              More active time = higher potential earnings
            </p>
          </div>
        </div>

        {/* Always on toggle */}
        <button
          onClick={toggleAlwaysOn}
          className={`w-full p-4 rounded-2xl border-2 mb-4 transition-all ${
            alwaysOn 
              ? "border-primary bg-primary/5" 
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                alwaysOn ? "bg-primary/10" : "bg-muted"
              }`}>
                <Clock className={`w-5 h-5 ${alwaysOn ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Always on</h3>
                <p className="text-sm text-muted-foreground">Run continuously</p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors ${
              alwaysOn ? "bg-primary" : "bg-muted"
            }`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-1 ${
                alwaysOn ? "translate-x-6" : "translate-x-1"
              }`} />
            </div>
          </div>
        </button>

        {/* Time slot selection */}
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => toggleTimeSlot(slot.id)}
              disabled={alwaysOn}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                slot.selected 
                  ? "border-primary/50 bg-primary/5" 
                  : "border-border bg-card"
              } ${alwaysOn ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  slot.selected ? "bg-primary/10" : "bg-muted"
                }`}>
                  <slot.icon className={`w-5 h-5 ${slot.selected ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{slot.name}</h3>
                  <p className="text-sm text-muted-foreground">{slot.timeRange}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  slot.selected 
                    ? "border-primary bg-primary" 
                    : "border-muted-foreground/30"
                }`}>
                  {slot.selected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* User control emphasis */}
        <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium text-foreground">You're in control.</span> Pause or adjust your schedule anytime from the app.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 pb-10 space-y-3">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/modes")}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/onboarding/modes")}
        >
          I'll set this up later
        </Button>
      </footer>
    </div>
  );
}
