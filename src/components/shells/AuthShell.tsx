import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeToggleSimple } from "@/components/design-system/ThemeToggle";

interface AuthShellProps {
  children: React.ReactNode;
  /** Optional logo or brand element */
  logo?: React.ReactNode;
  /** Optional headline */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Optional footer content (terms, privacy links) */
  footer?: React.ReactNode;
  /** Layout variant */
  variant?: "centered" | "split";
  /** Optional background element for split variant */
  sideContent?: React.ReactNode;
  className?: string;
}

const AuthShell = React.forwardRef<HTMLDivElement, AuthShellProps>(
  (
    {
      children,
      logo,
      headline,
      subheadline,
      footer,
      variant = "centered",
      sideContent,
      className,
    },
    ref
  ) => {
    if (variant === "split") {
      return (
        <div
          ref={ref}
          className={cn("min-h-screen flex", className)}
        >
          {/* Left side - branding/illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-brand-yellow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow to-brand-yellow/80" />
            <div className="relative z-10 flex flex-col justify-between p-8 w-full">
              {logo && <div className="text-brand-yellow-foreground">{logo}</div>}
              <div className="flex-1 flex items-center justify-center">
                {sideContent}
              </div>
              <div className="text-brand-yellow-foreground/70 text-sm">
                © {new Date().getFullYear()} Your Company
              </div>
            </div>
          </div>

          {/* Right side - form */}
          <div className="flex-1 flex flex-col bg-background">
            <header className="flex justify-between items-center p-4">
              <div className="lg:hidden">{logo}</div>
              <div className="ml-auto">
                <ThemeToggleSimple />
              </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-sm space-y-6">
                {(headline || subheadline) && (
                  <div className="text-center space-y-2">
                    {headline && (
                      <h1 className="text-2xl font-bold text-foreground">
                        {headline}
                      </h1>
                    )}
                    {subheadline && (
                      <p className="text-muted-foreground">{subheadline}</p>
                    )}
                  </div>
                )}
                {children}
              </div>
            </main>

            {footer && (
              <footer className="p-4 text-center text-sm text-muted-foreground">
                {footer}
              </footer>
            )}
          </div>
        </div>
      );
    }

    // Centered variant (default)
    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col bg-background",
          className
        )}
      >
        <header className="flex justify-between items-center p-4">
          {logo}
          <div className="ml-auto">
            <ThemeToggleSimple />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-6">
            {(headline || subheadline) && (
              <div className="text-center space-y-2">
                {headline && (
                  <h1 className="text-2xl font-bold text-foreground">
                    {headline}
                  </h1>
                )}
                {subheadline && (
                  <p className="text-muted-foreground">{subheadline}</p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>

        {footer && (
          <footer className="p-4 text-center text-sm text-muted-foreground">
            {footer}
          </footer>
        )}
      </div>
    );
  }
);
AuthShell.displayName = "AuthShell";

export { AuthShell };
