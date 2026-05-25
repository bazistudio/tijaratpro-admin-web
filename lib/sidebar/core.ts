import {
  LayoutDashboard, ShoppingCart, Package, Store, ReceiptText, Users, Settings, PieChart
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: any;
  href: string;
  subItems?: { label: string; href: string }[];
};

export const CORE_SHOP_MENU: SidebarItem[] = [
  { label: "Shop Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analytics", icon: PieChart, href: "/analytics" },
  { label: "Orders", icon: ShoppingCart, href: "/orders" },
  { 
    label: "Products", 
    icon: Package, 
    href: "/products",
    subItems: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/products/categories" },
    ]
  },
  { label: "Inventory", icon: Store, href: "/stock" },
  { label: "Billing", icon: ReceiptText, href: "/billing" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Shop Settings", icon: Settings, href: "/settings" },
];
