import { ThemeToggle } from "@/components/design-system/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import { Check, X } from "lucide-react";

const Typography = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center">
              <span className="font-display font-bold text-brand-yellow-foreground text-sm">Aa</span>
            </div>
            <span className="font-display font-bold text-h3 text-text">Typography</span>
          </div>
          <div className="flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/design-system">Components</NavLink>
            <NavLink to="/tokens">Tokens</NavLink>
            <NavLink to="/brand">Brand</NavLink>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-display text-text mb-4">Typography System</h1>
          <p className="text-body-lg text-text-2 max-w-2xl">
            A carefully crafted type system that balances readability with personality. 
            Condensed headers for impact, humanist body text for comfort.
          </p>
        </header>

        {/* Font Families */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Font Families</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Display Font */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-2 uppercase tracking-wider">Display / Headers</div>
              <div className="font-display text-4xl font-bold text-text mb-4">Barlow Condensed</div>
              <p className="text-body-sm text-text-2">
                Condensed sans-serif for headers. Creates strong visual hierarchy with tight, impactful headlines.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <code className="text-mono bg-surface-2 px-2 py-1 rounded text-xs">--font-display</code>
              </div>
            </div>

            {/* Body Font */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-2 uppercase tracking-wider">Body Text</div>
              <div className="font-body text-4xl font-bold text-text mb-4">Inter</div>
              <p className="text-body-sm text-text-2">
                Friendly humanist sans-serif optimized for screen readability. Comfortable for extended reading.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <code className="text-mono bg-surface-2 px-2 py-1 rounded text-xs">--font-body</code>
              </div>
            </div>

            {/* Mono Font */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-2 uppercase tracking-wider">Monospace</div>
              <div className="font-mono text-3xl font-bold text-text mb-4">SF Mono</div>
              <p className="text-body-sm text-text-2">
                System monospace for code, IDs, hashes, and technical data. Clear character distinction.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <code className="text-mono bg-surface-2 px-2 py-1 rounded text-xs">--font-mono</code>
              </div>
            </div>
          </div>
        </section>

        {/* Type Scale */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Type Scale</h2>
          
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            {/* Display */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-display text-text">Display</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>64px</span>
                  <span>1.1 line-height</span>
                  <span>-0.03em</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-display / --text-display</code>
            </div>

            {/* H1 */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-h1 text-text">Heading 1</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>40px</span>
                  <span>1.2 line-height</span>
                  <span>-0.02em</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-h1 / --text-h1</code>
            </div>

            {/* H2 */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-h2 text-text">Heading 2</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>32px</span>
                  <span>1.25 line-height</span>
                  <span>-0.015em</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-h2 / --text-h2</code>
            </div>

            {/* H3 */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-h3 text-text">Heading 3</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>24px</span>
                  <span>1.3 line-height</span>
                  <span>-0.01em</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-h3 / --text-h3</code>
            </div>

            {/* Body Large */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-body-lg text-text">Body Large - Great for introductions and lead paragraphs</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>18px</span>
                  <span>1.6 line-height</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-body-lg / --text-body-lg</code>
            </div>

            {/* Body */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-body text-text">Body - Default text for general content and paragraphs</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>16px</span>
                  <span>1.6 line-height</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-body / --text-body</code>
            </div>

            {/* Body Small */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-body-sm text-text">Body Small - Secondary content and supporting text</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>14px</span>
                  <span>1.5 line-height</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-body-sm / --text-body-sm</code>
            </div>

            {/* Label */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-label text-text">Label - Form labels and UI controls</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>14px</span>
                  <span>medium weight</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-label / --text-label</code>
            </div>

            {/* Caption */}
            <div className="p-6 border-b border-border hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-caption text-text">Caption - Metadata, timestamps, and fine print</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>12px</span>
                  <span>0.02em spacing</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-caption / --text-caption</code>
            </div>

            {/* Mono */}
            <div className="p-6 hover:bg-surface-2 transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-mono text-text">0x7F3a...9dE2 — Mono for IDs and hashes</span>
                <div className="flex gap-4 text-caption text-text-3">
                  <span>13px</span>
                  <span>monospace</span>
                </div>
              </div>
              <code className="text-mono text-xs text-text-3">.text-mono / --text-mono</code>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Font Weights</h2>
          
          <div className="grid gap-4 md:grid-cols-4">
            <div className="bg-surface rounded-xl border border-border p-6 text-center">
              <div className="font-body text-2xl font-normal text-text mb-2">Regular</div>
              <code className="text-mono text-xs text-text-3">400</code>
            </div>
            <div className="bg-surface rounded-xl border border-border p-6 text-center">
              <div className="font-body text-2xl font-medium text-text mb-2">Medium</div>
              <code className="text-mono text-xs text-text-3">500</code>
            </div>
            <div className="bg-surface rounded-xl border border-border p-6 text-center">
              <div className="font-body text-2xl font-semibold text-text mb-2">Semibold</div>
              <code className="text-mono text-xs text-text-3">600</code>
            </div>
            <div className="bg-surface rounded-xl border border-border p-6 text-center">
              <div className="font-body text-2xl font-bold text-text mb-2">Bold</div>
              <code className="text-mono text-xs text-text-3">700</code>
            </div>
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Text Colors</h2>
          
          <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <span className="text-body text-text">Primary Text</span>
                <p className="text-caption text-text-3">Headlines, titles, important content</p>
              </div>
              <code className="text-mono text-xs bg-surface-2 px-2 py-1 rounded">text-text / --text</code>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <span className="text-body text-text-2">Secondary Text</span>
                <p className="text-caption text-text-3">Body copy, descriptions</p>
              </div>
              <code className="text-mono text-xs bg-surface-2 px-2 py-1 rounded">text-text-2 / --text-2</code>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-body text-text-3">Muted Text</span>
                <p className="text-caption text-text-3">Captions, metadata, placeholders</p>
              </div>
              <code className="text-mono text-xs bg-surface-2 px-2 py-1 rounded">text-text-3 / --text-3</code>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Usage Guidelines</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Do's */}
            <div className="bg-success-soft rounded-xl border border-success/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                  <Check className="w-4 h-4 text-success-foreground" />
                </div>
                <span className="text-label text-success-text">Do</span>
              </div>
              <ul className="space-y-3 text-body-sm text-text-2">
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Use condensed font for headers to create visual impact</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Keep body text at 16px or above for readability</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Use semantic text colors (text, text-2, text-3) consistently</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Apply tight letter-spacing to headers (-0.01em to -0.03em)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Use generous line-height (1.5-1.6) for body text</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Reserve mono for IDs, hashes, and code snippets</span>
                </li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-danger-soft rounded-xl border border-danger/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-danger flex items-center justify-center">
                  <X className="w-4 h-4 text-danger-foreground" />
                </div>
                <span className="text-label text-danger-text">Don't</span>
              </div>
              <ul className="space-y-3 text-body-sm text-text-2">
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't use condensed font for long-form body text</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't use caption size for primary content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't mix too many weights in a single view</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't use pure black (#000) or pure white (#fff)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't apply positive letter-spacing to headers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't center long paragraphs of text</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Real World Examples</h2>
          
          <div className="space-y-6">
            {/* Card Example */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-4 uppercase tracking-wider">Card Component</div>
              <div className="bg-surface-2 rounded-lg p-6">
                <h3 className="text-h3 text-text mb-2">Earn Rewards Daily</h3>
                <p className="text-body text-text-2 mb-4">
                  Connect your device and start earning tokens. The more you contribute, the more you earn.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-label text-brand-yellow">+125 tokens today</span>
                  <span className="text-caption text-text-3">Updated 2 min ago</span>
                </div>
              </div>
            </div>

            {/* Stats Example */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-4 uppercase tracking-wider">Stats Display</div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-display text-text mb-1">2.4M</div>
                  <div className="text-label text-text-2">Active Devices</div>
                </div>
                <div className="text-center">
                  <div className="text-display text-brand-yellow mb-1">$48K</div>
                  <div className="text-label text-text-2">Rewards Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-display text-text mb-1">99.9%</div>
                  <div className="text-label text-text-2">Uptime</div>
                </div>
              </div>
            </div>

            {/* Technical Data */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="text-caption text-text-3 mb-4 uppercase tracking-wider">Technical Data</div>
              <div className="bg-surface-2 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-label text-text-2">Transaction ID</span>
                  <span className="text-mono text-text">0x7F3a8B2c...9dE2f4A1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-label text-text-2">Block Height</span>
                  <span className="text-mono text-text">18,234,567</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-label text-text-2">Timestamp</span>
                  <span className="text-caption text-text-3">Jan 12, 2026 at 3:24 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token Reference */}
        <section>
          <h2 className="text-h2 text-text mb-6">CSS Variables Reference</h2>
          
          <div className="bg-surface-2 rounded-xl p-6 overflow-x-auto">
            <pre className="text-mono text-sm text-text-2">
{`/* Font Families */
--font-display: 'Barlow Condensed', sans-serif;
--font-body: 'Inter', 'Source Sans 3', sans-serif;
--font-mono: ui-monospace, 'SF Mono', monospace;

/* Type Scale */
--text-display: 4rem;      /* 64px */
--text-h1: 2.5rem;         /* 40px */
--text-h2: 2rem;           /* 32px */
--text-h3: 1.5rem;         /* 24px */
--text-body-lg: 1.125rem;  /* 18px */
--text-body: 1rem;         /* 16px */
--text-body-sm: 0.875rem;  /* 14px */
--text-label: 0.875rem;    /* 14px */
--text-caption: 0.75rem;   /* 12px */
--text-mono: 0.8125rem;    /* 13px */

/* Font Weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Line Heights */
--leading-display: 1.1;
--leading-h1: 1.2;
--leading-h2: 1.25;
--leading-h3: 1.3;
--leading-body: 1.6;

/* Letter Spacing */
--tracking-display: -0.03em;
--tracking-h1: -0.02em;
--tracking-h2: -0.015em;
--tracking-h3: -0.01em;
--tracking-body: 0;`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Typography;