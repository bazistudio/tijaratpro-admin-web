"use client";

import * as React from "react";
import { useUiStore } from "@/store";
import { cn } from "@/lib/utils";

// ─── PageLayout Component ───────────────────────────────────────────────────
// Standardized wrapper for page content.
// Provides Breadcrumbs slot, Title slot, and Loading states.
// NOTE: Sidebar and Header are provided by the root DashboardLayout.

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
  
  const showLoading = isLoading || globalLoading;

  return (
    <div className="flex flex-col min-h-full">
      {/* Breadcrumbs Slot */}
      {breadcrumbs && (
        <div className="px-1 pt-2 pb-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-300">
          {breadcrumbs}
        </div>
      )}

      {/* Page Title */}
      {title && (
        <div className="py-2 mb-4">
          <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">
            {title}
          </h1>
        </div>
      )}

      {/* Page Content */}
      <main className={cn(
        "flex-1 relative z-10",
        !title && !breadcrumbs && "pt-2"
      )}>
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 h-full">
          {children}
        </div>
      </main>

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
  );
}
