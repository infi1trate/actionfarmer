import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  X,
  type LucideIcon
} from "lucide-react";

import { cn } from "@/lib/utils";

const alertBannerVariants = cva(
  "relative flex items-start gap-3 rounded-lg border p-4 transition-all motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-surface border-border text-foreground",
        info: "bg-info-soft border-info/20 text-info-text",
        success: "bg-success-soft border-success/20 text-success-text",
        warning: "bg-warning-soft border-warning/20 text-warning-text",
        danger: "bg-danger-soft border-danger/20 text-danger-text",
        brand: "bg-brand-primary-subtle border-brand-primary/20 text-foreground",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  brand: Info,
};

const iconColorMap: Record<string, string> = {
  default: "text-muted-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  brand: "text-brand-primary",
};

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerVariants> {
  title?: string;
  icon?: LucideIcon | boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      className,
      variant = "default",
      size,
      title,
      icon = true,
      dismissible = false,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isExiting, setIsExiting] = React.useState(false);

    const variantKey = variant || "default";
    const IconComponent = icon === true ? iconMap[variantKey] : icon || null;

    const handleDismiss = () => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 200);
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertBannerVariants({ variant, size }),
          isExiting && "opacity-0 translate-x-2",
          className
        )}
        {...props}
      >
        {IconComponent && (
          <IconComponent
            className={cn(
              "h-5 w-5 flex-shrink-0",
              size === "sm" && "h-4 w-4",
              iconColorMap[variantKey]
            )}
          />
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <h5 className="font-semibold leading-tight mb-1">{title}</h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">{children}</div>
          {action && <div className="mt-3">{action}</div>}
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-md p-1 transition-colors hover:bg-secondary/50 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Dismiss"
          >
            <X className={cn("h-4 w-4", size === "sm" && "h-3.5 w-3.5")} />
          </button>
        )}
      </div>
    );
  }
);
AlertBanner.displayName = "AlertBanner";

// Full-width sticky banner variant
const alertStickyBannerVariants = cva(
  "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-center",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        brand: "bg-brand-primary text-brand-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
);

export interface AlertStickyBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertStickyBannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const AlertStickyBanner = React.forwardRef<HTMLDivElement, AlertStickyBannerProps>(
  (
    {
      className,
      variant,
      dismissible = false,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertStickyBannerVariants({ variant }), className)}
        {...props}
      >
        <span>{children}</span>
        {action}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-2 rounded p-0.5 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
AlertStickyBanner.displayName = "AlertStickyBanner";

export { AlertBanner, AlertStickyBanner, alertBannerVariants, alertStickyBannerVariants };
