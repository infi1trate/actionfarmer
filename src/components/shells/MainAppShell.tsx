import * as React from "react";
import { cn } from "@/lib/utils";
import { TopAppBar } from "@/components/ui/top-app-bar";
import { BottomTabBar, type TabItem } from "@/components/ui/bottom-tab-bar";

interface MainAppShellProps {
  children: React.ReactNode;
  /** App title shown in top bar (deprecated - use in-page headers instead) */
  title?: string;
  /** Left action in top bar (can be used for logo) */
  leftAction?: React.ReactNode;
  /** Right actions in top bar */
  rightActions?: React.ReactNode;
  /** Bottom tab navigation items */
  tabs?: TabItem[];
  /** Whether to show bottom tabs */
  showBottomTabs?: boolean;
  /** Custom top bar content (replaces default) */
  customTopBar?: React.ReactNode;
  /** Whether to show the top app bar (default: false for cleaner page headers) */
  showTopBar?: boolean;
  /** Whether content should scroll */
  scrollable?: boolean;
  /** Additional padding at bottom for bottom tabs */
  className?: string;
}

const MainAppShell = React.forwardRef<HTMLDivElement, MainAppShellProps>(
  (
    {
      children,
      title = "App",
      leftAction,
      rightActions,
      tabs = [],
      showBottomTabs = true,
      customTopBar,
      showTopBar = false,
      scrollable = true,
      className,
    },
    ref
  ) => {
    const hasBottomTabs = showBottomTabs && tabs.length > 0;

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
      >
        {/* Top App Bar - Only shown if explicitly enabled */}
        {showTopBar && (customTopBar || (
          <TopAppBar
            title={title}
            leftAction={leftAction}
            rightActions={rightActions}
          />
        ))}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1",
            scrollable && "overflow-y-auto",
            hasBottomTabs && "pb-20" // Space for bottom tabs + safe area
          )}
        >
          {children}
        </main>

        {/* Bottom Tab Bar */}
        {hasBottomTabs && <BottomTabBar tabs={tabs} />}
      </div>
    );
  }
);
MainAppShell.displayName = "MainAppShell";

// Convenience wrapper for main content sections
interface ContentSectionProps {
  children: React.ReactNode;
  /** Add horizontal padding */
  padded?: boolean;
  /** Add vertical spacing */
  spaced?: boolean;
  className?: string;
}

const ContentSection = React.forwardRef<HTMLElement, ContentSectionProps>(
  ({ children, padded = true, spaced = true, className }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          padded && "px-4",
          spaced && "py-4",
          className
        )}
      >
        {children}
      </section>
    );
  }
);
ContentSection.displayName = "ContentSection";

export { MainAppShell, ContentSection };
