import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-brand-yellow data-[state=unchecked]:bg-surface-3",
        success:
          "data-[state=checked]:bg-success data-[state=unchecked]:bg-surface-3",
        danger:
          "data-[state=checked]:bg-danger data-[state=unchecked]:bg-surface-3",
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant, size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

// Switch with Label (ToggleSwitch)
interface ToggleSwitchProps extends SwitchProps {
  label: string;
  description?: string;
  labelPosition?: "left" | "right";
}

const ToggleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleSwitchProps
>(({ label, description, labelPosition = "right", className, disabled, ...props }, ref) => (
  <label
    className={cn(
      "flex items-start gap-3 cursor-pointer",
      labelPosition === "left" && "flex-row-reverse justify-end",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
  >
    <Switch ref={ref} disabled={disabled} {...props} />
    <div className="space-y-0.5">
      <span className="text-sm font-medium text-foreground leading-none">{label}</span>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  </label>
));
ToggleSwitch.displayName = "ToggleSwitch";

export { Switch, ToggleSwitch, switchVariants };
