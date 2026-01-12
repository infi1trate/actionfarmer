import React from "react";
import { cn } from "@/lib/utils";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentShowcase({
  title,
  description,
  code,
  children,
  className,
}: ComponentShowcaseProps) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-display text-lg font-semibold text-foreground">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div
        className={cn(
          "p-6 rounded-xl border border-border bg-background-subtle flex flex-wrap items-center gap-3",
          className
        )}
      >
        {children}
      </div>
      {code && (
        <pre className="p-4 rounded-lg bg-foreground text-foreground-inverted text-xs font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

interface ShowcaseGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function ShowcaseGrid({ children, columns = 1 }: ShowcaseGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns])}>
      {children}
    </div>
  );
}
