import axios from "@/lib/api/axios";
import { Tenant, TenantListItem } from "../types/tenant.types";
import { ApiResponse } from "@/types";

const BASE_PATH = "/tenants";

export const tenantService = {
  /**
   * Fetches all tenants (Super Admin only).
   */
  fetchTenants: () =>
    axios.get<ApiResponse<TenantListItem[]>>(BASE_PATH).then(res => res.data),

  /**
   * Fetches the full profile of a specific tenant.
   */
  fetchTenantById: (id: string) =>
    axios.get<ApiResponse<Tenant>>(`${BASE_PATH}/${id}`).then(res => res.data),

  /**
   * Creates a new business tenant in the system.
   */
  createTenant: (data: Partial<Tenant>) =>
    axios.post<ApiResponse<Tenant>>(BASE_PATH, data).then(res => res.data),

  /**
   * Updates tenant-level settings (name, logo, etc.).
   */
  updateTenant: (id: string, data: Partial<Tenant>) =>
    axios.patch<ApiResponse<Tenant>>(`${BASE_PATH}/${id}`, data).then(res => res.data),

  /**
   * Suspends or activates a shop tenant.
   */
  updateTenantStatus: (id: string, status: string) =>
    axios.patch(`${BASE_PATH}/${id}/status`, { status }).then(res => res.data),
};
