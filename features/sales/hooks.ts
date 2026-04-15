import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { getOrders, getOrder, createOrder, updateOrderStatus, cancelOrder } from "./api";
import type { CreateOrderPayload, UpdateOrderStatusPayload, OrderFilter } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useOrders(filters?: OrderFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.orders.list(shopId, filters),
    queryFn: () => getOrders(filters),
    enabled: Boolean(shopId),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrder(id),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all(shopId) });
      // Stock changed — refresh inventory + products
      qc.invalidateQueries({ queryKey: queryKeys.inventory.summary(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      toast.success(`Order ${res.data?.orderNumber ?? ""} created.`);
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to create order."),
  });
}

export function useUpdateOrderStatus(id: string) {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: UpdateOrderStatusPayload) => updateOrderStatus(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
      toast.success("Order status updated.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to update status."),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all(shopId) });
      // Stock restored on cancel — refresh inventory + products
      qc.invalidateQueries({ queryKey: queryKeys.inventory.summary(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      toast.success("Order cancelled.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to cancel order."),
  });
}
