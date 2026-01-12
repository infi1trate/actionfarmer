import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva(
  "shrink-0",
  {
    variants: {
      variant: {
        default: "bg-border",
        subtle: "bg-border/50",
        strong: "bg-border-2",
        brand: "bg-brand-yellow/30",
      },
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
      spacing: {
        none: "",
        sm: "",
        default: "",
        lg: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", spacing: "sm", className: "my-2" },
      { orientation: "horizontal", spacing: "default", className: "my-4" },
      { orientation: "horizontal", spacing: "lg", className: "my-6" },
      { orientation: "vertical", spacing: "sm", className: "mx-2" },
      { orientation: "vertical", spacing: "default", className: "mx-4" },
      { orientation: "vertical", spacing: "lg", className: "mx-6" },
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      spacing: "none",
    },
  }
);

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, orientation, spacing, label, ...props }, ref) => {
    if (label && orientation === "horizontal") {
      return (
        <div 
          ref={ref}
          className={cn(
            "flex items-center gap-4",
            spacing === "sm" && "my-2",
            spacing === "default" && "my-4",
            spacing === "lg" && "my-6",
            className
          )}
          {...props}
        >
          <div className={cn("flex-1 h-px", variant === "subtle" ? "bg-border/50" : "bg-border")} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <div className={cn("flex-1 h-px", variant === "subtle" ? "bg-border/50" : "bg-border")} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ variant, orientation, spacing }), className)}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
