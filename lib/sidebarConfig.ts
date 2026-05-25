import type { SidebarItem } from "./sidebar/core";
import { CORE_SHOP_MENU } from "./sidebar/core";
import { ORGANIZATION_OWNER_MENU } from "./sidebar/organization";
import { SUPER_ADMIN_MENU } from "./sidebar/superAdmin";
import { getIndustrySidebar } from "./sidebar/industries";

export type { SidebarItem };

/**
 * Dynamically builds sidebar items by combining core items, SaaS manager controls, and custom industry screens.
 */
export const getSidebar = (
  role: string | undefined,
  industryType: string | undefined
): SidebarItem[] => {
  if (!role) return CORE_SHOP_MENU;

  switch (role) {
    case "SUPER_ADMIN":
      return SUPER_ADMIN_MENU;

    case "ADMIN": {
      const shopMenuCopy = [...CORE_SHOP_MENU];
      
      // Inject industry-specific navigation items right after Analytics
      const industryItems = getIndustrySidebar(industryType);
      if (industryItems.length > 0) {
        shopMenuCopy.splice(2, 0, ...industryItems);
      }

      return [
        ...ORGANIZATION_OWNER_MENU,
        // Mark visual separator
        { label: "--- Shop Branch POS ---", icon: null, href: "#", isSeparator: true } as any,
        ...shopMenuCopy,
      ];
    }

    case "MANAGER":
    case "STAFF":
    case "DEMO_USER":
    default: {
      const shopMenuCopy = [...CORE_SHOP_MENU];
      const industryItems = getIndustrySidebar(industryType);
      if (industryItems.length > 0) {
        shopMenuCopy.splice(2, 0, ...industryItems);
      }
      return shopMenuCopy;
    }
  }
};
