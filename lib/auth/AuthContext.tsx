"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { getMe } from "@/features/auth/api";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { setStoredToken, clearStoredToken } from "@/lib/api/axios";

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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  capabilities: Capabilities | null;
  rawPermissions: string[];
  organizationId: string | null;
  activeShopId: string | null;
  shops: any[];

  logout: () => void;
  clearAuth: () => void;
  refreshUser: () => Promise<void>;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  setActiveShop: (shopId: string | null) => void;
  initialize: () => Promise<void>;
  hasCapability: (cap: keyof Capabilities) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [capabilities, setCapabilities] = useState<Capabilities | null>(null);
  const [rawPermissions, setRawPermissions] = useState<string[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [shops, setShops] = useState<any[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const clearAuth = () => {
    Cookies.remove("tp_token");
    Cookies.remove("tp_shopId");
    clearStoredToken();
    setUser(null);
    setCapabilities(null);
    setRawPermissions([]);
    setOrganizationId(null);
    setActiveShopId(null);
    setShops([]);
  };

  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  const setAuth = (newUser: User, token: string) => {
    Cookies.set("tp_token", token, { path: "/", expires: 7 });
    setStoredToken(token);
    setUser(newUser);
    const orgId = newUser.organizationId || (newUser as any).tenantId || null;
    setOrganizationId(orgId);
    if (newUser.shopId) {
      setActiveShopId(newUser.shopId);
    }
    initialize();
  };

  const initialize = async () => {
    try {
      const token = Cookies.get("tp_token");
      if (!token) {
        clearAuth();
        return;
      }
      setStoredToken(token);

      const [meRes, capRes] = await Promise.all([
        api("/auth/me"),
        api("/auth/capabilities")
      ]);
      
      if (!meRes.ok || !capRes.ok) throw new Error("Failed to fetch capabilities");

      const meData = await meRes.json();
      const capData = await capRes.json();

      let fetchedShops = [];
      try {
        const shopsRes = await api("/shops/my-shops");
        if (shopsRes.ok) {
          const shopsData = await shopsRes.json();
          fetchedShops = shopsData.data || [];
        }
      } catch (err) {
        console.warn("Could not fetch organization shops:", err);
      }

      setUser(meData.data);
      setRawPermissions(meData.data.permissions || []);
      setCapabilities(capData.data);
      setShops(fetchedShops);
      setOrganizationId(meData.data.organizationId || meData.data.tenantId || null);
      
      const newActiveShopId = activeShopId || meData.data.shopId || (fetchedShops[0]?._id) || null;
      setActiveShopId(newActiveShopId);
      
    } catch (error) {
      console.error("Failed to initialize auth state", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const hasCapability = (cap: keyof Capabilities) => {
    if (!capabilities) return false;
    return !!capabilities[cap];
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        capabilities,
        rawPermissions,
        organizationId,
        activeShopId,
        shops,
        logout,
        clearAuth,
        refreshUser: initialize,
        setAuth,
        setUser,
        setActiveShop: setActiveShopId,
        initialize,
        hasCapability,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
