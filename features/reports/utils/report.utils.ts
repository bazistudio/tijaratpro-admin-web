import { format } from "date-fns";
import { ExportFormat } from "../types/report.types";

/**
 * Formats a number as PKR currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a large number with compact notation (K, M, B).
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

/**
 * Formats a date range for display.
 */
export function formatDateRange(start: string, end: string): string {
  return `${format(new Date(start), "MMM d, yyyy")} - ${format(new Date(end), "MMM d, yyyy")}`;
}

/**
 * Calculates the percentage growth rate between two values.
 */
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Generates a descriptive filename for report exports.
 */
export function exportFileNameGenerator(reportType: string, format: ExportFormat): string {
  const timestamp = Date.now();
  return `tijaratpro_${reportType.toLowerCase()}_report_${timestamp}.${format}`;
}

/**
 * Basic data sanitization for report display (handling nulls/undefined).
 */
export function sanitizeReportData<T extends object>(data: T[]): T[] {
  return data.map(item => {
    const sanitized = { ...item };
    Object.keys(sanitized).forEach(key => {
      // @ts-ignore
      if (sanitized[key] === null || sanitized[key] === undefined) {
        // @ts-ignore
        sanitized[key] = "---";
      }
    });
    return sanitized;
  });
}
