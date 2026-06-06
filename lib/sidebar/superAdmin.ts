import {
  LayoutDashboard,
  Building2,
  CreditCard,
  DollarSign,
  Ticket,
  Users2,
  ScrollText,
  BarChart3,
  Settings2,
  Zap,
} from "lucide-react";
import type { SidebarItem } from "./core";

// ─── Super Admin Navigation ────────────────────────────────────────────────────
// Static menu — no API call needed for SUPER_ADMIN.
// Routes MUST match app/super-admin/* Next.js pages exactly.

export const SUPER_ADMIN_MENU: SidebarItem[] = [
  // ── OVERVIEW ──────────────────────────────────────────────
  {
    key:   "sa_overview",
    label: "Overview",
    icon:  LayoutDashboard,
    href:  "/super-admin",
  },

  // ── TENANT MANAGEMENT ─────────────────────────────────────
  {
    key:   "sa_tenants",
    label: "Tenants",
    icon:  Building2,
    href:  "/super-admin/tenants",
  },

  // ── BILLING & SUBSCRIPTIONS ───────────────────────────────
  {
    key:   "sa_subscriptions",
    label: "Subscriptions",
    icon:  CreditCard,
    href:  "/super-admin/subscriptions",
  },
  {
    key:   "sa_billing",
    label: "Billing & MRR",
    icon:  DollarSign,
    href:  "/super-admin/billing",
  },

  // ── SEPARATOR ─────────────────────────────────────────────
  {
    key:      "sep_operations",
    label:    "Operations",
    icon:     LayoutDashboard, // icon ignored for separators
    href:     "#",
    isSeparator: true,
  } as any,

  // ── SUPPORT ───────────────────────────────────────────────
  {
    key:   "sa_support",
    label: "Support Tickets",
    icon:  Ticket,
    href:  "/super-admin/support",
  },

  // ── ACTIVATORS ────────────────────────────────────────────
  {
    key:   "sa_activators",
    label: "Activators",
    icon:  Zap,
    href:  "/super-admin/activators",
  },

  // ── SEPARATOR ─────────────────────────────────────────────
  {
    key:      "sep_insights",
    label:    "Insights",
    icon:     LayoutDashboard,
    href:     "#",
    isSeparator: true,
  } as any,

  // ── ANALYTICS ─────────────────────────────────────────────
  {
    key:   "sa_analytics",
    label: "Analytics",
    icon:  BarChart3,
    href:  "/super-admin/analytics",
  },

  // ── AUDIT LOG ─────────────────────────────────────────────
  {
    key:   "sa_audit",
    label: "Audit Log",
    icon:  ScrollText,
    href:  "/super-admin/audit",
  },

  // ── SEPARATOR ─────────────────────────────────────────────
  {
    key:      "sep_system",
    label:    "System",
    icon:     LayoutDashboard,
    href:     "#",
    isSeparator: true,
  } as any,

  // ── SETTINGS ──────────────────────────────────────────────
  {
    key:   "sa_settings",
    label: "Settings",
    icon:  Settings2,
    href:  "/super-admin/settings",
  },
];
