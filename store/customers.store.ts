import { create } from 'zustand';
import axiosInstance from '@/lib/api/axios';

const BASE = "/api/customers";

interface CustomersState {
  customers: any[];
  isLoading: boolean;
  error: string | null;

  fetchCustomers: (search?: string) => Promise<void>;
  addCustomer: (payload: any) => Promise<void>;
  updateCustomer: (id: string, payload: any) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async (search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(BASE, { params: { search } });
      set({ customers: res.data.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch customers', isLoading: false });
    }
  },

  addCustomer: async (payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post(BASE, payload);
      if (res.data.data) {
        set((state) => ({ customers: [...state.customers, res.data.data], isLoading: false }));
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to add customer', isLoading: false });
      throw err;
    }
  },

  updateCustomer: async (id: string, payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.put(`${BASE}/${id}`, payload);
      if (res.data.data) {
        set((state) => ({
          customers: state.customers.map((c) => (c.id === id ? res.data.data : c)),
          isLoading: false,
        }));
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to update customer', isLoading: false });
      throw err;
    }
  },

  deleteCustomer: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`${BASE}/${id}`);
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete customer', isLoading: false });
      throw err;
    }
  },
}));
