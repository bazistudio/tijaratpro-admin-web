"use client";

import { Menu, Search, Bell, LogOut, PanelLeftClose, PanelLeft, Building2 } from "lucide-react";
import { useAuthStore, useUiStore } from "@/store";
import { useLogout } from "@/features/auth/hooks";
import { useUnreadCount } from "@/features/notifications/hooks";
import { cn } from "@/lib/utils";

export function Header() {
  const { user } = useAuthStore();
  const { sidebarCollapsed, setSidebarCollapsed, setMobileNavOpen } = useUiStore();
  const logout = useLogout();
  
  // Safe default since hook might be resolving
  const { data: unreadCount = 0 } = useUnreadCount();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/70 px-4 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70 sm:gap-6 sm:px-6 transition-all duration-300">
      
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Collapse Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all duration-200"
      >
        {sidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
      </button>

      {/* Header Context / Search Area */}
      <div className="flex-1 flex items-center">
        {/* Placeholder for future global search */}
        <div className="hidden sm:flex items-center relative w-full max-w-sm">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products, orders, or customers..." 
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        {/* Shop Name Display (Non-SuperAdmins) */}
        {user.role !== "superadmin" && user.shopName && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Building2 size={14} className="text-indigo-500" />
            <span className="max-w-[120px] truncate">{user.shopName}</span>
          </div>
        )}

        {/* Notifications */}
        <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors group">
          <Bell size={20} className="group-hover:text-indigo-500 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

        {/* User Profile Hookup */}
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-1">{user.name}</span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">{user.role.replace("_", " ")}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-slate-900 relative">
            {user.name.charAt(0).toUpperCase()}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={logout}
          className="p-2 ml-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
