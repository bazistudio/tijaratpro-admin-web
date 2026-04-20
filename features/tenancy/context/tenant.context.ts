import { useTenantStore } from "../store/tenant.store";

/**
 * Tenant Context Layer (Identity Hub)
 * Single source of truth for resolving the active tenant identity.
 * This prevents duplication of tenant resolution logic across services.
 */
export const TenantContext = {
  /**
   * Retrieves the current active tenant ID from the store.
   * If null, the system should ideally block tenant-scoped operations.
   */
  getActiveTenantId: (): string | null => {
    return useTenantStore.getState().activeTenant?.id || null;
  },

  /**
   * Checks if the system is currently in a tenant-context.
   */
  hasActiveContext: (): boolean => {
    return !!useTenantStore.getState().activeTenant;
  },

  /**
   * Resolves relevant headers for API requests.
   */
  getTenantHeaders: () => {
    const tenantId = TenantContext.getActiveTenantId();
    return tenantId ? { "x-tenant-id": tenantId } : {};
  }
};
