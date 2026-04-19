"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth/auth.store";
import { clearStoredToken } from "@/lib/api/axios";

export default function LogoutPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Clear Zustand store and cookies
    logout();
    
    // Clear API module cookies/localStorage
    clearStoredToken();

    // Redirect to login
    router.replace("/login");
  }, [logout, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <div className="text-center">
        <h1 className="text-xl font-medium animate-pulse">Logging out...</h1>
      </div>
    </div>
  );
}
