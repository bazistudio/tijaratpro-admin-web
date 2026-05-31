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

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      capabilities: null,
      rawPermissions: [],
      organizationId: null,
      activeShopId: null,
      shops: [],

      setAuth: (user, token) => {
        setStoredToken(token);
        // Wipe any old tenant context to ensure fresh start
        useTenantStore.getState().clearTenancy();
        
        // Extract org and shop from user if available (e.g. legacy or default)
        const organizationId = user.organizationId || user.tenantId || null;
        const activeShopId = user.shopId || null;
        set({ user, token, isAuthenticated: true, organizationId, activeShopId });
        get().initialize(); // Fetch capabilities right after login
      },

      clearAuth: async () => {
        // 1. Call backend to clear the httpOnly cookie (cannot be done from JS)
        await logoutFromServer();
        // 2. Wipe localStorage tokens
        clearStoredToken();
        localStorage.removeItem("tp_token");
        localStorage.removeItem("tp_auth");
        localStorage.removeItem("tp_tenant_context");
        document.cookie = "tp_token=; path=/; max-age=0; SameSite=Lax";
        // 3. Reset Zustand state
        set({ user: null, token: null, isAuthenticated: false, capabilities: null, rawPermissions: [], organizationId: null, activeShopId: null, shops: [] });
      },

      setUser: (user) => {
        set({ user });
      },

      setActiveShop: (shopId) => {
        set({ activeShopId: shopId });
      },

      initialize: async () => {
        const token = getStoredToken();
        console.log("[AUTH DEBUG] Initializing with token:", token ? "FOUND" : "MISSING");
        
        if (!token) {
          console.warn("[AUTH DEBUG] No token found, clearing auth.");
          get().clearAuth();
          return;
        }

        try {
          // Use our new consolidated authService
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
            console.warn("Could not fetch organization shops:", err);
          }

          set({
            user: meData.data || meData,
            rawPermissions: (meData.data || meData).permissions || [],
            capabilities: capData.data || capData,
            isAuthenticated: true,
            shops,
            organizationId: (meData.data || meData).organizationId || (meData.data || meData).tenantId || null,
            activeShopId: get().activeShopId || (meData.data || meData).shopId || (shops[0]?._id) || null,
          });
        } catch (error: any) {
          console.error("[AUTH DEBUG] Initialization failed. Check if your token is valid and backend is running.", {
            error: error.message,
            status: error.response?.status,
            tokenFound: !!getStoredToken()
          });
          
          // Only clear auth if it's a genuine 401 or user not found
          if (error.response?.status === 401 || error.response?.status === 404 || error.message?.includes("not found")) {
             get().clearAuth();
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
