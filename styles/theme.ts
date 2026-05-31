/**
 * Design System Tokens — TijaratPro Admin Web
 * Single source of truth for JS-side color references.
 * ⚠️  These MUST stay in sync with CSS variables in globals.css.
 */
export const colors = {
  // ── Brand ──
  primary:      "#2EC4B6",
  primaryLight: "#A5F0E9",
  primaryDark:  "#2BACA0",

  // ── Semantic ──
  success: "#16A34A",
  warning: "#FBBF24",
  danger:  "#F43F5E",
  info:    "#3B82F6",

  // ── Neutrals ──
  black: "#0F172A",
  white: "#FFFFFF",
  gray: {
    light:  "#F1F5F9",
    border: "#E2E8F0",
    text:   "#64748B",
  },
} as const;

export const glowEffects = {
  teal:  "0 0 15px rgba(46, 196, 182, 0.6)",
  green: "0 0 15px rgba(22, 163, 74, 0.6)",
  red:   "0 0 15px rgba(244, 63, 94, 0.6)",
  gold:  "0 0 20px rgba(251, 191, 36, 0.8)",
} as const;
