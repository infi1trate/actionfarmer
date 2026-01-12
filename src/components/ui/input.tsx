import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full font-body transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-input hover:bg-input-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-focus",
        filled:
          "border-2 border-transparent bg-secondary hover:bg-secondary/80 focus-visible:border-brand-primary focus-visible:bg-background",
        outline:
          "border-2 border-border bg-transparent hover:border-border-strong focus-visible:border-brand-primary",
        ghost:
          "border-b-2 border-border bg-transparent rounded-none px-0 hover:border-border-strong focus-visible:border-brand-primary",
      },
      inputSize: {
        default: "h-10 px-3 py-2 text-sm rounded-lg",
        sm: "h-8 px-2.5 py-1.5 text-sm rounded-md",
        lg: "h-12 px-4 py-3 text-base rounded-lg",
        xl: "h-14 px-5 py-4 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
