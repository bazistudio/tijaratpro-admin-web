import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/stock";

interface StockState {
  stockItems: any[];
  isLoading: boolean;
  error: string | null;

  // KPIs dynamically computed from stockItems
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalInventoryValue: number;

  fetchStock: (search?: string) => Promise<void>;
  updateStockQuantity: (id: string, quantity: number) => Promise<void>;
}

export const useStockStore = create<StockState>((set, get) => ({
  stockItems: [],
  isLoading: false,
  error: null,

  totalProducts: 0,
  lowStockItems: 0,
  outOfStockItems: 0,
  totalInventoryValue: 0,

  fetchStock: async (search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(BASE, { params: { search } });
      const { items, summary } = res.data.data || { items: [], summary: {} };
      
      set({ 
        stockItems: items, 
        isLoading: false,
        totalProducts: summary.totalProducts || 0,
        lowStockItems: summary.lowStockItems || 0,
        outOfStockItems: summary.outOfStockItems || 0,
        totalInventoryValue: summary.totalInventoryValue || 0
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch stock', isLoading: false });
    }
  },

  updateStockQuantity: async (id: string, quantity: number) => {
    try {
      const res = await axiosInstance.patch(`${BASE}/${id}`, { quantity });
      if (res.data.data) {
         // Refresh list to update KPIs automatically
         await get().fetchStock();
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to update stock quantity' });
      throw err;
    }
  },
}));
