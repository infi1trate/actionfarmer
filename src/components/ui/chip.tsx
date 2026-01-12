import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 font-body font-medium transition-all cursor-pointer select-none border",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
        brand:
          "bg-brand-primary-subtle text-foreground border-brand-primary/20 hover:border-brand-primary/40",
        success:
          "bg-success-subtle text-success border-success/20 hover:border-success/40",
        warning:
          "bg-warning-subtle text-warning border-warning/20 hover:border-warning/40",
        danger:
          "bg-danger-subtle text-danger border-danger/20 hover:border-danger/40",
        info:
          "bg-info-subtle text-info border-info/20 hover:border-info/40",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-md gap-1",
        default: "px-3 py-1 text-sm rounded-lg gap-1.5",
        lg: "px-4 py-1.5 text-sm rounded-lg gap-2",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        selected: true,
        className: "bg-foreground text-foreground-inverted border-foreground",
      },
      {
        variant: "brand",
        selected: true,
        className: "bg-brand-primary text-brand-primary-foreground border-brand-primary",
      },
      {
        variant: "success",
        selected: true,
        className: "bg-success text-success-foreground border-success",
      },
      {
        variant: "warning",
        selected: true,
        className: "bg-warning text-warning-foreground border-warning",
      },
      {
        variant: "danger",
        selected: true,
        className: "bg-danger text-danger-foreground border-danger",
      },
      {
        variant: "info",
        selected: true,
        className: "bg-info text-info-foreground border-info",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      selected: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  removable?: boolean;
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
}

function Chip({
  className,
  variant,
  size,
  selected = false,
  onSelectedChange,
  removable,
  onRemove,
  leftIcon,
  children,
  onClick,
  ...props
}: ChipProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSelectedChange) {
      onSelectedChange(!selected);
    }
    onClick?.(e);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <button
      type="button"
      className={cn(
        chipVariants({ variant, size, selected }),
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      onClick={handleClick}
      aria-pressed={selected}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {removable && (
        <span
          role="button"
          tabIndex={0}
          onClick={handleRemove}
          onKeyDown={(e) => e.key === "Enter" && handleRemove(e as unknown as React.MouseEvent)}
          className="flex-shrink-0 rounded-full p-0.5 hover:bg-foreground/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </button>
  );
}

// Chip group for managing multiple selections
interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group">
      {children}
    </div>
  );
}

export { Chip, ChipGroup, chipVariants };
