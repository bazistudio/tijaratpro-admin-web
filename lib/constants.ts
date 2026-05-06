/**
 * Application-wide constants
 */

export const APP_NAME = "TijaratPro";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const STORAGE_KEYS = {
  TOKEN: "tp_token",
  TENANT: "tp_tenant_context",
  USER: "tp_user_context",
};

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  SHOP_ADMIN: "shop_admin",
  STAFF: "staff",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  SETTINGS: "/settings",
};

export const PROTECTED_PREFIXES = ["/dashboard", "/products", "/orders", "/settings", "/customers", "/analytics"];
export const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

export const ROLE_ALLOWED_PREFIXES = {
  super_admin: ["/dashboard", "/shops", "/plans", "/subscriptions", "/settings"],
  shop_admin: ["/dashboard", "/products", "/orders", "/customers", "/inventory", "/reports", "/settings"],
  staff: ["/dashboard", "/products", "/orders", "/customers"],
};

export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters: any) => ["products", "list", filters] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  tenants: {
    all: ["tenants"] as const,
    me: ["tenants", "me"] as const,
  },
  dashboard: {
    stats: ["dashboard", "stats"] as const,
  },
};
