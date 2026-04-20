import { DashboardType } from "./dashboard.registry";

export interface DashboardConfig {
  id: DashboardType;
  title: string;
  widgets: string[]; // Widget component keys
  layout: "grid" | "list";
}

/**
 * Dashboard Config Engine (Rules Layer)
 * Defines what widgets and layout rules apply per Dashboard Type.
 */
export const DASHBOARD_CONFIGS: Record<DashboardType, DashboardConfig> = {
  [DashboardType.SUPER_ADMIN]: {
    id: DashboardType.SUPER_ADMIN,
    title: "Global SaaS Control",
    widgets: ["SystemHealth", "Revenue", "ActivityFeed", "AuditLogs"],
    layout: "grid",
  },
  [DashboardType.SHOP_OWNER]: {
    id: DashboardType.SHOP_OWNER,
    title: "Business Dashboard",
    widgets: ["Sales", "Revenue", "StockAlert", "Orders", "ActivityFeed"],
    layout: "grid",
  },
  [DashboardType.STAFF]: {
    id: DashboardType.STAFF,
    title: "Operations Hub",
    widgets: ["Orders", "ActivityFeed"],
    layout: "grid",
  },
};
