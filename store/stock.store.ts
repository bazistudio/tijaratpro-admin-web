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
      const items = res.data.data || [];
      
      // Compute KPIs natively on load
      let totalProd = items.length;
      let lowStock = 0;
      let outOfStock = 0;
      let totalVal = 0;

      items.forEach((item: any) => {
        if (item.quantity === 0) outOfStock++;
        else if (item.status === 'LOW') lowStock++;

        totalVal += (item.quantity * item.cost);
      });

      set({ 
        stockItems: items, 
        isLoading: false,
        totalProducts: totalProd,
        lowStockItems: lowStock,
        outOfStockItems: outOfStock,
        totalInventoryValue: totalVal
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
