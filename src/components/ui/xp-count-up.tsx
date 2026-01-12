import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const xpCountUpVariants = cva(
  "inline-flex items-baseline gap-1 font-bold tabular-nums transition-colors motion-reduce:transition-none",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-4xl",
        xl: "text-5xl",
      },
      variant: {
        default: "text-foreground",
        brand: "text-brand-primary",
        success: "text-success",
        gradient:
          "bg-gradient-to-r from-brand-primary to-warning bg-clip-text text-transparent",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface XPCountUpProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof xpCountUpVariants> {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatOptions?: Intl.NumberFormatOptions;
  onComplete?: () => void;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const XPCountUp = React.forwardRef<HTMLDivElement, XPCountUpProps>(
  (
    {
      className,
      value,
      duration = 1500,
      prefix,
      suffix = "XP",
      size,
      variant,
      formatOptions,
      onComplete,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const previousValue = React.useRef(0);
    const animationRef = React.useRef<number>();

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    React.useEffect(() => {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        previousValue.current = value;
        return;
      }

      const startValue = previousValue.current;
      const endValue = value;
      const diff = endValue - startValue;

      if (diff === 0) return;

      setIsAnimating(true);
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        const currentValue = Math.round(startValue + diff * easedProgress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          previousValue.current = endValue;
          setIsAnimating(false);
          onComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [value, duration, prefersReducedMotion, onComplete]);

    const formattedValue = React.useMemo(() => {
      const formatter = new Intl.NumberFormat(
        undefined,
        formatOptions || { useGrouping: true }
      );
      return formatter.format(displayValue);
    }, [displayValue, formatOptions]);

    const sizeKey = size || "default";

    return (
      <div
        ref={ref}
        className={cn(
          xpCountUpVariants({ size, variant }),
          isAnimating && "scale-105",
          className
        )}
        style={{
          transition: isAnimating ? "transform 0.1s ease-out" : undefined,
        }}
        {...props}
      >
        {prefix && (
          <span
            className={cn(
              "font-medium",
              sizeKey === "sm" && "text-sm",
              sizeKey === "default" && "text-base",
              sizeKey === "lg" && "text-xl",
              sizeKey === "xl" && "text-2xl"
            )}
          >
            {prefix}
          </span>
        )}
        <span>{formattedValue}</span>
        {suffix && (
          <span
            className={cn(
              "font-semibold uppercase tracking-wide text-muted-foreground",
              sizeKey === "sm" && "text-[10px]",
              sizeKey === "default" && "text-xs",
              sizeKey === "lg" && "text-sm",
              sizeKey === "xl" && "text-base"
            )}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
XPCountUp.displayName = "XPCountUp";

// Compact inline version
export interface XPCountUpInlineProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  duration?: number;
  suffix?: string;
}

const XPCountUpInline = React.forwardRef<HTMLSpanElement, XPCountUpInlineProps>(
  ({ className, value, duration = 1000, suffix = "XP", ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const previousValue = React.useRef(0);
    const animationRef = React.useRef<number>();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    React.useEffect(() => {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        previousValue.current = value;
        return;
      }

      const startValue = previousValue.current;
      const endValue = value;
      const diff = endValue - startValue;

      if (diff === 0) return;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        const currentValue = Math.round(startValue + diff * easedProgress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          previousValue.current = endValue;
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [value, duration, prefersReducedMotion]);

    return (
      <span
        ref={ref}
        className={cn("font-semibold tabular-nums", className)}
        {...props}
      >
        {displayValue.toLocaleString()}
        {suffix && (
          <span className="ml-0.5 text-xs font-medium uppercase text-muted-foreground">
            {suffix}
          </span>
        )}
      </span>
    );
  }
);
XPCountUpInline.displayName = "XPCountUpInline";

export { XPCountUp, XPCountUpInline, xpCountUpVariants };
