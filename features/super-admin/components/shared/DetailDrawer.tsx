"use client";

import React, { Suspense, lazy } from "react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import type { DrawerType } from "../../types/superAdmin.types";

// ── Lazy-load each content panel so they don't bloat the initial bundle ────────
const TenantDrawerContent      = lazy(() => import("../tenants/TenantDrawerContent"));
const SubscriptionDrawerContent = lazy(() => import("../subscriptions/SubscriptionDrawerContent"));
const TicketDrawerContent       = lazy(() => import("../support/TicketDrawerContent"));
const ActivatorDrawerContent    = lazy(() => import("../activators/ActivatorDrawerContent"));

function DrawerContentRouter({ type, entityId }: { type: DrawerType; entityId: string }) {
  switch (type) {
    case "tenant":       return <TenantDrawerContent       id={entityId} />;
    case "subscription": return <SubscriptionDrawerContent id={entityId} />;
    case "ticket":       return <TicketDrawerContent       id={entityId} />;
    case "activator":    return <ActivatorDrawerContent    id={entityId} />;
    default:             return null;
  }
}

const DRAWER_TITLES: Record<DrawerType, string> = {
  tenant:       "Tenant Details",
  subscription: "Subscription Details",
  ticket:       "Ticket Details",
  activator:    "Activator Details",
};

// ─── Detail Drawer ────────────────────────────────────────────────────────────
// Slide-in right panel. Controlled by useSuperAdminStore.
// Each content component fetches its own data, enabled only when drawer is open.

export function DetailDrawer() {
  const { drawerOpen, drawerType, drawerEntityId, closeDrawer } = useSuperAdminStore();

  const title = drawerType ? DRAWER_TITLES[drawerType] : "";

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeDrawer}
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-[620px] z-[81]",
          "bg-[var(--card)] border-l border-[var(--border)] shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[var(--border)] shrink-0 bg-[var(--bg-secondary)]/50">
          <h2 className="text-lg font-black text-[var(--text)]">{title}</h2>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-xl text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content — lazy loaded per type */}
        <div className="flex-1 overflow-y-auto">
          {drawerOpen && drawerType && drawerEntityId ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-[var(--text-soft)]">Loading…</p>
                  </div>
                </div>
              }
            >
              <DrawerContentRouter type={drawerType} entityId={drawerEntityId} />
            </Suspense>
          ) : null}
        </div>
      </aside>
    </>
  );
}
