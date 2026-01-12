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
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
  Wallet,
  BarChart3,
  Menu,
  HelpCircle,
  LogOut,
  Shield,
  Gift,
  Cpu,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Clock,
  Wifi,
  WifiOff,
  FileText,
  Package,
  Inbox
} from "lucide-react";
import { Button, ButtonGroup } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, Grid, List, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { StatusPill, StatusDot } from "@/components/ui/status-pill";
import { XPTag, StreakTag, LevelTag, PointsTag } from "@/components/ui/xp-tag";
import { Input } from "@/components/ui/input";
import { TextInput } from "@/components/ui/text-input";
import { SearchInput } from "@/components/ui/search-input";
import { TextArea } from "@/components/ui/text-area";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox, CheckboxWithLabel } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem, RadioWithLabel } from "@/components/ui/radio-group";
import { Switch, ToggleSwitch } from "@/components/ui/switch";
import { Slider, LabeledSlider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StreakIndicator, StreakBadge } from "@/components/ui/streak-indicator";
import { XPCountUp, XPCountUpInline } from "@/components/ui/xp-count-up";
import { RewardToast, RewardToastContainer } from "@/components/ui/reward-toast";
import { MissionCard, MissionCardCompact } from "@/components/ui/mission-card";
import { TokenSection, ColorSwatch, ColorRow } from "@/components/design-system/TokenSection";
import { ComponentShowcase, ShowcaseGrid } from "@/components/design-system/ComponentShowcase";
import { ThemeToggle } from "@/components/design-system/ThemeToggle";
import { TopAppBar, TopAppBarCompact } from "@/components/ui/top-app-bar";
import { BottomTabBar, type TabItem } from "@/components/ui/bottom-tab-bar";
import { 
  SideSheet, 
  SideSheetTrigger, 
  SideSheetContent, 
  SideSheetHeader, 
  SideSheetTitle, 
  SideSheetDescription,
  SideSheetNav,
  SideSheetNavSection,
  SideSheetFooter,
  type NavItem
} from "@/components/ui/side-sheet";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard, StatCardCompact } from "@/components/ui/stat-card";
import { List as ListContainer, ListRow, ListSectionHeader } from "@/components/ui/list-row";
import { Divider } from "@/components/ui/divider";
import { EmptyState, EmptyStateInline } from "@/components/ui/empty-state";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from "@/components/ui/table";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetBody,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
} from "@/components/ui/bottom-sheet";
import { AlertBanner, AlertStickyBanner } from "@/components/ui/alert-banner";
import { 
  ConfirmDialog,
  ConfirmDialogTrigger,
  ConfirmDialogContent,
  ConfirmDialogHeader,
  ConfirmDialogFooter,
  ConfirmDialogTitle,
  ConfirmDialogDescription,
  ConfirmDialogAction,
  ConfirmDialogCancel,
  ConfirmDialogIcon,
  ConfirmDialogSimple,
} from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";

