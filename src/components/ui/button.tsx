import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center gap-2.5 whitespace-nowrap flex-nowrap font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        // Primary - Yellow brand action with skeuomorphic depth
        primary:
          "bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-yellow-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_6px_16px_-4px_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)_inset] active:translate-y-px rounded-xl",
        // Secondary - Neutral surface with subtle depth
        secondary:
          "bg-gradient-to-b from-surface-2 to-surface-3 text-text border border-border/60 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_2px_8px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_4px_12px_-4px_rgba(0,0,0,0.2)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.05)_inset] active:translate-y-px rounded-xl",
        // Ghost - Transparent with hover feedback
        ghost:
          "bg-transparent text-text hover:bg-surface-2 active:bg-surface-3 rounded-xl",
        // Destructive - Danger with depth
        destructive:
          "bg-gradient-to-b from-danger to-danger-hover text-danger-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(239,68,68,0.35)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_6px_16px_-4px_rgba(239,68,68,0.4)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)_inset] active:translate-y-px rounded-xl",
        // Link - Text only
        link:
          "text-brand-yellow underline-offset-4 hover:underline bg-transparent p-0 h-auto font-medium",
        // Outline variants with depth
        outline:
          "border-2 border-border bg-gradient-to-b from-background to-muted/30 text-text shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_2px_6px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_4px_10px_-4px_rgba(0,0,0,0.15)] hover:bg-surface-2 active:translate-y-px rounded-xl",
        "outline-primary":
          "border-2 border-brand-yellow text-brand-yellow bg-gradient-to-b from-brand-yellow/5 to-brand-yellow/10 shadow-[0_2px_8px_-4px_rgba(234,179,8,0.2)] hover:from-brand-yellow/10 hover:to-brand-yellow/15 hover:shadow-[0_4px_12px_-4px_rgba(234,179,8,0.3)] active:translate-y-px rounded-xl",
        "outline-destructive":
          "border-2 border-danger text-danger bg-gradient-to-b from-danger/5 to-danger/10 shadow-[0_2px_8px_-4px_rgba(239,68,68,0.2)] hover:from-danger/10 hover:to-danger/15 hover:shadow-[0_4px_12px_-4px_rgba(239,68,68,0.3)] active:translate-y-px rounded-xl",
        // Soft/subtle variants
        soft:
          "bg-gradient-to-b from-brand-yellow-soft to-brand-yellow/15 text-text shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset] hover:from-brand-yellow/20 hover:to-brand-yellow/25 active:translate-y-px rounded-xl",
        "soft-destructive":
          "bg-gradient-to-b from-danger-soft to-danger/15 text-danger-text shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset] hover:from-danger/20 hover:to-danger/25 active:translate-y-px rounded-xl",
        // Status variants with depth
        success:
          "bg-gradient-to-b from-success to-success-hover text-success-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(34,197,94,0.35)] active:translate-y-px rounded-xl",
        warning:
          "bg-gradient-to-b from-warning to-warning-hover text-warning-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(234,179,8,0.35)] active:translate-y-px rounded-xl",
        info:
          "bg-gradient-to-b from-info to-info-hover text-info-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(59,130,246,0.35)] active:translate-y-px rounded-xl",
        // Legacy aliases
        default:
          "bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-yellow-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_4px_12px_-4px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.3)] active:translate-y-px rounded-xl",
        brand:
          "bg-gradient-to-b from-brand-yellow to-brand-yellow-hover text-brand-yellow-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_-1px_0_0_rgba(0,0,0,0.1)_inset,0_6px_20px_-6px_rgba(234,179,8,0.5)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-6px_rgba(234,179,8,0.6)] active:translate-y-px font-bold rounded-xl",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        default: "h-11 px-5 text-sm [&_svg]:size-4",
        md: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-13 px-6 text-base [&_svg]:size-5",
        xl: "h-14 px-8 text-lg font-bold [&_svg]:size-5",
        // Icon-only sizes
        "icon-sm": "h-9 w-9 p-0 rounded-xl [&_svg]:size-4",
        icon: "h-11 w-11 p-0 rounded-xl [&_svg]:size-5",
        "icon-lg": "h-13 w-13 p-0 rounded-xl [&_svg]:size-6",
        // Circular icon buttons
        "icon-circle-sm": "h-9 w-9 p-0 rounded-full [&_svg]:size-4",
        "icon-circle": "h-11 w-11 p-0 rounded-full [&_svg]:size-5",
        "icon-circle-lg": "h-13 w-13 p-0 rounded-full [&_svg]:size-6",
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