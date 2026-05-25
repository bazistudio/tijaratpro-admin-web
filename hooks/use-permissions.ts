/**
 * TijaratPro RBAC (Role Based Access Control) System
 * Synchronized with Backend Permission Registry.
 */

import { useAuthStore, type Capabilities } from "@/store/auth.store";
export type { Capabilities };

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "CASHIER" | "STAFF" | "DEMO_USER";


const defaultCapabilities: Capabilities = {
  canCreateProduct: false,
  canUpdateProduct: false,
  canDeleteProduct: false,
  canViewProduct: false,
  canAdjustStock: false,
  canTransferStock: false,
  canDamageStock: false,
  canViewStock: false,
  canSale: false,
  canVoidSale: false,
  canOverridePrice: false,
  canDiscount: false,
  canViewFinance: false,
  canCreateFinance: false,
  canCreateOrder: false,
  canReadOrder: false,
  canCancelOrder: false,
  canViewAudit: false,
  canEditSettings: false,
  canManageStaff: false,
  canExportReports: false,
};

export function usePermission() {
  const { user, capabilities, hasCapability, rawPermissions } = useAuthStore();
  
  return {
    user,
    role: user?.role,
    capabilities: capabilities || defaultCapabilities,
    can: hasCapability,
    rawPermissions,
    isSuperAdmin: user?.role === "SUPER_ADMIN",
    isShopAdmin: user?.role === "ADMIN",
    isManager: user?.role === "MANAGER",
    isCashier: user?.role === "CASHIER",
    isStaff: user?.role === "STAFF",
  };
}
