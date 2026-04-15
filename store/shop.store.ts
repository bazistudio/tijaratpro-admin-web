"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Shop } from "@/types";

// ─── Shop Store ───────────────────────────────────────────────────────────────
// Superadmin can switch "active shop context" to view per-shop data.
// Shop owners always have a fixed shopId from their user object.

interface ShopState {
  activeShop: Shop | null;

  /** Set the currently viewed shop (superadmin context switching) */
  setActiveShop: (shop: Shop | null) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      activeShop: null,
      setActiveShop: (shop) => set({ activeShop: shop }),
    }),
    {
      name: "tp_shop_ctx",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return sessionStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
