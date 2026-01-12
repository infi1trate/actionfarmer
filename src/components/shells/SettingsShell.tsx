import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface SettingsShellProps {
  children: React.ReactNode;
  /** Page title */
  title?: string;
  /** Custom back action */
  onBack?: () => void;
  /** Hide back button */
  hideBack?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
  className?: string;
}

const SettingsShell = React.forwardRef<HTMLDivElement, SettingsShellProps>(
  (
    {
      children,
      title = "Settings",
      onBack,
      hideBack = false,
      stickyHeader = true,
      className,
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        navigate(-1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
      >
        {/* Header */}
        <header
          className={cn(
            "flex items-center gap-2 px-4 py-3 min-h-[56px] bg-background border-b border-border",
            stickyHeader && "sticky top-0 z-40"
          )}
        >
          {!hideBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0 -ml-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-semibold text-foreground">{title}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 pb-8">{children}</main>
      </div>
    );
  }
);
SettingsShell.displayName = "SettingsShell";

// Settings group with label
interface SettingsGroupProps {
  children: React.ReactNode;
  /** Group label */
  label?: string;
  /** Optional description below label */
  description?: string;
  className?: string;
}

const SettingsGroup = React.forwardRef<HTMLDivElement, SettingsGroupProps>(
  ({ children, label, description, className }, ref) => {
    return (
      <div ref={ref} className={cn("py-2", className)}>
        {(label || description) && (
          <div className="px-4 py-2">
            {label && (
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {label}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="bg-surface-raised">{children}</div>
      </div>
    );
  }
);
SettingsGroup.displayName = "SettingsGroup";

// Base settings row
interface SettingsRowProps {
  children?: React.ReactNode;
  /** Row label */
  label: string;
  /** Optional description */
  description?: string;
  /** Left icon */
  icon?: LucideIcon;
  /** Icon background color */
  iconBg?: string;
  /** Danger styling */
  danger?: boolean;
  className?: string;
}

const SettingsRow = React.forwardRef<HTMLDivElement, SettingsRowProps>(
  ({ children, label, description, icon: Icon, iconBg, danger, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-4 py-3 min-h-[52px]",
          className
        )}
      >
        {Icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              iconBg || "bg-muted"
            )}
          >
            <Icon className={cn("h-4 w-4", danger ? "text-danger" : "text-foreground")} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className={cn("text-sm font-medium", danger ? "text-danger" : "text-foreground")}>
            {label}
          </span>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {children}
      </div>
    );
  }
);
SettingsRow.displayName = "SettingsRow";

// Navigation row (links to another page)
interface SettingsLinkRowProps extends Omit<SettingsRowProps, "children"> {
  /** Current value to display */
  value?: string;
  /** Click handler */
  onClick?: () => void;
  /** Href for navigation */
  href?: string;
}

const SettingsLinkRow = React.forwardRef<HTMLDivElement, SettingsLinkRowProps>(
  ({ value, onClick, href, ...props }, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (href) {
        navigate(href);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <SettingsRow {...props}>
          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <span className="text-sm text-muted-foreground">{value}</span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </SettingsRow>
      </div>
    );
  }
);
SettingsLinkRow.displayName = "SettingsLinkRow";

// Toggle row (with switch)
interface SettingsToggleRowProps extends Omit<SettingsRowProps, "children"> {
  /** Switch state */
  checked: boolean;
  /** Change handler */
  onCheckedChange: (checked: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
}

const SettingsToggleRow = React.forwardRef<HTMLDivElement, SettingsToggleRowProps>(
  ({ checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <div ref={ref}>
        <SettingsRow {...props}>
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
          />
        </SettingsRow>
      </div>
    );
  }
);
SettingsToggleRow.displayName = "SettingsToggleRow";

// Button row (for actions like logout, delete account)
interface SettingsButtonRowProps extends Omit<SettingsRowProps, "children"> {
  /** Click handler */
  onClick: () => void;
}

const SettingsButtonRow = React.forwardRef<HTMLDivElement, SettingsButtonRowProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        <SettingsRow {...props} />
      </div>
    );
  }
);
SettingsButtonRow.displayName = "SettingsButtonRow";

// Separator between rows
const SettingsSeparator = () => (
  <div className="px-4">
    <Separator />
  </div>
);

export {
  SettingsShell,
  SettingsGroup,
  SettingsRow,
  SettingsLinkRow,
  SettingsToggleRow,
  SettingsButtonRow,
  SettingsSeparator,
};
