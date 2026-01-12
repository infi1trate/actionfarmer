/**
 * DePIN Design System Tokens
 * Yellow-Led Palette with Neutral Structure
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
      // Warm Neutrals (slightly warm undertone)
      neutral: {
        50: "40 20% 99%",
        100: "40 15% 97%",
        200: "40 12% 95%",
        300: "40 12% 90%",
        400: "40 10% 85%",
        500: "30 8% 65%",
        600: "30 8% 50%",
        700: "30 8% 35%",
        800: "30 12% 18%",
        900: "30 12% 11%",
        950: "30 12% 7%",
      },
      // Brand Yellow - Energetic Modern Yellow
      yellow: {
        50: "48 100% 97%",
        100: "48 100% 94%",
        200: "48 98% 85%",
        300: "48 97% 72%",
        400: "48 96% 60%",
        500: "48 96% 53%",  // Primary brand
        600: "45 96% 48%",  // Hover
        700: "42 94% 43%",  // Active
        800: "38 90% 36%",
        900: "35 85% 28%",
        950: "32 80% 18%",
      },
      // Success - Mint-leaning Green (tasteful, not neon)
      mint: {
        50: "160 60% 96%",
        100: "160 58% 92%",
        200: "160 55% 82%",
        300: "160 52% 68%",
        400: "160 58% 52%",
        500: "160 60% 42%",  // Primary
        600: "160 62% 36%",  // Hover
        700: "160 65% 30%",  // Active
        800: "160 62% 24%",
        900: "160 60% 18%",
        950: "160 55% 10%",
      },
      // Danger - Coral/Red (warm, not aggressive)
      coral: {
        50: "4 85% 97%",
        100: "4 82% 94%",
        200: "4 80% 86%",
        300: "4 78% 74%",
        400: "4 78% 66%",
        500: "4 80% 58%",   // Primary
        600: "4 78% 50%",   // Hover
        700: "4 76% 44%",   // Active
        800: "4 72% 36%",
        900: "4 68% 28%",
        950: "4 65% 16%",
      },
      // Warning - Amber/Orange (distinct from brand yellow)
      amber: {
        50: "25 100% 96%",
        100: "25 98% 92%",
        200: "25 96% 82%",
        300: "25 94% 70%",
        400: "25 95% 60%",
        500: "25 95% 53%",  // Primary
        600: "22 95% 47%",  // Hover
        700: "20 94% 42%",  // Active
        800: "18 90% 35%",
        900: "16 85% 28%",
        950: "14 80% 16%",
      },
      // Info - Blue (clean, professional)
      blue: {
        50: "210 80% 97%",
        100: "210 78% 94%",
        200: "210 82% 86%",
        300: "210 84% 74%",
        400: "210 84% 65%",
        500: "210 85% 55%",  // Primary
        600: "210 85% 48%",  // Hover
        700: "210 85% 42%",  // Active
        800: "210 82% 35%",
        900: "210 78% 28%",
        950: "210 75% 18%",
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
      sm: "0.375rem",    // 6px - soft-rounded
      md: "0.5rem",      // 8px
      DEFAULT: "0.75rem", // 12px - main rounded
      lg: "1rem",        // 16px
      xl: "1.25rem",     // 20px
      "2xl": "1.5rem",   // 24px
      "3xl": "2rem",     // 32px
      full: "9999px",
    },
    shadow: {
      none: "none",
      xs: "0 1px 2px 0 hsl(30 15% 11% / 0.04)",
      sm: "0 1px 3px 0 hsl(30 15% 11% / 0.06), 0 1px 2px -1px hsl(30 15% 11% / 0.06)",
      md: "0 4px 6px -1px hsl(30 15% 11% / 0.08), 0 2px 4px -2px hsl(30 15% 11% / 0.06)",
      lg: "0 10px 15px -3px hsl(30 15% 11% / 0.1), 0 4px 6px -4px hsl(30 15% 11% / 0.08)",
      xl: "0 20px 25px -5px hsl(30 15% 11% / 0.1), 0 8px 10px -6px hsl(30 15% 11% / 0.08)",
      "2xl": "0 25px 50px -12px hsl(30 15% 11% / 0.2)",
      inner: "inset 0 2px 4px 0 hsl(30 15% 11% / 0.05)",
      glow: "0 0 20px hsl(48 96% 53% / 0.35)",
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
      // Brand Yellow
      brand: {
        yellow: "48 96% 53%",
        yellowHover: "45 96% 48%",
        yellowActive: "42 94% 43%",
        yellowSoft: "48 100% 97%",
        yellowForeground: "30 20% 11%",  // Dark text for accessibility
      },
      // Neutrals
      bg: "40 20% 99%",
      surface: "0 0% 100%",
      surface2: "40 15% 97%",
      surface3: "40 12% 95%",
      text: "30 15% 11%",
      text2: "30 8% 35%",
      text3: "30 5% 50%",
      border: "40 12% 90%",
      border2: "40 10% 85%",
      overlay: "30 20% 8% / 0.6",
      // Status - Success (Mint)
      success: {
        DEFAULT: "160 60% 42%",
        hover: "160 62% 36%",
        active: "160 65% 30%",
        soft: "160 60% 96%",
        foreground: "0 0% 100%",
        text: "160 65% 28%",
      },
      // Status - Info (Blue)
      info: {
        DEFAULT: "210 85% 55%",
        hover: "210 85% 48%",
        active: "210 85% 42%",
        soft: "210 80% 97%",
        foreground: "0 0% 100%",
        text: "210 80% 35%",
      },
      // Status - Warning (Amber)
      warning: {
        DEFAULT: "25 95% 53%",
        hover: "22 95% 47%",
        active: "20 94% 42%",
        soft: "25 100% 96%",
        foreground: "30 20% 11%",
        text: "20 90% 32%",
      },
      // Status - Danger (Coral)
      danger: {
        DEFAULT: "4 80% 58%",
        hover: "4 78% 50%",
        active: "4 76% 44%",
        soft: "4 85% 97%",
        foreground: "0 0% 100%",
        text: "4 75% 38%",
      },
      // State Colors
      state: {
        hover: "40 10% 96%",
        active: "40 12% 92%",
        disabledBg: "40 8% 94%",
        disabledText: "30 5% 60%",
        disabledBorder: "40 8% 88%",
        focusRing: "48 96% 53%",
        focusRingOffset: "0 0% 100%",
      },
    },
    dark: {
      // Brand Yellow (slightly brighter in dark)
      brand: {
        yellow: "48 96% 55%",
        yellowHover: "48 96% 62%",
        yellowActive: "48 96% 50%",
        yellowSoft: "48 40% 12%",
        yellowForeground: "30 20% 8%",
      },
      // Neutrals
      bg: "30 12% 7%",
      surface: "30 10% 10%",
      surface2: "30 8% 13%",
      surface3: "30 8% 16%",
      text: "40 15% 96%",
      text2: "40 8% 65%",
      text3: "40 5% 48%",
      border: "30 8% 18%",
      border2: "30 8% 24%",
      overlay: "0 0% 0% / 0.75",
      // Status - Success (Mint)
      success: {
        DEFAULT: "160 55% 48%",
        hover: "160 55% 55%",
        active: "160 55% 42%",
        soft: "160 35% 14%",
        foreground: "30 20% 8%",
        text: "160 50% 70%",
      },
      // Status - Info (Blue)
      info: {
        DEFAULT: "210 80% 60%",
        hover: "210 80% 68%",
        active: "210 80% 52%",
        soft: "210 45% 14%",
        foreground: "30 20% 8%",
        text: "210 75% 72%",
      },
      // Status - Warning (Amber)
      warning: {
        DEFAULT: "25 90% 55%",
        hover: "25 90% 62%",
        active: "25 90% 48%",
        soft: "25 45% 14%",
        foreground: "30 20% 8%",
        text: "25 85% 68%",
      },
      // Status - Danger (Coral)
      danger: {
        DEFAULT: "4 75% 62%",
        hover: "4 75% 70%",
        active: "4 75% 55%",
        soft: "4 45% 14%",
        foreground: "0 0% 100%",
        text: "4 70% 75%",
      },
      // State Colors
      state: {
        hover: "30 8% 16%",
        active: "30 10% 20%",
        disabledBg: "30 6% 14%",
        disabledText: "40 5% 38%",
        disabledBorder: "30 6% 20%",
        focusRing: "48 96% 55%",
        focusRingOffset: "30 12% 7%",
      },
    },
  },

  // ============================================
  // LAYER 3: COMPONENT TOKENS
  // ============================================
  component: {
    button: {
      radius: "var(--radius)",
      // Brand button uses yellow for action + highlights
      brand: {
        bg: "var(--brand-yellow)",
        bgHover: "var(--brand-yellow-hover)",
        bgActive: "var(--brand-yellow-active)",
        text: "var(--brand-yellow-foreground)",
      },
      // Sizes
      height: {
        xs: "1.75rem",    // 28px
        sm: "2rem",       // 32px
        md: "2.5rem",     // 40px
        lg: "2.75rem",    // 44px
        xl: "3rem",       // 48px
      },
      padding: {
        xs: "0.5rem 0.625rem",
        sm: "0.5rem 0.75rem",
        md: "0.5rem 1rem",
        lg: "0.625rem 1.25rem",
        xl: "0.75rem 1.5rem",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "0.875rem",
        lg: "1rem",
        xl: "1.125rem",
      },
    },
    input: {
      radius: "var(--radius)",
      bg: "var(--surface-2)",
      bgHover: "var(--state-hover)",
      bgFocus: "var(--surface)",
      border: "var(--border)",
      borderFocus: "var(--state-focus-ring)",
      height: {
        sm: "2rem",
        md: "2.5rem",
        lg: "2.75rem",
        xl: "3rem",
      },
    },
    card: {
      radius: "var(--radius-lg)",
      bg: "var(--surface)",
      bgHover: "var(--surface-2)",
      border: "var(--border)",
      shadow: "var(--shadow-sm)",
      padding: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
    },
    nav: {
      height: "4rem",  // 64px
      bg: "var(--surface)",
      border: "var(--border)",
      itemPadding: "0.5rem 1rem",
      itemRadius: "var(--radius)",
    },
    modal: {
      radius: "var(--radius-xl)",
      bg: "var(--surface)",
      overlay: "var(--overlay)",
      shadow: "var(--shadow-xl)",
      padding: "1.5rem",
      maxWidth: {
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        full: "100%",
      },
    },
    toast: {
      radius: "var(--radius-lg)",
      padding: "1rem 1.25rem",
      shadow: "var(--shadow-lg)",
      // Use soft backgrounds for status toasts
      success: {
        bg: "var(--success-soft)",
        border: "var(--success)",
        text: "var(--success-text)",
      },
      info: {
        bg: "var(--info-soft)",
        border: "var(--info)",
        text: "var(--info-text)",
      },
      warning: {
        bg: "var(--warning-soft)",
        border: "var(--warning)",
        text: "var(--warning-text)",
      },
      danger: {
        bg: "var(--danger-soft)",
        border: "var(--danger)",
        text: "var(--danger-text)",
      },
    },
    badge: {
      radius: "var(--radius-full)",
      padding: {
        sm: "0.125rem 0.5rem",
        md: "0.25rem 0.75rem",
        lg: "0.375rem 1rem",
      },
      fontSize: {
        sm: "0.625rem",
        md: "0.75rem",
        lg: "0.875rem",
      },
    },
    progress: {
      radius: "var(--radius-full)",
      height: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      // Brand yellow for progress indication
      indicator: "var(--brand-yellow)",
      track: "var(--surface-3)",
    },
    table: {
      headerBg: "var(--surface-2)",
      rowBg: "var(--surface)",
      rowBgHover: "var(--state-hover)",
      rowBgAlt: "var(--surface-2)",
      border: "var(--border)",
      padding: {
        cell: "0.75rem 1rem",
        cellCompact: "0.5rem 0.75rem",
      },
    },
  },
} as const;

export type Tokens = typeof tokens;
export default tokens;