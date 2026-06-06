"use client";

import React, { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Search, Building2, Ticket, Zap, X,
  LayoutDashboard, CreditCard, DollarSign,
  BarChart3, ScrollText, Settings2, ArrowRight,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { globalSearch } from "../../api/superAdmin.api";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

// ─── Quick action items ────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { id: "overview",   label: "Overview Dashboard",  description: "Platform KPIs and system health",       href: "/super-admin",             icon: LayoutDashboard },
  { id: "tenants",    label: "Manage Tenants",       description: "Search, approve, or suspend shops",     href: "/super-admin/tenants",      icon: Building2 },
  { id: "subs",       label: "Subscriptions",        description: "Manage plans and renewals",             href: "/super-admin/subscriptions", icon: CreditCard },
  { id: "billing",    label: "Billing & MRR",        description: "Revenue, invoices, churn metrics",      href: "/super-admin/billing",      icon: DollarSign },
  { id: "support",    label: "Support Tickets",      description: "Open tickets with SLA status",          href: "/super-admin/support",      icon: Ticket },
  { id: "activators", label: "Activators",           description: "Resellers and onboarding partners",     href: "/super-admin/activators",   icon: Zap },
  { id: "analytics",  label: "Platform Analytics",   description: "Growth, churn, plan distribution",      href: "/super-admin/analytics",    icon: BarChart3 },
  { id: "audit",      label: "Audit Log",            description: "Track all admin actions and changes",   href: "/super-admin/audit",        icon: ScrollText },
  { id: "settings",   label: "System Settings",      description: "Maintenance mode, feature flags",       href: "/super-admin/settings",     icon: Settings2 },
];

// ─── Command Palette ──────────────────────────────────────────────────────────

export function CommandPalette() {
  const { commandPaletteOpen, openCommandPalette, closeCommandPalette, openDrawer } = useSuperAdminStore();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const debouncedQuery    = useDebounce(query, 300);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        commandPaletteOpen ? closeCommandPalette() : openCommandPalette();
      }
      if (e.key === "Escape" && commandPaletteOpen) closeCommandPalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, openCommandPalette, closeCommandPalette]);

  // Global search query
  const { data: results, isFetching } = useQuery({
    queryKey: ["sa-search", debouncedQuery],
    queryFn:  () => globalSearch(debouncedQuery),
    enabled:  commandPaletteOpen && debouncedQuery.length >= 2,
    staleTime: 30_000,
  });

  const handleClose = useCallback(() => {
    setQuery("");
    closeCommandPalette();
  }, [closeCommandPalette]);

  const goTo = useCallback((href: string) => {
    router.push(href);
    handleClose();
  }, [router, handleClose]);

  const openInDrawer = useCallback((type: "tenant" | "ticket" | "activator", id: string) => {
    openDrawer(type, id);
    handleClose();
  }, [openDrawer, handleClose]);

  if (!commandPaletteOpen) return null;

  const hasResults = debouncedQuery.length >= 2;
  const hasTenants    = (results?.tenants?.length ?? 0) > 0;
  const hasTickets    = (results?.tickets?.length ?? 0) > 0;
  const hasActivators = (results?.activators?.length ?? 0) > 0;
  const noResults     = hasResults && !isFetching && !hasTenants && !hasTickets && !hasActivators;

  return (
    <div className="fixed inset-0 z-[100]" onMouseDown={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Panel */}
      <div
        className="relative flex items-start justify-center pt-[10vh] px-4"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[580px] animate-in slide-in-from-top-4 fade-in duration-200">
          <Command
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
            shouldFilter={false}
            loop
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
              {isFetching
                ? <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                : <Search className="w-5 h-5 text-[var(--text-soft)] shrink-0" />
              }
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search tenants, tickets, activators…"
                className="flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--text-soft)] text-base outline-none"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="text-[var(--text-soft)] hover:text-[var(--text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <Command.List className="max-h-[420px] overflow-y-auto p-2">

              {/* Empty state */}
              {noResults && (
                <Command.Empty className="py-10 text-center text-sm text-[var(--text-soft)]">
                  No results for &ldquo;<strong>{query}</strong>&rdquo;
                </Command.Empty>
              )}

              {/* Quick navigation (no query) */}
              {!hasResults && (
                <Command.Group
                  heading={
                    <p className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-[0.15em] px-2 py-1.5">
                      Navigation
                    </p>
                  }
                >
                  {QUICK_ACTIONS.map((a) => (
                    <Command.Item
                      key={a.id}
                      value={a.label}
                      onSelect={() => goTo(a.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer data-[selected=true]:bg-primary/8 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-soft)] shrink-0">
                        <a.icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text)]">{a.label}</p>
                        <p className="text-xs text-[var(--text-soft)] truncate">{a.description}</p>
                      </div>
                      <ArrowRight size={14} className="ml-auto text-[var(--text-soft)] shrink-0" />
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* Tenant results */}
              {hasTenants && (
                <Command.Group
                  heading={
                    <p className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-[0.15em] px-2 py-1.5">
                      Tenants
                    </p>
                  }
                >
                  {results!.tenants.map((t) => (
                    <Command.Item
                      key={t._id}
                      value={t.name}
                      onSelect={() => openInDrawer("tenant", t._id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer data-[selected=true]:bg-primary/8 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <Building2 size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
                        <p className="text-xs text-[var(--text-soft)]">{t.plan} · {t.status}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* Ticket results */}
              {hasTickets && (
                <Command.Group
                  heading={
                    <p className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-[0.15em] px-2 py-1.5">
                      Tickets
                    </p>
                  }
                >
                  {results!.tickets.map((t) => (
                    <Command.Item
                      key={t._id}
                      value={t.title}
                      onSelect={() => openInDrawer("ticket", t._id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer data-[selected=true]:bg-primary/8 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0">
                        <Ticket size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text)]">{t.title}</p>
                        <p className="text-xs text-[var(--text-soft)]">{t.shopName} · {t.priority}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* Activator results */}
              {hasActivators && (
                <Command.Group
                  heading={
                    <p className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-[0.15em] px-2 py-1.5">
                      Activators
                    </p>
                  }
                >
                  {results!.activators.map((a) => (
                    <Command.Item
                      key={a._id}
                      value={a.name}
                      onSelect={() => openInDrawer("activator", a._id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer data-[selected=true]:bg-primary/8 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                        <Zap size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text)]">{a.name}</p>
                        <p className="text-xs text-[var(--text-soft)]">{a.email} · {a.status}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center gap-3 bg-[var(--bg-secondary)]/50">
              {[
                { key: "↵", label: "select" },
                { key: "↑↓", label: "navigate" },
                { key: "ESC", label: "close" },
              ].map(({ key, label }) => (
                <span key={key} className="text-[10px] text-[var(--text-soft)] flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--card)] border border-[var(--border)] font-mono text-[9px]">
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </div>
          </Command>
        </div>
      </div>
    </div>
  );
}
