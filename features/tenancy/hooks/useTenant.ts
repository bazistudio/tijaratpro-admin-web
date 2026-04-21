"use client";

import { useTenantStore } from "../store/tenant.store";
import type { Tenant } from "../types/tenant.types";

/**
 * useTenant Hook
 * Direct access to tenancy context and actions.
 */
export function useTenant() {
  const { activeTenant, tenantList, setActiveTenant, setTenantList, clearTenancy } = useTenantStore();

  const switchTenant = (tenant: Tenant) => {
    setActiveTenant(tenant);
    // Note: Page refresh might be needed to clear state of other features,
    // but the axios interceptor will pick up the new tenantId immediately.
  };

  return {
    activeTenant,
    tenantList,
    switchTenant,
    setTenantList,
    clearTenancy,
    hasActiveTenant: !!activeTenant,
    tenantId: activeTenant?.id,
  };
}
