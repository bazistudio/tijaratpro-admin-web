import axios from "@/lib/api/axios";
import { 
  ReportQueryParams, 
  ReportResponse, 
  SalesReportItem, 
  InventoryReportItem, 
  FinancialReportItem, 
  AuditLogItem,
  ExportFormat
} from "../types/report.types";

const BASE_PATH = "/reports";

export const reportService = {
  /**
   * Fetches the Sales Report with filters and pagination.
   */
  fetchSalesReport: (params: ReportQueryParams) =>
    axios.get<ReportResponse<SalesReportItem>>(`${BASE_PATH}/sales`, { params }).then(res => res.data),

  /**
   * Fetches the Inventory Report.
   */
  fetchInventoryReport: (params: ReportQueryParams) =>
    axios.get<ReportResponse<InventoryReportItem>>(`${BASE_PATH}/inventory`, { params }).then(res => res.data),

  /**
   * Fetches the Financial Report.
   */
  fetchFinancialReport: (params: ReportQueryParams) =>
    axios.get<ReportResponse<FinancialReportItem>>(`${BASE_PATH}/financial`, { params }).then(res => res.data),

  /**
   * Fetches Audit Logs for security and compliance.
   */
  fetchAuditLogs: (params: ReportQueryParams) =>
    axios.get<ReportResponse<AuditLogItem>>(`${BASE_PATH}/audit-logs`, { params }).then(res => res.data),

  /**
   * Triggers a report export on the server.
   */
  exportReport: (reportType: string, format: ExportFormat, filters: ReportQueryParams) =>
    axios.post(`${BASE_PATH}/export`, { reportType, format, ...filters }, { responseType: 'blob' }).then(res => res.data),
};
