import * as React from "react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  text: string;
  time: string;
}

interface ActivityTickerProps {
  items: ActivityItem[];
  interval?: number;
  className?: string;
}

export function ActivityTicker({ 
  items, 
  interval = 6000,
  className 
}: ActivityTickerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const fadeOut = () => {
      setIsVisible(false);
    };

    const changeItem = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsVisible(true);
    };

    // Fade out before changing
    const fadeTimer = setInterval(() => {
      fadeOut();
      setTimeout(changeItem, 400); // Wait for fade out, then change
    }, interval);

    return () => clearInterval(fadeTimer);
  }, [items.length, interval]);

  const currentItem = items[currentIndex];

  return (
    <div 
      className={cn(
        "flex items-center gap-2 text-[11px] text-muted-foreground/50 select-none pointer-events-none",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Subtle pulse indicator */}
      <span 
        className={cn(
          "w-1 h-1 rounded-full bg-success/40 transition-opacity duration-400",
          isVisible ? "opacity-100" : "opacity-0"
        )} 
      />
      
      {/* Activity text with fade animation */}
      <span 
        className={cn(
          "transition-all duration-400 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-1"
        )}
      >
        {currentItem.text}
      </span>
      
      {/* Time separator and value */}
      <span 
        className={cn(
          "text-muted-foreground/20 transition-opacity duration-400",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        ·
      </span>
      <span 
        className={cn(
          "text-muted-foreground/30 transition-all duration-400 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-1"
        )}
      >
        {currentItem.time}
      </span>
    </div>
  );
}
