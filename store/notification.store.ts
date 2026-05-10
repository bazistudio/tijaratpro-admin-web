"use client";

import { create } from "zustand";
import { Notification } from "@/types/notification.types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;

  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

// Initial Mock Data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: "1",
    type: "low_stock",
    title: "Low Stock Alert",
    message: "Your 'Premium Saffron' stock is below 10 units. Please restock soon.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    data: { productId: "p1" },
  },
  {
    _id: "2",
    type: "order",
    title: "New Wholesale Order",
    message: "A new order #ORD-7892 has been placed by 'Organic Delights Ltd'.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    data: { orderId: "o1" },
  },
  {
    _id: "3",
    type: "system",
    title: "Intelligence Engine Updated",
    message: "V1.0.0 Stable is now live. Check out the new analytics dashboard.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    _id: "4",
    type: "payment",
    title: "Payout Successful",
    message: "Your payout of $1,250.00 has been processed successfully.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
];

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter(n => !n.isRead).length,
  isLoading: false,

  setNotifications: (notifications) =>
    set({ 
      notifications, 
      unreadCount: notifications.filter(n => !n.isRead).length 
    }),

  markAsRead: (id) =>
    set((state) => {
      const newNotifications = state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.isRead).length
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const newNotifications = state.notifications.map((n) => ({ ...n, isRead: true }));
      return {
        notifications: newNotifications,
        unreadCount: 0
      };
    }),

  addNotification: (notification) =>
    set((state) => {
      const newNotifications = [notification, ...state.notifications];
      return {
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.isRead).length
      };
    }),

  removeNotification: (id) =>
    set((state) => {
      const newNotifications = state.notifications.filter(n => n._id !== id);
      return {
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.isRead).length
      };
    }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
