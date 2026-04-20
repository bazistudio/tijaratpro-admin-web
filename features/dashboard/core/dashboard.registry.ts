import { UserRole } from "../../permissions/types/permission.types";

export enum DashboardType {
  SUPER_ADMIN = "SUPER_ADMIN",
  SHOP_OWNER = "SHOP_OWNER",
  STAFF = "STAFF",
}

/**
 * Dashboard Registry (Brain Layer)
 * Maps User Roles to their primary Dashboard Type.
 */
export const DASHBOARD_REGISTRY: Record<UserRole, DashboardType> = {
  [UserRole.ADMIN]: DashboardType.SUPER_ADMIN,
  [UserRole.MANAGER]: DashboardType.SHOP_OWNER,
  [UserRole.SALESMAN]: DashboardType.STAFF,
  [UserRole.CASHIER]: DashboardType.STAFF,
  [UserRole.VIEWER]: DashboardType.STAFF, // Defaults to limited view
};
