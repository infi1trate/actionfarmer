import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Flame, Zap, Trophy } from "lucide-react";

const streakIndicatorVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold transition-colors motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "text-foreground",
        fire: "text-warning",
        electric: "text-brand-primary",
        gold: "text-amber-500 dark:text-amber-400",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },
    defaultVariants: {
      variant: "fire",
      size: "default",
    },
  }
);

const iconSizeMap = {
  sm: "w-3.5 h-3.5",
  default: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

export interface StreakIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof streakIndicatorVariants> {
  count: number;
  label?: string;
  showFlame?: boolean;
  milestone?: boolean;
  maxDisplay?: number;
}

const StreakIndicator = React.forwardRef<HTMLDivElement, StreakIndicatorProps>(
  (
    {
      className,
      variant = "fire",
      size = "default",
      count,
      label,
      showFlame = true,
      milestone = false,
      maxDisplay = 999,
      ...props
    },
    ref
  ) => {
    const sizeKey = size || "default";
    const iconSize = iconSizeMap[sizeKey];

    const Icon =
      variant === "electric" ? Zap : variant === "gold" ? Trophy : Flame;

    const displayCount = count > maxDisplay ? `${maxDisplay}+` : count;

    return (
      <div
        ref={ref}
        className={cn(streakIndicatorVariants({ variant, size }), className)}
        {...props}
      >
        {showFlame && (
          <span
            className={cn(
              "relative",
              milestone && "animate-bounce-subtle"
            )}
          >
            <Icon
              className={cn(
                iconSize,
                variant === "fire" && "fill-warning/20",
                variant === "electric" && "fill-brand-primary/20",
                variant === "gold" && "fill-amber-500/20"
              )}
            />
          </span>
        )}
        <span className="tabular-nums">{displayCount}</span>
        {label && (
          <span className="text-muted-foreground font-normal">{label}</span>
        )}
      </div>
    );
  }
);
StreakIndicator.displayName = "StreakIndicator";

// Compact badge variant
const streakBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold transition-colors motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground",
        fire: "bg-warning-soft text-warning-text",
        electric: "bg-brand-primary-subtle text-brand-primary",
        gold: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        default: "text-xs px-2 py-0.5",
        lg: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "fire",
      size: "default",
    },
  }
);

export interface StreakBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof streakBadgeVariants> {
  count: number;
}

const StreakBadge = React.forwardRef<HTMLDivElement, StreakBadgeProps>(
  ({ className, variant = "fire", size = "default", count, ...props }, ref) => {
    const sizeKey = size || "default";
    const iconSize =
      sizeKey === "sm" ? "w-2.5 h-2.5" : sizeKey === "lg" ? "w-4 h-4" : "w-3 h-3";

    const Icon =
      variant === "electric" ? Zap : variant === "gold" ? Trophy : Flame;

    return (
      <div
        ref={ref}
        className={cn(streakBadgeVariants({ variant, size }), className)}
        {...props}
      >
        <Icon className={cn(iconSize, "fill-current/20")} />
        <span className="tabular-nums">{count}</span>
      </div>
    );
  }
);
StreakBadge.displayName = "StreakBadge";

export { StreakIndicator, StreakBadge, streakIndicatorVariants, streakBadgeVariants };
