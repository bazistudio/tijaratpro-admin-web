"use client";

import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  Plus, 
  ChevronDown,
  LayoutGrid,
  Zap,
  HelpCircle,
  Wrench,
  Pill,
  Store,
  ShoppingCart
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/layout/notification-dropdown";
import { useQueryClient } from "@tanstack/react-query";

export function Topbar() {
  const { user, shops, activeShopId, setActiveShop } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Safeguard active shop resolution
  const activeShop = (shops || []).find((s) => s._id === activeShopId) || {
    name: user?.shopName || "Default Shop",
    industryType: "GENERAL_STORE"
  };

  const handleShopSwitch = (shopId: string) => {
    setActiveShop(shopId);
    // Instantly wipe query cache to prevent race conditions and cross-shop data leakage
    queryClient.clear();
    setDropdownOpen(false);
    // Always redirect to dashboard on branch switch to prevent route mismatch crashes
    router.push("/dashboard");
  };

  return (
    <header className="h-20 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)] px-8 flex items-center justify-between sticky top-0 z-40">
      
      {/* Left: SaaS Branch Selector & Search & Quick Actions */}
      <div className="flex items-center gap-6 flex-1">
        
        {/* SaaS Organization & Shop Switcher Dropdown */}
        {user && user.role !== "SUPER_ADMIN" && (
          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] hover:bg-[var(--bg-secondary)]/80 transition-all text-left group min-w-[210px] focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                {activeShop.industryType === "AUTO_PARTS" ? (
                  <Wrench size={16} />
                ) : activeShop.industryType === "MEDICINES" ? (
                  <Pill size={16} />
                ) : (
                  <Store size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[9px] uppercase font-black text-[var(--text-soft)] tracking-wider">
                  {user?.shopName || "Tijarat Pro"}
                </p>
                <p className="text-sm font-semibold text-[var(--text)] truncate">
                  {activeShop.name}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-[var(--text-soft)] transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop overlay */}
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setDropdownOpen(false)}
                />
                
                {/* Dropdown Box */}
                <div className="absolute left-0 mt-2 w-[240px] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider border-b border-[var(--border)] mb-2">
                    Select Branch
                  </div>
                  <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
                    {(shops || []).map((shop) => {
                      const isSelected = shop._id === activeShopId;
                      return (
                        <button
                          key={shop._id}
                          onClick={() => handleShopSwitch(shop._id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            isSelected
                              ? "bg-primary text-white"
                              : "hover:bg-[var(--bg-secondary)] text-[var(--text)]"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-[var(--bg-secondary)] text-primary"
                            }`}
                          >
                            {shop.industryType === "AUTO_PARTS" ? (
                              <Wrench size={14} />
                            ) : shop.industryType === "MEDICINES" ? (
                              <Pill size={14} />
                            ) : (
                              <Store size={14} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{shop.name}</p>
                            <p
                              className={`text-[10px] ${
                                isSelected ? "text-white/70" : "text-[var(--text-soft)]"
                              }`}
                            >
                              {shop.industryType === "AUTO_PARTS"
                                ? "Auto Parts"
                                : shop.industryType === "MEDICINES"
                                ? "Pharmacy"
                                : "General"}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Add Branch link */}
                  {user?.role === "ADMIN" && (
                    <div className="border-t border-[var(--border)] mt-2 pt-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/organization/shops");
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-[var(--border)] text-xs font-semibold hover:border-primary hover:text-primary transition-all"
                      >
                        <Plus size={14} />
                        <span>Add Shop Branch</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <div className="relative w-full max-w-xs group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search Intelligence..."
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
