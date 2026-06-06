"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { SUPER_ADMIN_MENU } from "@/lib/sidebar/superAdmin";
import { useSidebarState } from "@/hooks/useSidebarState";

// ─── Super Admin Sidebar ──────────────────────────────────────────────────────
// Completely decoupled from shopId — uses static SUPER_ADMIN_MENU directly.
// No API call needed; no shop context required.

export function SuperAdminSidebar() {
  const pathname    = usePathname();
  const router      = useRouter();
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    openMenus,
    toggleSubmenu,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    setOpenMenus,
  } = useSidebarState(SUPER_ADMIN_MENU);

  const handleLogout = async () => {
    try {
      await clearAuth();
      queryClient.clear();
      localStorage.removeItem("tp_sidebar_openMenus");
      setSidebarCollapsed(false);
      setMobileNavOpen(false);
      setOpenMenus({});
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "SA";

  const visibleNav = SUPER_ADMIN_MENU;

  return (
    <>
      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen flex flex-col z-50 transition-all duration-300",
          "bg-[#0f172a] border-r border-white/[0.06]",
          sidebarCollapsed ? "w-20" : "w-72",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── Brand ──────────────────────────────────────────────────────── */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06] shrink-0">
          <Link
            href="/super-admin"
            className={cn(
              "flex items-center gap-3 group",
              sidebarCollapsed && "justify-center w-full"
            )}
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#2EC4B6] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#2EC4B6]/20 group-hover:rotate-6 transition-all duration-300 shrink-0">
              <Shield className="text-white w-4 h-4" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-lg font-black text-white tracking-tighter truncate">
                  TijaratPro
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none text-[#2EC4B6]">
                  Super Admin
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex text-slate-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <div className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          <nav className="space-y-0.5">
            {visibleNav.map((route) => {
              // Separator
              if ((route as any).isSeparator) {
                if (sidebarCollapsed) {
                  return (
                    <div
                      key={(route as any).key}
                      className="h-px bg-white/[0.06] my-4 mx-2"
                    />
                  );
                }
                return (
                  <div
                    key={(route as any).key}
                    className="px-3 pt-5 pb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 select-none"
                  >
                    {route.label}
                  </div>
                );
              }

              const hasSubItems = !!route.subItems;
              const isActive =
                route.href === "/super-admin"
                  ? pathname === "/super-admin"
                  : pathname === route.href || pathname.startsWith(route.href + "/");
              const isSubOpen = openMenus[route.key];

              return (
                <div key={route.key}>
                  <Link
                    href={hasSubItems ? "#" : route.href}
                    onClick={
                      hasSubItems
                        ? (e) => toggleSubmenu(route.key, e)
                        : undefined
                    }
                    className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-[#2EC4B6]/15 text-[#2EC4B6] border border-[#2EC4B6]/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                      sidebarCollapsed && "justify-center px-0"
                    )}
                    title={sidebarCollapsed ? route.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <route.icon
                        className={cn(
                          "h-4.5 w-4.5 shrink-0",
                          isActive
                            ? "text-[#2EC4B6]"
                            : "text-slate-500 group-hover:text-slate-200"
                        )}
                        size={18}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate">{route.label}</span>
                      )}
                    </div>
                    {!sidebarCollapsed && hasSubItems && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform text-slate-500",
                          isSubOpen && "rotate-90"
                        )}
                      />
                    )}
                    {!sidebarCollapsed && !hasSubItems && isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] shadow-[0_0_8px_rgba(46,196,182,0.8)]" />
                    )}
                  </Link>

                  {/* Sub-items */}
                  {!sidebarCollapsed && hasSubItems && isSubOpen && (
                    <div className="ml-9 mt-1 mb-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                      {route.subItems?.map((sub) => {
                        const subActive =
                          pathname === sub.href ||
                          pathname.startsWith(sub.href + "/");
                        return (
                          <Link
                            key={sub.key}
                            href={sub.href}
                            className={cn(
                              "text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200",
                              subActive
                                ? "text-[#2EC4B6] bg-[#2EC4B6]/10"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="p-3 border-t border-white/[0.06] shrink-0">
          {!sidebarCollapsed ? (
            <>
              <div className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2EC4B6] to-[#0891b2] flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {user?.name || "Super Admin"}
                    </p>
                    <p className="text-[9px] font-bold text-[#2EC4B6] uppercase tracking-wider truncate">
                      Super Admin
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2EC4B6] to-[#0891b2] flex items-center justify-center text-white font-bold text-xs cursor-pointer"
                title={user?.name || "Super Admin"}
              >
                {initials}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
