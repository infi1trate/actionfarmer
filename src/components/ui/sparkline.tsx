import * as React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sparklineVariants = cva("", {
  variants: {
    size: {
      xs: "h-4 w-12",
      sm: "h-6 w-16",
      default: "h-8 w-24",
      lg: "h-10 w-32",
      xl: "h-12 w-40",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SparklineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sparklineVariants> {
  data: number[];
  variant?: "default" | "brand" | "success" | "warning" | "danger";
  showDot?: boolean;
  curved?: boolean;
  filled?: boolean;
  strokeWidth?: number;
}

const variantColors: Record<string, { stroke: string; fill: string }> = {
  default: { 
    stroke: "hsl(var(--foreground))", 
    fill: "hsl(var(--foreground) / 0.1)" 
  },
  brand: { 
    stroke: "hsl(var(--brand-yellow))", 
    fill: "hsl(var(--brand-yellow) / 0.15)" 
  },
  success: { 
    stroke: "hsl(var(--success))", 
    fill: "hsl(var(--success) / 0.15)" 
  },
  warning: { 
    stroke: "hsl(var(--warning))", 
    fill: "hsl(var(--warning) / 0.15)" 
  },
  danger: { 
    stroke: "hsl(var(--danger))", 
    fill: "hsl(var(--danger) / 0.15)" 
  },
};

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
  (
    {
      className,
      data,
      size,
      variant = "brand",
      showDot = false,
      curved = true,
      filled = false,
      strokeWidth = 2,
      ...props
    },
    ref
  ) => {
    const chartData = data.map((value, index) => ({ value, index }));
    const colors = variantColors[variant];
    const isPositiveTrend = data.length > 1 && data[data.length - 1] >= data[0];

    // Auto-detect variant based on trend if using default
    const effectiveColors = variant === "default" 
      ? (isPositiveTrend ? variantColors.success : variantColors.danger)
      : colors;

    return (
      <div
        ref={ref}
        className={cn(sparklineVariants({ size }), className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line
              type={curved ? "monotone" : "linear"}
              dataKey="value"
              stroke={effectiveColors.stroke}
              strokeWidth={strokeWidth}
              dot={showDot ? { r: 2, fill: effectiveColors.stroke } : false}
              activeDot={false}
              fill={filled ? effectiveColors.fill : "none"}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
Sparkline.displayName = "Sparkline";

// Sparkline with trend indicator
export interface SparklineTrendProps extends SparklineProps {
  label?: string;
  value?: string | number;
  delta?: number;
}

const SparklineTrend = React.forwardRef<HTMLDivElement, SparklineTrendProps>(
  ({ className, data, label, value, delta, size = "default", ...props }, ref) => {
    const isPositive = delta !== undefined ? delta >= 0 : (data.length > 1 && data[data.length - 1] >= data[0]);
    
    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)}>
        <Sparkline 
          data={data} 
          size={size}
          variant={isPositive ? "success" : "danger"}
          {...props} 
        />
        {(label || value !== undefined || delta !== undefined) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-xs text-muted-foreground">{label}</span>
            )}
            <div className="flex items-baseline gap-1.5">
              {value !== undefined && (
                <span className="font-semibold text-sm tabular-nums">{value}</span>
              )}
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
          </div>
        )}
      </div>
    );
  }
);
SparklineTrend.displayName = "SparklineTrend";

export { Sparkline, SparklineTrend, sparklineVariants };
