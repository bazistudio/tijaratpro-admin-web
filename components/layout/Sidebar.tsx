"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  ReceiptText, 
  PieChart, 
  Settings, 
  LogOut, 
  Store,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Intelligence",
    items: [
      { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Analytics", icon: PieChart, href: "/analytics" },
    ]
  },
  {
    title: "Operations",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/orders" },
      { label: "Products", icon: Package, href: "/products" },
      { label: "Inventory", icon: Store, href: "/stock" },
    ]
  },
  {
    title: "Finance & CRM",
    items: [
      { label: "Billing", icon: ReceiptText, href: "/billing" },
      { label: "Customers", icon: Users, href: "/customers" },
      { label: "Expenses", icon: CreditCard, href: "/expenses" },
    ]
  },
  {
    title: "Management",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Clear cookies logic would go here in integration phase
    router.push("/login");
  };

  return (
    <aside className="w-72 h-screen flex flex-col bg-[var(--card)] border-r border-[var(--border)] backdrop-blur-xl sticky top-0 z-50">
      {/* Brand Section */}
      <div className="h-20 flex items-center px-8 border-b border-[var(--border)] shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-300">
            <span className="text-white font-black text-xl">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black gradient-text tracking-tighter">TijaratPro</span>
            <span className="text-[9px] text-[var(--text-soft)] font-black uppercase tracking-[0.2em] leading-none">Admin Panel</span>
          </div>
        </Link>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 py-8 overflow-y-auto px-4 custom-scrollbar">
        <nav className="space-y-8">
          {navigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-soft)] opacity-60">
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((route) => {
                  const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`);
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                        isActive 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "text-[var(--text-soft)] hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-[var(--text-soft)] group-hover:text-primary")} />
                        {route.label}
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Section: User Profile Short */}
      <div className="p-4 border-t border-[var(--border)] shrink-0">
        <div className="mb-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group cursor-pointer hover:bg-primary/10 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-sm shadow-md">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-black text-[var(--text)] truncate">Admin User</p>
              <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-black text-danger hover:bg-danger/5 transition-all active:scale-95 border border-transparent hover:border-danger/10"
        >
          <LogOut className="h-5 w-5" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}
