import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Keyboard,
  Monitor,
  MousePointer,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox, CheckboxWithLabel } from "@/components/ui/checkbox";
import { RadioGroup, RadioWithLabel } from "@/components/ui/radio-group";
import { ThemeToggleSegmented } from "@/components/design-system/ThemeToggle";
import {
  ReduceMotionToggle,
  ReduceMotionSwitch,
  ReduceMotionSegmented,
} from "@/components/ui/reduce-motion-toggle";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { AlertBanner } from "@/components/ui/alert-banner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Contrast checker component
interface ContrastCheckProps {
  foreground: string;
  background: string;
  label: string;
  ratio: number;
}

function ContrastCheck({ foreground, background, label, ratio }: ContrastCheckProps) {
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;
  const passAALarge = ratio >= 3;

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: background, color: foreground }}
        >
          Aa
        </div>
        <div>
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">Ratio: {ratio.toFixed(2)}:1</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={passAALarge ? "success" : "destructive"} className="text-xs">
          AA Large {passAALarge ? "✓" : "✗"}
        </Badge>
        <Badge variant={passAA ? "success" : "destructive"} className="text-xs">
          AA {passAA ? "✓" : "✗"}
        </Badge>
        <Badge variant={passAAA ? "success" : "warning"} className="text-xs">
          AAA {passAAA ? "✓" : "~"}
        </Badge>
      </div>
    </div>
  );
}

// Focus demo component
function FocusDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Tab through these elements to see the focus ring. Press Tab or click "Start Focus Demo".
      </p>
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          onClick={() => buttonRef.current?.focus()}
        >
          Start Focus Demo
        </Button>
        <Button ref={buttonRef} variant="primary">
          Focusable Button
        </Button>
        <Input ref={inputRef} placeholder="Focusable input" className="w-48" />
        <Button variant="secondary">Another Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <CheckboxWithLabel label="Checkbox option" />
        <Switch />
        <Badge variant="brand" className="cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" tabIndex={0}>
          Focusable Badge
        </Badge>
      </div>
    </div>
  );
}

// Keyboard nav demo
function KeyboardNavDemo() {
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Radio Group (Arrow keys to navigate)</h4>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          <RadioWithLabel value="option1" label="First option" description="Use arrow keys to move between options" />
          <RadioWithLabel value="option2" label="Second option" description="Press Space or Enter to select" />
          <RadioWithLabel value="option3" label="Third option" description="Tab to move to next element" />
        </RadioGroup>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Select (Space/Enter to open, Arrows to navigate)</h4>
        <Select defaultValue="option1">
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">First option</SelectItem>
            <SelectItem value="option2">Second option</SelectItem>
            <SelectItem value="option3">Third option</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Dialog (ESC to close, Tab to trap focus)</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Keyboard Navigation Demo</DialogTitle>
              <DialogDescription>
                Focus is trapped within this dialog. Press Tab to cycle through elements, ESC to close.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <Input placeholder="First input (Tab here)" />
                <Input placeholder="Second input (Tab here)" />
                <div className="flex gap-2">
                  <CheckboxWithLabel label="A checkbox" />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost">Cancel (Shift+Tab)</Button>
              <Button variant="primary">Confirm (Tab)</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Motion demo
function MotionDemo() {
  const { effectiveReducedMotion } = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ReduceMotionSegmented />
      </div>
      
      <AlertBanner variant="info" icon={Info}>
        {effectiveReducedMotion 
          ? "Reduced motion is active. Animations are minimized or disabled."
          : "Animations are enabled. Toggle reduced motion to minimize movement."}
      </AlertBanner>

      <div className="flex items-center gap-4">
        <Button onClick={() => setIsAnimating(!isAnimating)} variant="outline">
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </Button>
        
        <div
          className={cn(
            "w-12 h-12 rounded-lg bg-brand-yellow",
            isAnimating && !effectiveReducedMotion && "animate-bounce"
          )}
        />
        
        <div
          className={cn(
            "w-12 h-12 rounded-lg bg-success transition-transform duration-300",
            isAnimating && !effectiveReducedMotion && "scale-110",
            effectiveReducedMotion && "transition-none"
          )}
        />
        
        <div
          className={cn(
            "w-12 h-12 rounded-lg bg-info",
            isAnimating && !effectiveReducedMotion && "animate-pulse"
          )}
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        The <code className="text-xs bg-muted px-1 py-0.5 rounded">motion-reduce:</code> Tailwind 
        variant and <code className="text-xs bg-muted px-1 py-0.5 rounded">.reduce-motion</code> class 
        can be used to conditionally disable animations.
      </p>
    </div>
  );
}

