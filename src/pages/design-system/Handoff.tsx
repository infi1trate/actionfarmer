import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Layout, 
  Palette, 
  Component, 
  Target, 
  TrendingUp, 
  Wallet,
  CheckCircle2,
  ArrowRight,
  Layers,
  FileCode,
  Sparkles
} from "lucide-react";

function BuildStep({ 
  step, 
  title, 
  description, 
  items 
}: { 
  step: number; 
  title: string; 
  description: string; 
  items: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <div className="flex-1 pb-6">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <ArrowRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ComponentRecommendation({
  flow,
  icon: Icon,
  components,
  description
}: {
  flow: string;
  icon: React.ElementType;
  components: string[];
  description: string;
}) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">{flow}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5">
          {components.map((comp, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-mono">
              {comp}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Handoff() {
  return (
    <DesignSystemLayout
      title="Product Pack Handoff"
      description="Complete guide for building new screens using the design system."
    >
      <div className="space-y-8">
        {/* Version Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">v1.0</Badge>
          <Badge variant="outline" className="text-xs text-green-600 border-green-600/30 bg-green-500/10">
            Stable
          </Badge>
        </div>

        {/* System Status */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">System Status: Ready</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The design system is stable and extensible. All tokens, components, and patterns 
                  have been tested and documented.
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Semantic tokens defined
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Core components built
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Shell templates ready
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Guardrails documented
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Dark/light themes
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Build New Screens */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">How to Build New Screens</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-0">
                <BuildStep
                  step={1}
                  title="Choose the Right Shell"
                  description="Every screen starts with a shell template that provides consistent structure."
                  items={[
                    "AuthShell — Sign in, sign up, password reset flows",
                    "MainAppShell — Primary app screens with navigation",
                    "DetailShell — Item detail views with back nav and actions",
                    "SettingsShell — List-based configuration screens"
                  ]}
                />
                
                <BuildStep
                  step={2}
                  title="Use Semantic Tokens Only"
                  description="Never hard-code colors. Always reference tokens from the design system."
                  items={[
                    "Colors: bg-background, text-foreground, bg-primary, etc.",
                    "Spacing: Use Tailwind spacing scale (p-4, gap-3, etc.)",
                    "Radius: Use --radius token via rounded-lg, rounded-xl",
                    "Shadows: shadow-sm, shadow-md only (shadow-lg for modals)"
                  ]}
                />
                
                <BuildStep
                  step={3}
                  title="Compose with Existing Components"
                  description="Build screens by combining pre-built components. Don't reinvent."
                  items={[
                    "Layout: Card, Separator, Tabs, Accordion",
                    "Data Display: StatCard, KpiBlock, StatusPill, Badge",
                    "Feedback: EmptyState, ErrorState, SuccessState, LoadingSkeleton",
                    "Inputs: Button, Input, Select, Switch, Checkbox"
                  ]}
                />
                
                <BuildStep
                  step={4}
                  title="Apply UX Patterns"
                  description="Use established patterns for consistent user experience."
                  items={[
                    "Loading states with appropriate skeletons",
                    "Empty states with friendly copy and clear CTAs",
                    "Error states with retry options",
                    "Form validation with inline feedback"
                  ]}
                />
                
                <BuildStep
                  step={5}
                  title="Validate Against Guardrails"
                  description="Before shipping, run through the checklist on the Guardrails page."
                  items={[
                    "All colors from tokens (no hex/rgb values)",
                    "Yellow only for primary actions/progress",
                    "Typography follows hierarchy rules",
                    "Shadows ≤ shadow-md (except modals)"
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Recommendations by Flow */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Components by Core Flow</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Recommended component combinations for common product flows.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ComponentRecommendation
              flow="Missions & Tasks"
              icon={Target}
              description="Daily challenges, achievements, gamification"
              components={[
                "MissionCard",
                "MissionCardCompact",
                "ProgressRing",
                "XpTag",
                "StreakIndicator",
                "RewardToast",
                "Badge"
              ]}
            />
            
            <ComponentRecommendation
              flow="Progress & Stats"
              icon={TrendingUp}
              description="Metrics, charts, performance tracking"
              components={[
                "StatCard",
                "KpiBlock",
                "Sparkline",
                "SimpleLineChart",
                "MiniBar",
                "ProgressRing",
                "XpCountUp"
              ]}
            />
            
            <ComponentRecommendation
              flow="Payouts & Rewards"
              icon={Wallet}
              description="Earnings, withdrawals, transactions"
              components={[
                "StatCard",
                "ListRow",
                "StatusPill",
                "Badge",
                "SuccessState",
                "ConfirmDialog",
                "AlertBanner"
              ]}
            />

            <ComponentRecommendation
              flow="Device Management"
              icon={Component}
              description="Device lists, status, configuration"
              components={[
                "ListRow",
                "StatusPill",
                "DetailShell",
                "SettingsShell",
                "Switch",
                "EmptyState",
                "ErrorState"
              ]}
            />

            <ComponentRecommendation
              flow="Onboarding"
              icon={Sparkles}
              description="Sign up, tutorials, first-run experience"
              components={[
                "AuthShell",
                "Progress",
                "Button",
                "ValidatedInput",
                "SuccessState",
                "Stepper (custom)"
              ]}
            />

            <ComponentRecommendation
              flow="Settings & Profile"
              icon={Layout}
              description="User preferences, account management"
              components={[
                "SettingsShell",
                "SettingsGroup",
                "SettingsToggleRow",
                "SettingsLinkRow",
                "ConfirmDialog",
                "Avatar"
              ]}
            />
          </div>
        </section>

        <Separator />

        {/* Reserved Section */}
        <section>
          <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Reserved</Badge>
              </div>
              <CardTitle className="text-xl">Reserved for DePIN App Product Prompts</CardTitle>
              <CardDescription>
                This section is reserved for future product prompts that will define the full app UX.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  The design system foundation is complete. Future prompts should:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Define specific screen flows and user journeys
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Specify data models and API integrations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Detail gamification mechanics and reward systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Outline device connectivity and management flows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Define payout and withdrawal experiences
                  </li>
                </ul>
                
                <div className="pt-4 border-t border-border/50 mt-4">
                  <p className="font-medium text-foreground mb-2">When adding new features:</p>
                  <ol className="space-y-1 ml-4 list-decimal list-inside">
                    <li>Reference this handoff document</li>
                    <li>Use shells and components from this system</li>
                    <li>Follow the guardrails checklist</li>
                    <li>Add new tokens if needed (with documentation)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Extensibility Note */}
        <section>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Extensibility</h3>
                  <p className="text-sm text-muted-foreground">
                    This system is designed to grow. New components can be added following the 
                    established patterns. New tokens should be added to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">index.css</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">tailwind.config.ts</code>, 
                    then documented in the Tokens page. All additions must pass the guardrails checklist.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DesignSystemLayout>
  );
}
