import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressRingVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-10 h-10",
      default: "w-16 h-16",
      lg: "w-24 h-24",
      xl: "w-32 h-32",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const strokeWidthMap = {
  sm: 3,
  default: 4,
  lg: 5,
  xl: 6,
};

const radiusMap = {
  sm: 16,
  default: 28,
  lg: 44,
  xl: 60,
};

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressRingVariants> {
  value: number;
  max?: number;
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "info";
  showValue?: boolean;
  label?: string;
  strokeWidth?: number;
}

const variantColors = {
  default: "stroke-primary",
  brand: "stroke-brand-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  danger: "stroke-danger",
  info: "stroke-info",
};

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      className,
      value,
      max = 100,
      size = "default",
      variant = "default",
      showValue = false,
      label,
      strokeWidth: customStrokeWidth,
      ...props
    },
    ref
  ) => {
    const sizeKey = size || "default";
    const strokeWidth = customStrokeWidth || strokeWidthMap[sizeKey];
    const radius = radiusMap[sizeKey];
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const svgSize = (radius + strokeWidth) * 2;

    return (
      <div
        ref={ref}
        className={cn(progressRingVariants({ size }), className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-secondary"
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              variantColors[variant],
              "transition-all duration-500 ease-out motion-reduce:transition-none"
            )}
          />
        </svg>
        {(showValue || label) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showValue && (
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  size === "sm" && "text-xs",
                  size === "default" && "text-sm",
                  size === "lg" && "text-lg",
                  size === "xl" && "text-2xl"
                )}
              >
                {Math.round(percentage)}%
              </span>
            )}
            {label && (
              <span
                className={cn(
                  "text-muted-foreground",
                  size === "sm" && "text-[8px]",
                  size === "default" && "text-[10px]",
                  size === "lg" && "text-xs",
                  size === "xl" && "text-sm"
                )}
              >
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
ProgressRing.displayName = "ProgressRing";

export { ProgressRing, progressRingVariants };
