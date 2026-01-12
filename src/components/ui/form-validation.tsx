import * as React from "react";
import { CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ValidationState = "idle" | "validating" | "valid" | "invalid" | "warning";

export interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  warning?: string;
  success?: string;
  validationState?: ValidationState;
  required?: boolean;
  showSuccessIcon?: boolean;
}

export const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ 
    label, 
    hint, 
    error, 
    warning,
    success,
    validationState = "idle",
    required,
    showSuccessIcon = true,
    className,
    ...props 
  }, ref) => {
    const state: ValidationState = error ? "invalid" : warning ? "warning" : success ? "valid" : validationState;

    const inputClasses = cn(
      state === "invalid" && "border-danger focus-visible:ring-danger",
      state === "warning" && "border-warning focus-visible:ring-warning",
      state === "valid" && "border-success focus-visible:ring-success",
      className
    );

    const message = error || warning || success || hint;
    const messageColor = error ? "text-danger" : warning ? "text-warning" : success ? "text-success" : "text-muted-foreground";

    return (
      <div className="space-y-1.5">
        {label && (
          <Label className={cn("text-sm font-medium", props.disabled && "text-muted-foreground")}>
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </Label>
        )}
        
        <div className="relative">
          <Input
            ref={ref}
            className={cn(inputClasses, (state !== "idle" || validationState === "validating") && "pr-10")}
            aria-invalid={state === "invalid"}
            aria-describedby={message ? `${props.id}-message` : undefined}
            {...props}
          />
          
          {/* Status Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {validationState === "validating" && (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            )}
            {state === "valid" && showSuccessIcon && (
              <CheckCircle2 className="w-4 h-4 text-success" />
            )}
            {state === "invalid" && (
              <AlertCircle className="w-4 h-4 text-danger" />
            )}
            {state === "warning" && (
              <Info className="w-4 h-4 text-warning" />
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <p id={`${props.id}-message`} className={cn("text-xs font-medium", messageColor)}>
            {message}
          </p>
        )}
      </div>
    );
  }
);
ValidatedInput.displayName = "ValidatedInput";

// Password strength indicator
export interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-danger" };
    if (score <= 2) return { score: 2, label: "Fair", color: "bg-warning" };
    if (score <= 3) return { score: 3, label: "Good", color: "bg-info" };
    return { score: 4, label: "Strong", color: "bg-success" };
  };

  const { score, label, color } = getStrength(password);
  
  if (!password) return null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              level <= score ? color : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-xs",
        score <= 1 ? "text-danger" : score <= 2 ? "text-warning" : score <= 3 ? "text-info" : "text-success"
      )}>
        {label} password
      </p>
    </div>
  );
}

// Form section with validation summary
export interface FormSectionProps {
  title?: string;
  description?: string;
  errors?: string[];
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, errors, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      {errors && errors.length > 0 && (
        <div className="p-3 rounded-lg bg-danger-soft border border-danger/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              {errors.map((error, i) => (
                <p key={i} className="text-sm text-danger-text">{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Inline field validation (shows as you type)
export interface InlineValidationProps {
  rules: Array<{
    test: (value: string) => boolean;
    message: string;
  }>;
  value: string;
  showOnlyFailed?: boolean;
  className?: string;
}

export function InlineValidation({ rules, value, showOnlyFailed = false, className }: InlineValidationProps) {
  if (!value) return null;

  const results = rules.map((rule) => ({
    ...rule,
    passed: rule.test(value),
  }));

  const displayRules = showOnlyFailed ? results.filter((r) => !r.passed) : results;

  if (displayRules.length === 0) return null;

  return (
    <ul className={cn("space-y-1", className)}>
      {displayRules.map((rule, i) => (
        <li
          key={i}
          className={cn(
            "flex items-center gap-2 text-xs",
            rule.passed ? "text-success" : "text-muted-foreground"
          )}
        >
          <CheckCircle2 className={cn("w-3.5 h-3.5", rule.passed ? "text-success" : "text-muted")} />
          <span>{rule.message}</span>
        </li>
      ))}
    </ul>
  );
}

// Character counter
export interface CharacterCounterProps {
  current: number;
  max: number;
  className?: string;
}

export function CharacterCounter({ current, max, className }: CharacterCounterProps) {
  const percentage = (current / max) * 100;
  const isWarning = percentage >= 80;
  const isError = percentage >= 100;

  return (
    <p className={cn(
      "text-xs",
      isError ? "text-danger" : isWarning ? "text-warning" : "text-muted-foreground",
      className
    )}>
      {current}/{max}
    </p>
  );
}
