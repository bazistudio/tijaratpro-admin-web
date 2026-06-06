"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LogOut, ChevronRight, X, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePermission } from "@/hooks/use-permissions";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useSidebarNav } from "@/hooks/useSidebarNav";
import { useSidebarState } from "@/hooks/useSidebarState";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role } = usePermission();
  const queryClient = useQueryClient();
  const { clearAuth, activeShopId } = useAuthStore();

  // 1. Fetch authorized architecture from the backend
  const { data: visibleNav = [], isLoading } = useSidebarNav(activeShopId || undefined);

  // 2. Manage all UI layout state (collapse, mobile overlay, nested opens)
  const {
    openMenus,
    toggleSubmenu,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    setOpenMenus
  } = useSidebarState(visibleNav);

  const handleLogout = async () => {
    try {
      await clearAuth();
      // Clear all cached data to prevent information leakage
      queryClient.clear();
      // Clear persisted sidebar UI state
      localStorage.removeItem("tp_sidebar_openMenus");
      // Reset UI state to defaults
      setSidebarCollapsed(false);
      setMobileNavOpen(false);
      setOpenMenus({});
      router.push("/login");
    } catch (error) {
      console.error("[Sidebar] Logout failed:", error);
      // Fallback redirect even if server call fails
      router.push("/login");
    }
  };

  // Get user initials
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : "AD";

  return (
    <>
      {/* Mobile Overlay */}
      {mobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen flex flex-col bg-[var(--card)] border-r border-[var(--border)] backdrop-blur-xl z-50 transition-all duration-300",
        sidebarCollapsed ? "w-20" : "w-72",
        mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Brand Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)] shrink-0">
          <Link href="/dashboard" className={cn("flex items-center gap-3 group", sidebarCollapsed && "justify-center w-full")}>
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-300 shrink-0">
              <span className="text-white font-black text-lg">T</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-lg font-black gradient-text tracking-tighter truncate">TijaratPro</span>
                <span className="text-[8px] text-[var(--text-soft)] font-black uppercase tracking-[0.2em] leading-none truncate">Admin Panel</span>
              </div>
            )}
          </Link>
          
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <button 
            onClick={() => setMobileNavOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation Section */}
        <div className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            {isLoading ? (
              // Skeleton Loader
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-lg animate-pulse">
                  <div className="h-5 w-5 bg-muted rounded-md shrink-0" />
                  {!sidebarCollapsed && <div className="h-4 bg-muted rounded w-2/3" />}
                </div>
              ))
            ) : (
              visibleNav.map((route) => {
              if ((route as any).isSeparator) {
                if (sidebarCollapsed) {
                  return <div key={(route as any).key || route.label} className="h-[1px] bg-[var(--border)] my-6 mx-2" />;
                }
                return (
                  <div key={(route as any).key || route.label} className="px-3 pt-6 pb-2 text-[9px] font-black uppercase text-[var(--text-soft)] tracking-[0.2em] border-b border-[var(--border)]/35 mb-3 truncate select-none">
                    {route.label}
                  </div>
                );
              }

              const hasSubItems = !!route.subItems;
              const isActive = pathname === route.href || pathname.startsWith(route.href + "/");
              const isSubOpen = openMenus[route.key];

              return (
                <div key={route.key}>
                  <Link
                    href={hasSubItems ? "#" : route.href}
                    onClick={hasSubItems ? (e) => toggleSubmenu(route.key, e) : undefined}
                    data-active={isActive}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
                      isActive 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "text-[var(--text-soft)] hover:bg-primary/10 hover:text-primary",
                      sidebarCollapsed && "justify-center px-0"
                    )}
                    title={sidebarCollapsed ? route.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <route.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-[var(--text-soft)] group-hover:text-primary")} />
                      {!sidebarCollapsed && <span>{route.label}</span>}
                    </div>
                    {!sidebarCollapsed && hasSubItems && (
                      <ChevronRight className={cn("h-4 w-4 transition-transform", isSubOpen && "rotate-90")} />
                    )}
                    {!sidebarCollapsed && !hasSubItems && isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </Link>

                  {/* Submenu */}
                  {!sidebarCollapsed && hasSubItems && isSubOpen && (
                    <div className="ml-9 mt-1 mb-2 flex flex-col gap-1 border-l-2 border-border/50 pl-2">
                      {route.subItems?.map((sub) => (
                        <Link
                          key={sub.key}
                          href={sub.href}
                          data-active={pathname === sub.href || pathname.startsWith(sub.href + "/")}
                          className={cn(
                            "text-xs font-medium px-3 py-2 rounded-md transition-all duration-200",
                            pathname === sub.href || pathname.startsWith(sub.href + "/")
                              ? "bg-primary/10 text-primary" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-3 border-t border-[var(--border)] shrink-0">
          {!sidebarCollapsed ? (
            <>
              <div className="mb-3 p-3 rounded-xl bg-primary/5 border border-primary/10 group cursor-pointer hover:bg-primary/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-xs font-bold text-[var(--text)] truncate">{user?.name || 'User'}</p>
                    <p className="text-[9px] font-bold text-[var(--text-soft)] uppercase tracking-wider truncate">{role?.replace('_', ' ') || 'Staff'}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold text-danger hover:bg-danger/10 transition-all active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xs shadow-sm cursor-pointer" title={user?.name || 'User'}>
                {initials}
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg text-danger hover:bg-danger/10 transition-all"
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
