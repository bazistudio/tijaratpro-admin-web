"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Tenant, TenantState } from "../types/tenant.types";

/**
 * Tenant Store
 * Manages the active shop context and multi-tenant isolation.
 * Persisted to localStorage to maintain context across refreshes.
 */
export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      activeTenant: null,
      tenantList: [],
      isLoading: false,

      setTenantList: (tenantList) => set({ tenantList }),

      setActiveTenant: (activeTenant) => set({ activeTenant }),

      setLoading: (isLoading) => set({ isLoading }),

      clearTenancy: () => set({ activeTenant: null, tenantList: [] }),

    }),
    {
      name: "tp_tenant_context",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
