import { useQuery } from "@tanstack/react-query";
import { getSAOverview, getSystemHealth } from "../api/superAdmin.api";

export const SA_OVERVIEW_KEY = ["sa-overview"] as const;

export function useSAOverview() {
  return useQuery({
    queryKey: SA_OVERVIEW_KEY,
    queryFn:  getSAOverview,
    staleTime: 1000 * 60 * 2, // 2 min
    refetchInterval: 1000 * 60 * 5, // auto-refresh every 5 min
  });
}

export function useSystemHealth() {
  return useQuery({
    queryKey: ["sa-health"],
    queryFn:  getSystemHealth,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  });
}
