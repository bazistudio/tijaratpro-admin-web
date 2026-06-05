import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api"; // Assume standard api client
import { hydrateSidebar } from "@/lib/sidebar/builder";
import { SidebarItem } from "@/lib/sidebar/core";

interface SidebarResponse {
  allowedKeys: string[];
  order: string[];
  sidebarVersion: number;
}

export function useSidebarNav(shopId?: string) {
  const fetchSidebar = async (): Promise<SidebarItem[]> => {
    if (!shopId) return [];
    
    // Calls the new backend authority endpoint
    const response = await api.get(`/api/sidebar?shopId=${shopId}`);
    
    // Expect { success: true, data: { allowedKeys: [...], order: [...] } }
    const { allowedKeys, order } = response.data?.data as SidebarResponse;
    
    // The backend provides the canonical order and access rights.
    // We hydrate it through our local UI registry.
    const keysToRender = order && order.length > 0 ? order : allowedKeys;
    
    return hydrateSidebar(keysToRender || []);
  };

  return useQuery({
    queryKey: ["sidebar", shopId],
    queryFn: fetchSidebar,
    staleTime: 1000 * 60 * 5, // 5 minutes cache to prevent aggressive re-fetching
    enabled: !!shopId, // Only fetch when we have an active shop context
  });
}
