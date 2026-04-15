export interface DashboardSummary {
  totalShops: number;
  activeShops: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  expiringSubscriptions: number;
  pendingInvoices: number;
  overdueInvoices: number;
  // Shop-scoped (admin/shop_owner)
  totalProducts?: number;
  totalOrders?: number;
  todaySales?: number;
  lowStockCount?: number;
  recentActivity?: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "order" | "payment" | "subscription" | "shop";
  message: string;
  timestamp: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export interface PlanDistributionItem {
  planName: string;
  count: number;
}
