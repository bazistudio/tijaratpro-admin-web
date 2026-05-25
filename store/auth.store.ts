"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { setStoredToken, clearStoredToken } from "@/lib/api/axios";
import { api } from "@/lib/api";

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

  /** Clear all auth state on logout or 401 */
  clearAuth: () => void;

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
        // Extract org and shop from user if available (e.g. legacy or default)
        const organizationId = user.organizationId || user.tenantId || null;
        const activeShopId = user.shopId || null;
        set({ user, token, isAuthenticated: true, organizationId, activeShopId });
        get().initialize(); // Fetch capabilities right after login
      },

      clearAuth: () => {
        clearStoredToken();
        set({ user: null, token: null, isAuthenticated: false, capabilities: null, rawPermissions: [], organizationId: null, activeShopId: null, shops: [] });
      },

      setUser: (user) => {
        set({ user });
      },

      setActiveShop: (shopId) => {
        set({ activeShopId: shopId });
      },

      initialize: async () => {
        try {
          const [meRes, capRes] = await Promise.all([
            api("/auth/me"),
            api("/auth/capabilities")
          ]);
          
          if (!meRes.ok || !capRes.ok) throw new Error("Failed to fetch capabilities");

          const meData = await meRes.json();
          const capData = await capRes.json();

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
            user: meData.data,
            rawPermissions: meData.data.permissions || [],
            capabilities: capData.data,
            isAuthenticated: true,
            shops,
            organizationId: meData.data.organizationId || meData.data.tenantId || null,
            activeShopId: get().activeShopId || meData.data.shopId || (shops[0]?._id) || null,
          });
        } catch (error) {
          console.error("Failed to initialize auth state capabilities", error);
          get().clearAuth();
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
