import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioItemVariants = cva(
  "aspect-square rounded-full border-2 transition-all duration-200 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
  {
    variants: {
      variant: {
        default:
          "border-border data-[state=checked]:border-brand-yellow",
        success:
          "border-border data-[state=checked]:border-success",
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

const radioDotVariants = cva(
  "rounded-full transition-transform duration-200 data-[state=unchecked]:scale-0 data-[state=checked]:scale-100",
  {
    variants: {
      variant: {
        default: "bg-brand-yellow",
        success: "bg-success",
      },
      size: {
        sm: "h-2 w-2",
        default: "h-2.5 w-2.5",
        lg: "h-3 w-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ variant, size, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className={cn(radioDotVariants({ variant, size }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Radio with Label
interface RadioWithLabelProps extends RadioGroupItemProps {
  label: string;
  description?: string;
}

const RadioWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioWithLabelProps
>(({ label, description, className, disabled, ...props }, ref) => (
  <label
    className={cn(
      "flex items-start gap-3 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
  >
    <RadioGroupItem ref={ref} disabled={disabled} {...props} />
    <div className="space-y-0.5">
      <span className="text-sm font-medium text-foreground leading-none">{label}</span>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  </label>
));
RadioWithLabel.displayName = "RadioWithLabel";

export { RadioGroup, RadioGroupItem, RadioWithLabel, radioItemVariants };
