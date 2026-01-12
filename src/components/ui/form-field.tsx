import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  hint,
  error,
  required,
  disabled,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label
          className={cn(
            "text-sm font-medium text-foreground",
            disabled && "text-muted-foreground"
          )}
        >
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </Label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-danger font-medium">{error}</p>
      )}
    </div>
  );
}
