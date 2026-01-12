import { DesignSystemLayout } from "@/components/design-system/DesignSystemLayout";
import { DosDonts, UsageRule, PreviewCard, TokenLabel } from "@/components/design-system/DosDonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DSTypography() {
  return (
    <DesignSystemLayout
      title="Typography"
      description="Font families, type scales, and text styling guidelines for consistent, readable content."
    >
      <div className="space-y-16">
        {/* Font Families */}
        <section className="space-y-8">
          <div>
            <Badge variant="brand" className="mb-2">Fonts</Badge>
            <h2 className="font-display text-2xl font-bold">Font Families</h2>
            <p className="text-muted-foreground mt-1">
              A display + body pairing for maximum impact and readability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              title="Display Font"
              description="Headlines, titles, and large text"
              tokens={["font-display"]}
            >
              <div className="py-6">
                <p className="font-display text-5xl font-bold mb-2">Barlow Condensed</p>
                <p className="font-display text-2xl text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p className="font-display text-xl text-muted-foreground">
                  abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>
            </PreviewCard>

            <PreviewCard
              title="Body Font"
              description="Paragraphs, labels, and UI text"
              tokens={["font-body"]}
            >
              <div className="py-6">
                <p className="font-body text-3xl font-semibold mb-2">Inter</p>
                <p className="font-body text-lg text-muted-foreground">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p className="font-body text-lg text-muted-foreground">
                  abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>
            </PreviewCard>
          </div>

          <UsageRule
            title="Display for headlines, Body for everything else"
            description="Use Barlow Condensed for h1-h3, hero text, and feature callouts. Use Inter for body copy, labels, buttons, and UI elements."
            variant="info"
          />
        </section>

        {/* Type Scale */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Scale</Badge>
            <h2 className="font-display text-2xl font-bold">Type Scale</h2>
            <p className="text-muted-foreground mt-1">
              A harmonious scale from display headings to captions.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              {[
                { name: "Display", class: "text-display", size: "4rem / 64px", token: "text-display" },
                { name: "Heading 1", class: "text-h1", size: "2.5rem / 40px", token: "text-h1" },
                { name: "Heading 2", class: "text-h2", size: "2rem / 32px", token: "text-h2" },
                { name: "Heading 3", class: "text-h3", size: "1.5rem / 24px", token: "text-h3" },
                { name: "Body Large", class: "text-body-lg", size: "1.125rem / 18px", token: "text-body-lg" },
                { name: "Body", class: "text-body", size: "1rem / 16px", token: "text-body" },
                { name: "Body Small", class: "text-body-sm", size: "0.875rem / 14px", token: "text-body-sm" },
                { name: "Label", class: "text-label", size: "0.875rem / 14px", token: "text-label" },
                { name: "Caption", class: "text-caption", size: "0.75rem / 12px", token: "text-caption" },
              ].map((type) => (
                <div key={type.name} className="flex items-baseline justify-between border-b border-border pb-4 last:border-0">
                  <div className="flex-1">
                    <p className={type.class}>{type.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{type.size}</span>
                    <TokenLabel token={type.token} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Font Weights */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Weights</Badge>
            <h2 className="font-display text-2xl font-bold">Font Weights</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Regular", weight: 400, class: "font-normal" },
              { name: "Medium", weight: 500, class: "font-medium" },
              { name: "Semibold", weight: 600, class: "font-semibold" },
              { name: "Bold", weight: 700, class: "font-bold" },
            ].map((w) => (
              <Card key={w.name}>
                <CardContent className="pt-6 text-center">
                  <p className={`text-4xl ${w.class}`}>Aa</p>
                  <p className="text-sm font-medium mt-2">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.weight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Line Heights */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Spacing</Badge>
            <h2 className="font-display text-2xl font-bold">Line Heights & Letter Spacing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Line Heights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Display (1.1)</p>
                  <p className="font-display text-2xl leading-[1.1]">
                    Tight line height for<br />impactful headlines
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Body (1.6)</p>
                  <p className="leading-[1.6]">
                    Comfortable reading line height for paragraphs and longer content. This makes text easy to scan and read.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Letter Spacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Display (-0.03em)</p>
                  <p className="font-display text-2xl tracking-[-0.03em]">
                    TIGHT TRACKING
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Body (0em)</p>
                  <p className="tracking-normal">
                    Normal tracking for body text
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Caption (0.02em)</p>
                  <p className="text-caption tracking-[0.02em]">
                    SLIGHTLY OPEN FOR SMALL CAPS
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Text Colors */}
        <section className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Color</Badge>
            <h2 className="font-display text-2xl font-bold">Text Colors</h2>
          </div>

          <div className="space-y-4">
            {[
              { name: "Primary", class: "text-foreground", token: "text", desc: "Main content, headings" },
              { name: "Secondary", class: "text-muted-foreground", token: "text-2", desc: "Supporting text, descriptions" },
              { name: "Muted", class: "text-muted-foreground opacity-70", token: "text-3", desc: "Captions, timestamps" },
              { name: "Brand", class: "text-brand-yellow", token: "brand-yellow", desc: "Links, highlights" },
              { name: "Success", class: "text-success", token: "success", desc: "Positive messages" },
              { name: "Danger", class: "text-danger", token: "danger", desc: "Errors, warnings" },
            ].map((color) => (
              <div key={color.name} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                <span className={`text-xl font-semibold w-32 ${color.class}`}>{color.name}</span>
                <span className="text-sm text-muted-foreground flex-1">{color.desc}</span>
                <TokenLabel token={color.token} />
              </div>
            ))}
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold">Typography Guidelines</h2>
          <DosDonts
            dos={[
              "Use display font for h1, h2, h3 and hero text",
              "Use body font for paragraphs, labels, and buttons",
              "Maintain consistent heading hierarchy (h1 → h2 → h3)",
              "Use text-muted-foreground for secondary content",
              "Apply proper line height for readability",
            ]}
            donts={[
              "Mix display font in body copy",
              "Skip heading levels (h1 → h3)",
              "Use more than 3 font weights on one page",
              "Set line-height below 1.4 for body text",
              "Use pure black text on white backgrounds",
            ]}
          />
        </section>
      </div>
    </DesignSystemLayout>
  );
}
