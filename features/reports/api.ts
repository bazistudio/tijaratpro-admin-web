import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, SalesReport, TopProduct, TopCustomer, ShopDashboardSummary, ReportFilter } from "@/types";

const BASE = "/reports";

export async function getSalesSummary(): Promise<ApiResponse<ShopDashboardSummary>> {
  const res = await axiosInstance.get<ApiResponse<ShopDashboardSummary>>("/dashboard/summary");
  return res.data;
}

export async function getSalesReport(filters?: ReportFilter): Promise<ApiResponse<SalesReport>> {
  const res = await axiosInstance.get<ApiResponse<SalesReport>>(`${BASE}/sales`, { params: filters });
  return res.data;
}

export async function getTopProducts(filters?: ReportFilter): Promise<ApiResponse<TopProduct[]>> {
  const res = await axiosInstance.get<ApiResponse<TopProduct[]>>(`${BASE}/top-products`, { params: filters });
  return res.data;
}

export async function getTopCustomers(filters?: ReportFilter): Promise<ApiResponse<TopCustomer[]>> {
  const res = await axiosInstance.get<ApiResponse<TopCustomer[]>>(`${BASE}/top-customers`, { params: filters });
  return res.data;
}
