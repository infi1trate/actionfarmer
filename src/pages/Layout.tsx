import { ThemeToggle } from "@/components/design-system/ThemeToggle";
import { NavLink } from "@/components/NavLink";
import { Check, X, Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const spacingScale = [
    { token: "--space-0", value: "0", px: "0px" },
    { token: "--space-0-5", value: "0.125rem", px: "2px" },
    { token: "--space-1", value: "0.25rem", px: "4px" },
    { token: "--space-2", value: "0.5rem", px: "8px", note: "base unit" },
    { token: "--space-3", value: "0.75rem", px: "12px" },
    { token: "--space-4", value: "1rem", px: "16px" },
    { token: "--space-5", value: "1.25rem", px: "20px" },
    { token: "--space-6", value: "1.5rem", px: "24px" },
    { token: "--space-8", value: "2rem", px: "32px" },
    { token: "--space-10", value: "2.5rem", px: "40px" },
    { token: "--space-12", value: "3rem", px: "48px" },
    { token: "--space-16", value: "4rem", px: "64px" },
  ];

  const radiusScale = [
    { token: "--radius-xs", value: "8px", tailwind: "rounded-xs" },
    { token: "--radius-sm", value: "12px", tailwind: "rounded-sm" },
    { token: "--radius", value: "16px", tailwind: "rounded", note: "default" },
    { token: "--radius-lg", value: "20px", tailwind: "rounded-lg" },
    { token: "--radius-xl", value: "24px", tailwind: "rounded-xl" },
    { token: "--radius-2xl", value: "32px", tailwind: "rounded-2xl" },
  ];

  const shadowScale = [
    { name: "Extra Small", token: "--shadow-xs", tailwind: "shadow-xs", description: "Subtle elevation for pressed states" },
    { name: "Small", token: "--shadow-sm", tailwind: "shadow-sm", description: "Buttons, inputs, small cards" },
    { name: "Default", token: "--shadow", tailwind: "shadow", description: "Cards, dropdowns" },
    { name: "Medium", token: "--shadow-md", tailwind: "shadow-md", description: "Modals, elevated panels" },
    { name: "Large", token: "--shadow-lg", tailwind: "shadow-lg", description: "Popovers, floating elements" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-yellow flex items-center justify-center">
              <span className="font-display font-bold text-brand-yellow-foreground text-sm">⊞</span>
            </div>
            <span className="font-display font-bold text-h3 text-text">Layout</span>
          </div>
          <div className="flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/design-system">Components</NavLink>
            <NavLink to="/tokens">Tokens</NavLink>
            <NavLink to="/typography">Typography</NavLink>
            <NavLink to="/brand">Brand</NavLink>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-display text-text mb-4">Layout System</h1>
          <p className="text-body-lg text-text-2 max-w-2xl">
            An 8px grid-based spacing system with responsive containers, modern shadows, 
            and consistent border radii for cohesive, scalable layouts.
          </p>
        </header>

        {/* 8px Grid */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-4">8px Grid System</h2>
          <p className="text-body text-text-2 mb-6">
            All spacing is based on an 8px unit. This creates visual rhythm and ensures 
            elements align consistently across the interface.
          </p>
          
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-px bg-border">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-surface-2 h-12 flex items-center justify-center">
                  <span className="text-caption text-text-3">{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-surface">
              <p className="text-body-sm text-text-2">
                12-column grid with 8px base. Use <code className="text-mono bg-surface-2 px-1 rounded text-xs">gap-2</code> (8px), 
                <code className="text-mono bg-surface-2 px-1 rounded text-xs ml-1">gap-4</code> (16px), or 
                <code className="text-mono bg-surface-2 px-1 rounded text-xs ml-1">gap-6</code> (24px) for consistent gutters.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Spacing Scale</h2>
          
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            {spacingScale.map((space, i) => (
              <div 
                key={space.token} 
                className={`flex items-center gap-6 p-4 ${i < spacingScale.length - 1 ? 'border-b border-border' : ''} hover:bg-surface-2 transition-colors`}
              >
                <div className="w-24 flex-shrink-0">
                  <code className="text-mono text-xs text-text-3">{space.token.replace('--space-', '')}</code>
                </div>
                <div 
                  className="bg-brand-yellow rounded-xs h-4 flex-shrink-0" 
                  style={{ width: space.value === '0' ? '4px' : space.value }}
                />
                <div className="flex-1 flex items-center gap-4">
                  <span className="text-body-sm text-text">{space.px}</span>
                  <span className="text-caption text-text-3">{space.value}</span>
                  {space.note && (
                    <span className="text-caption text-brand-yellow bg-brand-yellow-soft px-2 py-0.5 rounded-full">
                      {space.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Radius Scale */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Border Radius Scale</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            {radiusScale.map((radius) => (
              <div key={radius.token} className="bg-surface rounded-xl border border-border p-6">
                <div 
                  className="w-20 h-20 bg-brand-yellow mb-4" 
                  style={{ borderRadius: radius.value }}
                />
                <div className="text-label text-text mb-1">{radius.value}</div>
                <code className="text-mono text-xs text-text-3">{radius.tailwind}</code>
                {radius.note && (
                  <span className="ml-2 text-caption text-brand-yellow">({radius.note})</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Shadow Scale</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shadowScale.map((shadow) => (
              <div 
                key={shadow.token} 
                className="bg-surface rounded-xl border border-border p-6"
                style={{ boxShadow: `var(${shadow.token})` }}
              >
                <div className="text-label text-text mb-1">{shadow.name}</div>
                <code className="text-mono text-xs text-text-3 block mb-2">{shadow.tailwind}</code>
                <p className="text-caption text-text-3">{shadow.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive Containers */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Responsive Containers</h2>
          
          <div className="bg-surface rounded-xl border border-border p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <Smartphone className="w-5 h-5 text-text-3" />
              <Monitor className="w-5 h-5 text-text-3" />
              <Tablet className="w-5 h-5 text-text-3" />
              <span className="text-body-sm text-text-2">Mobile-first responsive design</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 text-caption text-text-3">sm</div>
                <div className="flex-1 bg-surface-2 rounded h-8 flex items-center px-3">
                  <div className="bg-info/20 h-4 rounded" style={{ width: '100%', maxWidth: '640px' }} />
                </div>
                <code className="text-mono text-xs text-text-3">640px</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-caption text-text-3">md</div>
                <div className="flex-1 bg-surface-2 rounded h-8 flex items-center px-3">
                  <div className="bg-info/30 h-4 rounded" style={{ width: '100%', maxWidth: '768px' }} />
                </div>
                <code className="text-mono text-xs text-text-3">768px</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-caption text-text-3">lg</div>
                <div className="flex-1 bg-surface-2 rounded h-8 flex items-center px-3">
                  <div className="bg-info/40 h-4 rounded" style={{ width: '100%', maxWidth: '1024px' }} />
                </div>
                <code className="text-mono text-xs text-text-3">1024px</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-caption text-text-3">xl</div>
                <div className="flex-1 bg-surface-2 rounded h-8 flex items-center px-3">
                  <div className="bg-info/50 h-4 rounded" style={{ width: '100%', maxWidth: '1280px' }} />
                </div>
                <code className="text-mono text-xs text-text-3">1280px</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-caption text-text-3">2xl</div>
                <div className="flex-1 bg-surface-2 rounded h-8 flex items-center px-3">
                  <div className="bg-info/60 h-4 rounded" style={{ width: '100%' }} />
                </div>
                <code className="text-mono text-xs text-text-3">1400px</code>
              </div>
            </div>
          </div>
        </section>

        {/* Component Sizing */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Responsive Component Sizing</h2>
          
          <div className="space-y-8">
            {/* Button Heights */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="text-h3 text-text mb-4">Button Heights</h3>
              <div className="flex flex-wrap items-end gap-4">
                <div className="text-center">
                  <Button size="sm" variant="brand">Small</Button>
                  <div className="text-caption text-text-3 mt-2">32px</div>
                </div>
                <div className="text-center">
                  <Button size="default" variant="brand">Default</Button>
                  <div className="text-caption text-text-3 mt-2">40px</div>
                </div>
                <div className="text-center">
                  <Button size="lg" variant="brand">Large</Button>
                  <div className="text-caption text-text-3 mt-2">48px</div>
                </div>
              </div>
              <p className="text-body-sm text-text-2 mt-4">
                Use <code className="text-mono bg-surface-2 px-1 rounded text-xs">size="sm"</code> on mobile, 
                <code className="text-mono bg-surface-2 px-1 rounded text-xs ml-1">size="default"</code> on tablet+.
              </p>
            </div>

            {/* Card Padding */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="text-h3 text-text mb-4">Card Padding</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-surface-2 rounded-lg p-4 border border-dashed border-border-2">
                  <div className="text-label text-text mb-1">Small (p-4)</div>
                  <div className="text-caption text-text-3">16px - Mobile cards</div>
                </div>
                <div className="bg-surface-2 rounded-lg p-6 border border-dashed border-border-2">
                  <div className="text-label text-text mb-1">Medium (p-6)</div>
                  <div className="text-caption text-text-3">24px - Default cards</div>
                </div>
                <div className="bg-surface-2 rounded-lg p-8 border border-dashed border-border-2">
                  <div className="text-label text-text mb-1">Large (p-8)</div>
                  <div className="text-caption text-text-3">32px - Featured sections</div>
                </div>
              </div>
            </div>

            {/* Nav Density */}
            <div className="bg-surface rounded-xl border border-border p-6">
              <h3 className="text-h3 text-text mb-4">Navigation Density</h3>
              <div className="space-y-4">
                <div className="bg-surface-2 rounded-lg flex items-center justify-between px-4" style={{ height: '56px' }}>
                  <span className="text-label text-text">Mobile Nav</span>
                  <span className="text-caption text-text-3">56px height</span>
                </div>
                <div className="bg-surface-2 rounded-lg flex items-center justify-between px-4" style={{ height: '64px' }}>
                  <span className="text-label text-text">Desktop Nav</span>
                  <span className="text-caption text-text-3">64px height</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Ring */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Focus Ring</h2>
          
          <div className="bg-surface rounded-xl border border-border p-6">
            <p className="text-body text-text-2 mb-6">
              All interactive elements use a consistent focus ring for keyboard navigation accessibility.
              The ring uses the brand yellow color with a 2px width and 2px offset.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="brand" className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Focus me (Tab)
              </Button>
              <Button variant="outline" className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Outline Button
              </Button>
              <input 
                type="text" 
                placeholder="Input field" 
                className="px-4 py-2 rounded-lg border border-border bg-surface-2 text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <div className="bg-surface-2 rounded-lg p-4">
              <code className="text-mono text-sm text-text-2">
                {`/* Applied globally */
:focus-visible {
  outline: none;
  ring: 2px solid hsl(var(--state-focus-ring));
  ring-offset: 2px;
}`}
              </code>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-16">
          <h2 className="text-h2 text-text mb-6">Layout Guidelines</h2>
          
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
                  <span>Use 8px multiples for all spacing (8, 16, 24, 32...)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Start mobile-first, then add responsive breakpoints</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Use consistent padding within component types</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Apply 16px (default) radius for most components</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success">•</span>
                  <span>Use subtle shadows for depth hierarchy</span>
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
                  <span>Don't use arbitrary spacing values (15px, 22px, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't mix different radius styles in the same context</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't use heavy shadows—keep elevation subtle</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't forget touch targets (min 44px) on mobile</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-danger">•</span>
                  <span>Don't skip focus states for keyboard users</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Token Reference */}
        <section>
          <h2 className="text-h2 text-text mb-6">CSS Variables Reference</h2>
          
          <div className="bg-surface-2 rounded-xl p-6 overflow-x-auto">
            <pre className="text-mono text-sm text-text-2">
{`/* Spacing Scale (8px grid) */
--space-0: 0;
--space-0-5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px - base */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */

/* Radius Scale */
--radius-xs: 0.5rem;    /* 8px */
--radius-sm: 0.75rem;   /* 12px */
--radius: 1rem;         /* 16px - default */
--radius-lg: 1.25rem;   /* 20px */
--radius-xl: 1.5rem;    /* 24px */
--radius-2xl: 2rem;     /* 32px */

/* Focus Ring */
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-color: var(--state-focus-ring);

/* Container Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;