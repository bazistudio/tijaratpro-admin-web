// ─── Report Types & Contracts ────────────────────────────────────────────────
// Enterprise-grade reporting models for TijaratPro

/**
 * Unified query contract for all report types.
 * Ensures consistent filtering and pagination behavior across the ERP.
 */
export interface ReportQueryParams {
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
  search?: string;
  tenantId?: string; // Critical for Super Admin cross-shop monitoring
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Standardized pagination model for report tables and API responses.
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Supported report export formats.
 */
export enum ExportFormat {
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
}

// ─── Domain Specific Models ──────────────────────────────────────────────────

/**
 * Sales Report Data Model
 */
export interface SalesReportItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  totalAmount: number;
  taxAmount: number;
  paymentStatus: "paid" | "partial" | "unpaid";
  createdAt: string;
}

/**
 * Inventory Report Data Model
 */
export interface InventoryReportItem {
  id: string;
  sku: string;
  productName: string;
  category: string;
  currentStock: number;
  stockValue: number;
  lastRestocked: string;
}

/**
 * Financial / Profit & Loss Model
 */
export interface FinancialReportItem {
  id: string;
  category: "revenue" | "expense" | "tax" | "refund";
  description: string;
  amount: number;
  date: string;
  referenceId?: string;
}

/**
 * Audit Log Data Model (Cybersecurity & Compliance)
 */
export interface AuditLogItem {
  id: string;
  tenantId: string; // Forensics isolation
  userId: string;
  userName: string;
  action: string;
  module: string;
  ipAddress: string;
  device: string;
  createdAt: string;
  details?: Record<string, any>;
}

// ─── Summary & Aggregate Models ──────────────────────────────────────────────

export interface ReportSummary {
  totalCount: number;
  totalValue: number;
  previousValue?: number;
  growth?: number;
}

export interface ReportResponse<T> {
  data: T[];
  summary: ReportSummary;
  pagination: Pagination;
}
