import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Share2, Edit, Trash2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DetailAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface DetailShellProps {
  children: React.ReactNode;
  /** Page title */
  title?: string;
  /** Subtitle or meta info */
  subtitle?: string;
  /** Custom back action (defaults to navigate(-1)) */
  onBack?: () => void;
  /** Hide back button */
  hideBack?: boolean;
  /** Primary action button */
  primaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
  /** Secondary actions in dropdown */
  secondaryActions?: DetailAction[];
  /** Share action */
  onShare?: () => void;
  /** Edit action */
  onEdit?: () => void;
  /** Delete action */
  onDelete?: () => void;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Header background style */
  headerVariant?: "default" | "transparent" | "blur";
  /** Custom header content (replaces title/subtitle) */
  customHeader?: React.ReactNode;
  className?: string;
}

const DetailShell = React.forwardRef<HTMLDivElement, DetailShellProps>(
  (
    {
      children,
      title,
      subtitle,
      onBack,
      hideBack = false,
      primaryAction,
      secondaryActions = [],
      onShare,
      onEdit,
      onDelete,
      stickyHeader = true,
      headerVariant = "default",
      customHeader,
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

    // Build dropdown items from convenience props + custom actions
    const dropdownItems: DetailAction[] = [
      ...(onShare ? [{ label: "Share", icon: Share2, onClick: onShare }] : []),
      ...(onEdit ? [{ label: "Edit", icon: Edit, onClick: onEdit }] : []),
      ...secondaryActions,
      ...(onDelete
        ? [{ label: "Delete", icon: Trash2, onClick: onDelete, variant: "destructive" as const }]
        : []),
    ];

    const hasDropdown = dropdownItems.length > 0;

    const headerClasses = cn(
      "flex items-center gap-2 px-4 py-3 min-h-[56px]",
      stickyHeader && "sticky top-0 z-40",
      headerVariant === "default" && "bg-background border-b border-border",
      headerVariant === "transparent" && "bg-transparent",
      headerVariant === "blur" && "bg-background/80 backdrop-blur-md border-b border-border"
    );

    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
      >
        {/* Header */}
        <header className={headerClasses}>
          {/* Back button */}
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

          {/* Title area */}
          <div className="flex-1 min-w-0">
            {customHeader || (
              <>
                {title && (
                  <h1 className="font-semibold text-foreground truncate">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground truncate">
                    {subtitle}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {primaryAction && (
              <Button
                variant="default"
                size="sm"
                onClick={primaryAction.onClick}
                className="gap-1.5"
              >
                {primaryAction.icon && (
                  <primaryAction.icon className="h-4 w-4" />
                )}
                {primaryAction.label}
              </Button>
            )}

            {hasDropdown && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="More options">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {dropdownItems.map((item, index) => (
                    <React.Fragment key={item.label}>
                      {item.variant === "destructive" && index > 0 && (
                        <DropdownMenuSeparator />
                      )}
                      <DropdownMenuItem
                        onClick={item.onClick}
                        className={cn(
                          item.variant === "destructive" && "text-danger focus:text-danger"
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                        {item.label}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>
      </div>
    );
  }
);
DetailShell.displayName = "DetailShell";

// Detail content wrapper with consistent padding
interface DetailContentProps {
  children: React.ReactNode;
  className?: string;
}

const DetailContent = React.forwardRef<HTMLDivElement, DetailContentProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("px-4 py-4 space-y-4", className)}>
        {children}
      </div>
    );
  }
);
DetailContent.displayName = "DetailContent";

// Hero section for detail pages (e.g., profile, product)
interface DetailHeroProps {
  children: React.ReactNode;
  className?: string;
}

const DetailHero = React.forwardRef<HTMLDivElement, DetailHeroProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-raised px-4 py-6 text-center",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
DetailHero.displayName = "DetailHero";

export { DetailShell, DetailContent, DetailHero };
