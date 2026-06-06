"use client";

import { create } from "zustand";
import type {
  BulkContext,
  DrawerType,
  TenantFilters,
  TicketFilters,
  SubscriptionFilters,
  AuditFilters,
  ConfirmConfig,
} from "../types/superAdmin.types";

// ─── Default filter values ─────────────────────────────────────────────────────

const DEFAULT_TENANT_FILTERS: TenantFilters = {
  status:       "all",
  plan:         "all",
  businessType: "all",
  search:       "",
  page:         1,
  limit:        20,
  sortBy:       "createdAt",
  sortOrder:    "desc",
};

const DEFAULT_TICKET_FILTERS: TicketFilters = {
  status:     "all",
  priority:   "all",
  assignedTo: "all",
  search:     "",
  page:       1,
  limit:      20,
};

const DEFAULT_SUB_FILTERS: SubscriptionFilters = {
  status: "all",
  plan:   "all",
  page:   1,
  limit:  20,
};

const DEFAULT_AUDIT_FILTERS: AuditFilters = {
  entityType: "all",
  action:     "all",
  actorId:    "",
  search:     "",
  from:       "",
  to:         "",
  page:       1,
  limit:      50,
};

// ─── Store Interface ───────────────────────────────────────────────────────────

interface SuperAdminStore {
  // ── Command Palette ─────────────────────────────────────────────────────────
  commandPaletteOpen: boolean;
  openCommandPalette:  () => void;
  closeCommandPalette: () => void;

  // ── Detail Drawer ───────────────────────────────────────────────────────────
  drawerOpen:     boolean;
  drawerType:     DrawerType | null;
  drawerEntityId: string | null;
  openDrawer:  (type: DrawerType, entityId: string) => void;
  closeDrawer: () => void;

  // ── Confirmation Dialog ─────────────────────────────────────────────────────
  confirmOpen:   boolean;
  confirmConfig: ConfirmConfig | null;
  openConfirm:    (config: ConfirmConfig) => void;
  closeConfirm:   () => void;
  executeConfirm: () => void;

  // ── Bulk Selection ──────────────────────────────────────────────────────────
  selectedIds: Set<string>;
  bulkContext: BulkContext | null;
  toggleSelect: (id: string, context: BulkContext) => void;
  selectAll:    (ids: string[], context: BulkContext) => void;
  clearSelection: () => void;
  isSelected:   (id: string) => boolean;

  // ── Tenant Filters ──────────────────────────────────────────────────────────
  tenantFilters:      TenantFilters;
  setTenantFilters:   (f: Partial<TenantFilters>) => void;
  resetTenantFilters: () => void;

  // ── Ticket Filters ──────────────────────────────────────────────────────────
  ticketFilters:      TicketFilters;
  setTicketFilters:   (f: Partial<TicketFilters>) => void;
  resetTicketFilters: () => void;

  // ── Subscription Filters ────────────────────────────────────────────────────
  subscriptionFilters:    SubscriptionFilters;
  setSubscriptionFilters: (f: Partial<SubscriptionFilters>) => void;

  // ── Audit Filters ───────────────────────────────────────────────────────────
  auditFilters:    AuditFilters;
  setAuditFilters: (f: Partial<AuditFilters>) => void;
  resetAuditFilters: () => void;
}

// ─── Store Implementation ──────────────────────────────────────────────────────

export const useSuperAdminStore = create<SuperAdminStore>()((set, get) => ({

  // ── Command Palette ─────────────────────────────────────────────────────────
  commandPaletteOpen:  false,
  openCommandPalette:  () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),

  // ── Detail Drawer ───────────────────────────────────────────────────────────
  drawerOpen:     false,
  drawerType:     null,
  drawerEntityId: null,
  openDrawer: (type, entityId) =>
    set({ drawerOpen: true, drawerType: type, drawerEntityId: entityId }),
  closeDrawer: () =>
    set({ drawerOpen: false, drawerType: null, drawerEntityId: null }),

  // ── Confirmation Dialog ─────────────────────────────────────────────────────
  confirmOpen:   false,
  confirmConfig: null,
  openConfirm:  (config) => set({ confirmOpen: true, confirmConfig: config }),
  closeConfirm: () => set({ confirmOpen: false, confirmConfig: null }),
  executeConfirm: () => {
    const { confirmConfig } = get();
    confirmConfig?.onConfirm?.();
    set({ confirmOpen: false, confirmConfig: null });
  },

  // ── Bulk Selection ──────────────────────────────────────────────────────────
  selectedIds: new Set<string>(),
  bulkContext: null,
  toggleSelect: (id, context) =>
    set((s) => {
      const next = new Set(s.selectedIds);
      // Context switch → clear old selection
      if (s.bulkContext !== context) {
        next.clear();
        next.add(id);
        return { selectedIds: next, bulkContext: context };
      }
      next.has(id) ? next.delete(id) : next.add(id);
      return { selectedIds: next, bulkContext: next.size > 0 ? context : null };
    }),
  selectAll: (ids, context) =>
    set({ selectedIds: new Set(ids), bulkContext: context }),
  clearSelection: () =>
    set({ selectedIds: new Set<string>(), bulkContext: null }),
  isSelected: (id) => get().selectedIds.has(id),

  // ── Tenant Filters ──────────────────────────────────────────────────────────
  tenantFilters:    DEFAULT_TENANT_FILTERS,
  setTenantFilters: (f) =>
    set((s) => ({ tenantFilters: { ...s.tenantFilters, ...f, page: f.page ?? 1 } })),
  resetTenantFilters: () => set({ tenantFilters: DEFAULT_TENANT_FILTERS }),

  // ── Ticket Filters ──────────────────────────────────────────────────────────
  ticketFilters:    DEFAULT_TICKET_FILTERS,
  setTicketFilters: (f) =>
    set((s) => ({ ticketFilters: { ...s.ticketFilters, ...f, page: f.page ?? 1 } })),
  resetTicketFilters: () => set({ ticketFilters: DEFAULT_TICKET_FILTERS }),

  // ── Subscription Filters ────────────────────────────────────────────────────
  subscriptionFilters:    DEFAULT_SUB_FILTERS,
  setSubscriptionFilters: (f) =>
    set((s) => ({ subscriptionFilters: { ...s.subscriptionFilters, ...f } })),

  // ── Audit Filters ───────────────────────────────────────────────────────────
  auditFilters:    DEFAULT_AUDIT_FILTERS,
  setAuditFilters: (f) =>
    set((s) => ({ auditFilters: { ...s.auditFilters, ...f } })),
  resetAuditFilters: () => set({ auditFilters: DEFAULT_AUDIT_FILTERS }),
}));
