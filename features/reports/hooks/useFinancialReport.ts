import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { ReportQueryParams } from "../types/report.types";

/**
 * Enterprise hook for filtering and retrieving Financial Reports.
 */
export const useFinancialReport = (params: ReportQueryParams) => {
  return useQuery({
    queryKey: ["reports", "financial", params],
    queryFn: () => reportService.fetchFinancialReport(params),
    placeholderData: (previousData) => previousData,
    staleTime: 60000,
  });
};
