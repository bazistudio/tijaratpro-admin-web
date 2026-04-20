// ─── Permission Types (RBAC) ──────────────────────────────────────────────────

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  SALESMAN = "SALESMAN",
  CASHIER = "CASHIER",
  VIEWER = "VIEWER",
}

export type PermissionModule = 
  | "MARKETING" 
  | "PRINTING" 
  | "REPORTS" 
  | "DASHBOARD" 
  | "AUDIT"
  | "SETTINGS";

export type PermissionAction = "CREATE" | "READ" | "UPDATE" | "DELETE" | "DOWNLOAD";

/**
 * Normalized permission string system.
 * Format: MODULE.ACTION (e.g., "REPORTS.READ")
 */
export type PermissionString = `${PermissionModule}.${PermissionAction}`;

export interface RolePermissions {
  role: UserRole;
  permissions: PermissionString[];
}

export interface UserPermissionContext {
  userId: string;
  role: UserRole;
  permissions: PermissionString[];
  overrides?: PermissionString[];
}

export type AccessMode = "HIDE" | "DISABLE" | "REDIRECT";

export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  description: string;
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: PermissionString[];
  userCount: number;
}
