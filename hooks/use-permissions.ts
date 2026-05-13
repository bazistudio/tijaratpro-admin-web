/**
 * TijaratPro RBAC (Role Based Access Control) System
 * Prevents "Inventory Abuse" and unauthorized financial overrides.
 */

export type UserRole = "admin" | "manager" | "cashier"

export interface User {
  id: string
  name: string
  role: UserRole
  branchId: string
}

// ─── Permission Schema ──────────────────────────────────────────────────────

export const PERMISSIONS = {
  // Sales / POS
  SALE_CREATE: ["admin", "manager", "cashier"],
  PRICE_OVERRIDE: ["admin", "manager"], // Cashier cannot change price
  DISCOUNT_APPLY_LIMIT: ["admin", "manager"], // Cashier restricted to small % (handled in UI)
  
  // Inventory
  PRODUCT_CREATE: ["admin", "manager"],
  PRODUCT_EDIT: ["admin", "manager"],
  PRODUCT_DELETE: ["admin"], // Only Admin can delete
  
  STOCK_ADJUST: ["admin", "manager"], // Cashier cannot manually change stock
  STOCK_TRANSFER_REQUEST: ["admin", "manager", "cashier"],
  STOCK_TRANSFER_APPROVE: ["admin", "manager"],
  
  // Financials
  VIEW_REPORTS: ["admin", "manager"],
  VIEW_PROFIT: ["admin"], // Only Admin sees true profit margins
  LEDGER_EDIT: ["admin"],
  
  // System
  SETTINGS_EDIT: ["admin"],
  USER_MANAGEMENT: ["admin"],
} as const

export type PermissionKey = keyof typeof PERMISSIONS

// ─── Permission Hook Logic ──────────────────────────────────────────────────

import { create } from "zustand"

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  hasPermission: (permission: PermissionKey) => boolean
}

/**
 * Mock Auth Store (In production, this would be tied to JWT/Next-Auth)
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  user: {
    id: "u-1",
    name: "Salman Khan",
    role: "cashier", // Default to most restricted role for safety
    branchId: "branch-a"
  },
  setUser: (user) => set({ user }),
  hasPermission: (permission) => {
    const user = get().user
    if (!user) return false
    const allowedRoles = PERMISSIONS[permission] as readonly string[]
    return allowedRoles.includes(user.role)
  }
}))

/**
 * Utility Hook for Components
 */
export function usePermission() {
  const { user, hasPermission } = useAuthStore()
  return {
    user,
    role: user?.role,
    can: hasPermission,
    isAdmin: user?.role === "admin",
    isManager: user?.role === "manager",
    isCashier: user?.role === "cashier",
  }
}
