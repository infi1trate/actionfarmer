import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        // Primary - Yellow brand action
        primary:
          "bg-brand-yellow text-brand-yellow-foreground hover:bg-brand-yellow-hover active:bg-brand-yellow-active shadow-sm hover:shadow-md active:shadow-sm rounded-lg",
        // Secondary - Neutral surface
        secondary:
          "bg-surface-2 text-text hover:bg-surface-3 active:bg-state-active border border-border rounded-lg",
        // Ghost - Transparent
        ghost:
          "bg-transparent text-text hover:bg-surface-2 active:bg-surface-3 rounded-lg",
        // Destructive - Danger
        destructive:
          "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active shadow-sm rounded-lg",
        // Link - Text only
        link:
          "text-brand-yellow underline-offset-4 hover:underline bg-transparent p-0 h-auto font-medium",
        // Outline variants
        outline:
          "border-2 border-border bg-transparent text-text hover:bg-surface-2 active:bg-surface-3 rounded-lg",
        "outline-primary":
          "border-2 border-brand-yellow text-brand-yellow bg-transparent hover:bg-brand-yellow-soft active:bg-brand-yellow/20 rounded-lg",
        "outline-destructive":
          "border-2 border-danger text-danger bg-transparent hover:bg-danger-soft active:bg-danger/20 rounded-lg",
        // Soft/subtle variants
        soft:
          "bg-brand-yellow-soft text-text hover:bg-brand-yellow/20 active:bg-brand-yellow/30 rounded-lg",
        "soft-destructive":
          "bg-danger-soft text-danger-text hover:bg-danger/20 active:bg-danger/30 rounded-lg",
        // Status variants
        success:
          "bg-success text-success-foreground hover:bg-success-hover active:bg-success-active shadow-sm rounded-lg",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning-hover active:bg-warning-active shadow-sm rounded-lg",
        info:
          "bg-info text-info-foreground hover:bg-info-hover active:bg-info-active shadow-sm rounded-lg",
        // Legacy aliases
        default:
          "bg-brand-yellow text-brand-yellow-foreground hover:bg-brand-yellow-hover active:bg-brand-yellow-active shadow-sm hover:shadow-md rounded-lg",
        brand:
          "bg-brand-yellow text-brand-yellow-foreground hover:bg-brand-yellow-hover active:bg-brand-yellow-active shadow-sm hover:shadow-glow font-bold rounded-lg",
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        default: "h-10 px-4 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        xl: "h-14 px-8 text-lg font-bold rounded-xl [&_svg]:size-5",
        // Icon-only sizes
        "icon-sm": "h-8 w-8 p-0 rounded-lg [&_svg]:size-4",
        icon: "h-10 w-10 p-0 rounded-lg [&_svg]:size-5",
        "icon-lg": "h-12 w-12 p-0 rounded-xl [&_svg]:size-6",
        // Circular icon buttons
        "icon-circle-sm": "h-8 w-8 p-0 rounded-full [&_svg]:size-4",
        "icon-circle": "h-10 w-10 p-0 rounded-full [&_svg]:size-5",
        "icon-circle-lg": "h-12 w-12 p-0 rounded-full [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const isIconOnly = size?.toString().includes("icon");
    
    // When asChild is true, we can't add extra elements, so render simply
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "relative text-transparent hover:text-transparent"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-current" style={{ color: 'inherit' }} />
          </span>
        )}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {!isIconOnly && <span className={loading ? "invisible" : ""}>{children}</span>}
        {isIconOnly && children}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

// ButtonGroup Component
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, attached = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          attached && [
            "[&>button]:rounded-none",
            "[&>button:first-child]:rounded-l-lg",
            "[&>button:last-child]:rounded-r-lg",
            "[&>button:not(:first-child)]:border-l-0",
            "[&>button:not(:last-child)]:border-r",
            "[&>button:not(:last-child)]:border-r-border/50",
          ],
          !attached && "gap-1",
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonGroup, buttonVariants };