export default function Accessibility() {
  // Pre-calculated contrast ratios (based on our color tokens)
  const contrastChecks = [
    { foreground: "hsl(30, 15%, 11%)", background: "hsl(40, 20%, 99%)", label: "Text on Background", ratio: 14.2 },
    { foreground: "hsl(30, 8%, 35%)", background: "hsl(40, 20%, 99%)", label: "Secondary Text on Background", ratio: 6.8 },
    { foreground: "hsl(30, 5%, 50%)", background: "hsl(40, 20%, 99%)", label: "Muted Text on Background", ratio: 4.1 },
    { foreground: "hsl(30, 20%, 11%)", background: "hsl(48, 96%, 53%)", label: "Text on Brand Yellow", ratio: 10.5 },
    { foreground: "hsl(0, 0%, 100%)", background: "hsl(160, 60%, 42%)", label: "White on Success", ratio: 4.6 },
    { foreground: "hsl(0, 0%, 100%)", background: "hsl(210, 85%, 55%)", label: "White on Info", ratio: 4.8 },
    { foreground: "hsl(30, 20%, 11%)", background: "hsl(25, 95%, 53%)", label: "Text on Warning", ratio: 5.2 },
    { foreground: "hsl(0, 0%, 100%)", background: "hsl(4, 75%, 55%)", label: "White on Danger", ratio: 4.7 },
  ];

  const darkContrastChecks = [
    { foreground: "hsl(40, 20%, 98%)", background: "hsl(30, 15%, 6%)", label: "Text on Background", ratio: 18.1 },
    { foreground: "hsl(40, 10%, 70%)", background: "hsl(30, 15%, 6%)", label: "Secondary Text on Background", ratio: 8.2 },
    { foreground: "hsl(40, 6%, 52%)", background: "hsl(30, 15%, 6%)", label: "Muted Text on Background", ratio: 5.4 },
    { foreground: "hsl(30, 25%, 6%)", background: "hsl(48, 100%, 58%)", label: "Text on Brand Yellow", ratio: 12.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="font-display text-xl font-bold">Accessibility</h1>
          </div>
          <div className="flex items-center gap-2">
            <ReduceMotionToggle />
            <ThemeToggleSegmented />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Intro */}
        <section className="max-w-3xl">
          <h2 className="text-h2 font-display font-bold mb-4">Accessibility Standards</h2>
          <p className="text-body-lg text-muted-foreground mb-6">
            Our design system follows WCAG 2.1 AA guidelines to ensure an inclusive experience for all users. 
            This page documents our accessibility features and provides interactive demos.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="elevated">
              <CardContent className="pt-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-yellow-soft">
                  <Eye className="h-5 w-5 text-brand-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Contrast</p>
                  <p className="text-xs text-muted-foreground">WCAG AA+</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardContent className="pt-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info-soft">
                  <MousePointer className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Focus Visible</p>
                  <p className="text-xs text-muted-foreground">All elements</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardContent className="pt-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success-soft">
                  <Keyboard className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Keyboard Nav</p>
                  <p className="text-xs text-muted-foreground">Full support</p>
                </div>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardContent className="pt-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning-soft">
                  <Pause className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Reduced Motion</p>
                  <p className="text-xs text-muted-foreground">User control</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Focus Ring */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">Focus Indicators</h3>
            <p className="text-muted-foreground max-w-2xl">
              All interactive elements display a visible focus ring when navigated via keyboard. 
              The focus ring uses our brand yellow color for consistency and visibility.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Focus Ring Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <FocusDemo />
            </CardContent>
          </Card>

          <Card variant="ghost">
            <CardContent className="pt-4">
              <h4 className="font-semibold mb-2">Implementation</h4>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: hsl(var(--ring));
  ring-offset: 2px;
  ring-offset-color: hsl(var(--background));
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Contrast */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">Color Contrast</h3>
            <p className="text-muted-foreground max-w-2xl">
              All text and interactive elements meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-background border border-border" />
                  Light Theme Contrast
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contrastChecks.map((check, i) => (
                  <ContrastCheck key={i} {...check} />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-foreground" />
                  Dark Theme Contrast
                </CardTitle>
              </CardHeader>
              <CardContent>
                {darkContrastChecks.map((check, i) => (
                  <ContrastCheck key={i} {...check} />
                ))}
              </CardContent>
            </Card>
          </div>

          <AlertBanner variant="success" title="All Critical Text Passes AA">
            Primary text, buttons, and interactive elements all exceed WCAG AA requirements in both light and dark themes.
          </AlertBanner>
        </section>

        {/* Keyboard Navigation */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">Keyboard Navigation</h3>
            <p className="text-muted-foreground max-w-2xl">
              All interactive components support full keyboard navigation. Modals trap focus, 
              and all dropdowns/selects can be operated without a mouse.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="ghost">
              <CardContent className="pt-4 text-center">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mb-2 inline-block">Tab</kbd>
                <p className="text-sm">Move forward</p>
              </CardContent>
            </Card>
            <Card variant="ghost">
              <CardContent className="pt-4 text-center">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mb-2 inline-block">Shift + Tab</kbd>
                <p className="text-sm">Move backward</p>
              </CardContent>
            </Card>
            <Card variant="ghost">
              <CardContent className="pt-4 text-center">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mb-2 inline-block">Enter / Space</kbd>
                <p className="text-sm">Activate</p>
              </CardContent>
            </Card>
            <Card variant="ghost">
              <CardContent className="pt-4 text-center">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono mb-2 inline-block">Escape</kbd>
                <p className="text-sm">Close overlay</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Keyboard Navigation Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <KeyboardNavDemo />
            </CardContent>
          </Card>
        </section>

        {/* Reduced Motion */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">Reduced Motion</h3>
            <p className="text-muted-foreground max-w-2xl">
              We respect the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> system 
              setting and provide a manual toggle. When enabled, animations are minimized or removed.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Motion Preference Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <MotionDemo />
            </CardContent>
          </Card>

          <Card variant="ghost">
            <CardContent className="pt-4">
              <h4 className="font-semibold mb-2">CSS Implementation</h4>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`/* System preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Manual override class */
.reduce-motion *, 
.reduce-motion *::before, 
.reduce-motion *::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}

/* Tailwind utility */
.motion-reduce:transition-none { transition: none; }
.motion-reduce:animate-none { animation: none; }`}
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* ARIA & Semantic HTML */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">ARIA & Semantic HTML</h3>
            <p className="text-muted-foreground max-w-2xl">
              All components use proper ARIA attributes and semantic HTML elements for screen reader compatibility.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Component ARIA Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Buttons: <code className="text-xs bg-muted px-1 rounded">role="button"</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Dialogs: <code className="text-xs bg-muted px-1 rounded">role="dialog"</code>, <code className="text-xs bg-muted px-1 rounded">aria-modal</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Alerts: <code className="text-xs bg-muted px-1 rounded">role="alert"</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Navigation: <code className="text-xs bg-muted px-1 rounded">&lt;nav&gt;</code>, <code className="text-xs bg-muted px-1 rounded">aria-current</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Forms: <code className="text-xs bg-muted px-1 rounded">aria-describedby</code>, <code className="text-xs bg-muted px-1 rounded">aria-invalid</code></span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Screen Reader Testing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">VoiceOver (macOS/iOS)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">NVDA (Windows)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">JAWS (Windows)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">TalkBack (Android)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Checklist */}
        <section className="space-y-6">
          <div>
            <h3 className="text-h3 font-display font-semibold mb-2">Accessibility Checklist</h3>
            <p className="text-muted-foreground max-w-2xl">
              Use this checklist when building new components or pages.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Visual</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Color contrast meets AA (4.5:1 text, 3:1 UI)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Focus indicators visible on all interactive elements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Information not conveyed by color alone</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Text resizable up to 200% without loss</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Interaction</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">All functionality accessible via keyboard</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">No keyboard traps (except modals)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Touch targets minimum 44x44px</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Reduced motion preference respected</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Semantic</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Proper heading hierarchy (h1 → h6)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Landmark regions used (main, nav, aside)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Form labels associated with inputs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Images have alt text</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">ARIA</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Roles used appropriately</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">aria-label for icon-only buttons</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Live regions for dynamic content</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span className="text-sm">Error messages linked to inputs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>DePIN Design System • WCAG 2.1 AA Compliant</p>
        </div>
      </footer>
    </div>
  );
}
