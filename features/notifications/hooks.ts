import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { getNotifications, markNotificationsRead, markAllNotificationsRead } from "./api";
import type { MarkReadPayload } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useNotifications() {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.notifications.all(shopId),
    queryFn: getNotifications,
    enabled: Boolean(shopId),
    // Poll every 60s for new notifications while the tab is active
    refetchInterval: 60_000,
  });
}

/** Count of unread notifications — derived from the notifications list cache */
export function useUnreadCount() {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.notifications.all(shopId),
    queryFn: getNotifications,
    enabled: Boolean(shopId),
    select: (res) => res.data.filter((n) => !n.isRead).length,
    refetchInterval: 60_000,
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: MarkReadPayload) => markNotificationsRead(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.all(shopId) });
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to mark as read."),
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notifications.all(shopId) });
      toast.success("All notifications marked as read.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to mark all as read."),
  });
}
