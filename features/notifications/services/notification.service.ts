import axios from "@/lib/api/axios";
import { Notification, MarkReadPayload } from "../types/notification.types";
import { PaginatedResponse, ApiResponse } from "@/types";

const BASE_URL = "/notifications";

export const notificationService = {
  getNotifications: () => 
    axios.get<PaginatedResponse<Notification>>(BASE_URL).then(res => res.data),

  markRead: (payload: MarkReadPayload) => 
    axios.put<ApiResponse<null>>(`${BASE_URL}/read`, payload).then(res => res.data),

  markAllRead: () => 
    axios.put<ApiResponse<null>>(`${BASE_URL}/read-all`, {}).then(res => res.data),

  deleteNotification: (id: string) => 
    axios.delete(`${BASE_URL}/${id}`).then(res => res.data),
};
