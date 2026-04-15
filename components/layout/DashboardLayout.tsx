"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUiStore } from "@/store";
import { cn } from "@/lib/utils";

// ─── DashboardLayout Component ────────────────────────────────────────────────
// The fundamental shell wrapping all protected routes.
// Manages the interplay between the Sidebar, Header, and Page Content.
// Handles complex background coloring for a premium aesthetic.

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { globalLoading } = useUiStore();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0a0a0c] selection:bg-indigo-500/30 font-sans">
      
      {/* Sidebar Shell */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col min-w-0 transition-all duration-300">
        
        {/* Header Shell */}
        <Header />

        {/* Global Loading Overlay (if triggered by mutations/routing) */}
        {globalLoading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">Processing...</span>
            </div>
          </div>
        )}

        {/* Page Content Render Outlet */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto no-scrollbar scroll-smooth relative">
          
          {/* Subtle background glow effect for deep dark mode */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none hidden dark:block" />
          
          <div className="mx-auto max-w-7xl relative z-10 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
}
