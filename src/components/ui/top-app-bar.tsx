import * as React from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TopAppBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  leftAction?: React.ReactNode;
  rightActions?: React.ReactNode;
  transparent?: boolean;
  bordered?: boolean;
  sticky?: boolean;
  className?: string;
}

const TopAppBar = React.forwardRef<HTMLElement, TopAppBarProps>(
  ({ 
    title, 
    subtitle,
    showBack, 
    onBack, 
    leftAction,
    rightActions, 
    transparent = false,
    bordered = true,
    sticky = true,
    className 
  }, ref) => {
    const navigate = useNavigate();

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        navigate(-1);
      }
    };

    return (
      <header
        ref={ref}
        className={cn(
          "z-40 w-full",
          sticky && "sticky top-0",
          !transparent && "bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80",
          bordered && "border-b border-border",
          className
        )}
      >
        <div className="container flex h-14 items-center gap-3">
          {/* Left section */}
          <div className="flex items-center gap-2">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            {leftAction}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-semibold text-foreground truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>

          {/* Right actions */}
          {rightActions && (
            <div className="flex items-center gap-1 shrink-0">
              {rightActions}
            </div>
          )}
        </div>
      </header>
    );
  }
);
TopAppBar.displayName = "TopAppBar";

// Compact variant for nested pages
interface TopAppBarCompactProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

const TopAppBarCompact = React.forwardRef<HTMLElement, TopAppBarCompactProps>(
  ({ title, onBack, rightAction, className }, ref) => {
    const navigate = useNavigate();

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border",
          className
        )}
      >
        <div className="flex h-12 items-center px-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onBack || (() => navigate(-1))}
            className="mr-3"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="flex-1 font-medium text-sm truncate">{title}</span>
          {rightAction}
        </div>
      </header>
    );
  }
);
TopAppBarCompact.displayName = "TopAppBarCompact";

export { TopAppBar, TopAppBarCompact };
