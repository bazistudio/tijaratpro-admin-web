import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../services/tenant.service";
import { useTenantStore } from "../store/tenant.store";
import { toast } from "sonner";

/**
 * useTenantSwitcher
 * Specialized hook for Super Admins to switch between shop contexts.
 */
export const useTenantSwitcher = () => {
  const queryClient = useQueryClient();
  const { setActiveTenant, setLoading } = useTenantStore();

  const switchTenantMutation = useMutation({
    mutationFn: (tenantId: string) => tenantService.fetchTenantById(tenantId),
    onMutate: () => setLoading(true),
    onSuccess: (response) => {
      if (response.data) {
        setActiveTenant(response.data);
        // Clear all cached data to ensure total isolation during switch
        queryClient.clear();
        toast.success(`Switched to ${response.data.name}`);
      }
    },
    onError: () => {
      toast.error("Failed to switch tenant context");
    },
    onSettled: () => setLoading(false),
  });

  return {
    switchTenant: (id: string) => switchTenantMutation.mutate(id),
    isSwitching: switchTenantMutation.isPending,
  };
};
