import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store";
import {
  getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier,
} from "./api";
import type { CreateSupplierPayload, UpdateSupplierPayload } from "./api";

// ─── Simple query keys (suppliers not in global queryKeys yet) ────────────────
const keys = {
  all:    (shopId: string) => ["suppliers", shopId] as const,
  detail: (id: string)    => ["suppliers", id] as const,
};

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useSuppliers() {
  const shopId = useShopId();
  return useQuery({
    queryKey: keys.all(shopId),
    queryFn: getSuppliers,
    enabled: Boolean(shopId),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: () => getSupplier(id),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

export function useCreateSupplier() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: CreateSupplierPayload) => createSupplier(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all(shopId) });
      toast.success("Supplier added.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to add supplier."),
  });
}

export function useUpdateSupplier(id: string) {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: UpdateSupplierPayload) => updateSupplier(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all(shopId) });
      qc.invalidateQueries({ queryKey: keys.detail(id) });
      toast.success("Supplier updated.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to update supplier."),
  });
}

export function useDeleteSupplier() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all(shopId) });
      toast.success("Supplier removed.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to delete supplier."),
  });
}
