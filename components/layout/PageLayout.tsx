"use client";

import * as React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUiStore } from "@/store";
import { cn } from "@/lib/utils";

// ─── PageLayout Component ───────────────────────────────────────────────────
// The universal shell wrapping all admin routes.
// Manages the interplay between Sidebar, Header, Breadcrumbs, and Content.
// Standardized spacing: Header (64px), Breadcrumbs (16/8px), Content (24px).

interface PageLayoutProps {
  title?: string;
  breadcrumbs?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function PageLayout({
  title,
  breadcrumbs,
  isLoading,
  children,
}: PageLayoutProps) {
  const { globalLoading } = useUiStore();
  
  // Combine internal store loading with explicit prop loading
  const showLoading = isLoading || globalLoading;

  return (
    <div className="flex h-screen overflow-hidden bg-background selection:bg-primary/30 font-sans">
      
      {/* Sidebar Shell */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col min-w-0 transition-all duration-300 relative">
        
        {/* Header Shell (Fixed 64px height) */}
        <Header />

        {/* Scrollable Layout Body */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar scroll-smooth flex flex-col">
          
          {/* Breadcrumbs Slot (Optional) */}
          {breadcrumbs && (
            <div className="px-6 pt-4 pb-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="mx-auto max-w-7xl w-full">
                {breadcrumbs}
              </div>
            </div>
          )}

          {/* Page Title (Optional) */}
          {title && (
            <div className="px-6 py-2">
              <div className="mx-auto max-w-7xl w-full">
                <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">
                  {title}
                </h1>
              </div>
            </div>
          )}

          {/* Page Content Render Outlet (24px padding) */}
          <main className={cn(
            "flex-1 p-6 relative z-10",
            !title && !breadcrumbs && "pt-6" // Ensure top padding if no title/breadcrumbs
          )}>
            <div className="mx-auto max-w-7xl w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </main>

        </div>

        {/* Global Loading Overlay */}
        {showLoading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-[2px] transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-muted-foreground animate-pulse">Processing...</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
