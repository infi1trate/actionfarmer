import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Zap, Star, Trophy, Flame, Target, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const xpTagVariants = cva(
  "inline-flex items-center gap-1 font-display font-bold tracking-tight select-none",
  {
    variants: {
      variant: {
        default: "text-brand-primary",
        gold: "text-brand-primary",
        silver: "text-muted-foreground",
        bronze: "text-warning",
        platinum: "text-info",
        streak: "text-danger",
      },
      size: {
        xs: "text-xs gap-0.5",
        sm: "text-sm gap-1",
        default: "text-base gap-1",
        lg: "text-lg gap-1.5",
        xl: "text-xl gap-1.5",
      },
      appearance: {
        minimal: "",
        badge: "px-2 py-0.5 rounded-md",
        pill: "px-2.5 py-0.5 rounded-full",
      },
    },
    compoundVariants: [
      // Badge backgrounds
      { variant: "default", appearance: "badge", className: "bg-brand-primary/10" },
      { variant: "gold", appearance: "badge", className: "bg-brand-primary/10" },
      { variant: "silver", appearance: "badge", className: "bg-muted" },
      { variant: "bronze", appearance: "badge", className: "bg-warning/10" },
      { variant: "platinum", appearance: "badge", className: "bg-info/10" },
      { variant: "streak", appearance: "badge", className: "bg-danger/10" },
      // Pill backgrounds
      { variant: "default", appearance: "pill", className: "bg-brand-primary/10" },
      { variant: "gold", appearance: "pill", className: "bg-brand-primary/10" },
      { variant: "silver", appearance: "pill", className: "bg-muted" },
      { variant: "bronze", appearance: "pill", className: "bg-warning/10" },
      { variant: "platinum", appearance: "pill", className: "bg-info/10" },
      { variant: "streak", appearance: "pill", className: "bg-danger/10" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      appearance: "minimal",
    },
  }
);

// Icon size mapping
const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  default: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

// Default icons per variant
const variantIcons: Record<string, LucideIcon> = {
  default: Zap,
  gold: Star,
  silver: Award,
  bronze: Trophy,
  platinum: Target,
  streak: Flame,
};

export interface XPTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style">,
    VariantProps<typeof xpTagVariants> {
  value: number | string;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon | null;
  showIcon?: boolean;
  htmlStyle?: React.CSSProperties;
}

function XPTag({
  className,
  variant,
  size,
  appearance,
  value,
  suffix = "XP",
  prefix,
  icon,
  showIcon = true,
  htmlStyle,
  ...props
}: XPTagProps) {
  const sizeKey = size ?? "default";
  const variantKey = variant ?? "default";
  const IconComponent = icon === null ? null : (icon ?? variantIcons[variantKey]);
  const iconClassName = iconSizes[sizeKey];

  // Format large numbers
  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val;
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  return (
    <span
      className={cn(xpTagVariants({ variant, size, appearance }), className)}
      style={htmlStyle}
      {...props}
    >
      {showIcon && IconComponent && (
        <IconComponent className={cn(iconClassName, "flex-shrink-0")} />
      )}
      <span>
        {prefix}
        {formatValue(value)}
        {suffix && <span className="opacity-80 ml-0.5">{suffix}</span>}
      </span>
    </span>
  );
}

// Streak counter variant
interface StreakTagProps extends Omit<XPTagProps, "variant" | "suffix" | "icon" | "value"> {
  days: number;
}

function StreakTag({ days, className, ...props }: StreakTagProps) {
  return (
    <XPTag
      variant="streak"
      value={days}
      suffix={days === 1 ? "day" : "days"}
      icon={Flame}
      className={className}
      {...props}
    />
  );
}

// Level tag variant
interface LevelTagProps extends Omit<XPTagProps, "suffix" | "prefix" | "value"> {
  level: number;
}

function LevelTag({ level, className, variant = "gold", ...props }: LevelTagProps) {
  return (
    <XPTag
      variant={variant}
      value={level}
      prefix="Lv."
      suffix=""
      icon={Star}
      className={className}
      {...props}
    />
  );
}

// Points tag (generic points, not XP)
interface PointsTagProps extends Omit<XPTagProps, "suffix" | "value"> {
  points: number;
  unit?: string;
}

function PointsTag({ points, unit = "pts", className, ...props }: PointsTagProps) {
  return (
    <XPTag
      value={points}
      suffix={unit}
      className={className}
      {...props}
    />
  );
}

export { XPTag, StreakTag, LevelTag, PointsTag, xpTagVariants };
