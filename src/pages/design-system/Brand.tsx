import { Link } from "react-router-dom";
import {
  Zap,
  Eye,
  Users,
  MessageCircle,
  Palette,
  Move,
  Check,
  X,
} from "lucide-react";
import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { DosDonts, UsageRule, PreviewCard, TokenLabel } from "@/components/design-system/DosDonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DSBrand() {
  return (
    <DesignSystemLayout
      title="Brand"
      description="Voice, personality, and visual pillars that define the DePIN experience."
    >
      <div className="space-y-16">
        {/* Brand Pillars */}
        <section className="space-y-8">
          <div>
            <Badge variant="brand" className="mb-2">Foundation</Badge>
            <h2 className="font-display text-2xl font-bold">Brand Pillars</h2>
            <p className="text-muted-foreground mt-1">
              Three core principles that guide every design decision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="interactive">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand-yellow-soft flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-brand-yellow" />
                </div>
                <CardTitle className="text-lg">Friendly Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Inviting to play + earn. Every interaction builds toward something rewarding. 
                  Progress feels tangible and achievements feel earned.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Celebrate milestones</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Show progress visually</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Reward consistency</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-info-soft flex items-center justify-center mb-2">
                  <Eye className="h-6 w-6 text-info" />
                </div>
                <CardTitle className="text-lg">Crisp Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fintech-grade layout discipline. Information is organized, scannable, 
                  and never overwhelming. Complex data feels simple.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Clear visual hierarchy</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Generous whitespace</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Scannable content</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-success-soft flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-lg">Social Immediacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time feedback and snappy reactions. Feels current, alive, 
                  and connected to a larger community.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Instant feedback</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Live indicators</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span>Community presence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Voice</Badge>
            <h2 className="font-display text-2xl font-bold">Tone of Voice</h2>
            <p className="text-muted-foreground mt-1">
              How we communicate with users across all touchpoints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-brand-yellow" />
                  Conversational
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Write like you're talking to a friend. Avoid jargon and technical language 
                  unless absolutely necessary.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-success-soft border border-success/20">
                    <p className="text-xs text-success font-medium mb-1">✓ Do</p>
                    <p className="text-sm">"Your device just earned $2.50!"</p>
                  </div>
                  <div className="p-3 rounded-lg bg-danger-soft border border-danger/20">
                    <p className="text-xs text-danger font-medium mb-1">✗ Don't</p>
                    <p className="text-sm">"Transaction TX-8423 confirmed on block 15892."</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-yellow" />
                  Encouraging
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Celebrate wins, no matter how small. Help users feel like they're making progress.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-success-soft border border-success/20">
                    <p className="text-xs text-success font-medium mb-1">✓ Do</p>
                    <p className="text-sm">"Amazing! 7-day streak! Keep it going 🔥"</p>
                  </div>
                  <div className="p-3 rounded-lg bg-danger-soft border border-danger/20">
                    <p className="text-xs text-danger font-medium mb-1">✗ Don't</p>
                    <p className="text-sm">"Device online for 168 hours."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <UsageRule
            title="Lead with benefit"
            description="Always frame messages around what the user gains. 'Earn more by...' beats 'Configure your settings to...'"
            variant="info"
          />
        </section>

        {/* Visual Identity */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Visual</Badge>
            <h2 className="font-display text-2xl font-bold">Visual Identity</h2>
            <p className="text-muted-foreground mt-1">
              The look and feel that makes DePIN apps instantly recognizable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PreviewCard
              title="Yellow Hero"
              description="Primary brand color"
              tokens={["brand-yellow"]}
            >
              <div className="flex items-center justify-center py-8">
                <div className="w-24 h-24 rounded-2xl bg-brand-yellow shadow-lg" />
              </div>
            </PreviewCard>

            <PreviewCard
              title="Rounded Corners"
              description="Friendly, approachable shapes"
              tokens={["radius-lg", "radius-xl"]}
            >
              <div className="flex items-center justify-center gap-4 py-8">
                <div className="w-16 h-16 rounded-lg bg-muted border-2 border-dashed border-border" />
                <div className="w-16 h-16 rounded-xl bg-muted border-2 border-dashed border-border" />
                <div className="w-16 h-16 rounded-2xl bg-muted border-2 border-dashed border-border" />
              </div>
            </PreviewCard>

            <PreviewCard
              title="Generous Space"
              description="Breathing room for content"
              tokens={["spacing-4", "spacing-6", "spacing-8"]}
            >
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded bg-muted" />
                  <div className="w-8 h-8 rounded bg-muted" />
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-muted" />
                  <div className="w-8 h-8 rounded bg-muted" />
                </div>
                <div className="flex gap-6">
                  <div className="w-8 h-8 rounded bg-muted" />
                  <div className="w-8 h-8 rounded bg-muted" />
                </div>
              </div>
            </PreviewCard>
          </div>
        </section>

        {/* Personality Spectrum */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Personality</Badge>
            <h2 className="font-display text-2xl font-bold">Personality Spectrum</h2>
            <p className="text-muted-foreground mt-1">
              Where we sit on various personality dimensions.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { left: "Serious", right: "Playful", position: 70 },
              { left: "Technical", right: "Friendly", position: 75 },
              { left: "Corporate", right: "Consumer", position: 80 },
              { left: "Minimal", right: "Expressive", position: 60 },
              { left: "Static", right: "Animated", position: 65 },
            ].map((spectrum) => (
              <div key={spectrum.left} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{spectrum.left}</span>
                  <span className="text-muted-foreground">{spectrum.right}</span>
                </div>
                <div className="h-2 bg-muted rounded-full relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-yellow border-2 border-white shadow"
                    style={{ left: `${spectrum.position}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold">Brand Guidelines</h2>
          <DosDonts
            dos={[
              "Use energetic yellow as the primary action color",
              "Write in a conversational, encouraging tone",
              "Celebrate user achievements and progress",
              "Use rounded corners for a friendly feel",
              "Provide immediate feedback for all actions",
            ]}
            donts={[
              "Use purple, magenta, or crypto-bro aesthetics",
              "Write technical jargon or blockchain terminology",
              "Make users feel like they're failing",
              "Use sharp corners or harsh geometric shapes",
              "Leave users waiting without feedback",
            ]}
          />
        </section>
      </div>
    </DesignSystemLayout>
  );
}
