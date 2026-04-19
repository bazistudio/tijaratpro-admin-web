"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Package, Users, ReceiptText, PieChart, Settings, LogOut, Store } from "lucide-react"

import { cn } from "@/lib/utils"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Shops", icon: Store, href: "/shops" },
  { label: "Orders", icon: ShoppingCart, href: "/orders" },
  { label: "Products", icon: Package, href: "/products" },
  { label: "Stock", icon: Package, href: "/stock" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Sales & Billing", icon: ReceiptText, href: "/billing" },
  { label: "Analytics", icon: PieChart, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen flex flex-col border-r border-border bg-background lg:flex hidden">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <span className="logo text-2xl tracking-tight">TijaratPro</span>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="space-y-1 px-4">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary/10 text-primary hover:bg-primary/20 nav-active" : "text-muted-foreground"
                )}
              >
                <route.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {route.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border shrink-0">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
