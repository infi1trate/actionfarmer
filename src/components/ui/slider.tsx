import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-surface-3",
        brand: "bg-brand-yellow-soft",
        success: "bg-success-soft",
      },
      size: {
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const sliderRangeVariants = cva(
  "absolute h-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-brand-yellow",
        brand: "bg-brand-yellow",
        success: "bg-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderThumbVariants = cva(
  "block rounded-full border-2 bg-white shadow-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95",
  {
    variants: {
      variant: {
        default: "border-brand-yellow",
        brand: "border-brand-yellow",
        success: "border-success",
      },
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderTrackVariants> {
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, size, showValue, formatValue, value, defaultValue, ...props }, ref) => {
  const currentValue = value?.[0] ?? defaultValue?.[0] ?? 0;
  const displayValue = formatValue ? formatValue(currentValue) : currentValue;

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant, size }))}>
          <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ variant, size }))} />
      </SliderPrimitive.Root>
      {showValue && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-foreground bg-surface px-1.5 py-0.5 rounded shadow-sm">
          {displayValue}
        </span>
      )}
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

// Labeled Slider (for "reward multiplier" style)
interface LabeledSliderProps extends SliderProps {
  label: string;
  minLabel?: string;
  maxLabel?: string;
}

const LabeledSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  LabeledSliderProps
>(({ label, minLabel, maxLabel, className, ...props }, ref) => (
  <div className={cn("space-y-3", className)}>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {props.showValue && props.value && (
        <span className="text-sm font-semibold text-brand-yellow">
          {props.formatValue ? props.formatValue(props.value[0]) : props.value[0]}
        </span>
      )}
    </div>
    <Slider ref={ref} {...props} showValue={false} />
    {(minLabel || maxLabel) && (
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    )}
  </div>
));
LabeledSlider.displayName = "LabeledSlider";

export { Slider, LabeledSlider, sliderTrackVariants };
