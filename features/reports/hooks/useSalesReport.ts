import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { ReportQueryParams } from "../types/report.types";

/**
 * Enterprise hook for filtering and retrieving Sales Reports.
 * Caches data per filter state to allow rapid navigation.
 */
export const useSalesReport = (params: ReportQueryParams) => {
  return useQuery({
    queryKey: ["reports", "sales", params],
    queryFn: () => reportService.fetchSalesReport(params),
    placeholderData: (previousData) => previousData, // Maintain UI stability during refetch
    staleTime: 60000, // 1 minute cache
  });
};
