import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Base Side Sheet (Drawer)
const SideSheet = DialogPrimitive.Root;
const SideSheetTrigger = DialogPrimitive.Trigger;
const SideSheetClose = DialogPrimitive.Close;
const SideSheetPortal = DialogPrimitive.Portal;

const SideSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SideSheetOverlay.displayName = "SideSheetOverlay";

interface SideSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "left" | "right";
  showClose?: boolean;
}

const SideSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SideSheetContentProps
>(({ side = "left", showClose = true, className, children, ...props }, ref) => (
  <SideSheetPortal>
    <SideSheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 z-50 h-full w-[280px] max-w-[85vw]",
        "bg-surface shadow-2xl",
        "transition ease-out duration-300",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        side === "left" && [
          "left-0 border-r border-border",
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
        ],
        side === "right" && [
          "right-0 border-l border-border",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        ],
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close 
          className={cn(
            "absolute top-4 p-2 rounded-lg",
            "text-muted-foreground hover:text-foreground hover:bg-surface-2",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            side === "left" ? "right-4" : "left-4"
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SideSheetPortal>
));
SideSheetContent.displayName = "SideSheetContent";

const SideSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-4 border-b border-border", className)}
    {...props}
  />
);
SideSheetHeader.displayName = "SideSheetHeader";

const SideSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SideSheetTitle.displayName = "SideSheetTitle";

const SideSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));
SideSheetDescription.displayName = "SideSheetDescription";

// Navigation specific components
interface NavItem {
  icon?: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number | string;
  children?: NavItem[];
}

interface SideSheetNavProps {
  items: NavItem[];
  onItemClick?: () => void;
  className?: string;
}

const SideSheetNav = React.forwardRef<HTMLElement, SideSheetNavProps>(
  ({ items, onItemClick, className }, ref) => {
    const location = useLocation();

    const renderItem = (item: NavItem, index: number) => {
      const isActive = item.href ? 
        (location.pathname === item.href || 
         (item.href !== "/" && location.pathname.startsWith(item.href))) 
        : false;

      const Icon = item.icon;

      const content = (
        <>
          {Icon && (
            <Icon 
              className={cn(
                "w-5 h-5 shrink-0",
                isActive ? "text-brand-yellow" : "text-muted-foreground"
              )} 
            />
          )}
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className={cn(
              "min-w-[20px] h-5 px-1.5",
              "flex items-center justify-center",
              "text-xs font-semibold",
              "bg-brand-yellow-soft text-foreground rounded-full"
            )}>
              {item.badge}
            </span>
          )}
          {item.children && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </>
      );

      const itemClasses = cn(
        "flex items-center gap-3 px-4 py-3 w-full",
        "text-sm font-medium transition-colors duration-200",
        "rounded-lg mx-2",
        isActive 
          ? "bg-brand-yellow-soft text-foreground" 
          : "text-foreground hover:bg-surface-2"
      );

      if (item.href) {
        return (
          <NavLink
            key={index}
            to={item.href}
            className={itemClasses}
            onClick={onItemClick}
          >
            {/* Yellow indicator for active item */}
            {isActive && (
              <span className="absolute left-0 w-1 h-8 bg-brand-yellow rounded-r-full" />
            )}
            {content}
          </NavLink>
        );
      }

      return (
        <button
          key={index}
          onClick={() => {
            item.onClick?.();
            onItemClick?.();
          }}
          className={itemClasses}
        >
          {content}
        </button>
      );
    };

    return (
      <nav ref={ref} className={cn("py-2", className)}>
        <ul className="space-y-1 relative">
          {items.map((item, index) => (
            <li key={index} className="relative">
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);
SideSheetNav.displayName = "SideSheetNav";

// Section divider for grouping nav items
interface SideSheetNavSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SideSheetNavSection = ({
  title,
  children,
  className
}: SideSheetNavSectionProps) => (
  <div className={cn("py-2", className)}>
    {title && (
      <h3 className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
    )}
    {children}
  </div>
);
SideSheetNavSection.displayName = "SideSheetNavSection";

const SideSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto p-4 border-t border-border", className)}
    {...props}
  />
);
SideSheetFooter.displayName = "SideSheetFooter";

export {
  SideSheet,
  SideSheetTrigger,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetDescription,
  SideSheetNav,
  SideSheetNavSection,
  SideSheetFooter,
  type NavItem,
};
