import { ThemeToggle } from "@/components/design-system/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap, Eye, Users, MessageCircle, Palette, Move } from "lucide-react";

const Brand = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-display text-xl font-bold text-foreground">
              DePIN Brand
            </h1>
            <nav className="hidden md:flex items-center gap-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/design-system">Components</NavLink>
              <NavLink to="/brand">Brand</NavLink>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container py-12 space-y-16">
        {/* Hero */}
        <section className="max-w-3xl">
          <Badge variant="brand" className="mb-4">Brand Foundation</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Friendly. Crisp. Immediate.
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Our brand sits at the intersection of playful consumer apps and trustworthy fintech. 
            We're the friend who makes complex DePIN technology feel like a game you want to win.
          </p>
        </section>

        {/* Brand Pillars */}
        <section className="space-y-8">
          <h3 className="font-display text-2xl font-bold text-foreground">Brand Pillars</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-brand-primary" />
                </div>
                <CardTitle className="font-display text-xl">Friendly Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">
                  Inviting to play + earn. Every interaction builds toward something rewarding. 
                  Progress feels tangible and achievements feel earned.
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Eye className="w-6 h-6 text-brand-primary" />
                </div>
                <CardTitle className="font-display text-xl">Crisp Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">
                  Fintech-grade layout discipline. Information is organized, scannable, and never overwhelming. 
                  Complex data feels simple.
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-brand-primary" />
                </div>
                <CardTitle className="font-display text-xl">Social Immediacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground-secondary">
                  Snap-like energy. Real-time feedback, instant gratification, and shared moments. 
                  Every action gets a response.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-8">
          <h3 className="font-display text-2xl font-bold text-foreground">Visual Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Do's */}
            <Card variant="success" className="border-success/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success font-display">
                  <Check className="w-5 h-5" />
                  Do This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Bright accents on neutral structure</p>
                    <p className="text-sm text-foreground-secondary">Yellow highlights punch through clean grays and whites</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Soft-rounded geometry</p>
                    <p className="text-sm text-foreground-secondary">Friendly but not bubbly—think 12-16px radius, not pills everywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Clean spacing, strong hierarchy</p>
                    <p className="text-sm text-foreground-secondary">Generous whitespace, clear visual priority</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Micro-rewards everywhere</p>
                    <p className="text-sm text-foreground-secondary">Tiny bursts, count-ups, tactile presses, celebration moments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card variant="danger" className="border-danger/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-danger font-display">
                  <X className="w-5 h-5" />
                  Never Do This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-danger mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">No purple</p>
                    <p className="text-sm text-foreground-secondary">It's overused in crypto. We stand apart.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-danger mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">No crypto gradients / neon vaporwave</p>
                    <p className="text-sm text-foreground-secondary">We're consumer-friendly, not cyberpunk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-danger mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">No childish stickers/mascots</p>
                    <p className="text-sm text-foreground-secondary">Friendly ≠ infantile. We're approachable adults.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-danger mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">No glossy AI-style visuals</p>
                    <p className="text-sm text-foreground-secondary">No 3D blobs, no "AI slop" aesthetic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tone of Voice */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-brand-primary" />
            <h3 className="font-display text-2xl font-bold text-foreground">Tone of Voice</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <CardHeader>
                <Badge variant="brand-subtle" className="w-fit mb-2">Attribute</Badge>
                <CardTitle className="font-display">Short</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">Every word earns its place. No fluff, no filler.</p>
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs text-foreground-tertiary uppercase tracking-wide">Examples</p>
                  <p className="text-sm text-success">"You earned 12 points" ✓</p>
                  <p className="text-sm text-danger line-through">"Congratulations! You have successfully earned a total of 12 points" ✗</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <Badge variant="brand-subtle" className="w-fit mb-2">Attribute</Badge>
                <CardTitle className="font-display">Human</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">Talk like a smart friend, not a corporation or a robot.</p>
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs text-foreground-tertiary uppercase tracking-wide">Examples</p>
                  <p className="text-sm text-success">"Nice! You're on a 5-day streak" ✓</p>
                  <p className="text-sm text-danger line-through">"Your consecutive daily login count has reached 5" ✗</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <Badge variant="brand-subtle" className="w-fit mb-2">Attribute</Badge>
                <CardTitle className="font-display">Confident</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">Direct statements. No hedging, no apologizing.</p>
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs text-foreground-tertiary uppercase tracking-wide">Examples</p>
                  <p className="text-sm text-success">"Connect your device" ✓</p>
                  <p className="text-sm text-danger line-through">"Please consider connecting your device if you'd like" ✗</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* More voice examples */}
          <Card className="bg-surface">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground">We say:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> "Let's go"</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> "You're in"</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> "Keep it up"</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> "Almost there"</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> "Boom—done"</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-foreground">We don't say:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-danger" /> "Please wait while we process..."</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-danger" /> "We apologize for any inconvenience"</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-danger" /> "In order to proceed, you must..."</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-danger" /> "Oopsie! Something went wrong"</li>
                    <li className="flex items-center gap-2"><X className="w-4 h-4 text-danger" /> "WAGMI 🚀🌙"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icon Style */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-brand-primary" />
            <h3 className="font-display text-2xl font-bold text-foreground">Icon Style</h3>
          </div>
          <Card className="bg-surface">
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-foreground">Rounded</h4>
                  <p className="text-sm text-foreground-secondary">
                    Soft corners on all icons. Use rounded line caps and joins. 
                    Matches our soft-rounded geometry.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-foreground">Consistent Stroke</h4>
                  <p className="text-sm text-foreground-secondary">
                    1.5px or 2px stroke weight throughout. Never mix weights. 
                    Outlined style, not filled.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-foreground">Minimal</h4>
                  <p className="text-sm text-foreground-secondary">
                    Reduce to essential forms. No decorative flourishes. 
                    Every stroke serves meaning.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground-tertiary mb-4">Icon library: Lucide (lucide-react)</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border">
                    <Zap className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border">
                    <Eye className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border">
                    <Check className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-primary-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Motion Principles */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Move className="w-6 h-6 text-brand-primary" />
            <h3 className="font-display text-2xl font-bold text-foreground">Motion Principles</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="interactive" className="group">
              <CardHeader>
                <Badge variant="success-subtle" className="w-fit mb-2">Principle</Badge>
                <CardTitle className="font-display text-xl">Fast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">
                  150-300ms for most transitions. Snappy, not sluggish. 
                  Users should never wait for animation to complete.
                </p>
                <div className="pt-3 border-t border-border text-xs text-foreground-tertiary space-y-1">
                  <p>• Micro-interactions: 100-150ms</p>
                  <p>• Page transitions: 200-300ms</p>
                  <p>• Modals/sheets: 250-350ms</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <Badge variant="success-subtle" className="w-fit mb-2">Principle</Badge>
                <CardTitle className="font-display text-xl">Rewarding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">
                  Motion celebrates wins. Count-up animations for points, 
                  subtle bounces on achievements, satisfying button presses.
                </p>
                <div className="pt-3 border-t border-border text-xs text-foreground-tertiary space-y-1">
                  <p>• Number count-ups on earnings</p>
                  <p>• Subtle scale on tap (0.97 → 1)</p>
                  <p>• Confetti-style bursts sparingly</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive" className="group">
              <CardHeader>
                <Badge variant="success-subtle" className="w-fit mb-2">Principle</Badge>
                <CardTitle className="font-display text-xl">Purposeful</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground-secondary text-sm">
                  Every animation communicates something. No motion for motion's sake. 
                  Guide attention, confirm actions, show progress.
                </p>
                <div className="pt-3 border-t border-border text-xs text-foreground-tertiary space-y-1">
                  <p>• Loading states show progress</p>
                  <p>• Errors shake subtly (not aggressively)</p>
                  <p>• Success states feel conclusive</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Easing */}
          <Card className="bg-surface">
            <CardContent className="pt-6">
              <h4 className="font-display font-semibold text-foreground mb-4">Easing Curves</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <code className="text-xs bg-background px-2 py-1 rounded border border-border">ease-out</code>
                  <p className="text-foreground-secondary">Default for entrances. Quick start, gentle landing.</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-background px-2 py-1 rounded border border-border">ease-in-out</code>
                  <p className="text-foreground-secondary">For continuous motion like progress bars.</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-background px-2 py-1 rounded border border-border">spring(1, 80, 10)</code>
                  <p className="text-foreground-secondary">For playful bounces on achievements (Framer Motion).</p>
                </div>
                <div className="space-y-2">
                  <code className="text-xs bg-background px-2 py-1 rounded border border-border">linear</code>
                  <p className="text-foreground-secondary">Only for looping/continuous animations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reduced motion */}
          <Card variant="outlined" className="border-warning/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Badge variant="warning-subtle">Accessibility</Badge>
                <div className="space-y-2">
                  <h4 className="font-display font-semibold text-foreground">Respect prefers-reduced-motion</h4>
                  <p className="text-sm text-foreground-secondary">
                    All decorative animations must be disabled when users prefer reduced motion. 
                    Essential animations (like loading indicators) can remain but should be simplified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Reference */}
        <section className="space-y-6">
          <h3 className="font-display text-2xl font-bold text-foreground">Quick Reference</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-brand-primary text-brand-primary-foreground text-center">
              <p className="font-display font-bold">Primary Yellow</p>
              <p className="text-sm opacity-80">48 96% 53%</p>
            </div>
            <div className="p-4 rounded-xl bg-foreground text-background text-center">
              <p className="font-display font-bold">Text Dark</p>
              <p className="text-sm opacity-80">Strong hierarchy</p>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border text-center">
              <p className="font-display font-bold text-foreground">Surfaces</p>
              <p className="text-sm text-foreground-secondary">Clean, minimal</p>
            </div>
            <div className="p-4 rounded-xl bg-success text-success-foreground text-center">
              <p className="font-display font-bold">Success Green</p>
              <p className="text-sm opacity-80">Rewards & wins</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Brand;
