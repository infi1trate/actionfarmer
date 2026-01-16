import * as React from "react";
import { cn } from "@/lib/utils";

interface TickerItem {
  id: string;
  emoji: string;
  message: string;
}

interface CommunityActivityTickerProps {
  items?: TickerItem[];
  className?: string;
}

// Default ambient community messages
const defaultItems: TickerItem[] = [
  { id: "1", emoji: "🌱", message: "Someone completed Kitchen Cleanup" },
  { id: "2", emoji: "🌼", message: "A garden just bloomed" },
  { id: "3", emoji: "⭐", message: "Daily bonus unlocked" },
  { id: "4", emoji: "🌿", message: "3-day streak achieved" },
  { id: "5", emoji: "🌻", message: "New plant evolved" },
  { id: "6", emoji: "💧", message: "Someone watered their garden" },
  { id: "7", emoji: "☀️", message: "Morning challenge completed" },
  { id: "8", emoji: "🍃", message: "A seed sprouted" },
];

export function CommunityActivityTicker({ 
  items = defaultItems,
  className 
}: CommunityActivityTickerProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const tickerRef = React.useRef<HTMLDivElement>(null);

  // Double the items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Glassy container */}
      <div className="mx-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-white/50 to-transparent z-10 pointer-events-none rounded-l-2xl" />
        <div className="absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent z-10 pointer-events-none rounded-r-2xl" />
        
        {/* Scrolling content */}
        <div 
          ref={tickerRef}
          className={cn(
            "flex items-center py-3 px-2",
            "animate-marquee",
            isPaused && "animation-paused"
          )}
          style={{
            animationDuration: "45s",
          }}
        >
          {duplicatedItems.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <div className="flex items-center gap-1.5 shrink-0 px-2">
                <span className="text-sm">{item.emoji}</span>
                <span className="text-xs font-medium text-foreground/80 whitespace-nowrap">
                  {item.message}
                </span>
              </div>
              
              {/* Soft dot divider */}
              <div className="w-1 h-1 rounded-full bg-foreground/20 shrink-0 mx-2" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Keyframes for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
        
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
