import React from "react";
import { cn } from "@/lib/utils";

interface TokenSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function TokenSection({ title, description, children }: TokenSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

interface ColorSwatchProps {
  name: string;
  token: string;
  className?: string;
}

export function ColorSwatch({ name, token, className }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-12 h-12 rounded-lg border border-border shadow-sm",
          className
        )}
      />
      <div>
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <code className="text-xs text-muted-foreground font-mono">{token}</code>
      </div>
    </div>
  );
}

interface ColorRowProps {
  colors: Array<{
    name: string;
    token: string;
    className: string;
  }>;
}

export function ColorRow({ colors }: ColorRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.token} {...color} />
      ))}
    </div>
  );
}
