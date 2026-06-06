import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getActivators, createActivator, updateActivator, deleteActivator,
} from "../api/superAdmin.api";
import { toast } from "sonner";
import type { CreateActivatorPayload, Activator } from "../types/superAdmin.types";

export const SA_ACTIVATORS_KEY = ["sa-activators"] as const;

export function useActivators(filters: { status?: string; page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: [...SA_ACTIVATORS_KEY, filters],
    queryFn:  () => getActivators(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useCreateActivator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateActivatorPayload) => createActivator(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_ACTIVATORS_KEY });
      toast.success("Activator created");
    },
    onError: () => toast.error("Failed to create activator"),
  });
}

export function useUpdateActivator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Activator> }) =>
      updateActivator(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_ACTIVATORS_KEY });
      toast.success("Activator updated");
    },
    onError: () => toast.error("Failed to update activator"),
  });
}

export function useDeleteActivator() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteActivator(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_ACTIVATORS_KEY });
      toast.success("Activator deleted");
    },
    onError: () => toast.error("Failed to delete activator"),
  });
}
