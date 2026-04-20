import { format } from "date-fns";
import { PrintStatus } from "../types/printing.types";

/**
 * Formats the timestamp for print job logs.
 */
export function formatPrintTime(date: string): string {
  return format(new Date(date), "MMM d, yyyy HH:mm:ss");
}

/**
 * Generates a mock invoice number for preview purposes.
 */
export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Calculates the total amount for an array of items.
 */
export function calculateTotal(items: any[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Returns the tailwind color class based on print status.
 */
export function getStatusColor(status: PrintStatus): string {
  switch (status) {
    case "PENDING":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "PROCESSING":
      return "text-orange-600 bg-orange-50 border-orange-200 animate-pulse";
    case "PRINTED":
      return "text-green-600 bg-green-50 border-green-200";
    case "FAILED":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
}
