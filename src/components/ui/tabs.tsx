import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-start text-muted-foreground",
  {
    variants: {
      variant: {
        // Primary - Pill/Segmented style (like Robinhood)
        primary: "bg-surface-2 p-1 rounded-xl gap-1",
        // Secondary - Underline style
        secondary: "border-b border-border gap-0",
        // Pills - Standalone pills with gap
        pills: "gap-2",
      },
      size: {
        sm: "h-9",
        default: "h-10",
        lg: "h-12",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, fullWidth, className }))}
    data-variant={variant}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - Pill style with yellow indicator
        primary: [
          "px-4 py-1.5 rounded-lg text-sm",
          "data-[state=inactive]:hover:bg-surface-3",
          "data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        ],
        // Secondary - Underline with yellow indicator
        secondary: [
          "px-4 py-2.5 text-sm border-b-2 -mb-px rounded-none",
          "border-transparent",
          "data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:border-border",
          "data-[state=active]:text-foreground data-[state=active]:border-brand-yellow"
        ],
        // Pills - Standalone pill buttons
        pills: [
          "px-4 py-2 rounded-full text-sm border-2",
          "border-border bg-transparent",
          "data-[state=inactive]:hover:border-border-2 data-[state=inactive]:hover:bg-surface-2",
          "data-[state=active]:border-brand-yellow data-[state=active]:bg-brand-yellow-soft data-[state=active]:text-foreground"
        ],
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
    },
  }
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
  badge?: number | string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, fullWidth, icon, badge, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, fullWidth, className }))}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
    {badge !== undefined && (
      <span className="ml-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-brand-yellow text-brand-yellow-foreground rounded-full">
        {badge}
      </span>
    )}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=inactive]:hidden",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
