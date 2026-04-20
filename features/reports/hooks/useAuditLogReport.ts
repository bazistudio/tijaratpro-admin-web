import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/report.service";
import { ReportQueryParams } from "../types/report.types";

/**
 * Enterprise hook for filtering and retrieving Audit Logs.
 * Standardized on the common ReportQueryParams contract.
 */
export const useAuditLogReport = (params: ReportQueryParams) => {
  return useQuery({
    queryKey: ["reports", "audit-logs", params],
    queryFn: () => reportService.fetchAuditLogs(params),
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // Faster refresh for security logs
  });
};
