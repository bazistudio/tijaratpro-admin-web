// ─── Order Types ──────────────────────────────────────────────────────────────
// Matches backend Order model (shop-scoped, atomic stock deduction)

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded";

export interface OrderItem {
  productId: string;
  productName: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  shopId: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  notes?: string;
  isDeleted: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  discount?: number;
  tax?: number;
  amountPaid?: number;
  paymentMethod?: string;
  notes?: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

export interface OrderFilter {
  search?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
