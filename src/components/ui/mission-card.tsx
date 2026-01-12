import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, Lock, ChevronRight, Gift, Star, Zap, Target } from "lucide-react";

const missionCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-200 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-card border-border hover:border-border-2 hover:shadow-md",
        highlighted: "bg-brand-primary-subtle border-brand-primary/20 hover:border-brand-primary/40",
        completed: "bg-success-soft border-success/20",
        locked: "bg-muted border-border opacity-70",
      },
      size: {
        sm: "p-3",
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

export interface MissionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof missionCardVariants> {
  title: string;
  description?: string;
  icon?: "gift" | "star" | "zap" | "target" | React.ReactNode;
  progress?: number;
  progressMax?: number;
  reward?: string | number;
  rewardLabel?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  completed?: boolean;
  locked?: boolean;
  lockedMessage?: string;
  timeRemaining?: string;
}

const iconMap = {
  gift: Gift,
  star: Star,
  zap: Zap,
  target: Target,
};

const MissionCard = React.forwardRef<HTMLDivElement, MissionCardProps>(
  (
    {
      className,
      variant: variantProp,
      size,
      title,
      description,
      icon = "target",
      progress,
      progressMax = 100,
      reward,
      rewardLabel = "XP",
      ctaLabel = "Start",
      onCtaClick,
      completed = false,
      locked = false,
      lockedMessage = "Complete previous missions",
      timeRemaining,
      ...props
    },
    ref
  ) => {
    const variant = locked
      ? "locked"
      : completed
      ? "completed"
      : variantProp || "default";

    const progressPercentage =
      progress !== undefined ? (progress / progressMax) * 100 : undefined;

    const isCompleted = completed || progressPercentage === 100;

    const IconComponent =
      typeof icon === "string" ? iconMap[icon] || Target : null;

    return (
      <div
        ref={ref}
        className={cn(missionCardVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0 flex items-center justify-center rounded-lg w-10 h-10",
              locked && "bg-muted text-muted-foreground",
              isCompleted && "bg-success/10 text-success",
              !locked && !isCompleted && "bg-brand-primary/10 text-brand-primary"
            )}
          >
            {locked ? (
              <Lock className="w-5 h-5" />
            ) : isCompleted ? (
              <Check className="w-5 h-5" />
            ) : IconComponent ? (
              <IconComponent className="w-5 h-5" />
            ) : (
              icon
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4
                  className={cn(
                    "font-semibold text-sm truncate",
                    locked && "text-muted-foreground"
                  )}
                >
                  {title}
                </h4>
                {description && (
                  <p
                    className={cn(
                      "text-xs mt-0.5 line-clamp-2",
                      locked ? "text-muted-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {locked ? lockedMessage : description}
                  </p>
                )}
              </div>

              {/* Reward badge */}
              {reward && !locked && (
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                    isCompleted
                      ? "bg-success/10 text-success"
                      : "bg-brand-primary/10 text-brand-primary"
                  )}
                >
                  <span className="tabular-nums">+{reward}</span>
                  <span className="uppercase text-[10px]">{rewardLabel}</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {progressPercentage !== undefined && !locked && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {progress} / {progressMax}
                  </span>
                  {timeRemaining && !isCompleted && (
                    <span className="text-muted-foreground">{timeRemaining}</span>
                  )}
                </div>
                <Progress
                  value={progressPercentage}
                  size="sm"
                  variant={isCompleted ? "success" : "brand"}
                  className="h-1.5"
                />
              </div>
            )}

            {/* CTA */}
            {onCtaClick && !locked && (
              <div className="mt-3">
                {isCompleted ? (
                  <Button
                    size="sm"
                    variant="success"
                    className="w-full"
                    onClick={onCtaClick}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Claim Reward
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    className="w-full"
                    onClick={onCtaClick}
                  >
                    {ctaLabel}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
MissionCard.displayName = "MissionCard";

// Compact horizontal variant
export interface MissionCardCompactProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  progress?: number;
  progressMax?: number;
  reward?: string | number;
  completed?: boolean;
  onClick?: () => void;
}

const MissionCardCompact = React.forwardRef<HTMLDivElement, MissionCardCompactProps>(
  (
    {
      className,
      title,
      progress,
      progressMax = 100,
      reward,
      completed = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const progressPercentage =
      progress !== undefined ? (progress / progressMax) * 100 : undefined;
    const isCompleted = completed || progressPercentage === 100;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
          isCompleted
            ? "bg-success-soft border-success/20"
            : "bg-card border-border hover:border-border-2",
          className
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        {...props}
      >
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            isCompleted ? "bg-success/10 text-success" : "bg-brand-primary/10 text-brand-primary"
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4" />
          ) : (
            <Target className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          {progressPercentage !== undefined && (
            <div className="mt-1.5">
              <Progress
                value={progressPercentage}
                size="sm"
                variant={isCompleted ? "success" : "brand"}
                className="h-1"
              />
            </div>
          )}
        </div>

        {reward && (
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              isCompleted ? "text-success" : "text-brand-primary"
            )}
          >
            +{reward}
          </span>
        )}

        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }
);
MissionCardCompact.displayName = "MissionCardCompact";

export { MissionCard, MissionCardCompact, missionCardVariants };
