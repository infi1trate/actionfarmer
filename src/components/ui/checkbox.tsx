import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 rounded border-2 transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
  {
    variants: {
      variant: {
        default:
          "border-border data-[state=checked]:bg-brand-yellow data-[state=checked]:border-brand-yellow data-[state=checked]:text-brand-yellow-foreground data-[state=indeterminate]:bg-brand-yellow data-[state=indeterminate]:border-brand-yellow data-[state=indeterminate]:text-brand-yellow-foreground",
        success:
          "border-border data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground",
        danger:
          "border-danger data-[state=checked]:bg-danger data-[state=checked]:border-danger data-[state=checked]:text-danger-foreground",
      },
      size: {
        sm: "h-4 w-4 [&_svg]:h-3 [&_svg]:w-3",
        default: "h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5",
        lg: "h-6 w-6 [&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant, size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      {props.checked === "indeterminate" ? (
        <Minus className="stroke-[3]" />
      ) : (
        <Check className="stroke-[3]" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Checkbox with Label
interface CheckboxWithLabelProps extends CheckboxProps {
  label: string;
  description?: string;
}

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ label, description, className, disabled, ...props }, ref) => (
  <label
    className={cn(
      "flex items-start gap-3 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
  >
    <Checkbox ref={ref} disabled={disabled} {...props} />
    <div className="space-y-0.5">
      <span className="text-sm font-medium text-foreground leading-none">{label}</span>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  </label>
));
CheckboxWithLabel.displayName = "CheckboxWithLabel";

export { Checkbox, CheckboxWithLabel, checkboxVariants };
