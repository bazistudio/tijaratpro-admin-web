/**
 * Design Tokens — TijaratPro Admin Web
 * ⚠️  These MUST stay in sync with CSS variables in globals.css.
 */
export const tokens = {
  colors: {
    primary:      "#2EC4B6",
    primaryLight: "#A5F0E9",
    primaryDark:  "#2BACA0",
    success: "#16A34A",
    warning: "#FBBF24",
    danger:  "#F43F5E",
    info:    "#3B82F6",

    black: "#0F172A",
    white: "#FFFFFF",

    gray: {
      50:  "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#020617",
    },
  },
} as const;
