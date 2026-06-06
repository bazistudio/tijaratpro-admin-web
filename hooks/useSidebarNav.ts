import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axios";
import { hydrateSidebar } from "@/lib/sidebar/builder";
import { SUPER_ADMIN_MENU } from "@/lib/sidebar/superAdmin";
import { SidebarItem } from "@/lib/sidebar/core";
import { useAuthStore } from "@/store/auth.store";

// ─── Canonical API response contract ─────────────────────────────────────────
interface SidebarData {
  allowedKeys: string[];
  order?: string[];
  sidebarVersion?: number;
}
interface SidebarResponse {
  success: boolean;
  data: SidebarData;
}

export function useSidebarNav(shopId?: string) {
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  // SUPER_ADMIN gets a static menu — no API call, no shopId dependency.
  // This fixes the broken sidebar for SA (was: enabled: !!shopId → always false for SA)
  const fetchSidebar = async (): Promise<SidebarItem[]> => {
    if (isSuperAdmin) {
      return SUPER_ADMIN_MENU;
    }

    const response = await axiosInstance.get<SidebarResponse>("/api/sidebar");
    const payload = response.data;

    if (!payload?.success || !payload?.data) {
      console.warn("[useSidebarNav] Unexpected API shape:", payload);
      return [];
    }

    const { allowedKeys = [], order = [] } = payload.data;
    const keysToRender = order.length > 0 ? order : allowedKeys;
    return hydrateSidebar(keysToRender);
  };

  return useQuery({
    queryKey: ["sidebar", isSuperAdmin ? "super-admin" : shopId],
    queryFn:  fetchSidebar,
    staleTime: 1000 * 60 * 5,
    // SUPER_ADMIN always loads (no shopId needed). Shop users need shopId.
    enabled: isSuperAdmin ? true : !!shopId,
    retry: 2,
  });
}
