import { 
  UserRole, 
  PermissionString, 
  UserPermissionContext,
  PermissionModule 
} from "../types/permission.types";

/**
 * Resolves all permissions for a user including role-based and specific overrides.
 */
export function getUserPermissions(context: UserPermissionContext): PermissionString[] {
  const { permissions = [], overrides = [] } = context;
  // Combine unique permissions and overrides (overwrites or additions)
  return Array.from(new Set([...permissions, ...overrides]));
}

/**
 * Heart of the RBAC engine: Checks if a user has a specific permission.
 */
export function hasPermission(
  context: UserPermissionContext, 
  permission: PermissionString
): boolean {
  // Super Admins bypass all checks
  if (context.role === UserRole.ADMIN) return true;
  
  const allPermissions = getUserPermissions(context);
  return allPermissions.includes(permission);
}

/**
 * Checks if a user has a specific role.
 */
export function hasRole(context: UserPermissionContext, role: UserRole): boolean {
  return context.role === role;
}

/**
 * Checks if a user can access an entire module (has any 'READ' permission in that module).
 */
export function canAccessModule(
  context: UserPermissionContext, 
  module: PermissionModule
): boolean {
  if (context.role === UserRole.ADMIN) return true;
  
  const readPermission: PermissionString = `${module}.READ`;
  return hasPermission(context, readPermission);
}

/**
 * Filters a sidebar/menu structure based on user role and permissions.
 */
export function filterMenuByRole<T extends { module?: PermissionModule }>(
  menuItems: T[], 
  context: UserPermissionContext
): T[] {
  return menuItems.filter(item => {
    if (!item.module) return true;
    return canAccessModule(context, item.module);
  });
}
