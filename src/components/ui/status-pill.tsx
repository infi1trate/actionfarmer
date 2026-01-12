import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 font-body font-semibold tracking-wide uppercase",
  {
    variants: {
      status: {
        online: "text-success",
        offline: "text-muted-foreground",
        recording: "text-danger",
        earning: "text-brand-primary",
        syncing: "text-info",
        idle: "text-warning",
        error: "text-danger",
      },
      size: {
        sm: "text-[10px] gap-1",
        default: "text-xs gap-1.5",
        lg: "text-sm gap-2",
      },
      variant: {
        minimal: "",
        subtle: "px-2 py-0.5 rounded-full",
        solid: "px-2.5 py-1 rounded-full",
      },
    },
    compoundVariants: [
      // Subtle backgrounds
      { status: "online", variant: "subtle", className: "bg-success/10" },
      { status: "offline", variant: "subtle", className: "bg-muted" },
      { status: "recording", variant: "subtle", className: "bg-danger/10" },
      { status: "earning", variant: "subtle", className: "bg-brand-primary/10" },
      { status: "syncing", variant: "subtle", className: "bg-info/10" },
      { status: "idle", variant: "subtle", className: "bg-warning/10" },
      { status: "error", variant: "subtle", className: "bg-danger/10" },
      // Solid backgrounds
      { status: "online", variant: "solid", className: "bg-success text-success-foreground" },
      { status: "offline", variant: "solid", className: "bg-muted text-muted-foreground" },
      { status: "recording", variant: "solid", className: "bg-danger text-danger-foreground" },
      { status: "earning", variant: "solid", className: "bg-brand-primary text-brand-primary-foreground" },
      { status: "syncing", variant: "solid", className: "bg-info text-info-foreground" },
      { status: "idle", variant: "solid", className: "bg-warning text-warning-foreground" },
      { status: "error", variant: "solid", className: "bg-danger text-danger-foreground" },
    ],
    defaultVariants: {
      status: "online",
      size: "default",
      variant: "minimal",
    },
  }
);

// Indicator dot styles
const indicatorVariants = cva(
  "rounded-full flex-shrink-0",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground",
        recording: "bg-danger",
        earning: "bg-brand-primary",
        syncing: "bg-info",
        idle: "bg-warning",
        error: "bg-danger",
      },
      size: {
        sm: "w-1.5 h-1.5",
        default: "w-2 h-2",
        lg: "w-2.5 h-2.5",
      },
      animated: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { status: "online", animated: true, className: "animate-pulse" },
      { status: "recording", animated: true, className: "animate-pulse" },
      { status: "earning", animated: true, className: "animate-pulse" },
      { status: "syncing", animated: true, className: "animate-spin" },
    ],
    defaultVariants: {
      status: "online",
      size: "default",
      animated: false,
    },
  }
);

// Status labels
const statusLabels: Record<string, string> = {
  online: "Online",
  offline: "Offline",
  recording: "Recording",
  earning: "Earning",
  syncing: "Syncing",
  idle: "Idle",
  error: "Error",
};

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  animated?: boolean;
  showDot?: boolean;
  label?: string;
}

function StatusPill({
  className,
  status,
  size,
  variant,
  animated = true,
  showDot = true,
  label,
  ...props
}: StatusPillProps) {
  const displayLabel = label ?? (status ? statusLabels[status] : "Unknown");

  return (
    <span
      className={cn(statusPillVariants({ status, size, variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(indicatorVariants({ status, size, animated }))}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
    </span>
  );
}

// Compact version - just the dot
interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "online" | "offline" | "recording" | "earning" | "syncing" | "idle" | "error";
  size?: "sm" | "default" | "lg";
  animated?: boolean;
}

function StatusDot({ className, status, size = "default", animated = true, ...props }: StatusDotProps) {
  return (
    <span
      className={cn(indicatorVariants({ status, size, animated }), className)}
      role="status"
      aria-label={statusLabels[status]}
      {...props}
    />
  );
}

export { StatusPill, StatusDot, statusPillVariants };
