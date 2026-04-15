import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse, Order, CreateOrderPayload, UpdateOrderStatusPayload, OrderFilter } from "@/types";

const BASE = "/orders";

export async function getOrders(filters?: OrderFilter): Promise<PaginatedResponse<Order>> {
  const res = await axiosInstance.get<PaginatedResponse<Order>>(BASE, { params: filters });
  return res.data;
}

export async function getOrder(id: string): Promise<ApiResponse<Order>> {
  const res = await axiosInstance.get<ApiResponse<Order>>(`${BASE}/${id}`);
  return res.data;
}

export async function createOrder(payload: CreateOrderPayload): Promise<ApiResponse<Order>> {
  const res = await axiosInstance.post<ApiResponse<Order>>(BASE, payload);
  return res.data;
}

export async function updateOrderStatus(id: string, payload: UpdateOrderStatusPayload): Promise<ApiResponse<Order>> {
  const res = await axiosInstance.put<ApiResponse<Order>>(`${BASE}/${id}/status`, payload);
  return res.data;
}

export async function cancelOrder(id: string): Promise<ApiResponse<Order>> {
  const res = await axiosInstance.put<ApiResponse<Order>>(`${BASE}/${id}/cancel`, {});
  return res.data;
}
