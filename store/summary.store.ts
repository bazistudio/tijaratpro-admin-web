import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/reports/summary";

interface SummaryData {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  currency: string;
}

interface SummaryState {
  summary: SummaryData | null;
  isLoading: boolean;
  error: string | null;

  fetchSummary: () => Promise<void>;
}

export const useSummaryStore = create<SummaryState>((set) => ({
  summary: null,
  isLoading: false,
  error: null,

  fetchSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(BASE);
      set({ summary: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch financial summary', isLoading: false });
    }
  },
}));
