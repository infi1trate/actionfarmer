import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Trash2, LogOut, ShieldAlert, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ConfirmDialog = AlertDialogPrimitive.Root;

const ConfirmDialogTrigger = AlertDialogPrimitive.Trigger;

const ConfirmDialogPortal = AlertDialogPrimitive.Portal;

const ConfirmDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
ConfirmDialogOverlay.displayName = "ConfirmDialogOverlay";

const confirmDialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        warning: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const ConfirmDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> &
    VariantProps<typeof confirmDialogContentVariants>
>(({ className, variant, ...props }, ref) => (
  <ConfirmDialogPortal>
    <ConfirmDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(confirmDialogContentVariants({ variant }), "max-w-md", className)}
      {...props}
    />
  </ConfirmDialogPortal>
));
ConfirmDialogContent.displayName = "ConfirmDialogContent";

const ConfirmDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col items-center text-center sm:items-start sm:text-left", className)} {...props} />
);
ConfirmDialogHeader.displayName = "ConfirmDialogHeader";

const ConfirmDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
);
ConfirmDialogFooter.displayName = "ConfirmDialogFooter";

const ConfirmDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title 
    ref={ref} 
    className={cn("font-display text-lg font-semibold", className)} 
    {...props} 
  />
));
ConfirmDialogTitle.displayName = "ConfirmDialogTitle";

const ConfirmDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description 
    ref={ref} 
    className={cn("text-sm text-muted-foreground", className)} 
    {...props} 
  />
));
ConfirmDialogDescription.displayName = "ConfirmDialogDescription";

const ConfirmDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: "default" | "destructive" | "warning";
  }
>(({ className, variant = "destructive", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants({ 
        variant: variant === "destructive" ? "destructive" : variant === "warning" ? "warning" : "primary" 
      }),
      className
    )}
    {...props}
  />
));
ConfirmDialogAction.displayName = "ConfirmDialogAction";

const ConfirmDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "ghost" }), className)}
    {...props}
  />
));
ConfirmDialogCancel.displayName = "ConfirmDialogCancel";

// Icon variants for the confirm dialog
const iconVariants = cva(
  "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground",
        destructive: "bg-danger-soft text-danger",
        warning: "bg-warning-soft text-warning",
      },
    },
    defaultVariants: {
      variant: "destructive",
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  delete: Trash2,
  logout: LogOut,
  warning: AlertTriangle,
  security: ShieldAlert,
};

export interface ConfirmDialogIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  icon?: "delete" | "logout" | "warning" | "security" | LucideIcon;
}

const ConfirmDialogIcon = React.forwardRef<HTMLDivElement, ConfirmDialogIconProps>(
  ({ className, variant, icon = "warning", ...props }, ref) => {
    const IconComponent = typeof icon === "string" ? iconMap[icon] || AlertTriangle : icon;

    return (
      <div ref={ref} className={cn(iconVariants({ variant }), className)} {...props}>
        <IconComponent className="h-6 w-6" />
      </div>
    );
  }
);
ConfirmDialogIcon.displayName = "ConfirmDialogIcon";

// Compound component for common use cases
export interface ConfirmDialogSimpleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "destructive" | "warning";
  icon?: "delete" | "logout" | "warning" | "security" | LucideIcon;
  loading?: boolean;
  trigger?: React.ReactNode;
}

const ConfirmDialogSimple: React.FC<ConfirmDialogSimpleProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "destructive",
  icon = "warning",
  loading = false,
  trigger,
}) => {
  return (
    <ConfirmDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <ConfirmDialogTrigger asChild>{trigger}</ConfirmDialogTrigger>}
      <ConfirmDialogContent>
        <ConfirmDialogHeader>
          <ConfirmDialogIcon variant={variant} icon={icon} />
          <ConfirmDialogTitle>{title}</ConfirmDialogTitle>
          <ConfirmDialogDescription className="mt-2">{description}</ConfirmDialogDescription>
        </ConfirmDialogHeader>
        <ConfirmDialogFooter className="mt-4">
          <ConfirmDialogCancel onClick={onCancel}>{cancelLabel}</ConfirmDialogCancel>
          <ConfirmDialogAction variant={variant} onClick={onConfirm} disabled={loading}>
            {loading ? "Loading..." : confirmLabel}
          </ConfirmDialogAction>
        </ConfirmDialogFooter>
      </ConfirmDialogContent>
    </ConfirmDialog>
  );
};
ConfirmDialogSimple.displayName = "ConfirmDialogSimple";

export {
  ConfirmDialog,
  ConfirmDialogPortal,
  ConfirmDialogOverlay,
  ConfirmDialogTrigger,
  ConfirmDialogContent,
  ConfirmDialogHeader,
  ConfirmDialogFooter,
  ConfirmDialogTitle,
  ConfirmDialogDescription,
  ConfirmDialogAction,
  ConfirmDialogCancel,
  ConfirmDialogIcon,
  ConfirmDialogSimple,
  confirmDialogContentVariants,
  iconVariants as confirmDialogIconVariants,
};
