import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, Cell } from "recharts";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const miniBarVariants = cva("", {
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

export interface MiniBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof miniBarVariants> {
  data: number[];
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "gradient";
  highlightLast?: boolean;
  gap?: number;
  radius?: number;
}

const variantColors: Record<string, string> = {
  default: "hsl(var(--muted-foreground))",
  brand: "hsl(var(--brand-yellow))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  danger: "hsl(var(--danger))",
  gradient: "hsl(var(--brand-yellow))",
};

const MiniBar = React.forwardRef<HTMLDivElement, MiniBarProps>(
  (
    {
      className,
      data,
      size,
      variant = "brand",
      highlightLast = true,
      gap = 2,
      radius = 2,
      ...props
    },
    ref
  ) => {
    const chartData = data.map((value, index) => ({ value, index }));
    const baseColor = variantColors[variant];
    const mutedColor = "hsl(var(--secondary))";

    return (
      <div
        ref={ref}
        className={cn(miniBarVariants({ size }), className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barGap={gap}
          >
            <Bar 
              dataKey="value" 
              radius={[radius, radius, radius, radius]}
              isAnimationActive={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    highlightLast && index === chartData.length - 1
                      ? baseColor
                      : highlightLast
                      ? mutedColor
                      : baseColor
                  }
                  opacity={
                    highlightLast && index !== chartData.length - 1 ? 0.4 : 1
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
MiniBar.displayName = "MiniBar";

// MiniBar with label
export interface MiniBarLabeledProps extends MiniBarProps {
  label?: string;
  value?: string | number;
}

const MiniBarLabeled = React.forwardRef<HTMLDivElement, MiniBarLabeledProps>(
  ({ className, data, label, value, size = "default", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)}>
        <MiniBar data={data} size={size} {...props} />
        {(label || value !== undefined) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-xs text-muted-foreground">{label}</span>
            )}
            {value !== undefined && (
              <span className="font-semibold text-sm tabular-nums">{value}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
MiniBarLabeled.displayName = "MiniBarLabeled";

// Horizontal progress-style bar
export interface MiniBarHorizontalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "brand" | "success" | "warning" | "danger";
  showValue?: boolean;
  size?: "sm" | "default" | "lg";
}

const MiniBarHorizontal = React.forwardRef<HTMLDivElement, MiniBarHorizontalProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = "brand",
      showValue = false,
      size = "default",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const heightClass = {
      sm: "h-1",
      default: "h-1.5",
      lg: "h-2",
    }[size];

    const colorClass = {
      default: "bg-foreground",
      brand: "bg-brand-primary",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
    }[variant];

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <div className={cn("flex-1 rounded-full bg-secondary overflow-hidden", heightClass)}>
          <div
            className={cn("h-full rounded-full transition-all duration-300", colorClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="text-xs font-medium tabular-nums text-muted-foreground min-w-[2.5rem] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
MiniBarHorizontal.displayName = "MiniBarHorizontal";

export { MiniBar, MiniBarLabeled, MiniBarHorizontal, miniBarVariants };
