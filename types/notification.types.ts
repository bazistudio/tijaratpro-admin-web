// ─── Notification Types ───────────────────────────────────────────────────────
// Matches backend Notification model

export type NotificationType =
  | "order"
  | "payment"
  | "subscription"
  | "low_stock"
  | "shop"
  | "system";

export interface Notification {
  _id: string;
  shopId?: string;
  userId?: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>; // extra context (orderId, productId, etc.)
  createdAt: string;
}

export interface MarkReadPayload {
  notificationIds: string[];
}
