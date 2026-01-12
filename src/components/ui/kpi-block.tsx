import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const kpiBlockVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-0.5",
      default: "gap-1",
      lg: "gap-1.5",
    },
    align: {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    size: "default",
    align: "left",
  },
});

const valueVariants = cva("font-bold tabular-nums tracking-tight", {
  variants: {
    size: {
      sm: "text-lg",
      default: "text-2xl",
      lg: "text-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const labelVariants = cva("text-muted-foreground font-medium", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface KPIBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kpiBlockVariants> {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  deltaType?: "increase" | "decrease" | "neutral";
  trend?: "up" | "down" | "flat";
  icon?: LucideIcon;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const KPIBlock = React.forwardRef<HTMLDivElement, KPIBlockProps>(
  (
    {
      className,
      size,
      align,
      label,
      value,
      delta,
      deltaLabel,
      deltaType,
      trend,
      icon: Icon,
      prefix,
      suffix,
      loading = false,
      ...props
    },
    ref
  ) => {
    // Determine trend direction
    const effectiveTrend = trend || (delta !== undefined ? (delta > 0 ? "up" : delta < 0 ? "down" : "flat") : undefined);
    
    // Determine if delta is positive, negative, or neutral for coloring
    const effectiveDeltaType = deltaType || (delta !== undefined ? (delta > 0 ? "increase" : delta < 0 ? "decrease" : "neutral") : "neutral");

    const TrendIcon = effectiveTrend === "up" 
      ? TrendingUp 
      : effectiveTrend === "down" 
      ? TrendingDown 
      : Minus;

    const deltaColorClass = {
      increase: "text-success",
      decrease: "text-danger",
      neutral: "text-muted-foreground",
    }[effectiveDeltaType];

    if (loading) {
      return (
        <div ref={ref} className={cn(kpiBlockVariants({ size, align }), className)} {...props}>
          <div className={cn("h-4 w-16 rounded bg-secondary animate-pulse", size === "lg" && "h-5 w-20")} />
          <div className={cn("h-7 w-24 rounded bg-secondary animate-pulse", size === "sm" && "h-5 w-16", size === "lg" && "h-9 w-32")} />
          {delta !== undefined && (
            <div className="h-4 w-12 rounded bg-secondary animate-pulse" />
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(kpiBlockVariants({ size, align }), className)} {...props}>
        {/* Label */}
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className={cn("w-3.5 h-3.5 text-muted-foreground", size === "lg" && "w-4 h-4")} />}
          <span className={cn(labelVariants({ size }))}>{label}</span>
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className={cn(valueVariants({ size }), "text-muted-foreground font-medium")}>
              {prefix}
            </span>
          )}
          <span className={cn(valueVariants({ size }))}>{value}</span>
          {suffix && (
            <span className={cn(
              "font-medium text-muted-foreground",
              size === "sm" && "text-xs",
              size === "default" && "text-sm",
              size === "lg" && "text-base"
            )}>
              {suffix}
            </span>
          )}
        </div>

        {/* Delta */}
        {delta !== undefined && (
          <div className={cn("flex items-center gap-1", deltaColorClass)}>
            <TrendIcon className={cn("w-3 h-3", size === "lg" && "w-4 h-4")} />
            <span className={cn("text-xs font-medium tabular-nums", size === "lg" && "text-sm")}>
              {delta > 0 ? "+" : ""}{delta}%
            </span>
            {deltaLabel && (
              <span className="text-xs text-muted-foreground">{deltaLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
KPIBlock.displayName = "KPIBlock";

// Row layout for multiple KPIs
export interface KPIRowProps extends React.HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

const KPIRow = React.forwardRef<HTMLDivElement, KPIRowProps>(
  ({ className, dividers = true, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn("flex items-start", className)}
        {...props}
      >
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            <div className="flex-1">{child}</div>
            {dividers && index < childrenArray.length - 1 && (
              <div className="w-px h-12 bg-border mx-4 self-center" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
KPIRow.displayName = "KPIRow";

// Compact inline KPI
export interface KPIInlineProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: number;
}

const KPIInline = React.forwardRef<HTMLDivElement, KPIInlineProps>(
  ({ className, label, value, delta, ...props }, ref) => {
    const isPositive = delta !== undefined && delta >= 0;

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
        {delta !== undefined && (
          <span 
            className={cn(
              "text-xs font-medium tabular-nums",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {isPositive ? "+" : ""}{delta}%
          </span>
        )}
      </div>
    );
  }
);
KPIInline.displayName = "KPIInline";

export { KPIBlock, KPIRow, KPIInline, kpiBlockVariants, valueVariants, labelVariants };
