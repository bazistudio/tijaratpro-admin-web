// ─── RBAC Role Definition ─────────────────────────────────────────────────────
// Matches backend roles exactly: superadmin | shop_owner | manager | staff | salesman | customer

export type Role =
  | "superadmin"
  | "shop_owner"
  | "manager"
  | "staff"
  | "salesman"
  | "customer";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  shopId?: string;
  shopName?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: Role;
  shopName?: string;
  phone?: string;
}

export interface AuthResponse {
  success: true;
  token: string;
  user: User;
}
