import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number | string;
}

interface BottomTabBarProps {
  tabs: TabItem[];
  className?: string;
}

const BottomTabBar = React.forwardRef<HTMLElement, BottomTabBarProps>(
  ({ tabs, className }, ref) => {
    const location = useLocation();

    return (
      <nav
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-surface/95 backdrop-blur-md supports-[backdrop-filter]:bg-surface/90",
          "border-t border-border",
          "pb-safe",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href || 
                           (tab.href !== "/" && location.pathname.startsWith(tab.href));
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.href}
                to={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  "relative"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active indicator - yellow underline/dot */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-yellow rounded-full" />
                )}
                
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {/* Badge */}
                  {tab.badge !== undefined && (
                    <span className={cn(
                      "absolute -top-1 -right-1 min-w-[16px] h-4 px-1",
                      "flex items-center justify-center",
                      "text-[10px] font-bold text-white",
                      "bg-danger rounded-full"
                    )}>
                      {typeof tab.badge === "number" && tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  )}
                </div>
                
                <span
                  className={cn(
                    "text-[11px] font-medium transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }
);
BottomTabBar.displayName = "BottomTabBar";

// Floating action button for bottom nav
interface BottomTabBarFABProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  className?: string;
}

const BottomTabBarFAB = React.forwardRef<HTMLButtonElement, BottomTabBarFABProps>(
  ({ icon: Icon, onClick, label, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "fixed bottom-20 left-1/2 -translate-x-1/2 z-50",
          "w-14 h-14 rounded-full",
          "bg-brand-yellow text-brand-yellow-foreground",
          "shadow-lg shadow-brand-yellow/30",
          "flex items-center justify-center",
          "transition-transform duration-200",
          "hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        aria-label={label}
      >
        <Icon className="w-6 h-6" />
      </button>
    );
  }
);
BottomTabBarFAB.displayName = "BottomTabBarFAB";

export { BottomTabBar, BottomTabBarFAB, type TabItem };
