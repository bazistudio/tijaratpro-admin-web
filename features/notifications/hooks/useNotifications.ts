import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notification.service";
import { useNotificationStore } from "../store/notification.store";
import { MarkReadPayload } from "../types/notification.types";
import { useEffect } from "react";
import { toast } from "sonner";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { setNotifications, markAsRead: markInStore, markAllAsRead: markAllInStore } = useNotificationStore();

  const { data: response, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
    refetchInterval: 60000, // Poll every minute
  });

  // Sync to store when data changes
  useEffect(() => {
    if (response?.data) {
      setNotifications(response.data);
    }
  }, [response, setNotifications]);

  const markReadMutation = useMutation({
    mutationFn: (payload: MarkReadPayload) => notificationService.markRead(payload),
    onSuccess: (_, payload) => {
      payload.notificationIds.forEach(id => markInStore(id));
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => toast.error("Failed to mark notification as read"),
  });

  const markAllReadMutation = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      markAllInStore();
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read");
    },
    onError: () => toast.error("Failed to mark all as read"),
  });

  return {
    notifications: response?.data || [],
    isLoading,
    refetch,
    markRead: (id: string) => markReadMutation.mutate({ notificationIds: [id] }),
    markAllRead: () => markAllReadMutation.mutate(),
  };
};
