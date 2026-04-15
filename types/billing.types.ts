export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled";
export type PaymentMethod = "cash" | "card" | "bank_transfer" | "online";

export interface Invoice {
  _id: string;
  shopId: string;
  subscriptionId: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  invoiceId: string;
  shopId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: string;
  createdAt: string;
}

export interface UsageLog {
  _id: string;
  shopId: string;
  subscriptionId: string;
  metric: string;
  value: number;
  recordedAt: string;
}

export interface BillingSummary {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface RecordPaymentPayload {
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
}

export interface LogUsagePayload {
  metric: string;
  value: number;
}
