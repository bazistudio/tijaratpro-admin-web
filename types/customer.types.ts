// ─── Customer Types ───────────────────────────────────────────────────────────
// Matches backend Customer model (shop-scoped)

export interface Customer {
  _id: string;
  shopId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  totalOrders?: number;
  totalSpent?: number;
  outstandingBalance?: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export interface UpdateCustomerPayload extends Partial<CreateCustomerPayload> {}

export interface CustomerFilter {
  search?: string;
  city?: string;
  page?: number;
  limit?: number;
}
