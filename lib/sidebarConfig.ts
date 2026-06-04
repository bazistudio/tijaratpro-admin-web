import type { SidebarItem } from "./sidebar/core";
import { ORGANIZATION_OWNER_MENU } from "./sidebar/organization";
import { SUPER_ADMIN_MENU } from "./sidebar/superAdmin";
import { MODULES } from "./modules";

export type { SidebarItem };

/**
 * Dynamically builds sidebar items by combining core items, SaaS manager controls, and custom module screens.
 */
export const getSidebar = (
  role: string | undefined,
  enabledModules: string[] = []
): SidebarItem[] => {
  const shopModules = enabledModules.map(m => MODULES[m]).filter(Boolean) as SidebarItem[];
  
  // Base modules that every shop has
  const defaultShopModules: SidebarItem[] = [
    MODULES.DASHBOARD,
    MODULES.CUSTOMERS,
    MODULES.SETTINGS
  ].filter(Boolean) as SidebarItem[];

  // Merge default and enabled modules (preventing duplicates if someone added them to enabledModules)
  const allShopMenu = Array.from(new Set([...defaultShopModules, ...shopModules]));

  if (!role) return allShopMenu;

  switch (role) {
    case "SUPER_ADMIN":
      return SUPER_ADMIN_MENU;

    case "ADMIN":
      return [
        ...ORGANIZATION_OWNER_MENU,
        // Mark visual separator
        { label: "--- Shop Branch POS ---", icon: null, href: "#", isSeparator: true } as any,
        ...allShopMenu,
      ];

    case "MANAGER":
    case "STAFF":
    case "SHOP_OWNER":
    case "DEMO_USER":
    default:
      return allShopMenu;
  }
};
