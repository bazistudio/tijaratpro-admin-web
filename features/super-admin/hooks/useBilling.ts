import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBillingSummary, getInvoices, recordPayment,
  getMRRTimeSeries, getPlanDistribution, getTenantGrowth,
} from "../api/superAdmin.api";
import { toast } from "sonner";
import type { RecordPaymentPayload } from "../types/superAdmin.types";

export const SA_BILLING_KEY  = ["sa-billing"]   as const;
export const SA_INVOICES_KEY = ["sa-invoices"]  as const;
export const SA_MRR_KEY      = ["sa-mrr"]       as const;

export function useBillingSummary() {
  return useQuery({
    queryKey: SA_BILLING_KEY,
    queryFn:  getBillingSummary,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInvoices(filters: { status?: string; page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: [...SA_INVOICES_KEY, filters],
    queryFn:  () => getInvoices(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecordPaymentPayload) => recordPayment(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_INVOICES_KEY });
      qc.invalidateQueries({ queryKey: SA_BILLING_KEY });
      toast.success("Payment recorded");
    },
    onError: () => toast.error("Failed to record payment"),
  });
}

export function useMRRTimeSeries(months = 12) {
  return useQuery({
    queryKey: [...SA_MRR_KEY, months],
    queryFn:  () => getMRRTimeSeries(months),
    staleTime: 1000 * 60 * 10,
  });
}

export function usePlanDistribution() {
  return useQuery({
    queryKey: ["sa-plan-dist"],
    queryFn:  getPlanDistribution,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTenantGrowth(months = 12) {
  return useQuery({
    queryKey: ["sa-tenant-growth", months],
    queryFn:  () => getTenantGrowth(months),
    staleTime: 1000 * 60 * 10,
  });
}
