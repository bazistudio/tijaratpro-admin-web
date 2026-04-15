import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import {
  getProducts, getProduct, createProduct,
  updateProduct, deleteProduct, adjustStock, getLowStockProducts,
} from "./api";
import type { CreateProductPayload, UpdateProductPayload, AdjustStockPayload, ProductFilter } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

// ─── useProducts ──────────────────────────────────────────────────────────────
export function useProducts(filters?: ProductFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.products.list(shopId, filters),
    queryFn: () => getProducts(filters),
    enabled: Boolean(shopId),
  });
}

// ─── useProduct ───────────────────────────────────────────────────────────────
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

// ─── useLowStockProducts ──────────────────────────────────────────────────────
export function useLowStockProducts() {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.products.lowStock(shopId),
    queryFn: getLowStockProducts,
    enabled: Boolean(shopId),
    select: (res) => res.data ?? [],
  });
}

// ─── useCreateProduct ─────────────────────────────────────────────────────────
export function useCreateProduct() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createProduct(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      toast.success("Product created successfully.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to create product."),
  });
}

// ─── useUpdateProduct ─────────────────────────────────────────────────────────
export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: UpdateProductPayload) => updateProduct(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.detail(id) });
      toast.success("Product updated.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to update product."),
  });
}

// ─── useDeleteProduct ─────────────────────────────────────────────────────────
export function useDeleteProduct() {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      toast.success("Product deleted.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Failed to delete product."),
  });
}

// ─── useAdjustStock ───────────────────────────────────────────────────────────
export function useAdjustStock(productId: string) {
  const qc = useQueryClient();
  const shopId = useShopId();
  return useMutation({
    mutationFn: (payload: AdjustStockPayload) => adjustStock(productId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all(shopId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.detail(productId) });
      qc.invalidateQueries({ queryKey: queryKeys.inventory.summary(shopId) });
      toast.success("Stock adjusted.");
    },
    onError: (err: { message: string }) => toast.error(err.message ?? "Stock adjustment failed."),
  });
}
