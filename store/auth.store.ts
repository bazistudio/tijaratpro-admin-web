"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { setStoredToken, clearStoredToken } from "@/lib/api/axios";

// ─── Auth Store ───────────────────────────────────────────────────────────────
// SSR-safe: persist middleware only runs on client (localStorage guard built-in)
// Direct localStorage access in setAuth/clearAuth is also guarded.

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  /** Set user + token after successful login/register */
  setAuth: (user: User, token: string) => void;

  /** Clear all auth state on logout or 401 */
  clearAuth: () => void;

  /** Hydrate user from token (e.g. /auth/me response) */
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        // Mirror token to localStorage + cookie (client-only helpers are guarded internally)
        setStoredToken(token);
        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        clearStoredToken();
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "tp_auth",
      // SSR-safe: createJSONStorage falls back gracefully when localStorage is unavailable
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return localStorage;
        // Return a no-op storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
