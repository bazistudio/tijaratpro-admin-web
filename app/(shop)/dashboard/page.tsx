"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"
import ShopDashboard from "@/components/dashboard/ShopDashboard"
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard"
import { ShieldAlert, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, status, clearAuth, hydrated } = useAuthStore();
  const role = user?.role;
  const router = useRouter();

  // 1. Initial 3-state Boot & Hydration Handling
  if (status === "loading" || !hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-soft)]">
            Resuming Secure Session...
          </p>
        </div>
      </div>
    );
  }

  // 2. Auth Recovery Guard (Now hydration-safe)
  // Detected valid token but missing role identity AFTER hydration is complete
  if (status === "authenticated" && !role && hydrated) {
    console.error("[Dashboard Guard] Authenticated session missing role. Forcing recovery.");
    clearAuth().then(() => router.push("/login"));
    
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center text-warning mb-6">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-black text-[var(--text-main)] mb-2">Session Integrity Failure</h2>
        <p className="text-[var(--text-soft)] max-w-sm font-medium">
          Role identity is missing. Triggering secure auth recovery...
        </p>
      </div>
    );
  }

  // 3. Platform Dispatcher
  if (role === "SUPER_ADMIN") {
    return <SuperAdminDashboard />;
  }

  // 4. Default to Shop/Tenant Dashboard for Staff/Admins
  if (role === "ADMIN" || role === "STAFF") {
    return <ShopDashboard />;
  }

  // 5. Final Fallback: Unauthenticated or Unauthorized
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center text-danger mb-6">
        <ShieldAlert size={32} />
      </div>
      <h2 className="text-2xl font-black text-[var(--text-main)] mb-2">Access Denied</h2>
      <p className="text-[var(--text-soft)] max-w-sm font-medium">
        Unrecognized role context. Please log in again to refresh your permissions.
      </p>
    </div>
  );
}
