import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Gift, Star, Zap, Trophy, Sparkles, X } from "lucide-react";

const rewardToastVariants = cva(
  "relative flex items-center gap-3 rounded-xl p-4 shadow-lg border transition-all duration-300 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-surface border-border",
        success: "bg-success-soft border-success/20",
        brand: "bg-brand-primary-subtle border-brand-primary/20",
        gold: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30",
        celebration: "bg-gradient-to-r from-brand-primary-subtle to-success-soft border-brand-primary/20",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
);

const iconContainerVariants = cva(
  "flex items-center justify-center rounded-full p-2 transition-transform motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground",
        success: "bg-success/10 text-success",
        brand: "bg-brand-primary/10 text-brand-primary",
        gold: "bg-amber-100 text-amber-600 dark:bg-amber-800/30 dark:text-amber-400",
        celebration: "bg-brand-primary/10 text-brand-primary",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  }
);

export interface RewardToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rewardToastVariants> {
  title: string;
  description?: string;
  icon?: "gift" | "star" | "zap" | "trophy" | "sparkles";
  value?: string | number;
  onDismiss?: () => void;
  autoHide?: boolean;
  duration?: number;
}

const iconMap = {
  gift: Gift,
  star: Star,
  zap: Zap,
  trophy: Trophy,
  sparkles: Sparkles,
};

const RewardToast = React.forwardRef<HTMLDivElement, RewardToastProps>(
  (
    {
      className,
      variant = "brand",
      title,
      description,
      icon = "sparkles",
      value,
      onDismiss,
      autoHide = false,
      duration = 5000,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isExiting, setIsExiting] = React.useState(false);

    const Icon = iconMap[icon];

    React.useEffect(() => {
      if (autoHide && duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [autoHide, duration]);

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
        className={cn(
          rewardToastVariants({ variant }),
          isExiting && "opacity-0 translate-y-2",
          "animate-slide-up",
          className
        )}
        role="alert"
        {...props}
      >
        <div className={cn(iconContainerVariants({ variant }), "animate-bounce-subtle")}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm truncate">{title}</p>
            {value && (
              <span
                className={cn(
                  "font-bold text-sm tabular-nums",
                  variant === "success" && "text-success",
                  variant === "brand" && "text-brand-primary",
                  variant === "gold" && "text-amber-600 dark:text-amber-400",
                  variant === "celebration" && "text-brand-primary"
                )}
              >
                +{value}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);
RewardToast.displayName = "RewardToast";

// Floating toast wrapper for positioning
export interface RewardToastContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top-center" | "top-right" | "bottom-center" | "bottom-right";
}

const positionClasses = {
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

const RewardToastContainer = React.forwardRef<
  HTMLDivElement,
  RewardToastContainerProps
>(({ className, position = "top-center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 w-full max-w-sm px-4",
        positionClasses[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
RewardToastContainer.displayName = "RewardToastContainer";

export { RewardToast, RewardToastContainer, rewardToastVariants };
