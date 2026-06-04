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

export const MODULES: Record<string, any> = {
  DASHBOARD: {
    label: "Shop Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  PRODUCTS: {
    label: "Products",
    href: "/products",
    icon: Package,
    subItems: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/products/categories" },
    ]
  },
  INVENTORY: {
    label: "Inventory",
    href: "/stock",
    icon: Layers
  },
  SALES: {
    label: "Sales",
    href: "/sales",
    icon: ShoppingCart
  },
  CUSTOMERS: {
    label: "Customers",
    href: "/customers",
    icon: Users
  },
  EXPIRY_TRACKING: {
    label: "Expiry Tracking",
    href: "/industry/expiry",
    icon: Clock
  },
  COMPATIBILITY: {
    label: "Compatibility",
    href: "/industry/compatibility",
    icon: Truck
  },
  IMEI_TRACKING: {
    label: "IMEI Tracking",
    href: "/industry/imei",
    icon: Smartphone
  },
  REPORTS: {
    label: "Reports",
    href: "/reports",
    icon: PieChart
  },
  SETTINGS: {
    label: "Settings",
    href: "/settings",
    icon: Settings
  }
};
