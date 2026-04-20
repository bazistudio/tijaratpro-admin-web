// ─── Dashboard Types ──────────────────────────────────────────────────────────

export type ActivityType =
  | "SALE_CREATED"
  | "PRINT_JOB_CREATED"
  | "STOCK_UPDATED"
  | "PAYMENT_RECEIVED"
  | "USER_LOGIN"
  | "SYSTEM_ERROR";

export interface WidgetConfig {
  id: string;
  title: string;
  isVisible: boolean;
  position: number;
  refreshInterval?: number;
}

export interface RevenueStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export interface SalesStats {
  totalSales: number;
  totalOrders: number;
  growth?: number;
}

export interface StockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  createdAt: string;
}

export interface DashboardSummary {
  revenue: RevenueStats;
  sales: SalesStats;
  stockAlerts: StockAlert[];
  recentActivity: ActivityItem[];
}
