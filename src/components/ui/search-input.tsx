import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  inputSize?: "sm" | "default" | "lg";
  showClearButton?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ 
    className, 
    value = "", 
    onChange, 
    onClear, 
    inputSize = "default", 
    showClearButton = true,
    placeholder = "Search...",
    disabled,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleClear = () => {
      onChange?.("");
      onClear?.();
    };

    const sizeClasses = {
      sm: "h-8 text-sm",
      default: "h-10 text-sm",
      lg: "h-12 text-base",
    };

    const iconSizeClasses = {
      sm: "w-4 h-4",
      default: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className={cn("relative", className)}>
        <Search 
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
            iconSizeClasses[inputSize]
          )} 
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full pl-10 pr-10 rounded-lg font-body transition-all duration-200",
            "border border-border bg-surface-2",
            "placeholder:text-muted-foreground",
            "hover:bg-surface-3 hover:border-border-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring focus-visible:bg-surface",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
            sizeClasses[inputSize]
          )}
          {...props}
        />
        {showClearButton && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "text-muted-foreground hover:text-foreground",
              "rounded-full p-0.5 hover:bg-surface-3 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Clear search"
          >
            <X className={iconSizeClasses[inputSize]} />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
