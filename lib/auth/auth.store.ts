import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './auth.types';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  token: string | null;
  shopId: string | null;
  setAuth: (user: User, token: string, shopId?: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      shopId: null,
      setAuth: (user, token, shopId) => {
        // Set cookie for middleware
        Cookies.set('tp_token', token, { expires: 7, path: '/' });
        if (shopId) {
          Cookies.set('tp_shopId', shopId, { expires: 7, path: '/' });
        }
        set({ user, token, shopId });
      },
      logout: () => {
        Cookies.remove('tp_token');
        Cookies.remove('tp_shopId');
        set({ user: null, token: null, shopId: null });
      },
      hydrate: () => {
        // This is mainly handled by persist, but we can sync with cookies if needed
        const token = Cookies.get('tp_token');
        if (!token) {
           set({ user: null, token: null, shopId: null });
        }
      }
    }),
    {
      name: 'auth-storage', // unique name
      partialize: (state) => ({ user: state.user, token: state.token, shopId: state.shopId }), // persist user & token & shopId
    }
  )
);
