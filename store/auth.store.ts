"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { setStoredToken, clearStoredToken, getStoredToken } from "@/lib/api/axios";
import { api } from "@/lib/api";
import { useTenantStore } from "@/features/tenancy/store/tenant.store";
import { logoutFromServer } from "@/services/authService";

export interface Capabilities {
  canCreateProduct: boolean;
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
  canViewProduct: boolean;
  canAdjustStock: boolean;
  canTransferStock: boolean;
  canDamageStock: boolean;
  canViewStock: boolean;
  canSale: boolean;
  canVoidSale: boolean;
  canOverridePrice: boolean;
  canDiscount: boolean;
  canViewFinance: boolean;
  canCreateFinance: boolean;
  canCreateOrder: boolean;
  canReadOrder: boolean;
  canCancelOrder: boolean;
  canViewAudit: boolean;
  canEditSettings: boolean;
  canManageStaff: boolean;
  canExportReports: boolean;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";

interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  hydrated: boolean;
  capabilities: Capabilities | null;
  rawPermissions: string[];
  
  // SaaS Context
  organizationId: string | null;
  activeShopId: string | null;
  shops: any[];

  /** Set user + token after successful login/register */
  setAuth: (user: User, token: string) => void;

  /** Clear all auth state on logout. Calls backend first to clear httpOnly cookie. */
  clearAuth: () => Promise<void>;

  /** Hydrate user from token (e.g. /auth/me response) */
  setUser: (user: User) => void;

  /** Set active shop context */
  setActiveShop: (shopId: string | null) => void;

  /** Fetch fresh permissions and capabilities from backend */
  initialize: () => Promise<void>;
  
  /** Check if a specific capability is granted */
  hasCapability: (cap: keyof Capabilities) => boolean;

  /** Set hydration status (used by persistence middleware) */
  setHydrated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: "loading",
      user: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,
      capabilities: null,
      rawPermissions: [],
      organizationId: null,
      activeShopId: null,
      shops: [],

      setHydrated: (val: boolean) => set({ hydrated: val }),

      setAuth: (user, token) => {
        setStoredToken(token);
        // Wipe any old tenant context to ensure fresh start
        useTenantStore.getState().clearTenancy();
        
        // Extract org and shop from user if available (e.g. legacy or default)
        const organizationId = user.organizationId || user.tenantId || null;
        const activeShopId = user.shopId || null;
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          status: "authenticated",
          organizationId, 
          activeShopId 
        });
        get().initialize(); // Fetch capabilities right after login
      },

      clearAuth: async () => {
        try {
          // 1. Call backend to clear the httpOnly cookie (server-first is safer)
          await logoutFromServer();
        } catch (err) {
          console.warn("[Auth Store] Server logout failed (likely already expired), proceeding with local wipe.");
        }

        // 2. Wipe storage
        clearStoredToken();
        localStorage.removeItem("tp_token");
        localStorage.removeItem("tp_auth");
        localStorage.removeItem("tp_tenant_context");
        
        // 3. Reset Zustand state
        set({ 
          user: null, 
          token: null, 
          status: "unauthenticated",
          isAuthenticated: false, 
          capabilities: null, 
          rawPermissions: [], 
          organizationId: null, 
          activeShopId: null, 
          shops: [] 
        });
      },

      setUser: (user) => {
        set({ user });
      },

      setActiveShop: (shopId) => {
        set({ activeShopId: shopId });
      },

      initialize: async () => {
        const token = getStoredToken();
        
        // Unauthenticated check
        if (!token) {
          set({ status: "unauthenticated", isAuthenticated: false, user: null, capabilities: null });
          return;
        }

        try {
          set({ status: "loading" });

          // Attempt to fetch fresh session data
          const [meData, capData] = await Promise.all([
            import("@/services/authService").then(m => m.getMe()),
            import("@/services/authService").then(m => m.getCapabilities())
          ]);

          // Fetch organization shops
          let shops = [];
          try {
            const shopsRes = await api("/shops/my-shops");
            if (shopsRes.ok) {
              const shopsData = await shopsRes.json();
              shops = shopsData.data || [];
            }
          } catch (err) {
            console.warn("[Auth Bootstrap] Organization shops fetch failed:", err);
          }

          const user = meData.data || meData;
          set({
            user,
            rawPermissions: user.permissions || [],
            capabilities: capData.data || capData,
            isAuthenticated: true,
            status: "authenticated",
            shops,
            organizationId: user.organizationId || user.tenantId || null,
            activeShopId: get().activeShopId || user.shopId || (shops[0]?._id) || null,
          });
        } catch (error: any) {
          if (error.response?.status === 401 || error.response?.status === 404 || error.status === 401) {
             console.warn("[Auth Bootstrap] Session invalid. Cleaning up.");
             set({ status: "unauthenticated" });
             await get().clearAuth();
          } else {
            console.error("[Auth Bootstrap] Critical initialization error:", error.message);
            set({ status: "error" });
          }
        }
      },

      hasCapability: (cap) => {
        const capabilities = get().capabilities;
        if (!capabilities) return false;
        return !!capabilities[cap];
      }
    }),
    {
      name: "tp_auth",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        capabilities: state.capabilities,
        rawPermissions: state.rawPermissions,
        organizationId: state.organizationId,
        activeShopId: state.activeShopId,
        shops: state.shops,
      }),
    }
  )
);
