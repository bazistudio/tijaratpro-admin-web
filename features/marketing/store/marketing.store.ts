import { create } from 'zustand';
import { Salesman, Visit } from '../types/marketing.types';

interface MarketingState {
  selectedSalesmanId: string | null;
  activeVisitId: string | null;
  filters: {
    status: string;
    date: Date | null;
  };
  setSalesman: (id: string | null) => void;
  setVisit: (id: string | null) => void;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

export const useMarketingStore = create<MarketingState>((set) => ({
  selectedSalesmanId: null,
  activeVisitId: null,
  filters: {
    status: 'all',
    date: new Date(),
  },
  setSalesman: (id) => set({ selectedSalesmanId: id }),
  setVisit: (id) => set({ activeVisitId: id }),
  setFilter: (key, value) => 
    set((state) => ({ 
      filters: { ...state.filters, [key]: value } 
    })),
  resetFilters: () => set({ 
    filters: { status: 'all', date: new Date() } 
  }),
}));
