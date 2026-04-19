import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/sales";

interface SalesState {
  sales: any[];
  isLoading: boolean;
  error: string | null;

  fetchSales: (search?: string) => Promise<void>;
  addSale: (payload: any) => Promise<void>;
}

export const useSalesStore = create<SalesState>((set) => ({
  sales: [],
  isLoading: false,
  error: null,

  fetchSales: async (search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(BASE, { params: { search } });
      set({ sales: res.data.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch sales', isLoading: false });
    }
  },

  addSale: async (payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post(BASE, payload);
      if (res.data.data) {
        set((state) => ({ sales: [...state.sales, res.data.data], isLoading: false }));
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to add sale', isLoading: false });
      throw err;
    }
  },
}));
