import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { DosDonts, UsageRule, PreviewCard, TokenLabel } from "@/components/design-system/DosDonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tokens from "@/tokens/tokens";

export default function DSTokens() {
  return (
    <DesignSystemLayout
      title="Design Tokens"
      description="A three-layer token architecture: Primitives → Semantics → Components. All tokens available as CSS custom properties."
    >
      <div className="space-y-16">
        {/* Color Tokens */}
        <section className="space-y-8">
          <div>
            <Badge variant="brand" className="mb-2">Color</Badge>
            <h2 className="font-display text-2xl font-bold">Color Tokens</h2>
            <p className="text-muted-foreground mt-1">
              Semantic color tokens that adapt to light and dark themes.
            </p>
          </div>

          {/* Brand Colors */}
          <div className="space-y-4">
            <h3 className="font-semibold">Brand</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "brand-yellow", label: "Primary", class: "bg-brand-yellow" },
                { name: "brand-yellow-hover", label: "Hover", class: "bg-brand-yellow-hover" },
                { name: "brand-yellow-soft", label: "Soft", class: "bg-brand-yellow-soft border" },
                { name: "brand-yellow-foreground", label: "Foreground", class: "bg-brand-yellow-foreground" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`h-16 rounded-lg ${color.class}`} />
                  <p className="text-sm font-medium">{color.label}</p>
                  <TokenLabel token={color.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h3 className="font-semibold">Semantic</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "success", label: "Success", class: "bg-success" },
                { name: "info", label: "Info", class: "bg-info" },
                { name: "warning", label: "Warning", class: "bg-warning" },
                { name: "danger", label: "Danger", class: "bg-danger" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`h-16 rounded-lg ${color.class}`} />
                  <p className="text-sm font-medium">{color.label}</p>
                  <TokenLabel token={color.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="space-y-4">
            <h3 className="font-semibold">Neutrals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "bg", label: "Background", class: "bg-background border" },
                { name: "surface", label: "Surface", class: "bg-surface border" },
                { name: "surface-2", label: "Surface 2", class: "bg-surface-2 border" },
                { name: "text", label: "Text", class: "bg-foreground" },
                { name: "text-2", label: "Text 2", class: "bg-muted-foreground" },
                { name: "border", label: "Border", class: "bg-border" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`h-12 rounded-lg ${color.class}`} />
                  <p className="text-xs font-medium">{color.label}</p>
                  <TokenLabel token={color.name} className="text-[10px]" />
                </div>
              ))}
            </div>
          </div>

          <UsageRule
            title="Always use semantic tokens"
            description="Never hardcode hex or HSL values. Use tokens like --brand-yellow or --success for automatic theme support."
            variant="warning"
          />
        </section>

        {/* Typography Tokens */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Typography</Badge>
            <h2 className="font-display text-2xl font-bold">Typography Tokens</h2>
            <p className="text-muted-foreground mt-1">
              Font families, sizes, weights, and line heights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Font Families</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-display text-2xl font-bold">Barlow Condensed</p>
                  <TokenLabel token="font-display" className="mt-1" />
                </div>
                <div>
                  <p className="font-body text-lg">Inter / Source Sans</p>
                  <TokenLabel token="font-body" className="mt-1" />
                </div>
                <div>
                  <p className="font-mono text-sm">SF Mono / Consolas</p>
                  <TokenLabel token="font-mono" className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Type Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "text-display", size: "4rem", sample: "Display" },
                  { name: "text-h1", size: "2.5rem", sample: "Heading 1" },
                  { name: "text-h2", size: "2rem", sample: "Heading 2" },
                  { name: "text-h3", size: "1.5rem", sample: "Heading 3" },
                  { name: "text-body", size: "1rem", sample: "Body text" },
                  { name: "text-caption", size: "0.75rem", sample: "Caption" },
                ].map((type) => (
                  <div key={type.name} className="flex items-baseline justify-between">
                    <span style={{ fontSize: type.size }} className="font-display font-bold truncate">
                      {type.sample}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">{type.size}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing Tokens */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Spacing</Badge>
            <h2 className="font-display text-2xl font-bold">Spacing Tokens</h2>
            <p className="text-muted-foreground mt-1">
              8px base grid system for consistent layouts.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {[
              { name: "1", size: "4px", px: 4 },
              { name: "2", size: "8px", px: 8 },
              { name: "3", size: "12px", px: 12 },
              { name: "4", size: "16px", px: 16 },
              { name: "6", size: "24px", px: 24 },
              { name: "8", size: "32px", px: 32 },
              { name: "12", size: "48px", px: 48 },
              { name: "16", size: "64px", px: 64 },
            ].map((space) => (
              <div key={space.name} className="text-center">
                <div
                  className="bg-brand-yellow rounded"
                  style={{ width: space.px, height: space.px }}
                />
                <p className="text-xs text-muted-foreground mt-2">{space.size}</p>
              </div>
            ))}
          </div>

          <UsageRule
            title="Use Tailwind spacing classes"
            description="gap-4, p-6, mt-8, etc. map to our 8px grid. Avoid arbitrary values like p-[13px]."
            variant="info"
          />
        </section>

        {/* Radius Tokens */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Radius</Badge>
            <h2 className="font-display text-2xl font-bold">Border Radius</h2>
            <p className="text-muted-foreground mt-1">
              Consistent corner rounding for a friendly feel.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            {[
              { name: "none", class: "rounded-none", size: "0" },
              { name: "sm", class: "rounded-sm", size: "2px" },
              { name: "md", class: "rounded-md", size: "6px" },
              { name: "lg", class: "rounded-lg", size: "8px" },
              { name: "xl", class: "rounded-xl", size: "12px" },
              { name: "2xl", class: "rounded-2xl", size: "16px" },
              { name: "full", class: "rounded-full", size: "9999px" },
            ].map((radius) => (
              <div key={radius.name} className="text-center">
                <div className={`w-16 h-16 bg-muted border-2 border-border ${radius.class}`} />
                <p className="text-xs font-medium mt-2">{radius.name}</p>
                <p className="text-xs text-muted-foreground">{radius.size}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shadow Tokens */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Shadow</Badge>
            <h2 className="font-display text-2xl font-bold">Shadow Tokens</h2>
            <p className="text-muted-foreground mt-1">
              Elevation and depth for layered interfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: "shadow-xs", class: "shadow-xs" },
              { name: "shadow-sm", class: "shadow-sm" },
              { name: "shadow", class: "shadow" },
              { name: "shadow-md", class: "shadow-md" },
              { name: "shadow-lg", class: "shadow-lg" },
              { name: "shadow-glow", class: "shadow-glow" },
            ].map((shadow) => (
              <div key={shadow.name} className="text-center">
                <div className={`w-full h-20 bg-surface rounded-xl ${shadow.class}`} />
                <p className="text-xs font-medium mt-3">{shadow.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold">Token Usage Guidelines</h2>
          <DosDonts
            dos={[
              "Use semantic tokens (--brand-yellow, --success, --surface)",
              "Reference tokens via Tailwind classes (bg-brand-yellow, text-foreground)",
              "Use the 8px spacing grid (gap-2, gap-4, gap-6, gap-8)",
              "Apply consistent border radius (rounded-lg, rounded-xl)",
            ]}
            donts={[
              "Hardcode hex values (#FFD700) or rgb values",
              "Use arbitrary spacing values (p-[13px])",
              "Mix different radius scales in the same context",
              "Create new tokens without design review",
            ]}
          />
        </section>
      </div>
    </DesignSystemLayout>
  );
}
