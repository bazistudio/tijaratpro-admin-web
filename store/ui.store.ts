"use client";

import { create } from "zustand";

// ─── UI Store ─────────────────────────────────────────────────────────────────
// Manages sidebar state, global loading, and mobile nav

interface UiState {
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  globalLoading: boolean;

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  sidebarCollapsed: false,
  mobileNavOpen: false,
  globalLoading: false,

  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  toggleMobileNav: () =>
    set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  setMobileNavOpen: (open) =>
    set({ mobileNavOpen: open }),

  setGlobalLoading: (loading) =>
    set({ globalLoading: loading }),
}));
