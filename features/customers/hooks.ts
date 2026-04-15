import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from "./api";
import type { CreateCustomerPayload, UpdateCustomerPayload, CustomerFilter } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useCustomers(filters?: CustomerFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.customers.list(shopId, filters),
    queryFn: () => getCustomers(filters),
    enabled: Boolean(shopId),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => getCustomer(id),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: CreateCustomerPayload) => createCustomer(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.customers.all(shopId) });
      toast.success("Customer added.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to add customer."),
  });
}

export function useUpdateCustomer(id: string) {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: UpdateCustomerPayload) => updateCustomer(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.customers.all(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.customers.detail(id) });
      toast.success("Customer updated.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to update customer."),
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.customers.all(shopId) });
      toast.success("Customer removed.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to delete customer."),
  });
}
