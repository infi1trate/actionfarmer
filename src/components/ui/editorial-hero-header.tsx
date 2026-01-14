import * as React from "react";
import { cn } from "@/lib/utils";

export interface EditorialHeroHeaderProps {
  /** Small uppercase context label above title */
  eyebrow?: string;
  /** Large primary title */
  title: string;
  /** Optional subhead explaining the page purpose */
  subhead?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Background position (defaults to 'center') */
  backgroundPosition?: string;
  /** Optional world element to render (seed, plant, gauge, etc.) */
  worldElement?: React.ReactNode;
  /** CTA button configuration */
  cta?: {
    label: string;
    onClick?: () => void;
  };
  /** Height variant */
  variant?: "default" | "compact" | "tall";
  /** Custom className for the header container */
  className?: string;
  /** Whether to show gradient overlay (useful for scene backgrounds) */
  showGradient?: boolean;
  /** Children rendered below the text content */
  children?: React.ReactNode;
}

const heightConfig = {
  compact: {
    mobile: "160px",
    desktop: "180px",
  },
  default: {
    mobile: "200px",
    desktop: "240px",
  },
  tall: {
    mobile: "280px",
    desktop: "320px",
  },
};

export function EditorialHeroHeader({
  eyebrow,
  title,
  subhead,
  backgroundImage,
  backgroundPosition = "center",
  worldElement,
  cta,
  variant = "default",
  className,
  showGradient = true,
  children,
}: EditorialHeroHeaderProps) {
  const heights = heightConfig[variant];

  return (
    <header
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        minHeight: heights.mobile,
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition,
            }}
          />
          {/* Gradient fade */}
          {showGradient && (
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent via-60% to-background z-0" />
          )}
        </>
      )}

      {/* Text Content */}
      <div className="relative z-10 px-5 pt-8 pb-4">
        {eyebrow && (
          <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">
          {title}
        </h1>
        {subhead && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
            {subhead}
          </p>
        )}
      </div>

      {/* World Element Container */}
      {worldElement && (
        <div className="relative z-10 flex flex-col items-center justify-center">
          {worldElement}
        </div>
      )}

      {/* CTA Button */}
      {cta && (
        <div className="relative z-10 flex justify-center pb-4">
          <button
            onClick={cta.onClick}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            {cta.label}
          </button>
        </div>
      )}

      {/* Additional Children */}
      {children}
    </header>
  );
}

/* Floating Seed Animation Component */
export interface FloatingSeedProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function FloatingSeed({
  src,
  alt = "Seed",
  size = "md",
  onClick,
  className,
}: FloatingSeedProps) {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full",
        className
      )}
      aria-label="Plant a seed"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -m-6 rounded-full bg-white/15 blur-2xl opacity-50" />
      
      {/* Seed with 6-8s float animation */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "relative object-contain drop-shadow-lg cursor-pointer",
          "transition-transform duration-500 group-hover:scale-105 group-active:scale-95",
          sizeClasses[size]
        )}
        style={{
          animation: "seed-drift 7s ease-in-out infinite",
        }}
      />
      
      {/* Subtle pulse ring */}
      <div 
        className="absolute inset-0 -m-3 rounded-full border border-white/20"
        style={{
          animation: "seed-ring-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes seed-drift {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-0.5deg); }
        }
        @keyframes seed-ring-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>
    </button>
  );
}

/* Ambient Activity Ticker */
export interface AmbientTickerProps {
  messages: string[];
  intervalMs?: number;
  className?: string;
}

export function AmbientTicker({
  messages,
  intervalMs = 6000,
  className,
}: AmbientTickerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages.length, intervalMs]);

  return (
    <div className={cn("flex justify-center pointer-events-none", className)}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-sm text-xs text-foreground/70 border border-white/30 shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-success/60 animate-pulse" />
        <span key={currentIndex} className="animate-fade-in">
          {messages[currentIndex]}
        </span>
      </div>
    </div>
  );
}
