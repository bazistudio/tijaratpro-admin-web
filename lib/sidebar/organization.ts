import {
  LayoutDashboard, Store, Users, FileText, Settings, CreditCard
} from "lucide-react";
import type { SidebarItem } from "./core";

export const ORGANIZATION_OWNER_MENU: SidebarItem[] = [
  { key: "org_dashboard",     label: "Org Dashboard",     icon: LayoutDashboard, href: "/organization" },
  { key: "org_shops",         label: "My Shop Branches",  icon: Store,           href: "/organization/shops" },
  { key: "org_employees",     label: "Employee Roster",   icon: Users,           href: "/organization/employees" },
  { key: "org_analytics",     label: "Org Analytics",     icon: FileText,        href: "/organization/analytics" },
  { key: "org_subscriptions", label: "Subscriptions",     icon: CreditCard,      href: "/organization/subscriptions" },
  { key: "org_settings",      label: "Org Settings",      icon: Settings,        href: "/organization/settings" },
];
