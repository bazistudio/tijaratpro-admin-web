import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Tenant, TenantListItem } from "../types/tenant.types";

interface TenantState {
  activeTenant: Tenant | null;
  tenantList: TenantListItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveTenant: (tenant: Tenant | null) => void;
  setTenantList: (tenants: TenantListItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetTenancy: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      activeTenant: null,
      tenantList: [],
      isLoading: false,
      error: null,

      setActiveTenant: (activeTenant) => set({ activeTenant }),

      setTenantList: (tenantList) => set({ tenantList }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      resetTenancy: () => set({
        activeTenant: null,
        tenantList: [],
        isLoading: false,
        error: null,
      }),
    }),
    {
      name: "tijaratpro-tenant-context", // Persist active tenant across refreshes
      storage: createJSONStorage(() => localStorage),
    }
  )
);
