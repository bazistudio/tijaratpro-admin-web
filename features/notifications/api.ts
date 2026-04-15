import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse, Notification, MarkReadPayload } from "@/types";

const BASE = "/notifications";

export async function getNotifications(): Promise<PaginatedResponse<Notification>> {
  const res = await axiosInstance.get<PaginatedResponse<Notification>>(BASE);
  return res.data;
}

export async function markNotificationsRead(payload: MarkReadPayload): Promise<ApiResponse<null>> {
  const res = await axiosInstance.put<ApiResponse<null>>(`${BASE}/read`, payload);
  return res.data;
}

export async function markAllNotificationsRead(): Promise<ApiResponse<null>> {
  const res = await axiosInstance.put<ApiResponse<null>>(`${BASE}/read-all`, {});
  return res.data;
}
