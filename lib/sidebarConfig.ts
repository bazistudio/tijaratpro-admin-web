import {
  LayoutDashboard, ShoppingCart, Package, Users, ReceiptText,
  PieChart, Settings, Store, Layers, Database, Activity, FileText
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: any;
  href: string;
  subItems?: { label: string; href: string }[];
};

export const SUPER_ADMIN_MENU: SidebarItem[] = [
  { label: "Platform Overview", icon: Activity, href: "/super-admin/dashboard" },
  { label: "Organizations", icon: Store, href: "/super-admin/organizations" },
  { label: "Subscriptions", icon: Database, href: "/super-admin/subscriptions" },
  { label: "Activators", icon: Users, href: "/super-admin/activators" },
  { label: "Platform Analytics", icon: PieChart, href: "/super-admin/analytics" },
  { label: "Platform Settings", icon: Settings, href: "/super-admin/settings" },
];

export const ORGANIZATION_OWNER_MENU: SidebarItem[] = [
  { label: "Organization Overview", icon: LayoutDashboard, href: "/organization/dashboard" },
  { label: "Shops", icon: Store, href: "/organization/shops" },
  { label: "Staff", icon: Users, href: "/organization/staff" },
  { label: "Cross-Shop Reports", icon: FileText, href: "/organization/reports" },
  { label: "Org Settings", icon: Settings, href: "/organization/settings" },
  // Organizations can also see the active shop's menu
];

export const SHOP_MENU: SidebarItem[] = [
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

/**
 * Returns the correct sidebar navigation array based on user role and current context.
 */
export const getSidebarByRole = (role: string | undefined): SidebarItem[] => {
  if (!role) return SHOP_MENU; // Fallback to basic shop menu

  switch (role) {
    case "SUPER_ADMIN":
      return SUPER_ADMIN_MENU;
    case "ADMIN":
      return ORGANIZATION_OWNER_MENU; // Could be a combined menu for admins
    case "MANAGER":
    case "STAFF":
    case "DEMO_USER":
    default:
      return SHOP_MENU;
  }
};