const DesignSystem = () => {
  const [progressValue, setProgressValue] = useState(65);
  const [searchValue, setSearchValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [sliderValue, setSliderValue] = useState([50]);
  const [multiplierValue, setMultiplierValue] = useState([1.5]);
  const [showPassword, setShowPassword] = useState(false);
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>(["react"]);
  const [chipList, setChipList] = useState(["Tag 1", "Tag 2", "Tag 3"]);
  const [xpValue, setXpValue] = useState(1250);
  const [showRewardToast, setShowRewardToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  // Demo data for navigation components
  const bottomTabs: TabItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Cpu, label: "Devices", href: "/devices", badge: 3 },
    { icon: BarChart3, label: "Stats", href: "/stats" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const sideNavItems: NavItem[] = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Cpu, label: "My Devices", href: "/devices", badge: 3 },
    { icon: BarChart3, label: "Analytics", href: "/stats" },
    { icon: Gift, label: "Rewards", href: "/rewards" },
  ];

  const sideNavSecondary: NavItem[] = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Shield, label: "Security", href: "/security" },
    { icon: HelpCircle, label: "Help & Support", href: "/help" },
  ];

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

          <ComponentShowcase title="Primary Variants" description="Primary action buttons">
            <Button variant="primary">Primary</Button>
            <Button variant="outline-primary">Outline Primary</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="brand">Brand (Glow)</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Standard Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Style</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Status Variants">
            <Button variant="success"><Check className="w-4 h-4" /> Success</Button>
            <Button variant="warning"><AlertTriangle className="w-4 h-4" /> Warning</Button>
            <Button variant="destructive"><X className="w-4 h-4" /> Danger</Button>
            <Button variant="info"><Info className="w-4 h-4" /> Info</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Sizes">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="default">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Icon Buttons (Square)">
            <Button variant="primary" size="icon-sm"><Plus /></Button>
            <Button variant="primary" size="icon"><Star /></Button>
            <Button variant="primary" size="icon-lg"><Settings /></Button>
            <Button variant="secondary" size="icon"><Bell /></Button>
            <Button variant="outline" size="icon"><User /></Button>
          </ComponentShowcase>

          <ComponentShowcase title="Icon Buttons (Circular)">
            <Button variant="primary" size="icon-circle-sm"><Plus /></Button>
            <Button variant="primary" size="icon-circle"><Star /></Button>
            <Button variant="primary" size="icon-circle-lg"><Heart /></Button>
            <Button variant="ghost" size="icon-circle"><Settings /></Button>
          </ComponentShowcase>

          <ComponentShowcase title="With Left/Right Icons">
            <Button variant="primary" leftIcon={<Zap className="w-4 h-4" />}>Boost Now</Button>
            <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>Next</Button>
            <Button variant="outline" leftIcon={<Search className="w-4 h-4" />} rightIcon={<ChevronRight className="w-4 h-4" />}>Search</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Loading State">
            <Button variant="primary" loading>Loading</Button>
            <Button variant="secondary" loading>Processing</Button>
            <Button variant="destructive" loading>Deleting</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Disabled State">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
          </ComponentShowcase>

          <ComponentShowcase title="Button Group (Segmented Control)">
            <ButtonGroup>
              <Button variant="secondary" size="sm"><AlignLeft className="w-4 h-4" /></Button>
              <Button variant="secondary" size="sm"><AlignCenter className="w-4 h-4" /></Button>
              <Button variant="secondary" size="sm"><AlignRight className="w-4 h-4" /></Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="primary" size="sm">Day</Button>
              <Button variant="secondary" size="sm">Week</Button>
              <Button variant="secondary" size="sm">Month</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="secondary" size="icon-sm"><Grid className="w-4 h-4" /></Button>
              <Button variant="primary" size="icon-sm"><LayoutGrid className="w-4 h-4" /></Button>
              <Button variant="secondary" size="icon-sm"><List className="w-4 h-4" /></Button>
            </ButtonGroup>
          </ComponentShowcase>
        </section>

        {/* Badges & Labels */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Badges & Labels</h2>
            <p className="text-muted-foreground">Status indicators, selectable chips, and gamified labels.</p>
          </div>

          <ComponentShowcase title="Standard Badges" description="Basic badge variants for labeling content">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="brand-subtle">Brand Subtle</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Status Badges" description="Semantic colors for different states">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Subtle Status" description="Softer variants with icons">
            <Badge variant="success-subtle"><Check className="w-3 h-3" /> Completed</Badge>
            <Badge variant="warning-subtle"><AlertTriangle className="w-3 h-3" /> Pending</Badge>
            <Badge variant="danger-subtle"><X className="w-3 h-3" /> Failed</Badge>
            <Badge variant="info-subtle"><Info className="w-3 h-3" /> Processing</Badge>
          </ComponentShowcase>

          <ComponentShowcase title="Badge Sizes">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="pill">Pill</Badge>
            <Badge size="pill-lg">Pill Large</Badge>
          </ComponentShowcase>
        </section>

        {/* Chips */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Chips</h2>
            <p className="text-muted-foreground">Selectable pills for filters, tags, and multi-select inputs.</p>
          </div>

          <ComponentShowcase title="Chip Variants" description="Different visual styles">
            <Chip>Default</Chip>
            <Chip variant="brand">Brand</Chip>
            <Chip variant="success">Success</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="danger">Danger</Chip>
            <Chip variant="info">Info</Chip>
          </ComponentShowcase>

          <ComponentShowcase title="Selectable Chips" description="Toggle selection state">
            <ChipGroup>
              {["react", "typescript", "tailwind", "vite"].map((tech) => (
                <Chip
                  key={tech}
                  variant="brand"
                  selected={selectedChips.includes(tech)}
                  onSelectedChange={(selected) => {
                    setSelectedChips(prev => 
                      selected ? [...prev, tech] : prev.filter(t => t !== tech)
                    );
                  }}
                >
                  {tech}
                </Chip>
              ))}
            </ChipGroup>
          </ComponentShowcase>

          <ComponentShowcase title="Removable Chips" description="With close button for tag management">
            <ChipGroup>
              {chipList.map((tag) => (
                <Chip
                  key={tag}
                  removable
                  onRemove={() => setChipList(prev => prev.filter(t => t !== tag))}
                >
                  {tag}
                </Chip>
              ))}
              <Chip
                variant="brand"
                leftIcon={<Plus className="w-3 h-3" />}
                onClick={() => setChipList(prev => [...prev, `Tag ${prev.length + 1}`])}
              >
                Add
              </Chip>
            </ChipGroup>
          </ComponentShowcase>

          <ComponentShowcase title="Chip Sizes">
            <Chip size="sm">Small</Chip>
            <Chip size="default">Default</Chip>
            <Chip size="lg">Large</Chip>
          </ComponentShowcase>
        </section>

        {/* Status Pills */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Status Pills</h2>
            <p className="text-muted-foreground">Real-time status indicators for devices and connections.</p>
          </div>

          <ComponentShowcase title="Status Types" description="All available statuses with animated indicators">
            <StatusPill status="online" />
            <StatusPill status="offline" />
            <StatusPill status="recording" />
            <StatusPill status="earning" />
            <StatusPill status="syncing" />
            <StatusPill status="idle" />
            <StatusPill status="error" />
          </ComponentShowcase>

          <ComponentShowcase title="Variant Styles" description="Minimal, subtle, and solid appearances">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">Minimal</span>
                <StatusPill status="online" variant="minimal" />
                <StatusPill status="earning" variant="minimal" />
                <StatusPill status="recording" variant="minimal" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">Subtle</span>
                <StatusPill status="online" variant="subtle" />
                <StatusPill status="earning" variant="subtle" />
                <StatusPill status="recording" variant="subtle" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">Solid</span>
                <StatusPill status="online" variant="solid" />
                <StatusPill status="earning" variant="solid" />
                <StatusPill status="recording" variant="solid" />
              </div>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Sizes">
            <StatusPill status="online" size="sm" variant="subtle" />
            <StatusPill status="online" size="default" variant="subtle" />
            <StatusPill status="online" size="lg" variant="subtle" />
          </ComponentShowcase>

          <ComponentShowcase title="Status Dots" description="Compact indicators for tight spaces">
            <div className="flex items-center gap-3">
              <StatusDot status="online" />
              <StatusDot status="offline" />
              <StatusDot status="recording" />
              <StatusDot status="earning" />
              <StatusDot status="syncing" />
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Custom Labels" description="Override default status text">
            <StatusPill status="online" label="Connected" variant="subtle" />
            <StatusPill status="earning" label="Mining +0.5/hr" variant="subtle" />
            <StatusPill status="recording" label="Live" variant="solid" />
          </ComponentShowcase>
        </section>

        {/* XP Tags */}
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">XP Tags & Gamification</h2>
            <p className="text-muted-foreground">Gamified labels for rewards, levels, and achievements.</p>
          </div>

          <ComponentShowcase title="XP Tag Variants" description="Different reward tiers">
            <XPTag value={1250} variant="gold" />
            <XPTag value={500} variant="silver" />
            <XPTag value={100} variant="bronze" />
            <XPTag value={5000} variant="platinum" />
          </ComponentShowcase>

          <ComponentShowcase title="Appearance Styles" description="Minimal, badge, and pill appearances">
            <XPTag value={1250} appearance="minimal" />
            <XPTag value={1250} appearance="badge" />
            <XPTag value={1250} appearance="pill" />
          </ComponentShowcase>

          <ComponentShowcase title="Sizes">
            <XPTag value={100} size="xs" />
            <XPTag value={100} size="sm" />
            <XPTag value={100} size="default" />
            <XPTag value={100} size="lg" />
            <XPTag value={100} size="xl" />
          </ComponentShowcase>

          <ComponentShowcase title="Streak Tags" description="Day counter for engagement streaks">
            <StreakTag days={1} appearance="badge" />
            <StreakTag days={7} appearance="badge" />
            <StreakTag days={30} appearance="badge" />
            <StreakTag days={365} appearance="pill" size="lg" />
          </ComponentShowcase>

          <ComponentShowcase title="Level Tags" description="User level indicators">
            <LevelTag level={1} appearance="badge" variant="silver" />
            <LevelTag level={10} appearance="badge" variant="gold" />
            <LevelTag level={50} appearance="badge" variant="platinum" />
            <LevelTag level={99} appearance="pill" size="lg" />
          </ComponentShowcase>

          <ComponentShowcase title="Points Tags" description="Generic point counters">
            <PointsTag points={250} unit="coins" appearance="badge" />
            <PointsTag points={1500} unit="tokens" appearance="badge" variant="gold" />
            <PointsTag points={999999} unit="pts" appearance="pill" />
          </ComponentShowcase>

          <ComponentShowcase title="Large Number Formatting" description="Automatic K/M formatting">
            <XPTag value={999} />
            <XPTag value={1000} />
            <XPTag value={15000} />
            <XPTag value={1500000} />
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

        {/* Forms Section */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Forms</h2>
            <p className="text-muted-foreground">Input components with clear focus states, error handling, and accessibility.</p>
          </div>

          {/* Text Input */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Text Input</h3>
            
            <ComponentShowcase title="Variants">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Default" hint="Standard input style">
                  <TextInput placeholder="Enter your name..." />
                </FormField>
                <FormField label="Filled" hint="Filled background style">
                  <TextInput variant="filled" placeholder="Enter email..." />
                </FormField>
                <FormField label="Outline" hint="Border-focused style">
                  <TextInput variant="outline" placeholder="Username" />
                </FormField>
                <FormField label="Ghost (Underline)" hint="Minimal style">
                  <TextInput variant="ghost" placeholder="Type here..." />
                </FormField>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Sizes">
              <div className="w-full flex flex-wrap gap-4 items-end">
                <FormField label="Small" className="w-40">
                  <TextInput inputSize="sm" placeholder="Small" />
                </FormField>
                <FormField label="Default" className="w-44">
                  <TextInput inputSize="default" placeholder="Default" />
                </FormField>
                <FormField label="Large" className="w-48">
                  <TextInput inputSize="lg" placeholder="Large" />
                </FormField>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Icons">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Email">
                  <TextInput 
                    leftIcon={<Mail className="w-4 h-4" />} 
                    placeholder="you@example.com" 
                    type="email"
                  />
                </FormField>
                <FormField label="Password">
                  <TextInput 
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                  />
                </FormField>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="States">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="With Error" error="This field is required" required>
                  <TextInput hasError placeholder="Required field" />
                </FormField>
                <FormField label="Disabled">
                  <TextInput disabled placeholder="Disabled input" />
                </FormField>
                <FormField label="Read Only" hint="Cannot be edited">
                  <TextInput readOnly value="Read only value" />
                </FormField>
              </div>
            </ComponentShowcase>
          </div>

          {/* Search Input */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Search Input</h3>
            
            <ComponentShowcase title="With Clear Button">
              <div className="w-full max-w-md">
                <SearchInput 
                  value={searchValue} 
                  onChange={setSearchValue}
                  placeholder="Search devices, nodes, transactions..."
                />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Sizes">
              <div className="w-full flex flex-wrap gap-4 items-center">
                <SearchInput inputSize="sm" placeholder="Small" className="w-48" />
                <SearchInput inputSize="default" placeholder="Default" className="w-56" />
                <SearchInput inputSize="lg" placeholder="Large" className="w-64" />
              </div>
            </ComponentShowcase>
          </div>

          {/* TextArea */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Text Area</h3>
            
            <ComponentShowcase title="Variants & Character Count">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Default" hint="Standard textarea">
                  <TextArea placeholder="Enter your message..." />
                </FormField>
                <FormField label="With Character Count">
                  <TextArea 
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    placeholder="Limited to 200 characters..." 
                    maxLength={200}
                    showCharCount
                  />
                </FormField>
                <FormField label="Filled Variant">
                  <TextArea variant="filled" placeholder="Description..." />
                </FormField>
                <FormField label="With Error" error="Message is too short">
                  <TextArea hasError placeholder="Enter at least 10 characters..." />
                </FormField>
              </div>
            </ComponentShowcase>
          </div>

          {/* Select / Dropdown */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Select / Dropdown</h3>
            
            <ComponentShowcase title="Standard Select">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Device Type" hint="Select your device">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="helium">Helium Miner</SelectItem>
                      <SelectItem value="hivemapper">Hivemapper Dashcam</SelectItem>
                      <SelectItem value="weatherxm">WeatherXM Station</SelectItem>
                      <SelectItem value="dimo">DIMO Dongle</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Network" required>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Status" error="Selection required">
                  <Select>
                    <SelectTrigger hasError>
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </ComponentShowcase>
          </div>

          {/* Checkbox */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Checkbox</h3>
            
            <ComponentShowcase title="Variants & Sizes">
              <div className="flex flex-wrap gap-6 items-center">
                <Checkbox size="sm" />
                <Checkbox size="default" defaultChecked />
                <Checkbox size="lg" defaultChecked />
                <Checkbox variant="success" defaultChecked />
                <Checkbox variant="danger" defaultChecked />
                <Checkbox checked="indeterminate" />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Labels">
              <div className="w-full space-y-4">
                <CheckboxWithLabel 
                  label="Accept terms and conditions" 
                  description="By checking this, you agree to our Terms of Service and Privacy Policy."
                />
                <CheckboxWithLabel 
                  label="Enable notifications" 
                  description="Receive alerts about your device status and earnings."
                  defaultChecked
                />
                <CheckboxWithLabel 
                  label="Disabled option" 
                  description="This option is currently unavailable."
                  disabled
                />
              </div>
            </ComponentShowcase>
          </div>

          {/* Radio */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Radio Group</h3>
            
            <ComponentShowcase title="Standard & With Labels">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Basic Radio</p>
                  <RadioGroup defaultValue="option-1">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option-1" id="r1" />
                      <label htmlFor="r1" className="text-sm">Option 1</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option-2" id="r2" />
                      <label htmlFor="r2" className="text-sm">Option 2</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="option-3" id="r3" disabled />
                      <label htmlFor="r3" className="text-sm text-muted-foreground">Disabled</label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Payout Frequency</p>
                  <RadioGroup defaultValue="weekly">
                    <RadioWithLabel value="daily" label="Daily" description="Receive payouts every 24 hours" />
                    <RadioWithLabel value="weekly" label="Weekly" description="Receive payouts every 7 days" />
                    <RadioWithLabel value="monthly" label="Monthly" description="Receive payouts once a month" />
                  </RadioGroup>
                </div>
              </div>
            </ComponentShowcase>
          </div>

          {/* Toggle Switch */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Toggle Switch</h3>
            
            <ComponentShowcase title="Variants & Sizes">
              <div className="flex flex-wrap gap-6 items-center">
                <Switch size="sm" />
                <Switch size="default" defaultChecked />
                <Switch size="lg" defaultChecked />
                <Switch variant="success" defaultChecked />
                <Switch variant="danger" defaultChecked />
                <Switch disabled />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Labels">
              <div className="w-full space-y-4">
                <ToggleSwitch 
                  label="Auto-compound rewards" 
                  description="Automatically reinvest your earnings to maximize returns."
                  defaultChecked
                />
                <ToggleSwitch 
                  label="Dark mode" 
                  description="Use dark theme across the application."
                  labelPosition="left"
                />
                <ToggleSwitch 
                  label="Maintenance mode" 
                  description="Temporarily disable your node."
                  variant="danger"
                />
              </div>
            </ComponentShowcase>
          </div>

          {/* Slider */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Slider</h3>
            
            <ComponentShowcase title="Basic Slider">
              <div className="w-full max-w-md space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Default: {sliderValue[0]}%</p>
                  <Slider 
                    value={sliderValue} 
                    onValueChange={setSliderValue} 
                    max={100} 
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Success Variant</p>
                  <Slider defaultValue={[75]} max={100} variant="success" />
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Sizes">
              <div className="w-full max-w-md space-y-6">
                <Slider defaultValue={[40]} max={100} size="sm" />
                <Slider defaultValue={[60]} max={100} size="default" />
                <Slider defaultValue={[80]} max={100} size="lg" />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Reward Multiplier Style" className="block">
              <div className="w-full max-w-md">
                <LabeledSlider
                  label="Reward Multiplier"
                  value={multiplierValue}
                  onValueChange={setMultiplierValue}
                  min={1}
                  max={5}
                  step={0.1}
                  minLabel="1x"
                  maxLabel="5x"
                  showValue
                  formatValue={(v) => `${v.toFixed(1)}x`}
                  variant="brand"
                  size="lg"
                />
              </div>
            </ComponentShowcase>
          </div>

          {/* Form Example */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Complete Form Example</h3>
            
            <Card variant="default" className="max-w-lg">
              <CardHeader>
                <CardTitle>Device Setup</CardTitle>
                <CardDescription>Configure your DePIN node settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField label="Device Name" required hint="A friendly name for your device">
                  <TextInput placeholder="My Helium Miner" />
                </FormField>
                <FormField label="Location" required>
                  <TextInput leftIcon={<Search className="w-4 h-4" />} placeholder="Search address..." />
                </FormField>
                <FormField label="Network">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="testnet">Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <LabeledSlider
                  label="Staking Amount"
                  defaultValue={[100]}
                  min={10}
                  max={1000}
                  step={10}
                  minLabel="10 tokens"
                  maxLabel="1000 tokens"
                  showValue
                  formatValue={(v) => `${v} tokens`}
                />
                <ToggleSwitch 
                  label="Enable auto-updates" 
                  description="Keep your device firmware up to date"
                  defaultChecked
                />
                <CheckboxWithLabel 
                  label="I agree to the staking terms" 
                  description="Your tokens will be locked for the staking period."
                />
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="secondary" className="flex-1">Cancel</Button>
                <Button variant="brand" className="flex-1">Save Device</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Navigation</h2>
            <p className="text-muted-foreground">Crisp, Robinhood-clean navigation components with yellow as the active indicator.</p>
          </div>

          {/* TopAppBar */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Top App Bar</h3>
            
            <ComponentShowcase title="Standard App Bar" className="block p-0 overflow-hidden">
              <div className="border border-border rounded-xl overflow-hidden">
                <TopAppBar
                  title="Dashboard"
                  subtitle="Welcome back, Alex"
                  rightActions={
                    <>
                      <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
                      <Button variant="ghost" size="icon"><Settings className="w-5 h-5" /></Button>
                    </>
                  }
                  sticky={false}
                  className="relative"
                />
                <div className="h-20 bg-surface-2 flex items-center justify-center text-muted-foreground text-sm">
                  Page content
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Back Button" className="block p-0 overflow-hidden">
              <div className="border border-border rounded-xl overflow-hidden">
                <TopAppBar
                  title="Device Details"
                  showBack
                  rightActions={
                    <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
                  }
                  sticky={false}
                  className="relative"
                />
                <div className="h-20 bg-surface-2 flex items-center justify-center text-muted-foreground text-sm">
                  Page content
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Compact Variant" className="block p-0 overflow-hidden">
              <div className="border border-border rounded-xl overflow-hidden">
                <TopAppBarCompact
                  title="Edit Settings"
                  rightAction={<Button variant="primary" size="sm">Save</Button>}
                />
                <div className="h-20 bg-surface-2 flex items-center justify-center text-muted-foreground text-sm">
                  Page content
                </div>
              </div>
            </ComponentShowcase>
          </div>

          {/* BottomTabBar */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Bottom Tab Bar</h3>
            
            <ComponentShowcase title="Mobile Navigation" description="Fixed to bottom on mobile devices" className="block p-0 overflow-hidden">
              <div className="border border-border rounded-xl overflow-hidden relative h-72">
                <div className="h-full bg-surface-2 flex items-center justify-center text-muted-foreground text-sm">
                  App content area
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface">
                  <div className="flex items-center justify-around h-16">
                    {bottomTabs.map((tab, index) => {
                      const Icon = tab.icon;
                      const isActive = index === 0;
                      return (
                        <div
                          key={tab.href}
                          className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
                        >
                          {isActive && (
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-yellow rounded-full" />
                          )}
                          <div className="relative">
                            <Icon className={`w-6 h-6 ${isActive ? "text-foreground" : "text-muted-foreground"}`} strokeWidth={isActive ? 2.5 : 2} />
                            {tab.badge && (
                              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-danger rounded-full">
                                {tab.badge}
                              </span>
                            )}
                          </div>
                          <span className={`text-[11px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                            {tab.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ComponentShowcase>
          </div>

          {/* SideSheet / Drawer */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Side Sheet / Drawer</h3>
            
            <ComponentShowcase title="Navigation Drawer">
              <SideSheet open={sideSheetOpen} onOpenChange={setSideSheetOpen}>
                <SideSheetTrigger asChild>
                  <Button variant="secondary" leftIcon={<Menu className="w-4 h-4" />}>
                    Open Navigation Drawer
                  </Button>
                </SideSheetTrigger>
                <SideSheetContent side="left" className="flex flex-col">
                  <SideSheetHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center">
                        <Zap className="w-5 h-5 text-brand-yellow-foreground" />
                      </div>
                      <div>
                        <SideSheetTitle>DePIN App</SideSheetTitle>
                        <SideSheetDescription>v1.0.0</SideSheetDescription>
                      </div>
                    </div>
                  </SideSheetHeader>
                  
                  <div className="flex-1 overflow-auto">
                    <SideSheetNavSection title="Main">
                      <SideSheetNav items={sideNavItems} onItemClick={() => setSideSheetOpen(false)} />
                    </SideSheetNavSection>
                    
                    <SideSheetNavSection title="Account">
                      <SideSheetNav items={sideNavSecondary} onItemClick={() => setSideSheetOpen(false)} />
                    </SideSheetNavSection>
                  </div>
                  
                  <SideSheetFooter>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground" leftIcon={<LogOut className="w-4 h-4" />}>
                      Sign Out
                    </Button>
                  </SideSheetFooter>
                </SideSheetContent>
              </SideSheet>
            </ComponentShowcase>
          </div>

          {/* Breadcrumbs */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Breadcrumbs</h3>
            
            <ComponentShowcase title="Standard Breadcrumbs">
              <Breadcrumbs 
                items={[
                  { label: "Devices", href: "/devices" },
                  { label: "Helium Miner", href: "/devices/helium" },
                  { label: "Settings" },
                ]} 
              />
            </ComponentShowcase>

            <ComponentShowcase title="With Home Icon">
              <Breadcrumbs 
                showHome
                items={[
                  { label: "Dashboard", href: "/" },
                  { label: "Analytics", href: "/analytics" },
                  { label: "Revenue Report" },
                ]} 
              />
            </ComponentShowcase>

            <ComponentShowcase title="Truncated (Long Path)">
              <Breadcrumbs 
                showHome
                maxItems={3}
                items={[
                  { label: "Projects", href: "/projects" },
                  { label: "DePIN App", href: "/projects/depin" },
                  { label: "Components", href: "/projects/depin/components" },
                  { label: "Navigation", href: "/projects/depin/components/nav" },
                  { label: "Breadcrumbs" },
                ]} 
              />
            </ComponentShowcase>
          </div>

          {/* Tabs */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Tabs</h3>
            
            <ComponentShowcase title="Primary Tabs (Segmented)" className="block">
              <Tabs defaultValue="overview" className="w-full max-w-md">
                <TabsList variant="primary" fullWidth>
                  <TabsTrigger value="overview" variant="primary" fullWidth>Overview</TabsTrigger>
                  <TabsTrigger value="analytics" variant="primary" fullWidth>Analytics</TabsTrigger>
                  <TabsTrigger value="reports" variant="primary" fullWidth>Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 bg-surface-2 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">Overview content goes here.</p>
                </TabsContent>
                <TabsContent value="analytics">
                  <p className="text-sm text-muted-foreground">Analytics content goes here.</p>
                </TabsContent>
                <TabsContent value="reports">
                  <p className="text-sm text-muted-foreground">Reports content goes here.</p>
                </TabsContent>
              </Tabs>
            </ComponentShowcase>

            <ComponentShowcase title="Secondary Tabs (Underline)" className="block">
              <Tabs defaultValue="all" className="w-full">
                <TabsList variant="secondary">
                  <TabsTrigger value="all" variant="secondary">All Devices</TabsTrigger>
                  <TabsTrigger value="active" variant="secondary">Active</TabsTrigger>
                  <TabsTrigger value="offline" variant="secondary" badge={2}>Offline</TabsTrigger>
                  <TabsTrigger value="pending" variant="secondary">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="p-4">
                  <p className="text-sm text-muted-foreground">Showing all devices.</p>
                </TabsContent>
              </Tabs>
            </ComponentShowcase>

            <ComponentShowcase title="Pill Tabs" className="block">
              <Tabs defaultValue="1d" className="w-full">
                <TabsList variant="pills">
                  <TabsTrigger value="1d" variant="pills">1D</TabsTrigger>
                  <TabsTrigger value="1w" variant="pills">1W</TabsTrigger>
                  <TabsTrigger value="1m" variant="pills">1M</TabsTrigger>
                  <TabsTrigger value="3m" variant="pills">3M</TabsTrigger>
                  <TabsTrigger value="1y" variant="pills">1Y</TabsTrigger>
                  <TabsTrigger value="all" variant="pills">All</TabsTrigger>
                </TabsList>
                <TabsContent value="1d" className="p-4">
                  <p className="text-sm text-muted-foreground">Showing 1 day data.</p>
                </TabsContent>
              </Tabs>
            </ComponentShowcase>

            <ComponentShowcase title="With Icons & Badges">
              <Tabs defaultValue="home" className="w-full max-w-lg">
                <TabsList variant="primary">
                  <TabsTrigger value="home" variant="primary" icon={<Home className="w-4 h-4" />}>Home</TabsTrigger>
                  <TabsTrigger value="notifications" variant="primary" icon={<Bell className="w-4 h-4" />} badge={5}>Notifications</TabsTrigger>
                  <TabsTrigger value="settings" variant="primary" icon={<Settings className="w-4 h-4" />}>Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </ComponentShowcase>
          </div>
        </section>

        {/* Content Primitives Section */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Content Primitives</h2>
            <p className="text-muted-foreground">Building blocks for displaying content: cards, stats, lists, and tables.</p>
          </div>

          {/* StatCard */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Stat Card</h3>
            
            <ComponentShowcase title="Standard Stat Cards" className="block">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Earnings"
                  value="$12,450"
                  delta={{ value: "+12.5%", type: "increase", label: "vs last month" }}
                  icon={DollarSign}
                />
                <StatCard
                  label="Active Devices"
                  value="24"
                  delta={{ value: "+3", type: "increase", label: "this week" }}
                  icon={Cpu}
                  variant="brand"
                />
                <StatCard
                  label="Uptime"
                  value="99.8%"
                  delta={{ value: "-0.2%", type: "decrease", label: "vs target" }}
                  icon={Activity}
                />
                <StatCard
                  label="Pending Rewards"
                  value="$842"
                  delta={{ value: "Processing", type: "neutral" }}
                  icon={Clock}
                />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Variants">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <StatCard label="Default" value="1,234" variant="default" />
                <StatCard label="Elevated" value="5,678" variant="elevated" />
                <StatCard label="Outlined" value="9,012" variant="outlined" />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Compact Stats">
              <div className="flex flex-wrap gap-8">
                <StatCardCompact label="Revenue" value="$8.2K" delta="+15%" deltaType="increase" />
                <StatCardCompact label="Users" value="1.2K" delta="-3%" deltaType="decrease" />
                <StatCardCompact label="Conversion" value="4.5%" delta="0%" deltaType="neutral" />
              </div>
            </ComponentShowcase>
          </div>

          {/* ListRow */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">List Row</h3>
            
            <ComponentShowcase title="Standard List" className="block p-0 overflow-hidden">
              <ListContainer>
                <ListRow
                  icon={Cpu}
                  iconBg="bg-brand-yellow-soft"
                  title="Helium Miner Pro"
                  subtitle="Online • 24h uptime"
                  meta={<span className="text-sm font-semibold text-success">+$4.50</span>}
                  showChevron
                  onClick={() => {}}
                />
                <ListRow
                  icon={Wallet}
                  iconBg="bg-info-soft"
                  title="DIMO Dongle"
                  subtitle="Connected • 142 trips recorded"
                  meta={<Badge variant="success-subtle" size="sm">Active</Badge>}
                  showChevron
                  onClick={() => {}}
                />
                <ListRow
                  icon={BarChart3}
                  iconBg="bg-success-soft"
                  title="WeatherXM Station"
                  subtitle="Last sync: 5 minutes ago"
                  meta={<span className="text-xs text-muted-foreground">$12.30/day</span>}
                  showChevron
                  onClick={() => {}}
                />
              </ListContainer>
            </ComponentShowcase>

            <ComponentShowcase title="With Section Headers" className="block p-0 overflow-hidden">
              <ListContainer>
                <ListSectionHeader title="Active Devices" action={<Button variant="link" size="sm">View All</Button>} />
                <ListRow
                  icon={<Wifi className="w-5 h-5 text-success" />}
                  title="Node #1"
                  subtitle="192.168.1.100"
                  meta={<Badge variant="success" size="sm">Online</Badge>}
                />
                <ListRow
                  icon={<Wifi className="w-5 h-5 text-success" />}
                  title="Node #2"
                  subtitle="192.168.1.101"
                  meta={<Badge variant="success" size="sm">Online</Badge>}
                />
                <ListSectionHeader title="Offline Devices" />
                <ListRow
                  icon={<WifiOff className="w-5 h-5 text-muted-foreground" />}
                  title="Node #3"
                  subtitle="Last seen: 2 hours ago"
                  meta={<Badge variant="secondary" size="sm">Offline</Badge>}
                  disabled
                />
              </ListContainer>
            </ComponentShowcase>
          </div>

          {/* Divider */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Divider</h3>
            
            <ComponentShowcase title="Variants" className="block">
              <div className="space-y-6 w-full">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Default</p>
                  <Divider />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Subtle</p>
                  <Divider variant="subtle" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Strong</p>
                  <Divider variant="strong" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Brand</p>
                  <Divider variant="brand" />
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Label">
              <div className="w-full">
                <Divider label="Or continue with" spacing="default" />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Vertical">
              <div className="flex items-center h-12 gap-4">
                <span className="text-sm">Option A</span>
                <Divider orientation="vertical" />
                <span className="text-sm">Option B</span>
                <Divider orientation="vertical" />
                <span className="text-sm">Option C</span>
              </div>
            </ComponentShowcase>
          </div>

          {/* EmptyState */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Empty State</h3>
            
            <ShowcaseGrid columns={2}>
              <ComponentShowcase title="Default" className="block">
                <Card variant="default" className="w-full">
                  <EmptyState
                    title="No devices yet"
                    description="Connect your first DePIN device to start earning rewards."
                    action={{ label: "Add Device", onClick: () => {} }}
                    size="sm"
                  />
                </Card>
              </ComponentShowcase>

              <ComponentShowcase title="Search (No Results)" className="block">
                <Card variant="default" className="w-full">
                  <EmptyState
                    variant="search"
                    title="No results found"
                    description="Try adjusting your search or filters to find what you're looking for."
                    secondaryAction={{ label: "Clear filters", onClick: () => {} }}
                    size="sm"
                  />
                </Card>
              </ComponentShowcase>

              <ComponentShowcase title="Error State" className="block">
                <Card variant="default" className="w-full">
                  <EmptyState
                    variant="error"
                    title="Something went wrong"
                    description="We couldn't load your data. Please try again."
                    action={{ label: "Retry", onClick: () => {} }}
                    size="sm"
                  />
                </Card>
              </ComponentShowcase>

              <ComponentShowcase title="Offline" className="block">
                <Card variant="default" className="w-full">
                  <EmptyState
                    variant="offline"
                    title="You're offline"
                    description="Check your internet connection and try again."
                    action={{ label: "Retry", onClick: () => {} }}
                    size="sm"
                  />
                </Card>
              </ComponentShowcase>
            </ShowcaseGrid>

            <ComponentShowcase title="Inline Empty State" className="block">
              <Card variant="default" className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <EmptyStateInline 
                    message="No transactions yet" 
                    action={{ label: "Make a deposit", onClick: () => {} }}
                  />
                </CardContent>
              </Card>
            </ComponentShowcase>
          </div>

          {/* Table */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Table</h3>
            
            <ComponentShowcase title="Standard Table" className="block p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead className="text-right">Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Helium Miner #1</TableCell>
                    <TableCell><Badge variant="success" size="sm">Online</Badge></TableCell>
                    <TableCell>99.9%</TableCell>
                    <TableCell className="text-right font-semibold">$124.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">DIMO Dongle</TableCell>
                    <TableCell><Badge variant="success" size="sm">Online</Badge></TableCell>
                    <TableCell>98.2%</TableCell>
                    <TableCell className="text-right font-semibold">$45.20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">WeatherXM</TableCell>
                    <TableCell><Badge variant="warning" size="sm">Syncing</Badge></TableCell>
                    <TableCell>95.1%</TableCell>
                    <TableCell className="text-right font-semibold">$78.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentShowcase>

            <ComponentShowcase title="Zebra Striping" className="block p-0 overflow-hidden">
              <Table zebra>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Daily Reward</TableCell>
                    <TableCell className="text-muted-foreground">Jan 12, 2025</TableCell>
                    <TableCell><Badge variant="success-subtle" size="sm">Reward</Badge></TableCell>
                    <TableCell className="text-right text-success font-semibold">+$12.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Withdrawal</TableCell>
                    <TableCell className="text-muted-foreground">Jan 11, 2025</TableCell>
                    <TableCell><Badge variant="secondary" size="sm">Transfer</Badge></TableCell>
                    <TableCell className="text-right font-semibold">-$50.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bonus</TableCell>
                    <TableCell className="text-muted-foreground">Jan 10, 2025</TableCell>
                    <TableCell><Badge variant="brand-subtle" size="sm">Bonus</Badge></TableCell>
                    <TableCell className="text-right text-success font-semibold">+$25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Daily Reward</TableCell>
                    <TableCell className="text-muted-foreground">Jan 10, 2025</TableCell>
                    <TableCell><Badge variant="success-subtle" size="sm">Reward</Badge></TableCell>
                    <TableCell className="text-right text-success font-semibold">+$11.80</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentShowcase>

            <ComponentShowcase title="Clickable Rows" className="block p-0 overflow-hidden">
              <Table size="sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow clickable onClick={() => {}}>
                    <TableCell className="font-medium">Node Alpha</TableCell>
                    <TableCell>Solana</TableCell>
                    <TableCell className="text-muted-foreground">New York, US</TableCell>
                  </TableRow>
                  <TableRow clickable onClick={() => {}}>
                    <TableCell className="font-medium">Node Beta</TableCell>
                    <TableCell>Ethereum</TableCell>
                    <TableCell className="text-muted-foreground">London, UK</TableCell>
                  </TableRow>
                  <TableRow clickable selected>
                    <TableCell className="font-medium">Node Gamma</TableCell>
                    <TableCell>Polygon</TableCell>
                    <TableCell className="text-muted-foreground">Tokyo, JP</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentShowcase>

            <ComponentShowcase title="Empty Table" className="block p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableEmpty colSpan={3} message="No devices found" />
                </TableBody>
              </Table>
            </ComponentShowcase>
          </div>

          {/* Card Variants Reminder */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Card Variants</h3>
            
            <ShowcaseGrid columns={3}>
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default</CardTitle>
                  <CardDescription>Standard card style</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated</CardTitle>
                  <CardDescription>More prominent shadow</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="interactive" onClick={() => {}}>
                <CardHeader>
                  <CardTitle>Interactive</CardTitle>
                  <CardDescription>Hover to see effect</CardDescription>
                </CardHeader>
              </Card>
            </ShowcaseGrid>
          </div>
        </section>

        {/* Progress & Rewards */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Progress & Rewards</h2>
            <p className="text-muted-foreground">Gamification components with tasteful motion and reduced-motion support.</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Progress Bar</h3>
            
            <ComponentShowcase title="Sizes" description="From thin to thick">
              <div className="w-full max-w-md space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Extra Small (xs)</p>
                  <Progress value={75} size="xs" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Small (sm)</p>
                  <Progress value={75} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Default</p>
                  <Progress value={75} size="default" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Large (lg)</p>
                  <Progress value={75} size="lg" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Extra Large (xl)</p>
                  <Progress value={75} size="xl" />
                </div>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Variants" description="Status colors">
              <div className="w-full max-w-md space-y-3">
                <Progress value={65} variant="default" />
                <Progress value={65} variant="brand" />
                <Progress value={65} variant="success" />
                <Progress value={65} variant="warning" />
                <Progress value={65} variant="danger" />
                <Progress value={65} variant="info" />
                <Progress value={65} variant="gradient" />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Value Label">
              <div className="w-full max-w-md pt-6">
                <Progress value={progressValue} variant="brand" showValue />
              </div>
            </ComponentShowcase>
          </div>

          {/* Progress Ring */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Progress Ring</h3>
            
            <ComponentShowcase title="Sizes">
              <ProgressRing value={65} size="sm" showValue />
              <ProgressRing value={65} size="default" showValue />
              <ProgressRing value={65} size="lg" showValue />
              <ProgressRing value={65} size="xl" showValue />
            </ComponentShowcase>

            <ComponentShowcase title="Variants">
              <ProgressRing value={75} variant="default" showValue />
              <ProgressRing value={75} variant="brand" showValue />
              <ProgressRing value={75} variant="success" showValue />
              <ProgressRing value={75} variant="warning" showValue />
              <ProgressRing value={75} variant="danger" showValue />
              <ProgressRing value={75} variant="info" showValue />
            </ComponentShowcase>

            <ComponentShowcase title="With Label">
              <ProgressRing value={85} variant="brand" size="lg" showValue label="Complete" />
              <ProgressRing value={42} variant="success" size="lg" showValue label="Synced" />
              <ProgressRing value={7} max={10} variant="info" size="lg" showValue label="Level 7" />
            </ComponentShowcase>
          </div>

          {/* Streak Indicator */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Streak Indicator</h3>
            
            <ComponentShowcase title="Variants" description="Tasteful streak displays">
              <StreakIndicator count={12} variant="fire" />
              <StreakIndicator count={7} variant="electric" />
              <StreakIndicator count={30} variant="gold" />
              <StreakIndicator count={5} variant="default" />
            </ComponentShowcase>

            <ComponentShowcase title="Sizes">
              <StreakIndicator count={12} size="sm" />
              <StreakIndicator count={12} size="default" />
              <StreakIndicator count={12} size="lg" />
              <StreakIndicator count={12} size="xl" />
            </ComponentShowcase>

            <ComponentShowcase title="With Label">
              <StreakIndicator count={12} label="day streak" />
              <StreakIndicator count={7} variant="electric" label="sessions" />
              <StreakIndicator count={30} variant="gold" label="days" milestone />
            </ComponentShowcase>

            <ComponentShowcase title="Streak Badges" description="Compact badge style">
              <StreakBadge count={5} variant="fire" size="sm" />
              <StreakBadge count={12} variant="fire" />
              <StreakBadge count={30} variant="gold" size="lg" />
              <StreakBadge count={7} variant="electric" />
            </ComponentShowcase>
          </div>

          {/* XP Count Up */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">XP Count Up</h3>
            
            <ComponentShowcase title="Animated Counter" description="Click to add XP">
              <div className="flex flex-col items-center gap-4">
                <XPCountUp value={xpValue} variant="brand" size="lg" />
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => setXpValue(prev => prev + Math.floor(Math.random() * 500) + 100)}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add XP
                </Button>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Sizes">
              <XPCountUp value={1250} size="sm" />
              <XPCountUp value={1250} size="default" />
              <XPCountUp value={1250} size="lg" />
              <XPCountUp value={1250} size="xl" />
            </ComponentShowcase>

            <ComponentShowcase title="Variants">
              <XPCountUp value={2500} variant="default" />
              <XPCountUp value={2500} variant="brand" />
              <XPCountUp value={2500} variant="success" />
              <XPCountUp value={2500} variant="gradient" />
            </ComponentShowcase>

            <ComponentShowcase title="Custom Labels">
              <XPCountUp value={156.50} prefix="$" suffix="" />
              <XPCountUp value={42} suffix="pts" />
              <XPCountUp value={1000} suffix="tokens" variant="brand" />
            </ComponentShowcase>

            <ComponentShowcase title="Inline Variant">
              <p className="text-sm">
                You've earned <XPCountUpInline value={350} /> today!
              </p>
            </ComponentShowcase>
          </div>

          {/* Reward Toast */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Reward Toast</h3>
            
            <ComponentShowcase title="Variants" className="block">
              <div className="space-y-3 max-w-sm">
                <RewardToast 
                  variant="brand"
                  title="Daily Bonus!"
                  description="Keep up the great work"
                  value="50 XP"
                  icon="sparkles"
                />
                <RewardToast 
                  variant="success"
                  title="Mission Complete"
                  description="Earned your first reward"
                  value="100"
                  icon="trophy"
                />
                <RewardToast 
                  variant="gold"
                  title="Achievement Unlocked"
                  description="You're on fire!"
                  value="500 XP"
                  icon="star"
                />
                <RewardToast 
                  variant="celebration"
                  title="Level Up!"
                  description="You reached level 5"
                  icon="zap"
                />
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Interactive Demo">
              <div className="flex flex-col items-center gap-4">
                <Button 
                  variant="brand" 
                  onClick={() => setShowRewardToast(true)}
                >
                  <Gift className="w-4 h-4 mr-2" /> Show Reward Toast
                </Button>
                {showRewardToast && (
                  <div className="w-full max-w-sm">
                    <RewardToast 
                      variant="celebration"
                      title="Bonus Earned!"
                      description="You've unlocked a special reward"
                      value="250"
                      icon="gift"
                      onDismiss={() => setShowRewardToast(false)}
                    />
                  </div>
                )}
              </div>
            </ComponentShowcase>
          </div>

          {/* Mission Card */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Mission Card</h3>
            
            <ShowcaseGrid columns={2}>
              <ComponentShowcase title="Active Mission" className="block">
                <MissionCard
                  title="Complete 5 Daily Check-ins"
                  description="Check in every day to build your streak"
                  progress={3}
                  progressMax={5}
                  reward={100}
                  ctaLabel="Check In"
                  onCtaClick={() => {}}
                />
              </ComponentShowcase>

              <ComponentShowcase title="Highlighted" className="block">
                <MissionCard
                  variant="highlighted"
                  title="First Device Setup"
                  description="Connect your first DePIN device to earn bonus XP"
                  icon="zap"
                  reward={500}
                  ctaLabel="Get Started"
                  onCtaClick={() => {}}
                />
              </ComponentShowcase>

              <ComponentShowcase title="Near Completion" className="block">
                <MissionCard
                  title="Refer 3 Friends"
                  description="Invite friends and earn together"
                  progress={2}
                  progressMax={3}
                  reward={250}
                  timeRemaining="2 days left"
                  ctaLabel="Invite"
                  onCtaClick={() => {}}
                />
              </ComponentShowcase>

              <ComponentShowcase title="Completed" className="block">
                <MissionCard
                  title="Complete Profile"
                  description="Fill out your profile information"
                  progress={5}
                  progressMax={5}
                  reward={50}
                  completed
                  onCtaClick={() => {}}
                />
              </ComponentShowcase>

              <ComponentShowcase title="Locked" className="block">
                <MissionCard
                  title="Premium Challenge"
                  description="Unlock exclusive rewards"
                  locked
                  reward={1000}
                />
              </ComponentShowcase>

              <ComponentShowcase title="Compact Variant" className="block">
                <div className="space-y-2">
                  <MissionCardCompact 
                    title="Daily Login" 
                    progress={1} 
                    progressMax={1}
                    reward={10}
                    completed
                  />
                  <MissionCardCompact 
                    title="Sync Device Data" 
                    progress={3} 
                    progressMax={5}
                    reward={25}
                  />
                  <MissionCardCompact 
                    title="Join Community" 
                    reward={50}
                  />
                </div>
              </ComponentShowcase>
            </ShowcaseGrid>
          </div>
        </section>

        {/* Overlays */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-2">Overlays</h2>
            <p className="text-muted-foreground">Modal dialogs, bottom sheets, toasts, and alert banners with semantic overlay backgrounds.</p>
          </div>

          {/* Modal Dialog */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Modal Dialog</h3>
            
            <ComponentShowcase title="Sizes" description="Small, default, large, and extra large">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Small Modal</Button>
                </DialogTrigger>
                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle>Small Dialog</DialogTitle>
                    <DialogDescription>A compact modal for simple actions.</DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <p className="text-sm text-muted-foreground">This is a small dialog perfect for quick confirmations or minimal content.</p>
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="primary">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Default Modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <div className="space-y-4">
                      <FormField label="Display Name">
                        <TextInput placeholder="Enter your name" />
                      </FormField>
                      <FormField label="Username">
                        <TextInput placeholder="@username" />
                      </FormField>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">Large Modal</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader>
                    <DialogTitle>Device Settings</DialogTitle>
                    <DialogDescription>Configure your DePIN device settings and preferences.</DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <div className="space-y-4">
                      <Card variant="default">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Auto-sync</p>
                              <p className="text-sm text-muted-foreground">Automatically sync device data</p>
                            </div>
                            <Switch />
                          </div>
                        </CardContent>
                      </Card>
                      <Card variant="default">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive earnings alerts</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="primary">Save Settings</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ComponentShowcase>
          </div>

          {/* Bottom Sheet */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Bottom Sheet</h3>
            
            <ComponentShowcase title="Mobile Bottom Sheet" description="Swipe-to-dismiss drawer for mobile interfaces">
              <BottomSheet>
                <BottomSheetTrigger asChild>
                  <Button variant="outline">Open Bottom Sheet</Button>
                </BottomSheetTrigger>
                <BottomSheetContent>
                  <BottomSheetHeader>
                    <BottomSheetTitle>Select Action</BottomSheetTitle>
                    <BottomSheetDescription>Choose an action for your device</BottomSheetDescription>
                  </BottomSheetHeader>
                  <BottomSheetBody>
                    <div className="space-y-2">
                      <ListRow 
                        icon={Settings} 
                        title="Device Settings" 
                        subtitle="Configure your device"
                      />
                      <ListRow 
                        icon={Activity} 
                        title="View Activity" 
                        subtitle="See recent earnings"
                      />
                      <ListRow 
                        icon={Wifi} 
                        title="Connection Status" 
                        subtitle="Check network connectivity"
                      />
                    </div>
                  </BottomSheetBody>
                  <BottomSheetFooter>
                    <Button variant="primary" className="w-full">Done</Button>
                  </BottomSheetFooter>
                </BottomSheetContent>
              </BottomSheet>

              <BottomSheet>
                <BottomSheetTrigger asChild>
                  <Button variant="secondary">Large Sheet</Button>
                </BottomSheetTrigger>
                <BottomSheetContent size="lg">
                  <BottomSheetHeader>
                    <BottomSheetTitle>Transaction History</BottomSheetTitle>
                    <BottomSheetDescription>Your recent earnings and withdrawals</BottomSheetDescription>
                  </BottomSheetHeader>
                  <BottomSheetBody>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <div>
                          <p className="font-medium">Daily Reward</p>
                          <p className="text-xs text-muted-foreground">Jan 12, 2025</p>
                        </div>
                        <span className="text-success font-semibold">+$12.50</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <div>
                          <p className="font-medium">Bonus</p>
                          <p className="text-xs text-muted-foreground">Jan 11, 2025</p>
                        </div>
                        <span className="text-success font-semibold">+$25.00</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <div>
                          <p className="font-medium">Withdrawal</p>
                          <p className="text-xs text-muted-foreground">Jan 10, 2025</p>
                        </div>
                        <span className="font-semibold">-$50.00</span>
                      </div>
                    </div>
                  </BottomSheetBody>
                </BottomSheetContent>
              </BottomSheet>
            </ComponentShowcase>
          </div>

          {/* Toast System */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Toast System</h3>
            
            <ComponentShowcase title="Toast Variants" description="Click to trigger different toast types">
              <Button 
                variant="outline"
                onClick={() => toast({
                  title: "Default Toast",
                  description: "This is a default notification",
                })}
              >
                Default
              </Button>
              <Button 
                variant="success"
                onClick={() => toast({
                  variant: "success",
                  title: "Success!",
                  description: "Your changes have been saved",
                })}
              >
                Success
              </Button>
              <Button 
                variant="info"
                onClick={() => toast({
                  variant: "info",
                  title: "Did you know?",
                  description: "You can earn more by staying online",
                })}
              >
                Info
              </Button>
              <Button 
                variant="warning"
                onClick={() => toast({
                  variant: "warning",
                  title: "Warning",
                  description: "Your device is running low on storage",
                })}
              >
                Warning
              </Button>
              <Button 
                variant="destructive"
                onClick={() => toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to connect to the network",
                })}
              >
                Danger
              </Button>
              <Button 
                variant="brand"
                onClick={() => toast({
                  variant: "reward",
                  title: "Reward Earned!",
                  description: "You just earned 50 XP",
                })}
              >
                Reward
              </Button>
            </ComponentShowcase>
          </div>

          {/* Alert Banner */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Alert Banner</h3>
            
            <ComponentShowcase title="Variants" className="block">
              <div className="space-y-3 max-w-xl">
                <AlertBanner variant="info" title="New Feature Available">
                  Check out our latest device monitoring tools.
                </AlertBanner>
                <AlertBanner variant="success" title="Connection Established">
                  Your device is now synced and earning rewards.
                </AlertBanner>
                <AlertBanner variant="warning" title="Maintenance Scheduled">
                  The network will undergo maintenance on Jan 15.
                </AlertBanner>
                <AlertBanner variant="danger" title="Device Offline">
                  Your Helium miner has been offline for 2 hours.
                </AlertBanner>
                <AlertBanner variant="brand" title="Special Offer">
                  Earn 2x rewards this weekend!
                </AlertBanner>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Dismissible" className="block">
              <div className="space-y-3 max-w-xl">
                <AlertBanner 
                  variant="info" 
                  dismissible
                  title="Pro Tip"
                >
                  You can dismiss this banner by clicking the X button.
                </AlertBanner>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="With Action" className="block">
              <div className="max-w-xl">
                <AlertBanner 
                  variant="warning" 
                  title="Update Available"
                  action={
                    <Button size="sm" variant="warning">Update Now</Button>
                  }
                >
                  A new firmware version is available for your device.
                </AlertBanner>
              </div>
            </ComponentShowcase>

            <ComponentShowcase title="Sticky Banner" className="block">
              <div className="space-y-2">
                <AlertStickyBanner variant="brand">
                  🎉 Limited time: Earn 3x rewards on all connected devices!
                </AlertStickyBanner>
                <AlertStickyBanner variant="warning">
                  ⚠️ Scheduled maintenance tonight at 2:00 AM UTC
                </AlertStickyBanner>
                <AlertStickyBanner variant="danger" dismissible>
                  Network issues detected in your region
                </AlertStickyBanner>
              </div>
            </ComponentShowcase>
          </div>

          {/* Confirm Dialog */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Confirm Dialog</h3>
            
            <ComponentShowcase title="Destructive Confirmation" description="For dangerous actions like delete">
              <ConfirmDialogSimple
                trigger={<Button variant="destructive">Delete Device</Button>}
                title="Delete Device?"
                description="This action cannot be undone. This will permanently delete your device and remove all associated data."
                confirmLabel="Delete"
                variant="destructive"
                icon="delete"
                onConfirm={() => toast({ variant: "success", title: "Device deleted" })}
              />

              <ConfirmDialogSimple
                trigger={<Button variant="outline">Log Out</Button>}
                title="Log out?"
                description="You'll need to sign in again to access your account."
                confirmLabel="Log Out"
                variant="warning"
                icon="logout"
                onConfirm={() => toast({ title: "Logged out successfully" })}
              />

              <ConfirmDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <ConfirmDialogTrigger asChild>
                  <Button variant="secondary">Custom Dialog</Button>
                </ConfirmDialogTrigger>
                <ConfirmDialogContent>
                  <ConfirmDialogHeader>
                    <ConfirmDialogIcon variant="warning" icon="security" />
                    <ConfirmDialogTitle>Reset Security Settings?</ConfirmDialogTitle>
                    <ConfirmDialogDescription className="mt-2">
                      This will reset all your security preferences including 2FA. You'll need to set them up again.
                    </ConfirmDialogDescription>
                  </ConfirmDialogHeader>
                  <ConfirmDialogFooter className="mt-4">
                    <ConfirmDialogCancel>Keep Settings</ConfirmDialogCancel>
                    <ConfirmDialogAction 
                      variant="warning"
                      onClick={() => toast({ variant: "warning", title: "Settings reset" })}
                    >
                      Reset Settings
                    </ConfirmDialogAction>
                  </ConfirmDialogFooter>
                </ConfirmDialogContent>
              </ConfirmDialog>
            </ComponentShowcase>
          </div>
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
