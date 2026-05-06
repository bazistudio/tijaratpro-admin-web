"use client";

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
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Core",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "My Shops", icon: Store, href: "/shops" },
    ]
  },
  {
    title: "Inventory & CRM",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/orders" },
      { label: "Products", icon: Package, href: "/products" },
      { label: "Customers", icon: Users, href: "/customers" },
    ]
  },
  {
    title: "Business Intelligence",
    items: [
      { label: "Sales & Billing", icon: ReceiptText, href: "/billing" },
      { label: "Analytics", icon: PieChart, href: "/analytics" },
    ]
  },
  {
    title: "System",
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
    router.push("/login");
  };

  return (
    <aside className="w-72 h-screen flex flex-col border-r border-border bg-white lg:flex hidden relative z-30 shadow-sm">
      {/* Brand Section */}
      <div className="h-20 flex items-center px-8 border-b border-border/50 shrink-0">
        <div className="h-10 w-10 rounded-xl bg-[#003049] flex items-center justify-center mr-3 shadow-lg shadow-blue-900/20">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#003049]">TijaratPro</span>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 py-8 overflow-y-auto px-4 custom-scrollbar">
        <nav className="space-y-8">
          {navigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
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
                        "group flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        isActive 
                          ? "bg-[#003049] text-white shadow-md shadow-blue-900/10" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-[#003049]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground group-hover:text-[#003049]")} />
                        {route.label}
                      </div>
                      {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t border-border/50 shrink-0">
        <div className="mb-6 p-4 rounded-2xl bg-muted/30 border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Signed in as</p>
          <p className="text-sm font-bold text-[#003049] truncate">Admin User</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/5 transition-all active:scale-95 border border-transparent hover:border-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

