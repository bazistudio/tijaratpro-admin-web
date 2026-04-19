import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/dashboard";

interface DashboardState {
  stats: {
    totalSalesToday: number;
    monthlyProfit: number;
    lowStockItems: number;
    activeCustomers: number;
  } | null;
  isLoading: boolean;
  error: string | null;

  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`${BASE}/stats`);
      set({ stats: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch dashboard stats', isLoading: false });
    }
  },
}));
