import axiosInstance from "@/lib/api/axios";
import type { Tenant } from "../types/tenant.types";
import type { ApiResponse } from "@/types";

/**
 * Tenant Service
 * Handles API calls for managing shops and multi-tenant context.
 */
export const tenantService = {
  /**
   * Fetch all shops the current user has access to.
   */
  getMyTenants: async (): Promise<ApiResponse<Tenant[]>> => {
    const response = await axiosInstance.get("/tenants/me");
    return response.data;
  },

  /**
   * Switch to a specific shop.
   */
  switchTenant: async (tenantId: string): Promise<ApiResponse<Tenant>> => {
    const response = await axiosInstance.post(`/tenants/switch/${tenantId}`);
    return response.data;
  },
};
