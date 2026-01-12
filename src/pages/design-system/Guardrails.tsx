import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { DosDonts, UsageRule } from "@/components/design-system/DosDonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Type, 
  Square, 
  Layers, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";

const Guardrails = () => {
  return (
    <DesignSystemLayout 
      title="System Guardrails" 
      description="Mandatory rules for maintaining design consistency. Every component and feature must follow these guidelines."
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section className="space-y-4">
          <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Why Guardrails Matter</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  These rules ensure visual consistency, maintainability, and accessibility across all features. 
                  Violating guardrails creates technical debt and degrades user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rule 1: Semantic Tokens Only */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">1. Semantic Tokens Only</h2>
              <p className="text-sm text-muted-foreground">No hard-coded colors in components</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                All colors must reference design tokens from <code className="text-xs bg-muted px-1 py-0.5 rounded">index.css</code> and <code className="text-xs bg-muted px-1 py-0.5 rounded">tailwind.config.ts</code>. 
                Never use raw hex, RGB, or HSL values directly in components.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Correct</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs space-y-1">
                    <p className="text-success">bg-background</p>
                    <p className="text-success">text-foreground</p>
                    <p className="text-success">text-muted-foreground</p>
                    <p className="text-success">bg-brand-yellow</p>
                    <p className="text-success">border-border</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-danger">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Incorrect</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs space-y-1">
                    <p className="text-danger">bg-white / bg-black</p>
                    <p className="text-danger">text-gray-500</p>
                    <p className="text-danger">text-[#333333]</p>
                    <p className="text-danger">bg-yellow-400</p>
                    <p className="text-danger">border-slate-200</p>
                  </div>
                </div>
              </div>

              <UsageRule 
                title="Token First" 
                description="If a color doesn't exist as a token, add it to index.css and tailwind.config.ts first."
              />
            </CardContent>
          </Card>
        </section>

        {/* Rule 2: Yellow Usage */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-yellow/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-brand-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">2. Yellow is Reserved</h2>
              <p className="text-sm text-muted-foreground">Primary actions, highlights, and progress only</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Brand yellow (<code className="text-xs bg-muted px-1 py-0.5 rounded">brand-yellow</code>) is our signature accent. 
                Overuse dilutes its impact. Use it sparingly and purposefully.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <DosDonts
                  dos={[
                    "Primary CTA buttons",
                    "Active navigation indicators",
                    "Progress bars and rings",
                    "Important highlights (focus rings)",
                    "XP and reward indicators"
                  ]}
                  donts={[
                    "Decorative backgrounds",
                    "Secondary buttons",
                    "Icons without emphasis",
                    "Large surface areas",
                    "Multiple yellow elements competing"
                  ]}
                />
              </div>

              <UsageRule 
                title="One Yellow Rule" 
                description="One yellow element per view hierarchy. If two yellow elements are visible, one should be removed or demoted."
                variant="warning"
              />
            </CardContent>
          </Card>
        </section>

        {/* Rule 3: Border Radius */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Square className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">3. Rounded, Not Bubbly</h2>
              <p className="text-sm text-muted-foreground">Use default radius token consistently</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Our aesthetic is refined and professional. Use the <code className="text-xs bg-muted px-1 py-0.5 rounded">--radius</code> token. 
                No arbitrary radius values or overly rounded "pill" shapes except for specific components.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-surface-raised border border-border rounded-sm" />
                  <p className="text-xs text-muted-foreground">rounded-sm</p>
                  <Badge variant="outline" className="text-xs">Icons</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-surface-raised border border-border rounded-md" />
                  <p className="text-xs text-muted-foreground">rounded-md</p>
                  <Badge variant="outline" className="text-xs">Buttons</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-surface-raised border border-border rounded-lg" />
                  <p className="text-xs text-muted-foreground">rounded-lg</p>
                  <Badge variant="outline" className="text-xs">Cards</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-surface-raised border border-border rounded-xl" />
                  <p className="text-xs text-muted-foreground">rounded-xl</p>
                  <Badge variant="outline" className="text-xs">Modals</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-surface-raised border border-border rounded-full" />
                  <p className="text-xs text-muted-foreground">rounded-full</p>
                  <Badge variant="outline" className="text-xs">Avatars only</Badge>
                </div>
              </div>

              <UsageRule 
                title="No Arbitrary Values" 
                description="Never use arbitrary radius like rounded-[20px]. Stick to the scale: sm, md, lg, xl, full."
              />
            </CardContent>
          </Card>
        </section>

        {/* Rule 4: Shadows */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Layers className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">4. Subtle Shadows</h2>
              <p className="text-sm text-muted-foreground">No shadows stronger than shadow-2 except modals</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Shadows should be subtle and purposeful. Heavy shadows feel dated and compete with content.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-surface rounded-lg shadow-1" />
                  <p className="text-xs text-muted-foreground">shadow-1</p>
                  <Badge className="text-xs bg-success/10 text-success border-0">Standard</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-surface rounded-lg shadow-2" />
                  <p className="text-xs text-muted-foreground">shadow-2</p>
                  <Badge className="text-xs bg-success/10 text-success border-0">Max for cards</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-surface rounded-lg shadow-3" />
                  <p className="text-xs text-muted-foreground">shadow-3</p>
                  <Badge className="text-xs bg-warning/10 text-warning border-0">Modals only</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-surface rounded-lg shadow-xl" />
                  <p className="text-xs text-muted-foreground">shadow-xl+</p>
                  <Badge className="text-xs bg-danger/10 text-danger border-0">Never use</Badge>
                </div>
              </div>

              <UsageRule 
                title="Shadow Hierarchy" 
                description="Use shadow-1 for subtle elevation. Shadow-2 for interactive hover states. Shadow-3+ only for overlays and modals."
              />
            </CardContent>
          </Card>
        </section>

        {/* Rule 5: Typography */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Type className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">5. Typography Rules</h2>
              <p className="text-sm text-muted-foreground">Condensed for headers, humanist sans for body</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Display / Headers</h4>
                  <p className="font-display text-2xl text-foreground">Bebas Neue</p>
                  <p className="text-sm text-muted-foreground">
                    Use <code className="text-xs bg-muted px-1 py-0.5 rounded">font-display</code> for headlines, 
                    hero text, and large titles only.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Body / UI</h4>
                  <p className="font-sans text-2xl text-foreground">Inter</p>
                  <p className="text-sm text-muted-foreground">
                    Use <code className="text-xs bg-muted px-1 py-0.5 rounded">font-sans</code> for all body text, 
                    buttons, labels, and UI elements.
                  </p>
                </div>
              </div>

              <Separator />

              <DosDonts
                dos={[
                  "Use font-display for page titles and section headers",
                  "Use font-sans for body text, buttons, and labels",
                  "Maintain consistent type scale (text-xs through text-4xl)",
                  "Use muted-foreground for secondary text"
                ]}
                donts={[
                  "Mix display font in body paragraphs",
                  "Use arbitrary font sizes like text-[17px]",
                  "Apply font-display to buttons or form labels",
                  "Use more than 3 font weights on a screen"
                ]}
              />
            </CardContent>
          </Card>
        </section>

        {/* Rule 6: New Colors */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">6. No Undocumented Colors</h2>
              <p className="text-sm text-muted-foreground">Every color needs a token and documentation</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Before introducing a new color, it must be added to the design system. This prevents color drift and ensures theme compatibility.
              </p>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-medium text-foreground text-sm">New Color Checklist:</h4>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Add CSS variable to <code className="text-xs bg-muted px-1 py-0.5 rounded">index.css</code> (both light and dark themes)</li>
                  <li>Add to <code className="text-xs bg-muted px-1 py-0.5 rounded">tailwind.config.ts</code> colors object</li>
                  <li>Document in Tokens page with semantic name and use case</li>
                  <li>Verify contrast ratios in both themes (WCAG AA minimum)</li>
                  <li>Get design approval before merging</li>
                </ol>
              </div>

              <UsageRule 
                title="Mandatory Documentation" 
                description="No color can be used in production without first being tokenized and documented."
                variant="warning"
              />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Feature Screen Checklist */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-display text-foreground">Feature Screen Checklist</h2>
            <p className="text-muted-foreground mt-1">
              Every new feature screen must pass this checklist before release.
            </p>
          </div>

          <Card className="border-2 border-dashed border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-yellow" />
                Pre-Release Guardrails Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Colors */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>All colors use semantic tokens (no hex, rgb, or Tailwind defaults)</ChecklistItem>
                  <ChecklistItem>Yellow used only for primary actions, highlights, or progress</ChecklistItem>
                  <ChecklistItem>No more than one yellow element competing for attention</ChecklistItem>
                  <ChecklistItem>Any new colors are tokenized and documented</ChecklistItem>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Typography
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>Display font (Bebas Neue) only on headers/titles</ChecklistItem>
                  <ChecklistItem>Body text uses Inter (font-sans)</ChecklistItem>
                  <ChecklistItem>Type scale follows tokens (text-xs through text-4xl)</ChecklistItem>
                  <ChecklistItem>No arbitrary font sizes</ChecklistItem>
                </div>
              </div>

              {/* Spacing & Layout */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  Spacing & Radius
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>Border radius uses scale (sm, md, lg, xl, full)</ChecklistItem>
                  <ChecklistItem>No arbitrary radius values</ChecklistItem>
                  <ChecklistItem>Spacing follows 4px grid (p-1, p-2, p-4, etc.)</ChecklistItem>
                  <ChecklistItem>Consistent gaps within component groups</ChecklistItem>
                </div>
              </div>

              {/* Elevation */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Elevation & Shadows
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>Shadows no stronger than shadow-2 (except modals)</ChecklistItem>
                  <ChecklistItem>Elevation hierarchy is clear and logical</ChecklistItem>
                  <ChecklistItem>No competing shadows on adjacent elements</ChecklistItem>
                </div>
              </div>

              {/* Accessibility */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Accessibility
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>Focus rings visible on all interactive elements</ChecklistItem>
                  <ChecklistItem>Color contrast meets WCAG AA (4.5:1 for text)</ChecklistItem>
                  <ChecklistItem>Keyboard navigation works for all interactions</ChecklistItem>
                  <ChecklistItem>Reduced motion respected for animations</ChecklistItem>
                </div>
              </div>

              {/* Components */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Components
                </h4>
                <div className="space-y-2 pl-6">
                  <ChecklistItem>Uses design system components (not custom implementations)</ChecklistItem>
                  <ChecklistItem>Loading states use LoadingSkeleton patterns</ChecklistItem>
                  <ChecklistItem>Error states use ErrorState templates</ChecklistItem>
                  <ChecklistItem>Empty states use EmptyState templates</ChecklistItem>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DesignSystemLayout>
  );
};

// Checklist item component
const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <Checkbox className="mt-0.5" />
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {children}
      </span>
    </label>
  );
};

export default Guardrails;
