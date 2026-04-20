import { subDays } from "date-fns";

export const REPORT_TYPES = {
  SALES: "SALES",
  INVENTORY: "INVENTORY",
  FINANCIAL: "FINANCIAL",
  AUDIT_LOGS: "AUDIT_LOGS",
} as const;

export const REPORT_TYPE_LABELS = {
  [REPORT_TYPES.SALES]: "Sales Report",
  [REPORT_TYPES.INVENTORY]: "Inventory Report",
  [REPORT_TYPES.FINANCIAL]: "Financial Summary",
  [REPORT_TYPES.AUDIT_LOGS]: "Audit & Security Logs",
};

export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_DATE_RANGE = {
  startDate: subDays(new Date(), 7).toISOString(),
  endDate: new Date().toISOString(),
};

export const EXPORT_FORMATS = {
  PDF: "pdf",
  EXCEL: "excel",
  CSV: "csv",
} as const;
