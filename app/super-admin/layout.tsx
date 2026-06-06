"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { SuperAdminSidebar } from "@/components/layout/SuperAdminSidebar";
import { SuperAdminTopbar } from "@/components/layout/SuperAdminTopbar";
import { CommandPalette } from "@/features/super-admin/components/shared/CommandPalette";
import { DetailDrawer } from "@/features/super-admin/components/shared/DetailDrawer";
import { BulkActionsBar } from "@/features/super-admin/components/shared/BulkActionsBar";
import { ConfirmDialog } from "@/features/super-admin/components/shared/ConfirmDialog";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, initialize } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initialize().finally(() => {
      setIsInitializing(false);
    });
  }, [initialize]);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push("/login");
    } else if (!isInitializing && isAuthenticated && user?.role !== "SUPER_ADMIN") {
      router.push(user?.role === "ADMIN" ? "/organization" : "/dashboard");
    }
  }, [isInitializing, isAuthenticated, user, router]);

  if (!mounted || isInitializing) return null;
  if (!isAuthenticated || user?.role !== "SUPER_ADMIN") return null;

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar — Desktop */}
      <div className="hidden lg:block shrink-0">
        <SuperAdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <SuperAdminTopbar />

        <main className="flex-1 p-6 md:p-8 animate-in fade-in duration-500">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* ── Global SA UX Systems ─────────────────────────────────────── */}
      {/* These mount once at layout level and are controlled by the SA store */}
      <CommandPalette />
      <DetailDrawer />
      <BulkActionsBar />
      <ConfirmDialog />
    </div>
  );
}
