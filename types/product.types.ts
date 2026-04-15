// ─── Product & Inventory Types ────────────────────────────────────────────────
// Matches backend Product model (shop-scoped by shopId)

export type ProductStatus = "active" | "inactive";
export type ProductCategory = string; // dynamic from DB

export interface Product {
  _id: string;
  shopId: string;
  name: string;
  description?: string;
  category?: string;
  sku?: string;
  barcode?: string;
  price: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold?: number;
  isLowStock?: boolean;
  unit?: string;
  imageUrl?: string;
  status: ProductStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  category?: string;
  sku?: string;
  barcode?: string;
  price: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold?: number;
  unit?: string;
  imageUrl?: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: ProductStatus;
}

export interface AdjustStockPayload {
  adjustment: number; // positive = add, negative = reduce
  reason?: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  status?: ProductStatus;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}
