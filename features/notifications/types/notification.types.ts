// ─── Notification Types ───────────────────────────────────────────────────────
// Business-driven notification model for TijaratPro

export type NotificationType =
  | "SALE"
  | "PRINT_REQUEST"
  | "STOCK_ALERT"
  | "PAYMENT"
  | "FIELD_ORDER"
  | "SYSTEM"
  | "WHATSAPP"
  | "SUMMARY";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>; // Meta-data like orderId, salesmanId, etc.
}

export interface MarkReadPayload {
  notificationIds: string[];
}
