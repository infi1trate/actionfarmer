import React, { useState } from "react";
import { 
  Zap, 
  Check, 
  AlertTriangle, 
  Info, 
  X,
  ChevronRight,
  Star,
  Heart,
  Bell,
  Settings,
  User,
  Search,
  Plus,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TokenSection, ColorSwatch, ColorRow } from "@/components/design-system/TokenSection";
import { ComponentShowcase, ShowcaseGrid } from "@/components/design-system/ComponentShowcase";
import { ThemeToggle } from "@/components/design-system/ThemeToggle";

const DesignSystem = () => {
  const [progressValue, setProgressValue] = useState(65);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">DePIN Design System</h1>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-8 space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <Badge variant="brand" size="pill">Design Tokens</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Modern, Friendly,<br />
            <span className="text-brand-primary">Production-Ready</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A complete design system for DePIN consumer apps. Inspired by Duolingo, Robinhood, and Snapchat — playful yet professional.
          </p>
        </section>

        {/* Color Tokens */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Color Tokens</h2>
            <p className="text-muted-foreground">Semantic color system with full dark mode support.</p>
          </div>

          <TokenSection title="Brand Colors" description="Primary brand identity colors">
            <ColorRow
              colors={[
                { name: "Primary", token: "--brand-primary", className: "bg-brand-primary" },
                { name: "Primary Hover", token: "--brand-primary-hover", className: "bg-brand-primary-hover" },
                { name: "Primary Subtle", token: "--brand-primary-subtle", className: "bg-brand-primary-subtle" },
                { name: "Accent", token: "--accent", className: "bg-accent" },
              ]}
            />
          </TokenSection>

          <TokenSection title="Semantic Colors" description="Background and surface colors">
            <ColorRow
              colors={[
                { name: "Background", token: "--background", className: "bg-background" },
                { name: "Surface", token: "--surface", className: "bg-surface" },
                { name: "Surface Raised", token: "--surface-raised", className: "bg-surface-raised" },
                { name: "Secondary", token: "--secondary", className: "bg-secondary" },
                { name: "Muted", token: "--muted", className: "bg-muted" },
              ]}
            />
          </TokenSection>

          <TokenSection title="Status Colors" description="Feedback and status indicators">
            <ColorRow
              colors={[
                { name: "Success", token: "--success", className: "bg-success" },
                { name: "Success Subtle", token: "--success-subtle", className: "bg-success-subtle" },
                { name: "Warning", token: "--warning", className: "bg-warning" },
                { name: "Warning Subtle", token: "--warning-subtle", className: "bg-warning-subtle" },
                { name: "Danger", token: "--danger", className: "bg-danger" },
                { name: "Danger Subtle", token: "--danger-subtle", className: "bg-danger-subtle" },
                { name: "Info", token: "--info", className: "bg-info" },
                { name: "Info Subtle", token: "--info-subtle", className: "bg-info-subtle" },
              ]}
            />
          </TokenSection>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Typography</h2>
            <p className="text-muted-foreground">Humanist sans serif for body, condensed for headers.</p>
          </div>

          <div className="space-y-6 p-6 rounded-xl border border-border bg-card">
            <div>
              <code className="text-xs text-muted-foreground">font-display (Barlow Condensed)</code>
              <p className="font-display text-5xl font-bold mt-2">The quick brown fox jumps</p>
            </div>
            <div>
              <code className="text-xs text-muted-foreground">font-body (Nunito)</code>
              <p className="font-body text-xl mt-2">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Regular</p>
                <p className="font-body font-normal">Aa Bb Cc</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Medium</p>
                <p className="font-body font-medium">Aa Bb Cc</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Semibold</p>
                <p className="font-body font-semibold">Aa Bb Cc</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bold</p>
                <p className="font-body font-bold">Aa Bb Cc</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Buttons</h2>
            <p className="text-muted-foreground">Multiple variants and sizes for every use case.</p>
          </div>

          <ComponentShowcase title="Brand Variants" description="Primary action buttons">
            <Button variant="brand">Get Started</Button>
            <Button variant="brand-outline">Learn More</Button>
            <Button variant="brand-ghost">View Details</Button>
            <Button variant="soft">Soft Action</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Standard Variants">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Status Variants">
            <Button variant="success"><Check className="w-4 h-4" /> Success</Button>
            <Button variant="warning"><AlertTriangle className="w-4 h-4" /> Warning</Button>
            <Button variant="destructive"><X className="w-4 h-4" /> Danger</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Sizes">
            <Button variant="brand" size="xs">Extra Small</Button>
            <Button variant="brand" size="sm">Small</Button>
            <Button variant="brand" size="default">Default</Button>
            <Button variant="brand" size="lg">Large</Button>
            <Button variant="brand" size="xl">Extra Large</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Icon Buttons">
            <Button variant="brand" size="icon-sm"><Plus /></Button>
            <Button variant="brand" size="icon"><Star /></Button>
            <Button variant="brand" size="icon-lg"><Settings /></Button>
            <Button variant="secondary" size="icon"><Bell /></Button>
            <Button variant="outline" size="icon"><User /></Button>
          </ComponentShowcase>

          <ComponentShowcase title="With Icons">
            <Button variant="brand"><Zap className="w-4 h-4" /> Boost Now</Button>
            <Button variant="secondary">Next <ArrowRight className="w-4 h-4" /></Button>
            <Button variant="outline" disabled><Loader2 className="w-4 h-4 animate-spin" /> Loading...</Button>
          </ComponentShowcase>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Badges</h2>
            <p className="text-muted-foreground">Status indicators and labels.</p>
          </div>

          <ComponentShowcase title="Standard Badges">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="brand-subtle">Brand Subtle</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Status Badges">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">Info</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Subtle Status">
            <Badge variant="success-subtle"><Check className="w-3 h-3" /> Completed</Badge>
            <Badge variant="warning-subtle"><AlertTriangle className="w-3 h-3" /> Pending</Badge>
            <Badge variant="danger-subtle"><X className="w-3 h-3" /> Failed</Badge>
            <Badge variant="info-subtle"><Info className="w-3 h-3" /> Processing</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Sizes">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="pill">Pill</Badge>
            <Badge size="pill-lg">Pill Large</Badge>
          </ComponentShowcase>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Inputs</h2>
            <p className="text-muted-foreground">Form inputs with multiple styles.</p>
          </div>

          <ShowcaseGrid columns={2}>
            <ComponentShowcase title="Default">
              <Input placeholder="Enter your email..." className="w-full" />
            </ComponentShowcase>
            <ComponentShowcase title="Filled">
              <Input variant="filled" placeholder="Search devices..." className="w-full" />
            </ComponentShowcase>
            <ComponentShowcase title="Outline">
              <Input variant="outline" placeholder="Username" className="w-full" />
            </ComponentShowcase>
            <ComponentShowcase title="Ghost (Underline)">
              <Input variant="ghost" placeholder="Type here..." className="w-full" />
            </ComponentShowcase>
          </ShowcaseGrid>

          <ComponentShowcase title="Sizes">
            <Input inputSize="sm" placeholder="Small" className="w-40" />
            <Input inputSize="default" placeholder="Default" className="w-44" />
            <Input inputSize="lg" placeholder="Large" className="w-48" />
            <Input inputSize="xl" placeholder="Extra Large" className="w-52" />
          </ComponentShowcase>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Cards</h2>
            <p className="text-muted-foreground">Content containers with various styles.</p>
          </div>

          <ShowcaseGrid columns={3}>
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with subtle shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>More prominent shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">For important content.</p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Clickable cards.</p>
              </CardContent>
            </Card>

            <Card variant="brand">
              <CardHeader>
                <CardTitle>Brand Card</CardTitle>
                <CardDescription>Primary brand styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Featured content.</p>
              </CardContent>
            </Card>

            <Card variant="success">
              <CardHeader>
                <CardTitle>Success Card</CardTitle>
                <CardDescription>Positive feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">All systems operational.</p>
              </CardContent>
            </Card>

            <Card variant="warning">
              <CardHeader>
                <CardTitle>Warning Card</CardTitle>
                <CardDescription>Attention needed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Check your settings.</p>
              </CardContent>
            </Card>
          </ShowcaseGrid>

          <ComponentShowcase title="Card with Actions" className="block">
            <Card variant="default" className="max-w-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Device Status</CardTitle>
                    <CardDescription>Your connected node</CardDescription>
                  </div>
                  <Badge variant="success-subtle"><Check className="w-3 h-3" /> Online</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Earnings Today</span>
                  <span className="font-semibold">$12.45</span>
                </div>
                <Progress value={progressValue} variant="brand" showValue />
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="brand" className="flex-1">View Details</Button>
                <Button variant="outline" size="icon"><Settings /></Button>
              </CardFooter>
            </Card>
          </ComponentShowcase>
        </section>

        {/* Progress */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Progress</h2>
            <p className="text-muted-foreground">Loading and completion indicators.</p>
          </div>

          <div className="space-y-6 p-6 rounded-xl border border-border bg-card">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Default</span>
                <span className="text-muted-foreground">50%</span>
              </div>
              <Progress value={50} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Brand</span>
                <span className="text-muted-foreground">65%</span>
              </div>
              <Progress value={65} variant="brand" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success</span>
                <span className="text-muted-foreground">100%</span>
              </div>
              <Progress value={100} variant="success" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Warning</span>
                <span className="text-muted-foreground">80%</span>
              </div>
              <Progress value={80} variant="warning" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gradient</span>
                <span className="text-muted-foreground">75%</span>
              </div>
              <Progress value={75} variant="gradient" size="lg" />
            </div>
          </div>

          <ComponentShowcase title="Sizes">
            <div className="w-full space-y-4">
              <Progress value={60} variant="brand" size="sm" />
              <Progress value={60} variant="brand" size="default" />
              <Progress value={60} variant="brand" size="lg" />
              <Progress value={60} variant="brand" size="xl" />
            </div>
          </ComponentShowcase>
        </section>

        {/* Shadows */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Shadows</h2>
            <p className="text-muted-foreground">Elevation and depth tokens.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="aspect-square rounded-xl bg-card shadow-sm flex items-center justify-center">
              <span className="text-sm text-muted-foreground">shadow-sm</span>
            </div>
            <div className="aspect-square rounded-xl bg-card shadow flex items-center justify-center">
              <span className="text-sm text-muted-foreground">shadow</span>
            </div>
            <div className="aspect-square rounded-xl bg-card shadow-md flex items-center justify-center">
              <span className="text-sm text-muted-foreground">shadow-md</span>
            </div>
            <div className="aspect-square rounded-xl bg-card shadow-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">shadow-lg</span>
            </div>
            <div className="aspect-square rounded-xl bg-card shadow-glow flex items-center justify-center">
              <span className="text-sm text-muted-foreground">shadow-glow</span>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Border Radius</h2>
            <p className="text-muted-foreground">Consistent corner rounding.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="w-20 h-20 bg-brand-primary rounded-sm flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">sm</span>
            </div>
            <div className="w-20 h-20 bg-brand-primary rounded-md flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">md</span>
            </div>
            <div className="w-20 h-20 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">lg</span>
            </div>
            <div className="w-20 h-20 bg-brand-primary rounded-xl flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">xl</span>
            </div>
            <div className="w-20 h-20 bg-brand-primary rounded-2xl flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">2xl</span>
            </div>
            <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-brand-primary-foreground font-semibold">full</span>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Accessibility</h2>
            <p className="text-muted-foreground">Built-in accessibility features.</p>
          </div>

          <ShowcaseGrid columns={2}>
            <Card variant="default">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  Focus Rings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  All interactive elements have visible focus states for keyboard navigation.
                </p>
                <Button variant="brand">Tab to me</Button>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center">
                    <Info className="w-4 h-4 text-info" />
                  </div>
                  Reduced Motion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Animations respect <code className="text-xs bg-muted px-1 py-0.5 rounded">prefers-reduced-motion</code> for users who prefer less motion.
                </p>
              </CardContent>
            </Card>
          </ShowcaseGrid>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-16 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              DePIN Design System • Built with React + Tailwind CSS
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="brand-subtle" size="pill">
                <Heart className="w-3 h-3" /> Made for builders
              </Badge>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DesignSystem;
