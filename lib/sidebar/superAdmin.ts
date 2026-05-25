import {
  Activity, Store, Database, Users, PieChart, Settings
} from "lucide-react";
import type { SidebarItem } from "./core";

export const SUPER_ADMIN_MENU: SidebarItem[] = [
  { label: "Platform Overview", icon: Activity, href: "/super-admin/dashboard" },
  { label: "Organizations", icon: Store, href: "/super-admin/organizations" },
  { label: "Subscriptions", icon: Database, href: "/super-admin/subscriptions" },
  { label: "Activators", icon: Users, href: "/super-admin/activators" },
  { label: "Platform Analytics", icon: PieChart, href: "/super-admin/analytics" },
  { label: "Platform Settings", icon: Settings, href: "/super-admin/settings" },
];
