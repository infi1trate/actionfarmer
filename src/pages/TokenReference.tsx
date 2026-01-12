import { ThemeToggle } from "@/components/design-system/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tokens from "@/tokens/tokens";

const TokenReference = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-display text-xl font-bold text-foreground">Token Reference</h1>
            <nav className="hidden md:flex items-center gap-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/design-system">Components</NavLink>
              <NavLink to="/brand">Brand</NavLink>
              <NavLink to="/tokens">Tokens</NavLink>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-12 space-y-12">
        {/* Hero */}
        <section className="max-w-3xl">
          <Badge variant="brand" className="mb-4">Token System</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design Tokens
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            A three-layer token architecture: Primitives → Semantics → Components. 
            All tokens are available as CSS custom properties and a JSON export.
          </p>
        </section>

        <Tabs defaultValue="primitives" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="semantics">Semantics</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          {/* PRIMITIVES TAB */}
          <TabsContent value="primitives" className="space-y-12">
            {/* Primitive Colors */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Primitive Colors</h3>
                <p className="text-foreground-secondary">Raw color scales with 11 shades each.</p>
              </div>
              
              {/* Gray Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Gray</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-gray-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-gray-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Yellow Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Yellow (Brand)</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-yellow-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-yellow-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Green Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Green (Success)</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-green-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-green-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Red Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Red (Danger)</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-red-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-red-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amber Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Amber (Warning)</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-amber-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-amber-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Blue Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Blue (Info)</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--color-primitive-blue-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-11 gap-1">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                      <div key={shade} className="space-y-1">
                        <div 
                          className="h-12 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(--color-primitive-blue-${shade}))` }}
                        />
                        <p className="text-xs text-center text-foreground-tertiary">{shade}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Spacing */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Spacing</h3>
                <p className="text-foreground-secondary">Consistent spacing scale based on 4px base unit.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { name: "0.5", value: "2px", css: "--space-0-5" },
                      { name: "1", value: "4px", css: "--space-1" },
                      { name: "2", value: "8px", css: "--space-2" },
                      { name: "3", value: "12px", css: "--space-3" },
                      { name: "4", value: "16px", css: "--space-4" },
                      { name: "5", value: "20px", css: "--space-5" },
                      { name: "6", value: "24px", css: "--space-6" },
                      { name: "8", value: "32px", css: "--space-8" },
                      { name: "10", value: "40px", css: "--space-10" },
                      { name: "12", value: "48px", css: "--space-12" },
                      { name: "16", value: "64px", css: "--space-16" },
                      { name: "20", value: "80px", css: "--space-20" },
                      { name: "24", value: "96px", css: "--space-24" },
                    ].map((space) => (
                      <div key={space.name} className="flex items-center gap-4">
                        <div className="w-24 text-sm">
                          <code className="text-foreground-tertiary">{space.css}</code>
                        </div>
                        <div 
                          className="h-4 bg-brand-primary rounded-sm"
                          style={{ width: space.value }}
                        />
                        <span className="text-sm text-foreground-secondary">{space.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Radius */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Border Radius</h3>
                <p className="text-foreground-secondary">Soft-rounded geometry for a friendly feel.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-6">
                    {[
                      { name: "none", value: "0", css: "--radius-none" },
                      { name: "sm", value: "6px", css: "--radius-sm" },
                      { name: "md", value: "8px", css: "--radius-md" },
                      { name: "DEFAULT", value: "12px", css: "--radius-DEFAULT" },
                      { name: "lg", value: "16px", css: "--radius-lg" },
                      { name: "xl", value: "20px", css: "--radius-xl" },
                      { name: "2xl", value: "24px", css: "--radius-2xl" },
                      { name: "full", value: "9999px", css: "--radius-full" },
                    ].map((radius) => (
                      <div key={radius.name} className="flex flex-col items-center gap-2">
                        <div 
                          className="w-16 h-16 bg-brand-primary"
                          style={{ borderRadius: radius.value }}
                        />
                        <code className="text-xs text-foreground-tertiary">{radius.name}</code>
                        <span className="text-xs text-foreground-secondary">{radius.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Shadows */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Shadows</h3>
                <p className="text-foreground-secondary">Elevation system with glow effects for brand accents.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { name: "xs", css: "--shadow-xs" },
                      { name: "sm", css: "--shadow-sm" },
                      { name: "md", css: "--shadow-md" },
                      { name: "lg", css: "--shadow-lg" },
                      { name: "xl", css: "--shadow-xl" },
                      { name: "2xl", css: "--shadow-2xl" },
                      { name: "glow", css: "--shadow-glow" },
                      { name: "glow-lg", css: "--shadow-glow-lg" },
                    ].map((shadow) => (
                      <div key={shadow.name} className="flex flex-col items-center gap-3">
                        <div 
                          className="w-20 h-20 bg-surface rounded-lg"
                          style={{ boxShadow: `var(${shadow.css})` }}
                        />
                        <code className="text-xs text-foreground-tertiary">{shadow.name}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Typography */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Typography</h3>
                <p className="text-foreground-secondary">Font families, sizes, and line heights.</p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Font Families</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-surface-raised rounded-lg">
                    <code className="text-xs text-foreground-tertiary block mb-2">--font-display</code>
                    <p className="font-display text-3xl font-bold">Barlow Condensed</p>
                  </div>
                  <div className="p-4 bg-surface-raised rounded-lg">
                    <code className="text-xs text-foreground-tertiary block mb-2">--font-body</code>
                    <p className="font-body text-xl">Nunito - The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div className="p-4 bg-surface-raised rounded-lg">
                    <code className="text-xs text-foreground-tertiary block mb-2">--font-mono</code>
                    <p className="font-mono">{"const tokens = { design: 'system' }"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Font Sizes</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--text-*</code>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "xs", size: "12px" },
                      { name: "sm", size: "14px" },
                      { name: "base", size: "16px" },
                      { name: "lg", size: "18px" },
                      { name: "xl", size: "20px" },
                      { name: "2xl", size: "24px" },
                      { name: "3xl", size: "30px" },
                      { name: "4xl", size: "36px" },
                      { name: "5xl", size: "48px" },
                    ].map((font) => (
                      <div key={font.name} className="flex items-baseline gap-4">
                        <code className="w-16 text-xs text-foreground-tertiary">{font.name}</code>
                        <span style={{ fontSize: font.size }}>The quick brown fox</span>
                        <span className="text-xs text-foreground-tertiary">{font.size}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Line Heights</CardTitle>
                  <code className="text-xs text-foreground-tertiary">--line-*</code>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: "tight", value: "1.25" },
                      { name: "snug", value: "1.375" },
                      { name: "normal", value: "1.5" },
                      { name: "relaxed", value: "1.625" },
                      { name: "loose", value: "2" },
                    ].map((line) => (
                      <div key={line.name} className="p-3 bg-surface-raised rounded-lg">
                        <code className="text-xs text-foreground-tertiary block mb-2">{line.name}: {line.value}</code>
                        <p style={{ lineHeight: line.value }} className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* SEMANTICS TAB */}
          <TabsContent value="semantics" className="space-y-12">
            {/* Background */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Background</h3>
                <p className="text-foreground-secondary">Semantic background layers.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { name: "bg-primary", css: "--color-semantic-bg-primary", class: "bg-background" },
                      { name: "bg-secondary", css: "--color-semantic-bg-secondary", class: "bg-secondary" },
                      { name: "bg-tertiary", css: "--color-semantic-bg-tertiary", class: "bg-muted" },
                      { name: "bg-inverse", css: "--color-semantic-bg-inverse", class: "bg-foreground" },
                    ].map((bg) => (
                      <div key={bg.name} className="space-y-2">
                        <div className={`h-20 rounded-lg border border-border ${bg.class}`} />
                        <code className="text-xs text-foreground-tertiary block">{bg.name}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Surface */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Surface</h3>
                <p className="text-foreground-secondary">Elevated content containers.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { name: "surface", class: "bg-surface shadow-sm" },
                      { name: "surface-raised", class: "bg-surface-raised shadow-md" },
                      { name: "surface-overlay", class: "bg-popover shadow-lg" },
                      { name: "surface-sunken", class: "bg-muted shadow-inner" },
                    ].map((surface) => (
                      <div key={surface.name} className="space-y-2">
                        <div className={`h-20 rounded-lg border border-border ${surface.class}`} />
                        <code className="text-xs text-foreground-tertiary block">{surface.name}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Text */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Text</h3>
                <p className="text-foreground-secondary">Semantic text colors for hierarchy.</p>
              </div>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-40"><code className="text-xs text-foreground-tertiary">text-primary</code></div>
                    <p className="text-foreground font-medium">Primary text for main content</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-40"><code className="text-xs text-foreground-tertiary">text-secondary</code></div>
                    <p className="text-foreground-secondary">Secondary text for supporting info</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-40"><code className="text-xs text-foreground-tertiary">text-tertiary</code></div>
                    <p className="text-foreground-tertiary">Tertiary text for subtle elements</p>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-foreground rounded-lg">
                    <div className="w-40"><code className="text-xs text-foreground-tertiary/60">text-inverse</code></div>
                    <p className="text-background font-medium">Inverse text on dark backgrounds</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Border */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Border</h3>
                <p className="text-foreground-secondary">Semantic border colors.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { name: "border", class: "border-2 border-border" },
                      { name: "border-strong", class: "border-2 border-border-strong" },
                      { name: "border-subtle", class: "border-2 border-muted" },
                      { name: "border-focus", class: "border-2 border-ring" },
                    ].map((border) => (
                      <div key={border.name} className="space-y-2">
                        <div className={`h-16 rounded-lg bg-surface ${border.class}`} />
                        <code className="text-xs text-foreground-tertiary block">{border.name}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Brand */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Brand</h3>
                <p className="text-foreground-secondary">Primary brand color system.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4">
                    {[
                      { name: "brand-primary", class: "bg-brand-primary" },
                      { name: "brand-primary-hover", class: "bg-brand-primary-hover" },
                      { name: "brand-subtle", class: "bg-brand-primary-subtle" },
                    ].map((brand) => (
                      <div key={brand.name} className="space-y-2">
                        <div className={`h-16 rounded-lg ${brand.class}`} />
                        <code className="text-xs text-foreground-tertiary block">{brand.name}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Status Colors */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Status</h3>
                <p className="text-foreground-secondary">Feedback and status indicators.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { 
                    name: "Success", 
                    colors: [
                      { name: "success", class: "bg-success" },
                      { name: "success-subtle", class: "bg-success-subtle" },
                    ]
                  },
                  { 
                    name: "Danger", 
                    colors: [
                      { name: "danger", class: "bg-danger" },
                      { name: "danger-subtle", class: "bg-danger-subtle" },
                    ]
                  },
                  { 
                    name: "Warning", 
                    colors: [
                      { name: "warning", class: "bg-warning" },
                      { name: "warning-subtle", class: "bg-warning-subtle" },
                    ]
                  },
                  { 
                    name: "Info", 
                    colors: [
                      { name: "info", class: "bg-info" },
                      { name: "info-subtle", class: "bg-info-subtle" },
                    ]
                  },
                ].map((status) => (
                  <Card key={status.name}>
                    <CardHeader>
                      <CardTitle className="font-display text-lg">{status.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        {status.colors.map((color) => (
                          <div key={color.name} className="flex-1 space-y-2">
                            <div className={`h-12 rounded-lg ${color.class}`} />
                            <code className="text-xs text-foreground-tertiary block">{color.name}</code>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Overlay */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Overlay</h3>
                <p className="text-foreground-secondary">Modal and backdrop overlays.</p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: "overlay-subtle", opacity: "30%" },
                      { name: "overlay", opacity: "50%" },
                      { name: "overlay-heavy", opacity: "70%" },
                    ].map((overlay) => (
                      <div key={overlay.name} className="space-y-2">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-brand-primary to-success relative overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-black"
                            style={{ opacity: parseInt(overlay.opacity) / 100 }}
                          />
                        </div>
                        <code className="text-xs text-foreground-tertiary block">{overlay.name}</code>
                        <span className="text-xs text-foreground-secondary">{overlay.opacity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* COMPONENTS TAB */}
          <TabsContent value="components" className="space-y-12">
            {/* Button Tokens */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Button</h3>
                <p className="text-foreground-secondary">Component-specific button tokens.</p>
              </div>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Heights</h4>
                    <div className="flex items-end gap-4">
                      {[
                        { name: "xs", height: "28px" },
                        { name: "sm", height: "32px" },
                        { name: "md", height: "40px" },
                        { name: "lg", height: "44px" },
                        { name: "xl", height: "48px" },
                      ].map((size) => (
                        <div key={size.name} className="flex flex-col items-center gap-2">
                          <div 
                            className="w-24 bg-brand-primary rounded-md flex items-center justify-center text-brand-primary-foreground text-sm font-medium"
                            style={{ height: size.height }}
                          >
                            Button
                          </div>
                          <code className="text-xs text-foreground-tertiary">{size.name}</code>
                          <span className="text-xs text-foreground-secondary">{size.height}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">CSS Variables</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <code className="text-foreground-tertiary">--component-button-radius</code>
                      <code className="text-foreground-tertiary">--component-button-height-*</code>
                      <code className="text-foreground-tertiary">--component-button-font-*</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Input Tokens */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Input</h3>
                <p className="text-foreground-secondary">Form input component tokens.</p>
              </div>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Heights</h4>
                    <div className="flex flex-col gap-3 max-w-md">
                      {[
                        { name: "sm", height: "32px" },
                        { name: "md", height: "40px" },
                        { name: "lg", height: "44px" },
                        { name: "xl", height: "48px" },
                      ].map((size) => (
                        <div key={size.name} className="flex items-center gap-4">
                          <code className="w-12 text-xs text-foreground-tertiary">{size.name}</code>
                          <input 
                            type="text" 
                            placeholder={`Input ${size.name}`}
                            className="flex-1 border border-border rounded-md px-3 bg-background"
                            style={{ height: size.height }}
                          />
                          <span className="text-xs text-foreground-secondary">{size.height}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Card Tokens */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Card</h3>
                <p className="text-foreground-secondary">Card container tokens.</p>
              </div>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Padding Sizes</h4>
                    <div className="flex gap-6">
                      {[
                        { name: "sm", padding: "16px" },
                        { name: "md", padding: "24px" },
                        { name: "lg", padding: "32px" },
                      ].map((size) => (
                        <div key={size.name} className="space-y-2">
                          <div 
                            className="border border-border rounded-lg bg-surface"
                            style={{ padding: size.padding }}
                          >
                            <div className="w-16 h-8 bg-brand-primary-subtle rounded" />
                          </div>
                          <code className="text-xs text-foreground-tertiary block text-center">{size.name}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">CSS Variables</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <code className="text-foreground-tertiary">--component-card-radius: 16px</code>
                      <code className="text-foreground-tertiary">--component-card-shadow: shadow-sm</code>
                      <code className="text-foreground-tertiary">--component-card-border-width: 1px</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Other Component Tokens */}
            <section className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Other Components</h3>
                <p className="text-foreground-secondary">Additional component token references.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { 
                    name: "Nav", 
                    tokens: [
                      "--component-nav-height: 64px",
                      "--component-nav-item-radius",
                      "--component-nav-item-gap",
                    ]
                  },
                  { 
                    name: "Modal", 
                    tokens: [
                      "--component-modal-radius: 20px",
                      "--component-modal-padding: 24px",
                      "--component-modal-shadow: xl",
                    ]
                  },
                  { 
                    name: "Toast", 
                    tokens: [
                      "--component-toast-radius: 16px",
                      "--component-toast-padding: 16px",
                      "--component-toast-min-width: 320px",
                    ]
                  },
                  { 
                    name: "Badge", 
                    tokens: [
                      "--component-badge-radius: 8px",
                      "--component-badge-radius-pill: 9999px",
                      "--component-badge-font-*",
                    ]
                  },
                  { 
                    name: "Progress", 
                    tokens: [
                      "--component-progress-radius: full",
                      "--component-progress-height-sm: 4px",
                      "--component-progress-height-md: 8px",
                    ]
                  },
                  { 
                    name: "Table", 
                    tokens: [
                      "--component-table-radius: 16px",
                      "--component-table-cell-padding",
                      "--component-table-border-width: 1px",
                    ]
                  },
                ].map((component) => (
                  <Card key={component.name}>
                    <CardHeader>
                      <CardTitle className="font-display text-lg">{component.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {component.tokens.map((token, i) => (
                          <code key={i} className="text-xs text-foreground-tertiary block">{token}</code>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* JSON Export */}
        <section className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">JSON Export</h3>
            <p className="text-foreground-secondary">Import tokens programmatically from <code className="text-sm bg-muted px-2 py-0.5 rounded">src/tokens/tokens.ts</code></p>
          </div>
          <Card className="bg-foreground text-background">
            <CardContent className="pt-6">
              <pre className="text-sm overflow-x-auto">
{`import tokens from '@/tokens/tokens';

// Access primitives
tokens.primitive.color.yellow[400]  // "48 96% 53%"
tokens.primitive.spacing[4]          // "1rem"
tokens.primitive.radius.lg           // "1rem"

// Access semantics
tokens.semantic.light.brand.primary  // "48 96% 53%"
tokens.semantic.dark.text.primary    // "0 0% 98%"

// Access components
tokens.component.button.height.md    // "var(--space-10)"
tokens.component.card.radius         // "var(--radius-lg)"`}
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default TokenReference;
