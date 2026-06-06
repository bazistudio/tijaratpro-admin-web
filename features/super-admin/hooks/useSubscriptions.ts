import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubscriptions, assignPlan, changePlan,
  renewSubscription, cancelSubscription,
} from "../api/superAdmin.api";
import { useSuperAdminStore } from "../store/superAdmin.store";
import { toast } from "sonner";

export const SA_SUBS_KEY = ["sa-subscriptions"] as const;

export function useSubscriptions() {
  const filters = useSuperAdminStore((s) => s.subscriptionFilters);
  return useQuery({
    queryKey: [...SA_SUBS_KEY, filters],
    queryFn:  () => getSubscriptions(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useAssignPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tenantId, planId, billingCycle }: { tenantId: string; planId: string; billingCycle: string }) =>
      assignPlan(tenantId, planId, billingCycle),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_SUBS_KEY });
      toast.success("Plan assigned successfully");
    },
    onError: () => toast.error("Failed to assign plan"),
  });
}

export function useChangePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ subscriptionId, planId }: { subscriptionId: string; planId: string }) =>
      changePlan(subscriptionId, planId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_SUBS_KEY });
      toast.success("Plan changed");
    },
    onError: () => toast.error("Failed to change plan"),
  });
}

export function useRenewSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ subscriptionId, durationMonths }: { subscriptionId: string; durationMonths?: number }) =>
      renewSubscription(subscriptionId, durationMonths),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_SUBS_KEY });
      toast.success("Subscription renewed");
    },
    onError: () => toast.error("Failed to renew subscription"),
  });
}

export function useCancelSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (subscriptionId: string) => cancelSubscription(subscriptionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_SUBS_KEY });
      toast.success("Subscription cancelled");
    },
    onError: () => toast.error("Failed to cancel subscription"),
  });
}
