"use client";

import React from "react";
import { 
  Search, 
  Bell, 
  Plus, 
  ChevronDown,
  LayoutGrid,
  Zap,
  HelpCircle
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";

export function Topbar() {
  return (
    <header className="h-20 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Search & Quick Actions */}
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence Engine... (⌘K)"
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-10 px-4 flex items-center gap-2">
            <Zap size={14} className="text-primary" />
            <span className="hidden xl:inline">Smart Actions</span>
          </Button>
          <Button variant="primary" size="sm" className="h-10 px-4 flex items-center gap-2">
            <Plus size={16} />
            <span className="hidden xl:inline">New Entry</span>
          </Button>
        </div>
      </div>

      {/* Right: Notifications, Theme, Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 text-success">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.1em]">Engine Online</span>
        </div>

        <NotificationDropdown />

        <ThemeToggle />

        <div className="h-10 w-[1px] bg-[var(--border)] mx-2" />

        <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-[var(--bg-secondary)] transition-all group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <HelpCircle size={18} className="text-primary" />
          </div>
          <ChevronDown size={16} className="text-[var(--text-soft)] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
