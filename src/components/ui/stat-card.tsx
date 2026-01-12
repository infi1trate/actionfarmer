import * as React from "react";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "rounded-xl border p-5 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        elevated: "bg-card border-border shadow-md",
        outlined: "bg-transparent border-2 border-border",
        brand: "bg-brand-yellow-soft border-brand-yellow/20",
        success: "bg-success-soft border-success/20",
        warning: "bg-warning-soft border-warning/20",
        danger: "bg-danger-soft border-danger/20",
      },
      size: {
        sm: "p-4",
        default: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  delta?: {
    value: string | number;
    type: "increase" | "decrease" | "neutral";
    label?: string;
  };
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    value, 
    delta, 
    icon: Icon,
    trend,
    loading,
    ...props 
  }, ref) => {
    const getDeltaColor = () => {
      if (!delta) return "";
      switch (delta.type) {
        case "increase": return "text-success";
        case "decrease": return "text-danger";
        default: return "text-muted-foreground";
      }
    };

    const getDeltaIcon = () => {
      if (!delta) return null;
      switch (delta.type) {
        case "increase": return <TrendingUp className="w-3.5 h-3.5" />;
        case "decrease": return <TrendingDown className="w-3.5 h-3.5" />;
        default: return <Minus className="w-3.5 h-3.5" />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            {/* Label */}
            <p className="text-sm font-medium text-muted-foreground truncate">
              {label}
            </p>
            
            {/* Value */}
            {loading ? (
              <div className="h-9 w-24 bg-surface-2 animate-pulse rounded-lg" />
            ) : (
              <p className="font-display text-3xl font-bold text-foreground truncate">
                {value}
              </p>
            )}
            
            {/* Delta */}
            {delta && !loading && (
              <div className={cn("flex items-center gap-1 text-sm font-medium", getDeltaColor())}>
                {getDeltaIcon()}
                <span>{delta.value}</span>
                {delta.label && (
                  <span className="text-muted-foreground font-normal">{delta.label}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Icon */}
          {Icon && (
            <div className={cn(
              "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
              variant === "brand" ? "bg-brand-yellow/20" : "bg-surface-2"
            )}>
              <Icon className={cn(
                "w-5 h-5",
                variant === "brand" ? "text-brand-yellow-foreground" : "text-muted-foreground"
              )} />
            </div>
          )}
        </div>
      </div>
    );
  }
);
StatCard.displayName = "StatCard";

// Compact variant for dashboards
export interface StatCardCompactProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "increase" | "decrease" | "neutral";
  className?: string;
}

const StatCardCompact = React.forwardRef<HTMLDivElement, StatCardCompactProps>(
  ({ label, value, delta, deltaType = "neutral", className }, ref) => {
    const getDeltaColor = () => {
      switch (deltaType) {
        case "increase": return "text-success";
        case "decrease": return "text-danger";
        default: return "text-muted-foreground";
      }
    };

    return (
      <div ref={ref} className={cn("space-y-1", className)}>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-foreground">
            {value}
          </span>
          {delta && (
            <span className={cn("text-xs font-medium", getDeltaColor())}>
              {delta}
            </span>
          )}
        </div>
      </div>
    );
  }
);
StatCardCompact.displayName = "StatCardCompact";

export { StatCard, StatCardCompact, statCardVariants };
