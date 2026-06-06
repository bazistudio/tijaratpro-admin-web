import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTenants, getTenantById,
  createTenant, updateTenant, updateTenantStatus,
  deleteTenant, bulkActionTenants,
} from "../api/superAdmin.api";
import { useSuperAdminStore } from "../store/superAdmin.store";
import type { CreateTenantPayload, UpdateTenantPayload, BulkActionPayload } from "../types/superAdmin.types";
import { toast } from "sonner";

export const SA_TENANTS_KEY     = ["sa-tenants"]     as const;
export const SA_TENANT_KEY      = (id: string) => ["sa-tenant", id] as const;

// ── List ─────────────────────────────────────────────────────────────────────
export function useTenants() {
  const filters = useSuperAdminStore((s) => s.tenantFilters);
  return useQuery({
    queryKey: [...SA_TENANTS_KEY, filters],
    queryFn:  () => getTenants(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}

// ── Single ────────────────────────────────────────────────────────────────────
export function useTenantDetail(id: string) {
  const drawerOpen = useSuperAdminStore((s) => s.drawerOpen);
  return useQuery({
    queryKey: SA_TENANT_KEY(id),
    queryFn:  () => getTenantById(id),
    enabled:  drawerOpen && !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────
export function useCreateTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTenantPayload) => createTenant(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TENANTS_KEY });
      toast.success("Tenant created successfully");
    },
    onError: () => toast.error("Failed to create tenant"),
  });
}

export function useUpdateTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTenantPayload }) =>
      updateTenant(id, payload),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: SA_TENANTS_KEY });
      qc.invalidateQueries({ queryKey: SA_TENANT_KEY(id) });
      toast.success("Tenant updated");
    },
    onError: () => toast.error("Failed to update tenant"),
  });
}

export function useUpdateTenantStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "suspended" | "inactive" }) =>
      updateTenantStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TENANTS_KEY });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });
}

export function useDeleteTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTenant(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TENANTS_KEY });
      toast.success("Tenant deleted");
    },
    onError: () => toast.error("Failed to delete tenant"),
  });
}

export function useBulkTenantAction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BulkActionPayload) => bulkActionTenants(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TENANTS_KEY });
      toast.success("Bulk action applied");
    },
    onError: () => toast.error("Bulk action failed"),
  });
}
