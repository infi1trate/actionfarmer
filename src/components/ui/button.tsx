import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border rounded-lg",
        outline:
          "border-2 border-border bg-transparent hover:bg-secondary hover:border-border-strong rounded-lg",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground rounded-lg",
        link:
          "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm rounded-lg",
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow-sm rounded-lg",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm rounded-lg",
        brand:
          "bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover shadow-sm hover:shadow-glow font-bold rounded-lg",
        "brand-outline":
          "border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary-subtle rounded-lg",
        "brand-ghost":
          "text-brand-primary hover:bg-brand-primary-subtle rounded-lg",
        soft:
          "bg-brand-primary-subtle text-foreground hover:bg-brand-primary/20 rounded-lg",
        pill:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-9 px-3 text-sm rounded-md",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg font-bold rounded-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
