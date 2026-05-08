import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/dashboard";

interface DashboardStats {
  todayRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  todayProfit: number;
  monthlyProfit: number;
  totalProfit: number;
  ordersToday: number;
  totalOrders: number;
  lowStockCount: number;
  totalProducts: number;
  totalCustomers: number;
}

interface ChartItem {
  name: string;
  sales: number;
}

interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  profit: number;
  sold: number;
}

interface DashboardState {
  stats: DashboardStats | null;
  salesChart: ChartItem[];
  topProducts: TopProduct[];
  isLoading: boolean;
  error: string | null;

  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  salesChart: [],
  topProducts: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      // 1. Fetch Metrics & Top Products
      const metricsRes = await axiosInstance.get(`${BASE}/metrics`);
      const { summary, topProducts } = metricsRes.data.data;

      // 2. Fetch Chart Data (Last 7 days for the main chart)
      const chartRes = await axiosInstance.get(`${BASE}/sales-chart?days=7`);
      
      // Normalization Layer: Map Backend -> UI Model
      const normalizedStats: DashboardStats = {
        todayRevenue: summary.revenue.today,
        monthlyRevenue: summary.revenue.thisMonth,
        revenueGrowth: summary.revenue.growth,
        todayProfit: summary.profit.today,
        monthlyProfit: summary.profit.thisMonth,
        totalProfit: summary.profit.total,
        ordersToday: summary.orders.today,
        totalOrders: summary.orders.total,
        lowStockCount: summary.inventory.lowStockItems,
        totalProducts: summary.inventory.totalProducts,
        totalCustomers: summary.customers.total,
      };

      const normalizedChart = chartRes.data.data.map((item: any) => ({
        name: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }),
        sales: item.revenue
      }));

      const normalizedTopProducts = topProducts.map((p: any) => ({
        id: p._id,
        name: p.name,
        revenue: p.revenue,
        profit: p.profit,
        sold: p.sold
      }));

      set({ 
        stats: normalizedStats, 
        salesChart: normalizedChart,
        topProducts: normalizedTopProducts,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to sync dashboard intelligence', isLoading: false });
    }
  },
}));
