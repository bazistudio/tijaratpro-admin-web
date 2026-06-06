"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Status Badge — Unified status/priority badge system ──────────────────────

// ── Shop / Tenant status ──────────────────────────────────────────────────────
const SHOP_STATUS_MAP = {
  active:    { label: "Active",    class: "bg-success/10 text-success border-success/20" },
  inactive:  { label: "Inactive",  class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
  suspended: { label: "Suspended", class: "bg-danger/10 text-danger border-danger/20" },
  pending:   { label: "Pending",   class: "bg-warning/10 text-warning border-warning/20" },
};

// ── Ticket status ─────────────────────────────────────────────────────────────
const TICKET_STATUS_MAP = {
  open:        { label: "Open",        class: "bg-info/10 text-info border-info/20" },
  in_progress: { label: "In Progress", class: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
  resolved:    { label: "Resolved",    class: "bg-success/10 text-success border-success/20" },
  closed:      { label: "Closed",      class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

// ── Ticket priority ───────────────────────────────────────────────────────────
const PRIORITY_MAP = {
  urgent: { label: "Urgent", class: "bg-danger/10 text-danger border-danger/20" },
  high:   { label: "High",   class: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  medium: { label: "Medium", class: "bg-warning/10 text-warning border-warning/20" },
  low:    { label: "Low",    class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

// ── Subscription status ───────────────────────────────────────────────────────
const SUBSCRIPTION_STATUS_MAP = {
  active:    { label: "Active",    class: "bg-success/10 text-success border-success/20" },
  expired:   { label: "Expired",   class: "bg-danger/10 text-danger border-danger/20" },
  cancelled: { label: "Cancelled", class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
  pending:   { label: "Pending",   class: "bg-warning/10 text-warning border-warning/20" },
};

// ── Invoice status ────────────────────────────────────────────────────────────
const INVOICE_STATUS_MAP = {
  pending:   { label: "Pending",   class: "bg-warning/10 text-warning border-warning/20" },
  paid:      { label: "Paid",      class: "bg-success/10 text-success border-success/20" },
  overdue:   { label: "Overdue",   class: "bg-danger/10 text-danger border-danger/20" },
  cancelled: { label: "Cancelled", class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

// ── Activator status ──────────────────────────────────────────────────────────
const ACTIVATOR_STATUS_MAP = {
  active:    { label: "Active",    class: "bg-success/10 text-success border-success/20" },
  inactive:  { label: "Inactive",  class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
  suspended: { label: "Suspended", class: "bg-danger/10 text-danger border-danger/20" },
};

// ── Component ─────────────────────────────────────────────────────────────────

type StatusVariant = "shop" | "ticket" | "priority" | "subscription" | "invoice" | "activator";

interface StatusBadgeProps {
  value:    string;
  variant?: StatusVariant;
  size?:    "xs" | "sm" | "md";
  dot?:     boolean;
  className?: string;
}

const MAP_LOOKUP: Record<StatusVariant, Record<string, { label: string; class: string }>> = {
  shop:         SHOP_STATUS_MAP,
  ticket:       TICKET_STATUS_MAP,
  priority:     PRIORITY_MAP,
  subscription: SUBSCRIPTION_STATUS_MAP,
  invoice:      INVOICE_STATUS_MAP,
  activator:    ACTIVATOR_STATUS_MAP,
};

export function StatusBadge({
  value,
  variant = "shop",
  size    = "sm",
  dot     = false,
  className,
}: StatusBadgeProps) {
  const map    = MAP_LOOKUP[variant];
  const config = map?.[value] ?? { label: value, class: "bg-slate-500/10 text-slate-500 border-slate-500/20" };

  const sizeClass = {
    xs: "text-[9px] px-1.5 py-0.5 gap-1",
    sm: "text-[10px] px-2 py-0.5 gap-1.5",
    md: "text-xs px-2.5 py-1 gap-1.5",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-wider rounded-full border",
        sizeClass,
        config.class,
        className
      )}
    >
      {dot && (
        <span className={cn("rounded-full shrink-0", size === "xs" ? "w-1 h-1" : "w-1.5 h-1.5", "bg-current")} />
      )}
      {config.label}
    </span>
  );
}

export default StatusBadge;
