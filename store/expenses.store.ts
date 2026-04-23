import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/expenses";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpensesState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;

  fetchExpenses: () => Promise<void>;
  addExpense: (payload: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(BASE);
      set({ expenses: res.data.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch expenses', isLoading: false });
    }
  },

  addExpense: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post(BASE, payload);
      set((state) => ({ 
        expenses: [res.data.data, ...state.expenses], 
        isLoading: false 
      }));
    } catch (err: any) {
      set({ error: err.message || 'Failed to add expense', isLoading: false });
      throw err;
    }
  },

  deleteExpense: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`${BASE}/${id}`);
      set((state) => ({
        expenses: state.expenses.filter((e) => e._id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete expense', isLoading: false });
      throw err;
    }
  },
}));
