import type { Role } from "@/types";
import { ROLE_ALLOWED_PREFIXES } from "@/lib/constants/routes";

// ─── Role hierarchy (higher index = more privilege) ────────────────────────────
// Matches backend User.role enum exactly
const ROLE_HIERARCHY: Role[] = [
  "customer",
  "salesman",
  "staff",
  "manager",
  "shop_owner",
  "superadmin",
];

// ─── Core guards ───────────────────────────────────────────────────────────────

/**
 * Check if a user's role is in the allowed roles list.
 * @example canAccess(user.role, ['superadmin', 'shop_owner'])
 */
export function canAccess(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if a user's role has at least the minimum required privilege.
 * @example hasMinRole(user.role, 'manager') // true for manager, shop_owner, superadmin
 */
export function hasMinRole(userRole: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(minRole);
}

// ─── Convenience role checks ───────────────────────────────────────────────────

export const isSuperAdmin  = (role: Role) => role === "superadmin";
export const isShopOwner   = (role: Role) => role === "shop_owner";
export const isManager     = (role: Role) => role === "manager";
export const isStaff       = (role: Role) => role === "staff";
export const isSalesman    = (role: Role) => role === "salesman";

/** Any role that belongs to a shop (not superadmin) */
export const isShopUser    = (role: Role) =>
  canAccess(role, ["shop_owner", "manager", "staff", "salesman"]);

/** Can manage shop settings, staff, and subscriptions */
export const isShopAdmin   = (role: Role) =>
  canAccess(role, ["shop_owner", "manager"]);

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
