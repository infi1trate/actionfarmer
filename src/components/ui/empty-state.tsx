import * as React from "react";
import { LucideIcon, Inbox, Search, FileX, Wifi, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "error" | "offline" | "custom";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const variantIcons: Record<string, LucideIcon> = {
  default: Inbox,
  search: Search,
  error: FileX,
  offline: Wifi,
};

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    icon,
    title, 
    description, 
    action,
    secondaryAction,
    variant = "default",
    size = "default",
    className 
  }, ref) => {
    const Icon = icon || variantIcons[variant] || Inbox;
    const ActionIcon = action?.icon || Plus;

    const sizeClasses = {
      sm: {
        container: "py-8 px-4",
        icon: "w-10 h-10",
        iconWrapper: "w-16 h-16",
        title: "text-base",
        description: "text-sm",
      },
      default: {
        container: "py-12 px-6",
        icon: "w-12 h-12",
        iconWrapper: "w-20 h-20",
        title: "text-lg",
        description: "text-sm",
      },
      lg: {
        container: "py-16 px-8",
        icon: "w-14 h-14",
        iconWrapper: "w-24 h-24",
        title: "text-xl",
        description: "text-base",
      },
    };

    const sizes = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          sizes.container,
          className
        )}
      >
        {/* Icon */}
        <div 
          className={cn(
            "rounded-2xl bg-surface-2 flex items-center justify-center mb-4",
            sizes.iconWrapper
          )}
        >
          <Icon className={cn("text-muted-foreground", sizes.icon)} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className={cn("font-display font-semibold text-foreground mb-1", sizes.title)}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={cn("text-muted-foreground max-w-sm mb-6", sizes.description)}>
            {description}
          </p>
        )}

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {action && (
              <Button 
                variant="primary" 
                onClick={action.onClick}
                leftIcon={<ActionIcon className="w-4 h-4" />}
              >
                {action.label}
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
);
EmptyState.displayName = "EmptyState";

// Inline empty state for smaller contexts (like empty lists within cards)
interface EmptyStateInlineProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyStateInline = React.forwardRef<HTMLDivElement, EmptyStateInlineProps>(
  ({ message, action, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-3 py-6 px-4 text-muted-foreground",
        className
      )}
    >
      <span className="text-sm">{message}</span>
      {action && (
        <Button variant="link" size="sm" onClick={action.onClick} className="h-auto p-0">
          {action.label}
        </Button>
      )}
    </div>
  )
);
EmptyStateInline.displayName = "EmptyStateInline";

export { EmptyState, EmptyStateInline };
