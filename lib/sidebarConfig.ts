import type { SidebarItem } from "./sidebar/core";
import { buildSidebar } from "./sidebar/builder";

export type { SidebarItem };

/**
 * Returns the contextual sidebar for the user based on role, plan, and enabled features.
 */
export const getSidebar = (
  user?: any,
  role?: string,
  plan?: string,
  enabledModules?: string[]
): SidebarItem[] => {
  return buildSidebar(user, role, plan, enabledModules);
};
