// ─── Inventory Types ──────────────────────────────────────────────────────────
// Stock movement history and low-stock tracking

export type StockMovementType =
  | "purchase"
  | "sale"
  | "adjustment"
  | "return"
  | "damage"
  | "transfer";

export interface StockMovement {
  _id: string;
  shopId: string;
  productId: string;
  productName?: string;
  type: StockMovementType;
  quantity: number; // positive = in, negative = out
  balanceAfter: number;
  reference?: string; // orderId, purchaseId, etc.
  notes?: string;
  createdBy?: string;
  createdAt: string;
}

export interface InventorySummary {
  totalProducts: number;
  totalStockValue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  sku?: string;
  stock: number;
  lowStockThreshold: number;
  category?: string;
}

export interface StockMovementFilter {
  productId?: string;
  type?: StockMovementType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
