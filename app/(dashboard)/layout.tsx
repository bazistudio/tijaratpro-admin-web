"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-500">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        <main className="flex-1 p-6 md:p-8 lg:p-10 animate-in fade-in duration-700">
          {/* Content Container with max-width for better readability */}
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        {/* Global Footer (Optional for internal app) */}
        <footer className="py-6 px-10 border-t border-[var(--border)] text-center">
          <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-[0.2em]">
            TijaratPro Intelligence Engine — v1.0.0 Stable
          </p>
        </footer>
      </div>
    </div>
  );
}
