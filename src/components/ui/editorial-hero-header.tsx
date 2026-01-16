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

/* Floating Water Droplet Animation Component */
export interface FloatingWaterDropletProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function FloatingWaterDroplet({
  size = "md",
  onClick,
  className,
}: FloatingWaterDropletProps) {
  const sizeConfig = {
    sm: { container: "w-14 h-14", droplet: "w-10 h-12" },
    md: { container: "w-20 h-20", droplet: "w-14 h-16" },
    lg: { container: "w-28 h-28", droplet: "w-20 h-24" },
  };

  const sizes = sizeConfig[size];

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full flex items-center justify-center",
        sizes.container,
        className
      )}
      aria-label="Water your garden"
    >
      {/* Ambient glow - soft blue tint */}
      <div className="absolute inset-0 -m-6 rounded-full bg-sky-200/30 blur-2xl opacity-60" />
      
      {/* Water droplet SVG with translucency and highlight */}
      <svg
        viewBox="0 0 64 80"
        className={cn(
          "relative drop-shadow-lg cursor-pointer",
          "transition-transform duration-500 group-hover:scale-105 group-active:scale-95",
          sizes.droplet
        )}
        style={{
          animation: "droplet-float 6s ease-in-out infinite",
          filter: "drop-shadow(0 8px 16px rgba(56, 189, 248, 0.3))",
        }}
      >
        <defs>
          {/* Main gradient - soft sky blue with translucency */}
          <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 90%, 75%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(200, 85%, 60%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(200, 80%, 50%)" stopOpacity="0.8" />
          </linearGradient>
          {/* Highlight gradient */}
          <linearGradient id="dropletHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="40%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* Shimmer gradient */}
          <radialGradient id="dropletShimmer" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Droplet body */}
        <path
          d="M32 8 C32 8 8 40 8 52 C8 66 18 76 32 76 C46 76 56 66 56 52 C56 40 32 8 32 8 Z"
          fill="url(#dropletGradient)"
        />
        
        {/* Highlight overlay */}
        <path
          d="M32 12 C32 12 14 38 14 50 C14 60 22 68 32 68 C32 68 20 60 20 48 C20 36 32 12 32 12 Z"
          fill="url(#dropletHighlight)"
        />
        
        {/* Small shimmer spot */}
        <ellipse
          cx="22"
          cy="36"
          rx="6"
          ry="8"
          fill="url(#dropletShimmer)"
          style={{
            animation: "shimmer-pulse 3s ease-in-out infinite",
          }}
        />
      </svg>
      
      {/* Subtle pulse ring */}
      <div 
        className="absolute inset-0 -m-3 rounded-full border border-sky-300/30"
        style={{
          animation: "droplet-ring-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes droplet-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(1deg); }
          50% { transform: translateY(-3px) rotate(-0.5deg); }
          75% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes droplet-ring-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        @keyframes shimmer-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
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
