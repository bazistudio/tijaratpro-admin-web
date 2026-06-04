/**
 * TijaratPro RBAC Hook (Phase D)
 * ─────────────────────────────────────────────────────────────
 * Implements the 3-Layer permission check on the frontend.
 *
 * IMPORTANT: Frontend is UX-only enforcement.
 * The backend is the ONLY security enforcement layer.
 *
 * Layer 1 → Role (who you are)
 * Layer 2 → Module (what the shop has enabled)
 * Layer 3 → Capability (what you can do)
 *
 * A UI action is visible ONLY when ALL three layers pass.
 */

import { useAuthStore, type Capabilities } from "@/store/auth.store";
export type { Capabilities };

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MANAGER"
  | "CASHIER"
  | "STAFF"
  | "DEMO_USER";

// Mirrors backend ROLE_CAPABILITIES registry exactly
const ROLE_CAPABILITIES: Record<string, (keyof Capabilities)[]> = {
  SUPER_ADMIN: [], // Wildcard — isSuperAdmin check overrides all
  ADMIN: [
    "canCreateProduct", "canUpdateProduct", "canDeleteProduct", "canViewProduct",
    "canAdjustStock", "canTransferStock", "canDamageStock", "canViewStock",
    "canSale", "canVoidSale", "canOverridePrice", "canDiscount",
    "canViewFinance", "canCreateFinance",
    "canCreateOrder", "canReadOrder", "canCancelOrder",
    "canManageStaff", "canEditSettings", "canViewAudit", "canExportReports",
  ],
  MANAGER: [
    "canCreateProduct", "canUpdateProduct", "canViewProduct",
    "canAdjustStock", "canTransferStock", "canDamageStock", "canViewStock",
    "canSale", "canVoidSale", "canDiscount",
    "canViewFinance",
    "canCreateOrder", "canReadOrder", "canCancelOrder",
    "canExportReports",
  ],
  CASHIER: [
    "canViewProduct", "canViewStock",
    "canSale", "canDiscount",
    "canCreateOrder", "canReadOrder",
  ],
  STAFF: [
    "canViewProduct", "canViewStock",
  ],
  DEMO_USER: [
    "canViewProduct", "canViewStock", "canSale", "canReadOrder",
  ],
};

// Mirrors backend MODULE_REQUIRED_CAPABILITIES
const MODULE_CAPABILITIES: Record<string, (keyof Capabilities)[]> = {
  PRODUCTS:        ["canViewProduct"],
  INVENTORY:       ["canViewStock"],
  SALES:           ["canSale"],
  EXPIRY_TRACKING: ["canViewProduct"],
  COMPATIBILITY:   ["canViewProduct"],
  IMEI_TRACKING:   ["canViewProduct"],
  REPORTS:         ["canExportReports"],
  SETTINGS:        ["canEditSettings"],
  CUSTOMERS:       ["canReadOrder"],
};

const defaultCapabilities: Capabilities = {
  canCreateProduct: false,
  canUpdateProduct: false,
  canDeleteProduct: false,
  canViewProduct:   false,
  canAdjustStock:   false,
  canTransferStock: false,
  canDamageStock:   false,
  canViewStock:     false,
  canSale:          false,
  canVoidSale:      false,
  canOverridePrice: false,
  canDiscount:      false,
  canViewFinance:   false,
  canCreateFinance: false,
  canCreateOrder:   false,
  canReadOrder:     false,
  canCancelOrder:   false,
  canViewAudit:     false,
  canEditSettings:  false,
  canManageStaff:   false,
  canExportReports: false,
};

export function usePermission() {
  const { user, capabilities, hasCapability, rawPermissions, shops, activeShopId } = useAuthStore();

  const role = user?.role as UserRole | undefined;
  const isSuperAdmin = role === "SUPER_ADMIN";

  // Get the active shop's enabled modules
  const activeShop = (shops || []).find((s) => s._id === activeShopId);
  const enabledModules: string[] = activeShop?.enabledModules || [];

  /**
   * 3-Layer check:
   * 1. SUPER_ADMIN bypasses everything
   * 2. User must have the capability (role-based)
   * 3. The relevant module must be enabled on the shop
   */
  const can = (cap: keyof Capabilities): boolean => {
    if (isSuperAdmin) return true;
    return hasCapability(cap);
  };

  /**
   * Module-aware capability check.
   * Both the module must be enabled AND the user must have the capability.
   */
  const canWithModule = (cap: keyof Capabilities, moduleName: string): boolean => {
    if (isSuperAdmin) return true;
    if (!enabledModules.includes(moduleName)) return false;
    return hasCapability(cap);
  };

  /**
   * Check if a given module is enabled for the active shop.
   */
  const hasModule = (moduleName: string): boolean => {
    if (isSuperAdmin) return true;
    return enabledModules.includes(moduleName);
  };

  return {
    user,
    role,
    capabilities: capabilities || defaultCapabilities,
    rawPermissions,
    enabledModules,

    // Single-layer capability check (role only)
    can,

    // 3-layer check (role + module)
    canWithModule,

    // Module availability check
    hasModule,

    // Role shortcuts
    isSuperAdmin,
    isShopAdmin:  role === "ADMIN",
    isManager:    role === "MANAGER",
    isCashier:    role === "CASHIER",
    isStaff:      role === "STAFF",
  };
}
