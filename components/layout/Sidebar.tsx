"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, ShoppingCart, Package, Users, ReceiptText, 
  PieChart, Settings, LogOut, Store, ChevronRight,
  X, PanelLeftClose, PanelLeftOpen, CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store";

// Simulated user role (in a real app, this comes from auth context/store)
const CURRENT_ROLE = "admin";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", roles: ["admin", "manager", "staff"] },
  { label: "Analytics", icon: PieChart, href: "/analytics", roles: ["admin", "manager"] },
  { label: "Orders", icon: ShoppingCart, href: "/orders", roles: ["admin", "manager", "staff"] },
  { 
    label: "Products", 
    icon: Package, 
    href: "/products",
    roles: ["admin", "manager"],
    subItems: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/products/categories" },
    ]
  },
  { label: "Inventory", icon: Store, href: "/stock", roles: ["admin", "manager"] },
  { label: "Billing", icon: ReceiptText, href: "/billing", roles: ["admin"] },
  { label: "Customers", icon: Users, href: "/customers", roles: ["admin", "manager"] },
  { label: "Expenses", icon: CreditCard, href: "/expenses", roles: ["admin"] },
  { label: "Settings", icon: Settings, href: "/settings", roles: ["admin"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useUiStore();
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleSubmenu = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    if (sidebarCollapsed) setSidebarCollapsed(false);
  };

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  // Filter items by role
  const visibleNav = navigation.filter(item => item.roles.includes(CURRENT_ROLE));

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
        <div className="flex-1 py-6 px-3">
          <nav className="space-y-1">
            {visibleNav.map((route) => {
              const hasSubItems = !!route.subItems;
              const isActive = pathname === route.href || (hasSubItems && route.subItems?.some(sub => pathname === sub.href));
              const isSubOpen = openMenus[route.label];

              return (
                <div key={route.label}>
                  <Link
                    href={hasSubItems ? "#" : route.href}
                    onClick={hasSubItems ? (e) => toggleSubmenu(route.label, e) : undefined}
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
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "text-xs font-medium px-3 py-2 rounded-md transition-all duration-200",
                            pathname === sub.href 
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
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-3 border-t border-[var(--border)] shrink-0">
          {!sidebarCollapsed ? (
            <>
              <div className="mb-3 p-3 rounded-xl bg-primary/5 border border-primary/10 group cursor-pointer hover:bg-primary/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
                    AD
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-xs font-bold text-[var(--text)] truncate">Admin User</p>
                    <p className="text-[9px] font-bold text-[var(--text-soft)] uppercase tracking-wider truncate">Super Admin</p>
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xs shadow-sm cursor-pointer" title="Admin User">
                AD
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
