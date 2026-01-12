import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Palette,
  Layers,
  Type,
  Component,
  LayoutTemplate,
  Accessibility,
  Sparkles,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggleSegmented } from "@/components/design-system/ThemeToggle";
import { ReduceMotionToggle } from "@/components/ui/reduce-motion-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { title: "Overview", href: "/design-system", icon: Home },
  { title: "Brand", href: "/design-system/brand", icon: Sparkles },
  { title: "Tokens", href: "/design-system/tokens", icon: Layers },
  { title: "Typography", href: "/design-system/typography", icon: Type },
  { title: "Components", href: "/design-system/components", icon: Component },
  { title: "Patterns", href: "/design-system/patterns", icon: LayoutTemplate },
  { title: "Accessibility", href: "/design-system/accessibility", icon: Accessibility },
  { title: "Guardrails", href: "/design-system/guardrails", icon: Palette },
  { title: "Handoff", href: "/design-system/handoff", icon: Component },
];

interface DesignSystemLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function NavItem({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-brand-yellow text-brand-yellow-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  );
}

function Sidebar() {
  const location = useLocation();
  
  const isActive = (href: string) => {
    if (href === "/design-system") {
      return location.pathname === "/design-system" || location.pathname === "/design-system/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 border-r border-border bg-surface h-screen sticky top-0 flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="p-4 border-b border-border">
        <h1 className="font-display text-lg font-bold">Design System</h1>
        <p className="text-xs text-muted-foreground">DePIN UI v1.0</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggleSegmented />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Motion</span>
          <ReduceMotionToggle />
        </div>
      </div>
    </aside>
  );
}

function MobileNav() {
  const location = useLocation();
  
  const isActive = (href: string) => {
    if (href === "/design-system") {
      return location.pathname === "/design-system" || location.pathname === "/design-system/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-4 border-b border-border">
          <h1 className="font-display text-lg font-bold">Design System</h1>
          <p className="text-xs text-muted-foreground">DePIN UI v1.0</p>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} isActive={isActive(item.href)} />
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export function DesignSystemLayout({ children, title, description }: DesignSystemLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
          <div className="flex items-center justify-between px-4 h-14">
            <MobileNav />
            <h1 className="font-display font-bold truncate">{title}</h1>
            <ThemeToggleSegmented />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="container max-w-5xl py-8 md:py-12 px-4 md:px-8">
            {/* Page Header */}
            <div className="mb-8 md:mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{title}</h1>
              {description && (
                <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
              )}
            </div>

            {/* Page Content */}
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 mt-auto">
          <div className="container max-w-5xl px-4 md:px-8">
            <p className="text-sm text-muted-foreground text-center">
              DePIN Design System • Built with React, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
