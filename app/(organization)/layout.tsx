"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
    
    // Quick frontend guard
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
      if (!allowedRoles.includes(user?.role || "")) {
        router.push("/dashboard"); // fallback for shop staff
      }
    }
  }, [isAuthenticated, user, router]);

  const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
  if (!mounted || !isAuthenticated || !allowedRoles.includes(user?.role || "")) return null;

  return (
    <div className="flex min-h-screen bg-[var(--background)] transition-colors duration-500">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

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
