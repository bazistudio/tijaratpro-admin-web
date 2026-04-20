import { UserRole, PermissionString } from "../types/permission.types";

export const PERMISSION_MODULES = [
  "MARKETING",
  "PRINTING",
  "REPORTS",
  "DASHBOARD",
  "AUDIT",
  "SETTINGS"
] as const;

export const PERMISSION_ACTIONS = [
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "DOWNLOAD"
] as const;

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Super Administrator",
  [UserRole.MANAGER]: "Business Manager",
  [UserRole.SALESMAN]: "Field Salesman",
  [UserRole.CASHIER]: "Store Cashier",
  [UserRole.VIEWER]: "Guest Observer",
};

/**
 * Default permission mappings based on roles.
 * These are used as templates during role initialization.
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, PermissionString[]> = {
  [UserRole.ADMIN]: [
    "DASHBOARD.READ", "DASHBOARD.UPDATE",
    "MARKETING.READ", "MARKETING.CREATE", "MARKETING.UPDATE", "MARKETING.DELETE",
    "PRINTING.READ", "PRINTING.CREATE", "PRINTING.UPDATE", "PRINTING.DELETE",
    "REPORTS.READ", "REPORTS.DOWNLOAD",
    "AUDIT.READ", "AUDIT.DOWNLOAD",
    "SETTINGS.READ", "SETTINGS.UPDATE"
  ],
  [UserRole.MANAGER]: [
    "DASHBOARD.READ",
    "MARKETING.READ", "MARKETING.CREATE", "MARKETING.UPDATE",
    "PRINTING.READ", "PRINTING.CREATE", "PRINTING.UPDATE",
    "REPORTS.READ", "REPORTS.DOWNLOAD",
    "SETTINGS.READ"
  ],
  [UserRole.SALESMAN]: [
    "DASHBOARD.READ",
    "MARKETING.READ", "MARKETING.CREATE", "MARKETING.UPDATE",
    "PRINTING.CREATE", "PRINTING.READ"
  ],
  [UserRole.CASHIER]: [
    "DASHBOARD.READ",
    "PRINTING.CREATE", "PRINTING.READ"
  ],
  [UserRole.VIEWER]: [
    "DASHBOARD.READ",
    "REPORTS.READ"
  ],
};
