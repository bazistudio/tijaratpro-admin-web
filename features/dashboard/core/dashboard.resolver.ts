import { UserRole } from "../../permissions/types/permission.types";
import { DashboardType, DASHBOARD_REGISTRY } from "./dashboard.registry";
import { TenantStatus } from "../../tenancy/types/tenant.types";

/**
 * Dashboard Resolver (Router Brain)
 * Determines which dashboard type a user should see based on their role and tenant status.
 */
export const resolveDashboardType = (role: UserRole, tenantStatus?: TenantStatus): DashboardType => {
  // If tenant is suspended, we could return a SUSPENDED dashboard type here.
  // For now, we follow the registry mapping.
  return DASHBOARD_REGISTRY[role] || DashboardType.STAFF;
};
