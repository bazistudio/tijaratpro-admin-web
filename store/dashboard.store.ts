import { create } from 'zustand';
import authService from '@/services/authService';

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

interface RecentActivity {
  id: string;
  type: 'order' | 'stock' | 'customer' | 'expense';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

interface DashboardState {
  stats: DashboardStats | null;
  salesChart: ChartItem[];
  topProducts: TopProduct[];
  recentActivities: RecentActivity[];
  isLoading: boolean;
  error: string | null;

  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  salesChart: [],
  topProducts: [],
  recentActivities: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      // 1. Fetch Metrics & Top Products
      const metricsRes = await authService.get(`${BASE}/metrics`);
      const metricsData = metricsRes.data.data || metricsRes.data || {};
      const summary = metricsData.summary || {
        revenue: { today: 0, thisMonth: 0, total: 0, growth: 0 },
        profit: { today: 0, thisMonth: 0, total: 0 },
        orders: { today: 0, total: 0 },
        inventory: { totalProducts: 0, lowStockItems: 0 },
        customers: { total: 0 }
      };
      const topProductsRaw = metricsData.topProducts || [];

      // 2. Fetch Chart Data (Last 7 days for the main chart)
      const chartRes = await authService.get(`${BASE}/sales-chart?days=7`);
      const chartDataRaw = chartRes.data.data || chartRes.data || [];
      
      // Normalization Layer: Map Backend -> UI Model
      const normalizedStats: DashboardStats = {
        todayRevenue: summary.revenue?.today || 0,
        monthlyRevenue: summary.revenue?.thisMonth || 0,
        revenueGrowth: summary.revenue?.growth || 0,
        todayProfit: summary.profit?.today || 0,
        monthlyProfit: summary.profit?.thisMonth || 0,
        totalProfit: summary.profit?.total || 0,
        ordersToday: summary.orders?.today || 0,
        totalOrders: summary.orders?.total || 0,
        lowStockCount: summary.inventory?.lowStockItems || 0,
        totalProducts: summary.inventory?.totalProducts || 0,
        totalCustomers: summary.customers?.total || 0,
      };

      const normalizedChart = chartDataRaw.map((item: any) => ({
        name: item._id ? new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }) : 'Unknown',
        sales: item.revenue || 0
      }));

      const normalizedTopProducts = topProductsRaw.map((p: any) => ({
        id: p._id || Math.random().toString(),
        name: p.name || 'Unknown Product',
        revenue: p.revenue || 0,
        profit: p.profit || 0,
        sold: p.sold || 0
      }));

      // Fetch Recent Activities from Backend
      const activitiesRes = await authService.get(`${BASE}/activities`);
      const activities = activitiesRes.data.data || activitiesRes.data || [];

      set({ 
        stats: normalizedStats, 
        salesChart: normalizedChart,
        topProducts: normalizedTopProducts,
        recentActivities: activities,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to sync dashboard intelligence', isLoading: false });
    }
  },
}));
