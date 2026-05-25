import {
  LayoutDashboard, Store, Users, FileText, Settings, CreditCard
} from "lucide-react";
import type { SidebarItem } from "./core";

export const ORGANIZATION_OWNER_MENU: SidebarItem[] = [
  { label: "Org Dashboard", icon: LayoutDashboard, href: "/organization" },
  { label: "My Shop Branches", icon: Store, href: "/organization/shops" },
  { label: "Employee Roster", icon: Users, href: "/organization/employees" },
  { label: "Org Analytics", icon: FileText, href: "/organization/analytics" },
  { label: "Subscriptions", icon: CreditCard, href: "/organization/subscriptions" },
  { label: "Org Settings", icon: Settings, href: "/organization/settings" },
];
