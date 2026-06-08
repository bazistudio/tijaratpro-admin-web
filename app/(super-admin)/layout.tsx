"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    
    // Quick frontend guard
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "SUPER_ADMIN") {
      // If not SUPER_ADMIN, redirect to appropriate dashboard
      if (user?.role === "ADMIN") {
        router.push("/organization");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  if (!mounted || !isAuthenticated || user?.role !== "SUPER_ADMIN") return null;

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
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
