import {
  Wrench, Pill, CalendarClock, PackageOpen
} from "lucide-react";
import type { SidebarItem } from "./core";

export const INDUSTRY_SIDEBAR_ITEMS: Record<string, SidebarItem[]> = {
  AUTO_PARTS: [
    { label: "Parts Compatibility", icon: Wrench, href: "/industry/compatibility" }
  ],
  MEDICINES: [
    { label: "Expiry Tracker", icon: CalendarClock, href: "/industry/expiry" },
    { label: "Batch Inventory", icon: PackageOpen, href: "/industry/batches" }
  ],
  GENERAL_STORE: []
};

/**
 * Returns custom sidebar navigation array for an active shop's specific industry context.
 */
export const getIndustrySidebar = (industryType: string | undefined): SidebarItem[] => {
  if (!industryType) return [];
  return INDUSTRY_SIDEBAR_ITEMS[industryType] || [];
};
