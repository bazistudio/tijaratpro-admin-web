"use client";

import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { useAuthStore } from "@/store/auth.store";
import { useSuperAdminStore } from "@/features/super-admin/store/superAdmin.store";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

// ─── Super Admin Topbar ───────────────────────────────────────────────────────
// SA-specific header — no shop switcher. Shows ⌘K search, notifications, admin info.

export function SuperAdminTopbar() {
  const { user, clearAuth } = useAuthStore();
  const { openCommandPalette } = useSuperAdminStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await clearAuth();
      queryClient.clear();
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "SA";

  return (
    <header className="h-16 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 flex items-center justify-between sticky top-0 z-40">

      {/* ── Left: System status + Search ──────────────────────────────── */}
      <div className="flex items-center gap-4 flex-1">
        {/* System health pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.1em]">
            System Online
          </span>
        </div>

        {/* ⌘K Search trigger */}
        <button
          onClick={openCommandPalette}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-xl",
            "bg-[var(--bg-secondary)]/60 border border-[var(--border)]",
            "text-[var(--text-soft)] hover:border-primary/30 hover:text-[var(--text)]",
            "transition-all duration-200 group min-w-[240px] max-w-xs"
          )}
        >
          <Search className="w-4 h-4 text-[var(--text-soft)] group-hover:text-primary transition-colors" />
          <span className="flex-1 text-sm text-left">Search tenants, tickets…</span>
          <div className="flex items-center gap-1">
            <kbd className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-soft)]">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      {/* ── Right: Notifications + Theme + Admin info ──────────────────── */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <NotificationDropdown />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="h-8 w-px bg-[var(--border)] mx-1" />

        {/* Admin user badge */}
        {/* Admin user badge with dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EC4B6] to-[#0891b2] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xs font-bold text-[var(--text)] leading-tight">
                {user?.name || "Super Admin"}
              </span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
                Super Admin
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-[var(--text-soft)] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
            />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => { setDropdownOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-danger hover:bg-danger/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SuperAdminTopbar;
