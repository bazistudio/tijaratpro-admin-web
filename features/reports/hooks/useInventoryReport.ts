import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { ReportQueryParams } from "../types/report.types";

/**
 * Enterprise hook for filtering and retrieving Inventory Reports.
 */
export const useInventoryReport = (params: ReportQueryParams) => {
  return useQuery({
    queryKey: ["reports", "inventory", params],
    queryFn: () => reportService.fetchInventoryReport(params),
    placeholderData: (previousData) => previousData,
    staleTime: 60000,
  });
};
