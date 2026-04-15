import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse, StockMovement, InventorySummary, StockMovementFilter } from "@/types";

const BASE = "/inventory";

export async function getInventorySummary(): Promise<ApiResponse<InventorySummary>> {
  const res = await axiosInstance.get<ApiResponse<InventorySummary>>(`${BASE}/summary`);
  return res.data;
}

export async function getStockMovements(filters?: StockMovementFilter): Promise<PaginatedResponse<StockMovement>> {
  const res = await axiosInstance.get<PaginatedResponse<StockMovement>>(`${BASE}/movements`, { params: filters });
  return res.data;
}
