import * as React from "react";
import { Monitor, Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dropdown variant
export function ReduceMotionToggle() {
  const { userReducedMotion, prefersReducedMotion, setReducedMotion } = useReducedMotion();

  const getCurrentIcon = () => {
    if (userReducedMotion === null) return Monitor;
    return userReducedMotion ? Pause : Play;
  };

  const Icon = getCurrentIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Icon className="h-4 w-4" />
          <span className="sr-only">Motion preference</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setReducedMotion(false)}
          className={cn(userReducedMotion === false && "bg-accent")}
        >
          <Play className="mr-2 h-4 w-4" />
          <span>Animations On</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setReducedMotion(true)}
          className={cn(userReducedMotion === true && "bg-accent")}
        >
          <Pause className="mr-2 h-4 w-4" />
          <span>Reduce Motion</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setReducedMotion(null)}
          className={cn(userReducedMotion === null && "bg-accent")}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System ({prefersReducedMotion ? "Reduced" : "Normal"})</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Switch variant for settings
interface ReduceMotionSwitchProps {
  className?: string;
}

export function ReduceMotionSwitch({ className }: ReduceMotionSwitchProps) {
  const { effectiveReducedMotion, setReducedMotion } = useReducedMotion();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        role="switch"
        aria-checked={effectiveReducedMotion}
        onClick={() => setReducedMotion(!effectiveReducedMotion)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          effectiveReducedMotion ? "bg-brand-yellow" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
            effectiveReducedMotion ? "translate-x-5" : "translate-x-0",
            "transition-transform duration-200 motion-reduce:transition-none"
          )}
        />
      </button>
      <span className="text-sm text-foreground">Reduce Motion</span>
    </div>
  );
}

// Segmented control variant
export function ReduceMotionSegmented({ className }: { className?: string }) {
  const { userReducedMotion, prefersReducedMotion, setReducedMotion } = useReducedMotion();

  const options: Array<{ value: boolean | null; label: string; icon: typeof Play }> = [
    { value: false, label: "On", icon: Play },
    { value: null, label: "System", icon: Monitor },
    { value: true, label: "Off", icon: Pause },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        className
      )}
      role="radiogroup"
      aria-label="Motion preference"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = userReducedMotion === value;
        return (
          <button
            key={String(value)}
            role="radio"
            aria-checked={isActive}
            onClick={() => setReducedMotion(value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
