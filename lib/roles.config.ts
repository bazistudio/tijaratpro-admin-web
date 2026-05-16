/**
 * Global Role Definitions and Access Matrix
 * 
 * This file serves as the single source of truth for Role Planning.
 * It defines each role, their hierarchical level, and what modules/routes they can access.
 */

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  DEMO_USER: "DEMO_USER",
} as const;

export type AppRole = typeof ROLES[keyof typeof ROLES];

/**
 * Role Access Definition (Who can access what?)
 */
export const ROLE_ACCESS_MATRIX: Record<AppRole, {
  level: number;
  description: string;
  allowedRoutes: string[];
  permissions: string[];
}> = {
  [ROLES.SUPER_ADMIN]: {
    level: 100,
    description: "System Owner. Has access to everything, including tenant and subscription management.",
    allowedRoutes: [
      "/super-admin",
      "/super-admin/tenants",
      "/super-admin/subscriptions",
      "/super-admin/demos",
      "/super-admin/activators",
      "/super-admin/analytics",
      "/super-admin/settings",
      "/dashboard",
      "/shops",
      "/plans",
      "/billing",
      "/reports",
      "/settings",
    ],
    permissions: ["*"], // Can do anything
  },

  [ROLES.ADMIN]: {
    level: 80,
    description: "Shop Owner / Primary Tenant Admin. Full control over a specific shop/organization.",
    allowedRoutes: [
      "/dashboard",
      "/products",
      "/orders",
      "/customers",
      "/stock",
      "/sales",
      "/suppliers",
      "/reports",
      "/notifications",
      "/settings",
    ],
    permissions: [
      "manage_shop",
      "manage_users",
      "manage_inventory",
      "manage_billing",
      "view_reports",
      "process_sales"
    ],
  },

  [ROLES.MANAGER]: {
    level: 60,
    description: "Shop Manager. Can manage inventory and staff, but cannot access billing or shop deletion.",
    allowedRoutes: [
      "/dashboard",
      "/products",
      "/orders",
      "/customers",
      "/stock",
      "/sales",
      "/suppliers",
      "/reports",
      "/notifications",
      "/settings", // Limited settings
    ],
    permissions: [
      "manage_inventory",
      "view_reports",
      "process_sales",
      "manage_staff"
    ],
  },

  [ROLES.STAFF]: {
    level: 40,
    description: "Standard worker/cashier. Can process orders and view basic inventory.",
    allowedRoutes: [
      "/dashboard",
      "/products",     // View only
      "/orders",
      "/customers",
      "/stock",        // View only
      "/notifications",
      "/settings",     // Profile only
    ],
    permissions: [
      "process_sales",
      "view_inventory",
      "manage_own_profile"
    ],
  },

  [ROLES.DEMO_USER]: {
    level: 10,
    description: "Read-only access for demonstration purposes.",
    allowedRoutes: [
      "/dashboard",
      "/products",
      "/orders",
      "/customers",
      "/stock",
      "/sales",
      "/reports",
    ],
    permissions: [
      "view_demo_data" // Strict read-only enforcement
    ],
  },
};

/**
 * Helper to check if a role has access to a specific route prefix.
 */
export const canRoleAccessRoute = (role: AppRole, path: string): boolean => {
  const allowed = ROLE_ACCESS_MATRIX[role]?.allowedRoutes || [];
  return allowed.some(prefix => path.startsWith(prefix));
};

/**
 * Helper to check if a role has a specific permission.
 */
export const hasPermission = (role: AppRole, permission: string): boolean => {
  const perms = ROLE_ACCESS_MATRIX[role]?.permissions || [];
  if (perms.includes("*")) return true;
  return perms.includes(permission);
};
