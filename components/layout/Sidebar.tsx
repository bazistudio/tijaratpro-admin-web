import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  Box,
  TrendingUp,
  Truck,
  CreditCard,
  FileBarChart,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUiStore } from "@/store";
import { canVisit } from "@/lib/rbac";
import { ROUTES } from "@/lib/constants";

// ─── Navigation Definitions ───────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: "Products", href: ROUTES.PRODUCTS, icon: Package },
  { label: "Orders", href: ROUTES.ORDERS, icon: ShoppingCart },
  { label: "Customers", href: ROUTES.CUSTOMERS, icon: Users },
  { label: "Inventory", href: ROUTES.INVENTORY, icon: Box },
  { label: "Sales", href: ROUTES.SALES, icon: TrendingUp },
  { label: "Suppliers", href: ROUTES.SUPPLIERS, icon: Truck },
];

const ADMIN_ITEMS = [
  { label: "Shops", href: ROUTES.SHOPS, icon: Store },
  { label: "Plans", href: ROUTES.PLANS, icon: CreditCard },
  { label: "Billing", href: ROUTES.BILLING, icon: FileBarChart },
  { label: "Reports", href: ROUTES.REPORTS, icon: FileBarChart },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { sidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useUiStore();

  if (!user) return null;

  // Filter items based on user role
  const visibleNavItems = NAV_ITEMS.filter((item) =>
    canVisit(user.role, item.href)
  );
  const visibleAdminItems = ADMIN_ITEMS.filter((item) =>
    canVisit(user.role, item.href)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64 w-64"
        )}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold shrink-0 shadow-lg shadow-indigo-500/20">
              T
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap animate-in fade-in">
                TijaratPro
              </span>
            )}
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto space-y-8 scrollbar-hide">
          {/* Main Links */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Menu
              </h3>
            )}
            {visibleNavItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    active
                      ? "bg-indigo-500/10 text-indigo-400 font-medium"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-colors",
                      active ? "text-indigo-400" : "group-hover:text-slate-300"
                    )}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Admin Links */}
          {visibleAdminItems.length > 0 && (
            <div className="space-y-1">
              {!sidebarCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Administration
                </h3>
              )}
              {visibleAdminItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                      active
                        ? "bg-indigo-500/10 text-indigo-400 font-medium"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        "shrink-0 transition-colors",
                        active ? "text-indigo-400" : "group-hover:text-slate-300"
                      )}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer Area */}
        <div className="p-3 border-t border-white/5">
          <Link
            href={ROUTES.SETTINGS}
            onClick={() => setMobileNavOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              pathname.startsWith(ROUTES.SETTINGS)
                ? "bg-indigo-500/10 text-indigo-400 font-medium"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )}
          >
            <Settings size={20} className="shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                Settings
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
