import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // 8px grid spacing scale
      spacing: {
        "0": "0",
        "0.5": "var(--space-0-5)",  // 2px
        "1": "var(--space-1)",      // 4px
        "2": "var(--space-2)",      // 8px - base
        "3": "var(--space-3)",      // 12px
        "4": "var(--space-4)",      // 16px
        "5": "var(--space-5)",      // 20px
        "6": "var(--space-6)",      // 24px
        "8": "var(--space-8)",      // 32px
        "10": "var(--space-10)",    // 40px
        "12": "var(--space-12)",    // 48px
        "16": "var(--space-16)",    // 64px
        "20": "var(--space-20)",    // 80px
        "24": "var(--space-24)",    // 96px
      },
      fontFamily: {
        display: ["Barlow Condensed", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Cascadia Code", "Consolas", "monospace"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-h1)", letterSpacing: "var(--tracking-h1)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-h2)", letterSpacing: "var(--tracking-h2)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-h3)", letterSpacing: "var(--tracking-h3)" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--leading-body-lg)", letterSpacing: "var(--tracking-body)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)", letterSpacing: "var(--tracking-body)" }],
        "body-sm": ["var(--text-body-sm)", { lineHeight: "var(--leading-body-sm)", letterSpacing: "var(--tracking-body)" }],
        label: ["var(--text-label)", { lineHeight: "var(--leading-label)", letterSpacing: "var(--tracking-label)" }],
        caption: ["var(--text-caption)", { lineHeight: "var(--leading-caption)", letterSpacing: "var(--tracking-caption)" }],
        "mono-sm": ["var(--text-mono)", { lineHeight: "var(--leading-mono)", letterSpacing: "var(--tracking-mono)" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        // Brand Yellow
        brand: {
          yellow: "hsl(var(--brand-yellow))",
          "yellow-hover": "hsl(var(--brand-yellow-hover))",
          "yellow-active": "hsl(var(--brand-yellow-active))",
          "yellow-soft": "hsl(var(--brand-yellow-soft))",
          "yellow-foreground": "hsl(var(--brand-yellow-foreground))",
          // Legacy aliases
          primary: "hsl(var(--brand-yellow))",
          "primary-hover": "hsl(var(--brand-yellow-hover))",
          "primary-active": "hsl(var(--brand-yellow-active))",
          "primary-subtle": "hsl(var(--brand-yellow-soft))",
          "primary-foreground": "hsl(var(--brand-yellow-foreground))",
        },
        // Neutrals
        bg: "hsl(var(--bg))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
        },
        text: {
          DEFAULT: "hsl(var(--text))",
          2: "hsl(var(--text-2))",
          3: "hsl(var(--text-3))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          2: "hsl(var(--border-2))",
          strong: "hsl(var(--border-strong))",
          focus: "hsl(var(--border-focus))",
        },
        overlay: "hsl(var(--overlay))",
        // Status - Success (Mint-leaning)
        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
          active: "hsl(var(--success-active))",
          soft: "hsl(var(--success-soft))",
          foreground: "hsl(var(--success-foreground))",
          text: "hsl(var(--success-text))",
          subtle: "hsl(var(--success-soft))",
        },
        // Status - Info (Blue)
        info: {
          DEFAULT: "hsl(var(--info))",
          hover: "hsl(var(--info-hover))",
          active: "hsl(var(--info-active))",
          soft: "hsl(var(--info-soft))",
          foreground: "hsl(var(--info-foreground))",
          text: "hsl(var(--info-text))",
          subtle: "hsl(var(--info-soft))",
        },
        // Status - Warning (Amber/Orange)
        warning: {
          DEFAULT: "hsl(var(--warning))",
          hover: "hsl(var(--warning-hover))",
          active: "hsl(var(--warning-active))",
          soft: "hsl(var(--warning-soft))",
          foreground: "hsl(var(--warning-foreground))",
          text: "hsl(var(--warning-text))",
          subtle: "hsl(var(--warning-soft))",
        },
        // Status - Danger (Coral/Red)
        danger: {
          DEFAULT: "hsl(var(--danger))",
          hover: "hsl(var(--danger-hover))",
          active: "hsl(var(--danger-active))",
          soft: "hsl(var(--danger-soft))",
          foreground: "hsl(var(--danger-foreground))",
          text: "hsl(var(--danger-text))",
          subtle: "hsl(var(--danger-soft))",
        },
        // State Colors
        state: {
          hover: "hsl(var(--state-hover))",
          active: "hsl(var(--state-active))",
          "disabled-bg": "hsl(var(--state-disabled-bg))",
          "disabled-text": "hsl(var(--state-disabled-text))",
          "disabled-border": "hsl(var(--state-disabled-border))",
          "focus-ring": "hsl(var(--state-focus-ring))",
          "focus-ring-offset": "hsl(var(--state-focus-ring-offset))",
        },
        // Shadcn compatibility
        background: "hsl(var(--background))",
        "background-subtle": "hsl(var(--background-subtle))",
        foreground: "hsl(var(--foreground))",
        "foreground-secondary": "hsl(var(--foreground-secondary))",
        "foreground-muted": "hsl(var(--foreground-muted))",
        "foreground-inverted": "hsl(var(--foreground-inverted))",
        input: {
          DEFAULT: "hsl(var(--input))",
          hover: "hsl(var(--input-hover))",
        },
        ring: "hsl(var(--ring))",
        // Component tokens
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",   // 8px
        sm: "var(--radius-sm)",   // 12px
        DEFAULT: "var(--radius)", // 16px
        md: "var(--radius)",      // 16px
        lg: "var(--radius-lg)",   // 20px
        xl: "var(--radius-xl)",   // 24px
        "2xl": "var(--radius-2xl)", // 32px
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--brand-yellow) / 0.4)" },
          "50%": { boxShadow: "0 0 0 8px hsl(var(--brand-yellow) / 0)" },
        },
        "slide-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        press: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)" },
        },
        // Seed floating animation - slow, meditative breathing
        "seed-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-6px) scale(1.02)" },
        },
        // Seed pulse ring - very subtle, calm
        "seed-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.15)", opacity: "0.3" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
        // Plant sway animation
        sway: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-subtle": "bounce-subtle 0.6s ease-in-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        press: "press 0.15s ease-out",
        // Seed animations - slow, meditative
        "seed-float": "seed-float 8s ease-in-out infinite",
        "seed-pulse": "seed-pulse 4s ease-out infinite",
        // Plant animation
        sway: "sway 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;