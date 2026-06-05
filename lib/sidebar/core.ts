import {
  LayoutDashboard, ShoppingCart, Package, Store, ReceiptText, Users, Settings, PieChart
} from "lucide-react";

export type SidebarItem = {
  key: string;
  label: string;
  icon: any;
  href: string;
  subItems?: SidebarItem[];
  roles?: string[];
  moduleKey?: string;
  planRequired?: string;
};

export const CORE_SHOP_MENU: SidebarItem[] = [
  { key: "shop_dashboard", label: "Shop Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { key: "analytics", label: "Analytics", icon: PieChart, href: "/analytics" },
  { key: "orders", label: "Orders", icon: ShoppingCart, href: "/orders" },
  { 
    key: "products",
    label: "Products", 
    icon: Package, 
    href: "/products",
    subItems: [
      { key: "all_products", label: "All Products", href: "/products", icon: Package },
      { key: "categories", label: "Categories", href: "/products/categories", icon: Package },
    ]
  },
  { key: "inventory", label: "Inventory", icon: Store, href: "/stock" },
  { key: "billing", label: "Billing", icon: ReceiptText, href: "/billing" },
  { key: "customers", label: "Customers", icon: Users, href: "/customers" },
  { key: "settings", label: "Shop Settings", icon: Settings, href: "/settings" },
];
