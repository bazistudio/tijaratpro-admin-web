import { SidebarItem } from "./core";
import { MODULES_MAP } from "../modules";

/**
 * UI Hydrator: Maps the backend's authorized keys to the frontend UI components.
 * The backend is now the sole authority on what modules are accessible.
 */
export function hydrateSidebar(allowedKeys: string[]): SidebarItem[] {
  if (!allowedKeys || !Array.isArray(allowedKeys)) {
    return [];
  }

  return allowedKeys
    .map(key => MODULES_MAP[key])
    .filter(Boolean); // Drop missing keys safely
}
