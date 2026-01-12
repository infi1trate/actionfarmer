import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textAreaVariants = cva(
  "flex w-full min-h-[100px] font-body transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:border-border resize-y",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-surface hover:border-border-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
        filled:
          "border-2 border-transparent bg-surface-2 hover:bg-surface-3 focus-visible:border-ring focus-visible:bg-surface",
        outline:
          "border-2 border-border bg-transparent hover:border-border-2 focus-visible:border-ring",
      },
      textAreaSize: {
        sm: "px-2.5 py-2 text-sm rounded-lg min-h-[80px]",
        default: "px-3 py-2.5 text-sm rounded-lg min-h-[100px]",
        lg: "px-4 py-3 text-base rounded-xl min-h-[140px]",
      },
      hasError: {
        true: "border-danger focus-visible:ring-danger/30 focus-visible:border-danger",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      textAreaSize: "default",
      hasError: false,
    },
  }
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
  showCharCount?: boolean;
  maxLength?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, textAreaSize, hasError, showCharCount, maxLength, value, ...props }, ref) => {
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative">
        <textarea
          className={cn(textAreaVariants({ variant, textAreaSize, hasError, className }))}
          ref={ref}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {showCharCount && maxLength && (
          <span 
            className={cn(
              "absolute bottom-2 right-3 text-xs text-muted-foreground",
              charCount >= maxLength && "text-danger"
            )}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea, textAreaVariants };
