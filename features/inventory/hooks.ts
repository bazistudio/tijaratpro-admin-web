import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { getInventorySummary, getStockMovements } from "./api";
import type { StockMovementFilter } from "@/types";

function useShopId() {
  return useAuthStore((s) => s.user?.shopId ?? "");
}

export function useInventorySummary() {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.inventory.summary(shopId),
    queryFn: getInventorySummary,
    enabled: Boolean(shopId),
    select: (res) => res.data,
  });
}

export function useStockMovements(filters?: StockMovementFilter) {
  const shopId = useShopId();
  return useQuery({
    queryKey: queryKeys.inventory.movements(shopId, filters),
    queryFn: () => getStockMovements(filters),
    enabled: Boolean(shopId),
  });
}
