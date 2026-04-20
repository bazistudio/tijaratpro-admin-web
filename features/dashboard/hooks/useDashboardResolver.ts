import { usePermissionStore } from "../../permissions/store/permission.store";
import { useTenantStore } from "../../tenancy/store/tenant.store";
import { resolveDashboardType } from "../core/dashboard.resolver";
import { DashboardType } from "../core/dashboard.registry";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import ShopOwnerDashboard from "../pages/ShopOwnerDashboard";
import StaffDashboard from "../pages/StaffDashboard";

/**
 * useDashboardResolver
 * Hook to resolve and return the correct dashboard component based on user role and tenant status.
 */
export const useDashboardResolver = () => {
  const { currentUserRole } = usePermissionStore();
  const { activeTenant } = useTenantStore();
  
  const dashboardType = resolveDashboardType(currentUserRole, activeTenant?.status);

  const resolveComponent = () => {
    switch (dashboardType) {
      case DashboardType.SUPER_ADMIN:
        return SuperAdminDashboard;
      case DashboardType.SHOP_OWNER:
        return ShopOwnerDashboard;
      case DashboardType.STAFF:
      default:
        return StaffDashboard;
    }
  };

  return {
    dashboardType,
    DashboardComponent: resolveComponent(),
    isLoading: false, // Placeholder for potential loading states
  };
};
