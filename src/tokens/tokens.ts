/**
 * DePIN Design System Tokens
 * 
 * Three-layer token architecture:
 * 1. Primitives - Raw values (colors, spacing, typography)
 * 2. Semantics - Meaning-based mappings
 * 3. Components - Component-specific tokens
 */

export const tokens = {
  // ============================================
  // LAYER 1: PRIMITIVE TOKENS
  // ============================================
  primitive: {
    color: {
      // Neutrals
      gray: {
        50: "0 0% 98%",
        100: "0 0% 96%",
        200: "0 0% 90%",
        300: "0 0% 83%",
        400: "0 0% 64%",
        500: "0 0% 45%",
        600: "0 0% 32%",
        700: "0 0% 25%",
        800: "0 0% 15%",
        900: "0 0% 9%",
        950: "0 0% 4%",
      },
      // Brand Yellow
      yellow: {
        50: "48 100% 96%",
        100: "48 96% 89%",
        200: "48 97% 77%",
        300: "48 96% 65%",
        400: "48 96% 53%",  // Primary
        500: "43 96% 47%",
        600: "37 92% 40%",
        700: "32 81% 33%",
        800: "28 73% 28%",
        900: "24 63% 24%",
        950: "21 63% 13%",
      },
      // Success Green
      green: {
        50: "138 76% 97%",
        100: "141 84% 93%",
        200: "141 79% 85%",
        300: "142 77% 73%",
        400: "142 69% 58%",
        500: "142 71% 45%",  // Primary
        600: "142 76% 36%",
        700: "142 72% 29%",
        800: "143 64% 24%",
        900: "144 61% 20%",
        950: "145 80% 10%",
      },
      // Danger Red
      red: {
        50: "0 86% 97%",
        100: "0 93% 94%",
        200: "0 96% 89%",
        300: "0 94% 82%",
        400: "0 91% 71%",
        500: "0 84% 60%",  // Primary
        600: "0 72% 51%",
        700: "0 74% 42%",
        800: "0 70% 35%",
        900: "0 63% 31%",
        950: "0 75% 15%",
      },
      // Warning Amber
      amber: {
        50: "48 100% 96%",
        100: "48 96% 89%",
        200: "48 97% 77%",
        300: "46 97% 65%",
        400: "43 96% 56%",
        500: "38 92% 50%",  // Primary
        600: "32 95% 44%",
        700: "26 90% 37%",
        800: "23 83% 31%",
        900: "22 78% 26%",
        950: "21 92% 14%",
      },
      // Info Blue
      blue: {
        50: "214 100% 97%",
        100: "214 95% 93%",
        200: "213 97% 87%",
        300: "212 96% 78%",
        400: "213 94% 68%",
        500: "217 91% 60%",  // Primary
        600: "221 83% 53%",
        700: "224 76% 48%",
        800: "226 71% 40%",
        900: "224 64% 33%",
        950: "226 57% 21%",
      },
      // Pure
      white: "0 0% 100%",
      black: "0 0% 0%",
      transparent: "0 0% 0% / 0",
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",   // 2px
      1: "0.25rem",      // 4px
      1.5: "0.375rem",   // 6px
      2: "0.5rem",       // 8px
      2.5: "0.625rem",   // 10px
      3: "0.75rem",      // 12px
      3.5: "0.875rem",   // 14px
      4: "1rem",         // 16px
      5: "1.25rem",      // 20px
      6: "1.5rem",       // 24px
      7: "1.75rem",      // 28px
      8: "2rem",         // 32px
      9: "2.25rem",      // 36px
      10: "2.5rem",      // 40px
      11: "2.75rem",     // 44px
      12: "3rem",        // 48px
      14: "3.5rem",      // 56px
      16: "4rem",        // 64px
      20: "5rem",        // 80px
      24: "6rem",        // 96px
      28: "7rem",        // 112px
      32: "8rem",        // 128px
      36: "9rem",        // 144px
      40: "10rem",       // 160px
      44: "11rem",       // 176px
      48: "12rem",       // 192px
      52: "13rem",       // 208px
      56: "14rem",       // 224px
      60: "15rem",       // 240px
      64: "16rem",       // 256px
      72: "18rem",       // 288px
      80: "20rem",       // 320px
      96: "24rem",       // 384px
    },
    radius: {
      none: "0",
      sm: "0.375rem",    // 6px
      md: "0.5rem",      // 8px
      DEFAULT: "0.75rem", // 12px
      lg: "1rem",        // 16px
      xl: "1.25rem",     // 20px
      "2xl": "1.5rem",   // 24px
      "3xl": "2rem",     // 32px
      full: "9999px",
    },
    shadow: {
      none: "none",
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    },
    font: {
      family: {
        display: "'Barlow Condensed', sans-serif",
        body: "'Nunito', sans-serif",
        mono: "ui-monospace, SFMono-Regular, Consolas, monospace",
      },
      size: {
        xs: "0.75rem",     // 12px
        sm: "0.875rem",    // 14px
        base: "1rem",      // 16px
        lg: "1.125rem",    // 18px
        xl: "1.25rem",     // 20px
        "2xl": "1.5rem",   // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem",  // 36px
        "5xl": "3rem",     // 48px
        "6xl": "3.75rem",  // 60px
        "7xl": "4.5rem",   // 72px
        "8xl": "6rem",     // 96px
        "9xl": "8rem",     // 128px
      },
      weight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
    },
    duration: {
      fastest: "50ms",
      faster: "100ms",
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
      slower: "400ms",
      slowest: "500ms",
    },
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
    zIndex: {
      hide: "-1",
      auto: "auto",
      base: "0",
      docked: "10",
      dropdown: "1000",
      sticky: "1100",
      banner: "1200",
      overlay: "1300",
      modal: "1400",
      popover: "1500",
      toast: "1700",
      tooltip: "1800",
    },
  },

  // ============================================
  // LAYER 2: SEMANTIC TOKENS
  // ============================================
  semantic: {
    light: {
      // Backgrounds
      bg: {
        primary: "0 0% 100%",        // Main background
        secondary: "0 0% 98%",       // Secondary background
        tertiary: "0 0% 96%",        // Tertiary background
        inverse: "0 0% 9%",          // Inverse background
      },
      // Surfaces
      surface: {
        DEFAULT: "0 0% 100%",        // Card background
        raised: "0 0% 100%",         // Elevated surface
        overlay: "0 0% 100%",        // Modal/popover bg
        sunken: "0 0% 96%",          // Inset surface
      },
      // Text
      text: {
        primary: "0 0% 9%",          // Primary text
        secondary: "0 0% 32%",       // Secondary text
        tertiary: "0 0% 45%",        // Tertiary/muted text
        inverse: "0 0% 98%",         // Text on dark bg
        disabled: "0 0% 64%",        // Disabled text
      },
      // Borders
      border: {
        DEFAULT: "0 0% 90%",         // Default border
        strong: "0 0% 83%",          // Strong border
        subtle: "0 0% 96%",          // Subtle border
        focus: "48 96% 53%",         // Focus ring
      },
      // Brand
      brand: {
        primary: "48 96% 53%",       // Primary brand
        primaryHover: "43 96% 47%",  // Primary hover
        primaryActive: "37 92% 40%", // Primary active
        subtle: "48 100% 96%",       // Subtle brand bg
        foreground: "0 0% 9%",       // Text on brand
      },
      // Status - Success
      success: {
        DEFAULT: "142 71% 45%",
        hover: "142 76% 36%",
        subtle: "138 76% 97%",
        foreground: "0 0% 98%",
        text: "142 72% 29%",
      },
      // Status - Danger
      danger: {
        DEFAULT: "0 84% 60%",
        hover: "0 72% 51%",
        subtle: "0 86% 97%",
        foreground: "0 0% 98%",
        text: "0 74% 42%",
      },
      // Status - Warning
      warning: {
        DEFAULT: "38 92% 50%",
        hover: "32 95% 44%",
        subtle: "48 100% 96%",
        foreground: "0 0% 9%",
        text: "26 90% 37%",
      },
      // Status - Info
      info: {
        DEFAULT: "217 91% 60%",
        hover: "221 83% 53%",
        subtle: "214 100% 97%",
        foreground: "0 0% 98%",
        text: "224 76% 48%",
      },
      // Interactive
      focus: {
        ring: "48 96% 53%",
        ringOffset: "0 0% 100%",
      },
      // Overlay
      overlay: {
        DEFAULT: "0 0% 0% / 0.5",
        subtle: "0 0% 0% / 0.3",
        heavy: "0 0% 0% / 0.7",
      },
    },
    dark: {
      // Backgrounds
      bg: {
        primary: "0 0% 4%",
        secondary: "0 0% 7%",
        tertiary: "0 0% 9%",
        inverse: "0 0% 98%",
      },
      // Surfaces
      surface: {
        DEFAULT: "0 0% 7%",
        raised: "0 0% 9%",
        overlay: "0 0% 9%",
        sunken: "0 0% 4%",
      },
      // Text
      text: {
        primary: "0 0% 98%",
        secondary: "0 0% 64%",
        tertiary: "0 0% 45%",
        inverse: "0 0% 9%",
        disabled: "0 0% 32%",
      },
      // Borders
      border: {
        DEFAULT: "0 0% 15%",
        strong: "0 0% 25%",
        subtle: "0 0% 9%",
        focus: "48 96% 53%",
      },
      // Brand
      brand: {
        primary: "48 96% 53%",
        primaryHover: "48 96% 60%",
        primaryActive: "48 96% 65%",
        subtle: "48 50% 10%",
        foreground: "0 0% 9%",
      },
      // Status - Success
      success: {
        DEFAULT: "142 71% 45%",
        hover: "142 69% 58%",
        subtle: "142 40% 12%",
        foreground: "0 0% 98%",
        text: "142 77% 73%",
      },
      // Status - Danger
      danger: {
        DEFAULT: "0 84% 60%",
        hover: "0 91% 71%",
        subtle: "0 50% 12%",
        foreground: "0 0% 98%",
        text: "0 94% 82%",
      },
      // Status - Warning
      warning: {
        DEFAULT: "38 92% 50%",
        hover: "43 96% 56%",
        subtle: "38 50% 12%",
        foreground: "0 0% 9%",
        text: "46 97% 65%",
      },
      // Status - Info
      info: {
        DEFAULT: "217 91% 60%",
        hover: "213 94% 68%",
        subtle: "217 50% 12%",
        foreground: "0 0% 98%",
        text: "212 96% 78%",
      },
      // Interactive
      focus: {
        ring: "48 96% 53%",
        ringOffset: "0 0% 4%",
      },
      // Overlay
      overlay: {
        DEFAULT: "0 0% 0% / 0.7",
        subtle: "0 0% 0% / 0.5",
        heavy: "0 0% 0% / 0.85",
      },
    },
  },

  // ============================================
  // LAYER 3: COMPONENT TOKENS
  // ============================================
  component: {
    button: {
      radius: "var(--radius-md)",
      // Sizes
      height: {
        xs: "var(--space-7)",    // 28px
        sm: "var(--space-8)",    // 32px
        md: "var(--space-10)",   // 40px
        lg: "var(--space-11)",   // 44px
        xl: "var(--space-12)",   // 48px
      },
      padding: {
        xs: "var(--space-2) var(--space-2-5)",
        sm: "var(--space-2) var(--space-3)",
        md: "var(--space-2) var(--space-4)",
        lg: "var(--space-2-5) var(--space-5)",
        xl: "var(--space-3) var(--space-6)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        md: "var(--text-sm)",
        lg: "var(--text-base)",
        xl: "var(--text-lg)",
      },
      iconSize: {
        xs: "var(--space-3-5)",
        sm: "var(--space-4)",
        md: "var(--space-4)",
        lg: "var(--space-5)",
        xl: "var(--space-6)",
      },
    },
    input: {
      radius: "var(--radius-md)",
      height: {
        sm: "var(--space-8)",
        md: "var(--space-10)",
        lg: "var(--space-11)",
        xl: "var(--space-12)",
      },
      padding: {
        sm: "var(--space-2) var(--space-2-5)",
        md: "var(--space-2) var(--space-3)",
        lg: "var(--space-3) var(--space-4)",
        xl: "var(--space-3-5) var(--space-5)",
      },
      fontSize: {
        sm: "var(--text-sm)",
        md: "var(--text-sm)",
        lg: "var(--text-base)",
        xl: "var(--text-lg)",
      },
      borderWidth: "1px",
    },
    card: {
      radius: "var(--radius-lg)",
      padding: {
        sm: "var(--space-4)",
        md: "var(--space-6)",
        lg: "var(--space-8)",
      },
      shadow: "var(--shadow-sm)",
      borderWidth: "1px",
    },
    nav: {
      height: "var(--space-16)",  // 64px
      itemPadding: "var(--space-2) var(--space-4)",
      itemRadius: "var(--radius-md)",
      itemGap: "var(--space-1)",
    },
    modal: {
      radius: "var(--radius-xl)",
      padding: "var(--space-6)",
      maxWidth: {
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        full: "100%",
      },
      shadow: "var(--shadow-xl)",
    },
    toast: {
      radius: "var(--radius-lg)",
      padding: "var(--space-4)",
      minWidth: "20rem",
      maxWidth: "26rem",
      shadow: "var(--shadow-lg)",
      gap: "var(--space-3)",
    },
    badge: {
      radius: {
        default: "var(--radius-md)",
        pill: "var(--radius-full)",
      },
      padding: {
        sm: "var(--space-0-5) var(--space-1-5)",
        md: "var(--space-1) var(--space-2-5)",
        lg: "var(--space-1-5) var(--space-3)",
      },
      fontSize: {
        sm: "var(--text-xs)",
        md: "var(--text-xs)",
        lg: "var(--text-sm)",
      },
    },
    progress: {
      radius: "var(--radius-full)",
      height: {
        sm: "var(--space-1)",
        md: "var(--space-2)",
        lg: "var(--space-3)",
        xl: "var(--space-4)",
      },
    },
    table: {
      radius: "var(--radius-lg)",
      cellPadding: "var(--space-3) var(--space-4)",
      headerPadding: "var(--space-3) var(--space-4)",
      rowGap: "0",
      borderWidth: "1px",
    },
  },
} as const;

export type Tokens = typeof tokens;
export default tokens;
