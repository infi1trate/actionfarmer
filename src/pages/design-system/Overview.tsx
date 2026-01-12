import { Link } from "react-router-dom";
import {
  Sparkles,
  Layers,
  Type,
  Component,
  LayoutTemplate,
  Accessibility,
  ArrowRight,
  Zap,
  Eye,
  Users,
  Palette,
} from "lucide-react";
import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DosDonts, UsageRule } from "@/components/design-system/DosDonts";

const sections = [
  {
    title: "Brand",
    description: "Voice, pillars, and personality guidelines",
    href: "/design-system/brand",
    icon: Sparkles,
    color: "bg-brand-yellow-soft text-brand-yellow",
  },
  {
    title: "Tokens",
    description: "Colors, typography, spacing, radius, shadows",
    href: "/design-system/tokens",
    icon: Layers,
    color: "bg-info-soft text-info",
  },
  {
    title: "Typography",
    description: "Font families, scales, and text styles",
    href: "/design-system/typography",
    icon: Type,
    color: "bg-success-soft text-success",
  },
  {
    title: "Components",
    description: "Interactive UI building blocks",
    href: "/design-system/components",
    icon: Component,
    color: "bg-warning-soft text-warning",
  },
  {
    title: "Patterns",
    description: "Empty states, loading, error handling",
    href: "/design-system/patterns",
    icon: LayoutTemplate,
    color: "bg-info-soft text-info",
  },
  {
    title: "Accessibility",
    description: "Focus, contrast, keyboard, motion",
    href: "/design-system/accessibility",
    icon: Accessibility,
    color: "bg-success-soft text-success",
  },
];

export default function Overview() {
  return (
    <DesignSystemLayout
      title="Design System Overview"
      description="A modern, friendly design system for consumer-facing DePIN apps. Duolingo meets Robinhood meets Snapchat."
    >
      <div className="space-y-16">
        {/* Quick Links */}
        <section>
          <h2 className="font-display text-xl font-bold mb-4">Quick Navigation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <Link key={section.href} to={section.href}>
                <Card variant="interactive" className="h-full">
                  <CardContent className="pt-6">
                    <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center mb-3`}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Brand Pillars */}
        <section className="space-y-6">
          <div>
            <Badge variant="brand" className="mb-2">Brand Foundation</Badge>
            <h2 className="font-display text-2xl font-bold">Three Pillars</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand-yellow-soft flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-brand-yellow" />
                </div>
                <CardTitle className="text-lg">Friendly Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Inviting to play + earn. Every interaction builds toward something rewarding.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-info-soft flex items-center justify-center mb-2">
                  <Eye className="h-6 w-6 text-info" />
                </div>
                <CardTitle className="text-lg">Crisp Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fintech-grade layout discipline. Information is organized and never overwhelming.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-success-soft flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-lg">Social Immediacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time feedback and snappy reactions. Progress feels tangible.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Color Preview */}
        <section className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">Color Palette</Badge>
            <h2 className="font-display text-2xl font-bold">Yellow-Led. Zero Purple.</h2>
            <p className="text-muted-foreground mt-1">
              Energetic yellow as the hero, supported by mint success and amber warning.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-yellow shadow-md" />
              <p className="text-xs text-muted-foreground">Brand</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-success shadow-md" />
              <p className="text-xs text-muted-foreground">Success</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-warning shadow-md" />
              <p className="text-xs text-muted-foreground">Warning</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-danger shadow-md" />
              <p className="text-xs text-muted-foreground">Danger</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-info shadow-md" />
              <p className="text-xs text-muted-foreground">Info</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 rounded-2xl bg-foreground shadow-md" />
              <p className="text-xs text-muted-foreground">Text</p>
            </div>
          </div>
        </section>

        {/* Typography Preview */}
        <section className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">Typography</Badge>
            <h2 className="font-display text-2xl font-bold">Display + Body Pairing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-2 font-mono">font-display</p>
                <p className="font-display text-4xl font-bold">Barlow Condensed</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Bold, condensed headlines that command attention.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-2 font-mono">font-body</p>
                <p className="font-body text-2xl">Inter / Source Sans</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Clean, readable body text for long-form content.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">Guidelines</Badge>
            <h2 className="font-display text-2xl font-bold">Design Principles</h2>
          </div>

          <DosDonts
            dos={[
              "Use yellow as the primary call-to-action color",
              "Keep layouts clean with generous whitespace",
              "Use semantic color tokens for theming",
              "Provide feedback for every user action",
              "Test with keyboard and screen readers",
            ]}
            donts={[
              "Use purple, magenta, or oversaturated colors",
              "Create cluttered or overwhelming layouts",
              "Hardcode hex colors in components",
              "Leave users guessing about loading states",
              "Rely on color alone to convey meaning",
            ]}
          />
        </section>

        {/* Usage Rules */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold">Quick Rules</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <UsageRule
              title="One Primary Action per Screen"
              description="Use brand yellow for the single most important action. Secondary actions use outline or ghost variants."
              variant="info"
            />
            <UsageRule
              title="8px Grid System"
              description="All spacing uses multiples of 8px. Common values: 8, 16, 24, 32, 48, 64, 96."
              variant="info"
            />
            <UsageRule
              title="Accessible by Default"
              description="All colors meet WCAG AA contrast. Focus rings are always visible. Animations respect reduced motion."
              variant="success"
            />
            <UsageRule
              title="Dark Mode Ready"
              description="Use semantic tokens (--bg, --surface, --text) instead of hardcoded colors for automatic theme support."
              variant="warning"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-muted-foreground mb-4">Ready to start building?</p>
          <Button variant="brand" size="lg" asChild>
            <Link to="/design-system/components">
              Explore Components <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
