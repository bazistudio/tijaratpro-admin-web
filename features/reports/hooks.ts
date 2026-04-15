import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { getSalesSummary, getSalesReport, getTopProducts, getTopCustomers } from "./api";
import type { ReportFilter } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useDashboardSummary() {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.dashboard.shopStats(shopId),
    queryFn: getSalesSummary,
    enabled: Boolean(shopId),
    select: (res) => res.data,
    staleTime: 2 * 60 * 1000, // dashboard can tolerate 2 min stale
  });
}

export function useSalesReport(filters?: ReportFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.reports.sales(shopId, filters),
    queryFn: () => getSalesReport(filters),
    enabled: Boolean(shopId),
    select: (res) => res.data,
  });
}

export function useTopProducts(filters?: ReportFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.reports.topProducts(shopId, filters),
    queryFn: () => getTopProducts(filters),
    enabled: Boolean(shopId),
    select: (res) => res.data ?? [],
  });
}

export function useTopCustomers(filters?: ReportFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.reports.topCustomers(shopId, filters),
    queryFn: () => getTopCustomers(filters),
    enabled: Boolean(shopId),
    select: (res) => res.data ?? [],
  });
}
