"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Omnisearch } from "@/components/omnisearch";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, initialize, user, shops, activeShopId, hasCapability } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Call backend to verify token and rebuild state
    initialize().finally(() => {
      setIsInitializing(false);
    });
  }, [initialize]);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push("/login");
    }
  }, [isInitializing, isAuthenticated, router]);

  // Industry & Capability Security Guards
  useEffect(() => {
    if (isInitializing || !isAuthenticated || !user) return;

    // Resolve Active Shop Context
    const activeShop = (shops || []).find((s) => s._id === activeShopId);
    const activeShopIndustry = activeShop?.industryType || "GENERAL_STORE";

    // 1. Industry Specific Route Restrictions
    if (pathname.includes("/industry/expiry") || pathname.includes("/industry/batches")) {
      if (activeShopIndustry !== "MEDICINES") {
        router.replace("/dashboard");
        return;
      }
    }

    if (pathname.includes("/industry/compatibility")) {
      if (activeShopIndustry !== "AUTO_PARTS") {
        router.replace("/dashboard");
        return;
      }
    }

    // 2. Financial / Reporting Capability Guards
    if (pathname.startsWith("/reports")) {
      if (!hasCapability("canExportReports") && user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
        router.replace("/dashboard");
        return;
      }
    }

    if (pathname.startsWith("/expenses")) {
      if (!hasCapability("canViewFinance") && user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
        router.replace("/dashboard");
        return;
      }
    }
  }, [pathname, isInitializing, isAuthenticated, user, shops, activeShopId, hasCapability, router]);

  if (!mounted || isInitializing) return null;

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
      <Omnisearch />
    </div>
  );
}
