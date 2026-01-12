import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textInputVariants = cva(
  "flex w-full font-body transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:border-border",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-surface hover:border-border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
        filled:
          "border-2 border-transparent bg-surface-2 hover:bg-surface-3 focus-visible:border-ring focus-visible:bg-surface",
        outline:
          "border-2 border-border bg-transparent hover:border-border-2 focus-visible:border-ring",
        ghost:
          "border-b-2 border-border bg-transparent rounded-none px-0 hover:border-border-2 focus-visible:border-ring",
      },
      inputSize: {
        sm: "h-8 px-2.5 py-1.5 text-sm rounded-lg",
        default: "h-10 px-3 py-2 text-sm rounded-lg",
        lg: "h-12 px-4 py-3 text-base rounded-xl",
      },
      hasError: {
        true: "border-danger focus-visible:ring-danger/30 focus-visible:border-danger",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      hasError: false,
    },
  }
);

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textInputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type = "text", variant, inputSize, hasError, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              textInputVariants({ variant, inputSize, hasError, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(textInputVariants({ variant, inputSize, hasError, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

export { TextInput, textInputVariants };
