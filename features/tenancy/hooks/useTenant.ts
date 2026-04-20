import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant.service";
import { useTenantStore } from "../store/tenant.store";

/**
 * useTenant
 * Hook to access active tenant data and status.
 */
export const useTenant = () => {
  const { activeTenant, isLoading: isStoreLoading } = useTenantStore();

  return {
    tenant: activeTenant,
    tenantId: activeTenant?.id,
    isTenantActive: activeTenant?.status === "ACTIVE",
    isLoading: isStoreLoading,
  };
};

/**
 * useTenantUsers
 * Fetches users belonging to the active tenant.
 */
export const useTenantUsers = () => {
  const { activeTenant } = useTenantStore();
  
  return useQuery({
    queryKey: ["tenants", activeTenant?.id, "users"],
    queryFn: () => {
      if (!activeTenant?.id) return Promise.resolve([]);
      return []; // To be implemented with user service
    },
    enabled: !!activeTenant?.id
  });
};
