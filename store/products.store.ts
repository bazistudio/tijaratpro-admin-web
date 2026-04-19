import { create } from 'zustand';
import { Product, CreateProductPayload, UpdateProductPayload } from '@/types';
import * as api from '@/features/products/api';

// We map our robust service logic from features/products/api into Zustand

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: (search?: string) => Promise<void>;
  addProduct: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (id: string, payload: UpdateProductPayload) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.getProducts(search ? { search } : undefined);
      set({ products: res.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch products', isLoading: false });
    }
  },

  addProduct: async (payload: CreateProductPayload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.createProduct(payload);
      if (res.data) {
        set((state) => ({ products: [...state.products, res.data as Product], isLoading: false }));
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to add product', isLoading: false });
      throw err;
    }
  },

  updateProduct: async (id: string, payload: UpdateProductPayload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.updateProduct(id, payload);
      if (res.data) {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? (res.data as Product) : p)),
          isLoading: false,
        }));
      }
    } catch (err: any) {
      set({ error: err.message || 'Failed to update product', isLoading: false });
      throw err;
    }
  },

  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete product', isLoading: false });
      throw err;
    }
  },
}));
