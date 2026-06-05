import { 
  Package, 
  Layers, 
  ShoppingCart, 
  Clock, 
  Truck, 
  Smartphone, 
  PieChart, 
  Settings,
  LayoutDashboard,
  Users
} from "lucide-react";

import { SidebarItem } from "./sidebar/core";

export const MODULES: Record<string, SidebarItem> = {
  DASHBOARD: {
    key: "dashboard",
    label: "Shop Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "SHOP_OWNER"]
  },
  PRODUCTS: {
    key: "products",
    label: "Products",
    href: "/products",
    icon: Package,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "SHOP_OWNER"],
    subItems: [
      { key: "all_products", label: "All Products", href: "/products", icon: Package },
      { key: "categories", label: "Categories", href: "/products/categories", icon: Package },
    ]
  },
  INVENTORY: {
    key: "inventory",
    label: "Inventory",
    href: "/stock",
    icon: Layers,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "SHOP_OWNER"]
  },
  SALES: {
    key: "sales",
    label: "Sales",
    href: "/sales",
    icon: ShoppingCart,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "SHOP_OWNER"]
  },
  CUSTOMERS: {
    key: "customers",
    label: "Customers",
    href: "/customers",
    icon: Users,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "STAFF", "SHOP_OWNER"]
  },
  EXPIRY_TRACKING: {
    key: "expiry_tracking",
    label: "Expiry Tracking",
    href: "/industry/expiry",
    icon: Clock,
    moduleKey: "EXPIRY_TRACKING"
  },
  COMPATIBILITY: {
    key: "compatibility",
    label: "Compatibility",
    href: "/industry/compatibility",
    icon: Truck,
    moduleKey: "COMPATIBILITY"
  },
  IMEI_TRACKING: {
    key: "imei_tracking",
    label: "IMEI Tracking",
    href: "/industry/imei",
    icon: Smartphone,
    moduleKey: "IMEI_TRACKING"
  },
  REPORTS: {
    key: "reports",
    label: "Reports",
    href: "/reports",
    icon: PieChart,
    roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "SHOP_OWNER"]
  },
  SETTINGS: {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN", "ADMIN", "SHOP_OWNER"]
  }
};

export const CORE_MODULES: SidebarItem[] = [
  MODULES.DASHBOARD,
  MODULES.PRODUCTS,
  MODULES.SALES,
  MODULES.INVENTORY,
  MODULES.CUSTOMERS
];

export const EXTENDED_MODULES: SidebarItem[] = [
  MODULES.REPORTS,
  MODULES.SETTINGS
];

export const INDUSTRY_MODULES: SidebarItem[] = [
  MODULES.EXPIRY_TRACKING,
  MODULES.COMPATIBILITY,
  MODULES.IMEI_TRACKING
];

export const MODULES_MAP = Object.fromEntries(
  Object.values(MODULES).map(m => [m.key, m])
);
