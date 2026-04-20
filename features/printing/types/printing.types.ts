// ─── Printing Types ──────────────────────────────────────────────────────────
// Core models for the TijaratPro Printing System

export type PrintStatus =
  | "PENDING"
  | "PROCESSING"
  | "PRINTED"
  | "FAILED";

export interface Printer {
  id: string;
  name: string;
  isDefault: boolean;
  isOnline: boolean;
}

export interface PrintJob {
  id: string;
  orderId: string;
  customerName: string;
  printerId: string;
  printerName: string;
  status: PrintStatus;
  retryCount: number;
  createdAt: string;
  updatedAt: string;
}
