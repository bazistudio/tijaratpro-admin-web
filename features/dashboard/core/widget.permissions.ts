import { PermissionString } from "../../permissions/types/permission.types";

/**
 * Widget Permission Mapping (Consumer Only)
 * Maps Dashboard Widgets to their required RBAC permission strings.
 * This ensures granular security even within an allowed dashboard layout.
 */
export const WIDGET_PERMISSIONS: Record<string, PermissionString> = {
  SystemHealth: "SETTINGS.READ",
  Revenue: "REPORTS.READ",
  Sales: "REPORTS.READ",
  ActivityFeed: "DASHBOARD.READ",
  StockAlert: "REPORTS.READ",
  Orders: "DASHBOARD.READ",
  AuditLogs: "AUDIT.READ",
};
