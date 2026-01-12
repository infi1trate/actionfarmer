import * as React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon | React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showChevron?: boolean;
  disabled?: boolean;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
}

const ListRow = React.forwardRef<HTMLDivElement, ListRowProps>(
  ({ 
    className, 
    icon,
    iconBg,
    title, 
    subtitle, 
    meta,
    rightIcon,
    showChevron = false,
    disabled = false,
    selected = false,
    href,
    onClick,
    ...props 
  }, ref) => {
    const isClickable = !!onClick || !!href;
    
    const renderIcon = () => {
      if (!icon) return null;
      
      // Check if icon is a Lucide component or React node
      if (typeof icon === "function") {
        const IconComponent = icon as LucideIcon;
        return (
          <div 
            className={cn(
              "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
              iconBg || "bg-surface-2",
              disabled && "opacity-50"
            )}
          >
            <IconComponent className="w-5 h-5 text-foreground" />
          </div>
        );
      }
      
      return (
        <div 
          className={cn(
            "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
            iconBg || "bg-surface-2",
            disabled && "opacity-50"
          )}
        >
          {icon}
        </div>
      );
    };

    const content = (
      <>
        {renderIcon()}
        
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className={cn(
            "text-sm font-medium text-foreground truncate",
            disabled && "text-muted-foreground"
          )}>
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">
              {subtitle}
            </p>
          )}
        </div>
        
        {meta && (
          <div className="shrink-0 text-right">
            {meta}
          </div>
        )}
        
        {rightIcon && (
          <div className="shrink-0">
            {rightIcon}
          </div>
        )}
        
        {showChevron && !rightIcon && (
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </>
    );

    const baseClasses = cn(
      "flex items-center gap-3 px-4 py-3 transition-colors duration-200",
      isClickable && !disabled && "cursor-pointer hover:bg-surface-2 active:bg-surface-3",
      selected && "bg-brand-yellow-soft",
      disabled && "cursor-not-allowed opacity-60",
      className
    );

    if (href && !disabled) {
      return (
        <a href={href} className={baseClasses}>
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className={baseClasses}
        onClick={disabled ? undefined : onClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        {...props}
      >
        {content}
      </div>
    );
  }
);
ListRow.displayName = "ListRow";

// List container for consistent styling
interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, divided = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        divided && "[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
List.displayName = "List";

// List Section Header
interface ListSectionHeaderProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
}

const ListSectionHeader = ({ title, action, className }: ListSectionHeaderProps) => (
  <div className={cn("flex items-center justify-between px-4 py-3 bg-surface-2", className)}>
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {title}
    </h3>
    {action}
  </div>
);
ListSectionHeader.displayName = "ListSectionHeader";

export { ListRow, List, ListSectionHeader };
