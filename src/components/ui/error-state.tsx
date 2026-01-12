import * as React from "react";
import { 
  AlertTriangle, 
  WifiOff, 
  ServerCrash, 
  ShieldX, 
  RefreshCw,
  MessageCircle,
  Home,
  ArrowLeft,
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ErrorVariant = "generic" | "network" | "server" | "permission" | "notFound";

const variantConfig: Record<ErrorVariant, { 
  icon: LucideIcon; 
  title: string; 
  description: string;
}> = {
  generic: {
    icon: AlertTriangle,
    title: "Something went wrong",
    description: "We hit an unexpected issue. Please try again.",
  },
  network: {
    icon: WifiOff,
    title: "Connection lost",
    description: "Check your internet and try again.",
  },
  server: {
    icon: ServerCrash,
    title: "Service unavailable",
    description: "We're working on it. Please try again shortly.",
  },
  permission: {
    icon: ShieldX,
    title: "Access denied",
    description: "You don't have permission to view this.",
  },
  notFound: {
    icon: AlertTriangle,
    title: "Not found",
    description: "We couldn't find what you're looking for.",
  },
};

export interface ErrorStateProps {
  variant?: ErrorVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  onContact?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  showContact?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function ErrorState({
  variant = "generic",
  title,
  description,
  icon,
  onRetry,
  onGoBack,
  onGoHome,
  onContact,
  retryLabel = "Try again",
  isRetrying = false,
  showContact = false,
  size = "default",
  className,
}: ErrorStateProps) {
  const config = variantConfig[variant];
  const Icon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  const sizeClasses = {
    sm: { container: "py-8 px-4", icon: "w-10 h-10", iconWrapper: "w-16 h-16", title: "text-base", desc: "text-sm" },
    default: { container: "py-12 px-6", icon: "w-12 h-12", iconWrapper: "w-20 h-20", title: "text-lg", desc: "text-sm" },
    lg: { container: "py-16 px-8", icon: "w-14 h-14", iconWrapper: "w-24 h-24", title: "text-xl", desc: "text-base" },
  };
  const s = sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", s.container, className)}>
      {/* Icon */}
      <div className={cn("rounded-2xl bg-danger-soft flex items-center justify-center mb-4", s.iconWrapper)}>
        <Icon className={cn("text-danger", s.icon)} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className={cn("font-display font-semibold text-foreground mb-1", s.title)}>
        {displayTitle}
      </h3>

      {/* Description */}
      <p className={cn("text-muted-foreground max-w-sm mb-6", s.desc)}>
        {displayDescription}
      </p>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onRetry && (
          <Button variant="primary" onClick={onRetry} disabled={isRetrying}>
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                {retryLabel}
              </>
            )}
          </Button>
        )}
        {onGoBack && (
          <Button variant="outline" onClick={onGoBack}>
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
        )}
        {onGoHome && (
          <Button variant="ghost" onClick={onGoHome}>
            <Home className="w-4 h-4" />
            Home
          </Button>
        )}
      </div>

      {/* Contact Support */}
      {(showContact || onContact) && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Still having trouble?
          </p>
          <Button variant="link" size="sm" onClick={onContact} className="h-auto p-0">
            <MessageCircle className="w-3.5 h-3.5" />
            Contact support
          </Button>
        </div>
      )}
    </div>
  );
}

// Inline error for smaller contexts
export interface ErrorInlineProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export function ErrorInline({ 
  message = "Something went wrong", 
  onRetry, 
  isRetrying = false,
  className 
}: ErrorInlineProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-4 px-4 text-danger", className)}>
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm">{message}</span>
      {onRetry && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRetry} 
          disabled={isRetrying}
          className="h-auto py-1 px-2 text-danger hover:text-danger"
        >
          {isRetrying ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Retry"}
        </Button>
      )}
    </div>
  );
}

// Error banner for page-level errors that don't block content
export interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({ message, onRetry, onDismiss, className }: ErrorBannerProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg bg-danger-soft border border-danger/20",
      className
    )}>
      <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0" />
      <span className="text-sm text-danger-text flex-1">{message}</span>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry} className="h-7 px-2 text-danger hover:text-danger">
          Retry
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
