import * as React from "react";
import { 
  CheckCircle2, 
  PartyPopper, 
  Sparkles, 
  ArrowRight,
  Home,
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SuccessVariant = "default" | "celebration" | "subtle";

export interface SuccessStateProps {
  variant?: SuccessVariant;
  title: string;
  description?: string;
  icon?: LucideIcon;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SuccessState({
  variant = "default",
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  size = "default",
  className,
}: SuccessStateProps) {
  const defaultIcons: Record<SuccessVariant, LucideIcon> = {
    default: CheckCircle2,
    celebration: PartyPopper,
    subtle: Sparkles,
  };
  const Icon = icon || defaultIcons[variant];
  const ActionIcon = primaryAction?.icon || ArrowRight;

  const sizeClasses = {
    sm: { container: "py-8 px-4", icon: "w-10 h-10", iconWrapper: "w-16 h-16", title: "text-base", desc: "text-sm" },
    default: { container: "py-12 px-6", icon: "w-12 h-12", iconWrapper: "w-20 h-20", title: "text-lg", desc: "text-sm" },
    lg: { container: "py-16 px-8", icon: "w-14 h-14", iconWrapper: "w-24 h-24", title: "text-xl", desc: "text-base" },
  };
  const s = sizeClasses[size];

  const iconWrapperClasses = {
    default: "bg-success-soft",
    celebration: "bg-brand-yellow-soft",
    subtle: "bg-surface-2",
  };

  const iconClasses = {
    default: "text-success",
    celebration: "text-brand-yellow",
    subtle: "text-muted-foreground",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", s.container, className)}>
      {/* Icon */}
      <div className={cn(
        "rounded-2xl flex items-center justify-center mb-4",
        iconWrapperClasses[variant],
        s.iconWrapper
      )}>
        <Icon className={cn(iconClasses[variant], s.icon)} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className={cn("font-display font-semibold text-foreground mb-1", s.title)}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={cn("text-muted-foreground max-w-sm mb-6", s.desc)}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {primaryAction && (
            <Button variant="primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
              <ActionIcon className="w-4 h-4" />
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Inline success for smaller contexts (like form submission)
export interface SuccessInlineProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function SuccessInline({ message, action, className }: SuccessInlineProps) {
  return (
    <div className={cn(
      "flex items-center justify-center gap-3 py-4 px-4 text-success",
      className
    )}>
      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm">{message}</span>
      {action && (
        <Button variant="link" size="sm" onClick={action.onClick} className="h-auto p-0 text-success">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Success banner for page-level confirmations
export interface SuccessBannerProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

export function SuccessBanner({ message, action, onDismiss, className }: SuccessBannerProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg bg-success-soft border border-success/20",
      className
    )}>
      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
      <span className="text-sm text-success-text flex-1">{message}</span>
      {action && (
        <Button variant="ghost" size="sm" onClick={action.onClick} className="h-7 px-2 text-success hover:text-success">
          {action.label}
        </Button>
      )}
      {onDismiss && (
        <Button variant="ghost" size="sm" onClick={onDismiss} className="h-7 px-2">
          Dismiss
        </Button>
      )}
    </div>
  );
}

// Success toast content (for use with toast system)
export interface SuccessToastContentProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SuccessToastContent({ title, description, action }: SuccessToastContentProps) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        {action && (
          <Button variant="link" size="sm" onClick={action.onClick} className="h-auto p-0 mt-1 text-xs">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
