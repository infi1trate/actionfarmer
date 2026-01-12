import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-body font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        outline:
          "border border-border text-foreground bg-transparent",
        destructive:
          "bg-destructive text-destructive-foreground border-transparent",
        success:
          "bg-success text-success-foreground border-transparent",
        warning:
          "bg-warning text-warning-foreground border-transparent",
        info:
          "bg-info text-info-foreground border-transparent",
        "success-subtle":
          "bg-success-subtle text-success border border-success/20",
        "danger-subtle":
          "bg-danger-subtle text-danger border border-danger/20",
        "warning-subtle":
          "bg-warning-subtle text-warning border border-warning/20",
        "info-subtle":
          "bg-info-subtle text-info border border-info/20",
        brand:
          "bg-brand-primary text-brand-primary-foreground border-transparent",
        "brand-subtle":
          "bg-brand-primary-subtle text-foreground border border-brand-primary/20",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs rounded-md",
        sm: "px-2 py-0.5 text-[10px] rounded",
        lg: "px-3 py-1 text-sm rounded-lg",
        pill: "px-3 py-0.5 text-xs rounded-full",
        "pill-lg": "px-4 py-1 text-sm rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
