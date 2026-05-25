import type { Role } from "@/types";
import { ROLE_ALLOWED_PREFIXES } from "@/lib/constants/routes";

// ─── Role hierarchy (higher index = more privilege) ────────────────────────────
// Matches backend User.role enum exactly
const ROLE_HIERARCHY: Role[] = [
  "DEMO_USER",
  "STAFF",
  "CASHIER",
  "MANAGER",
  "ADMIN",
  "SUPER_ADMIN",
];


// ─── Core guards ───────────────────────────────────────────────────────────────

/**
 * Check if a user's role is in the allowed roles list.
 * @example canAccess(user.role, ['SUPER_ADMIN', 'ADMIN'])
 */
export function canAccess(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if a user's role has at least the minimum required privilege.
 * @example hasMinRole(user.role, 'MANAGER') // true for MANAGER, ADMIN, SUPER_ADMIN
 */
export function hasMinRole(userRole: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(minRole);
}

// ─── Convenience role checks ───────────────────────────────────────────────────

export const isSuperAdmin  = (role: Role) => role === "SUPER_ADMIN";
export const isShopOwner   = (role: Role) => role === "ADMIN";
export const isManager     = (role: Role) => role === "MANAGER";
export const isStaff       = (role: Role) => role === "STAFF";
export const isCashier     = (role: Role) => role === "CASHIER";
export const isDemoUser    = (role: Role) => role === "DEMO_USER";


/** Any role that belongs to a shop (not superadmin) */
export const isShopUser    = (role: Role) =>
  canAccess(role, ["ADMIN", "MANAGER", "CASHIER", "STAFF", "DEMO_USER"]);


/** Can manage shop settings, staff, and subscriptions */
export const isShopAdmin   = (role: Role) =>
  canAccess(role, ["ADMIN", "MANAGER"]);

// ─── Route visibility guard ───────────────────────────────────────────────────

/**
 * Returns true if the given role is permitted to visit a route.
 * Used by nav components to conditionally render menu items.
 * @example canVisit(user.role, '/products') // false for superadmin
 */
export function canVisit(role: Role, path: string): boolean {
  const allowed = ROLE_ALLOWED_PREFIXES[role] ?? [];
  return allowed.some((prefix) => path.startsWith(prefix));
}

/**
 * Returns the default landing path after login based on role.
 */
export function getDefaultRoute(role: Role): string {
  return "/dashboard";
}

// ─── Static route sets (used by middleware + nav) ─────────────────────────────

/** Routes only superadmin can see in sidebar */
export const SUPERADMIN_ONLY_ROUTES = ["/shops", "/plans", "/billing", "/subscriptions"] as const;

/** Routes only shop-scoped roles see in sidebar */
export const SHOP_ONLY_ROUTES = [
  "/products",
  "/orders",
  "/customers",
  "/inventory",
  "/sales",
  "/suppliers",
] as const;

/** Routes visible to all authenticated roles */
export const SHARED_ROUTES = [
  "/dashboard",
  "/reports",
  "/notifications",
  "/settings",
] as const;
