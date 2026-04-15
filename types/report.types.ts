// ─── Report & Analytics Types ─────────────────────────────────────────────────

export interface SalesReport {
  period: "daily" | "weekly" | "monthly" | "custom";
  startDate: string;
  endDate: string;
  totalOrders: number;
  totalRevenue: number;
  totalDiscount: number;
  netRevenue: number;
  dataPoints: SalesDataPoint[];
}

export interface SalesDataPoint {
  date: string;
  orders: number;
  revenue: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  sku?: string;
  quantitySold: number;
  revenue: number;
}

export interface TopCustomer {
  customerId: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
}

export interface ShopDashboardSummary {
  // ERP metrics (shop-scoped)
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalOrders: number;
  todayOrders: number;
  todaySales: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
  highestDailySales?: number;
}

export interface ReportFilter {
  startDate?: string;
  endDate?: string;
  period?: "daily" | "weekly" | "monthly";
}
