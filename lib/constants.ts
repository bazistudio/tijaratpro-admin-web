/**
 * Application-wide constants
 */

export const APP_NAME = "TijaratPro";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const STORAGE_KEYS = {
  TOKEN: "tp_token",
  TENANT: "tp_tenant_context",
  USER: "tp_user_context",
};

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  CASHIER: "CASHIER",
  STAFF: "STAFF",
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
  SUPER_ADMIN: ["/dashboard", "/shops", "/plans", "/subscriptions", "/settings"],
  ADMIN: ["/dashboard", "/products", "/orders", "/customers", "/inventory", "/reports", "/settings"],
  MANAGER: ["/dashboard", "/products", "/orders", "/customers", "/inventory", "/reports", "/settings"],
  CASHIER: ["/dashboard", "/orders", "/customers"],
  STAFF: ["/dashboard", "/products", "/orders", "/customers"],
};

export const queryKeys = {
  products: {
    all: (shopId: string) => ["products", shopId] as const,
    list: (shopId: string, filters: any) => ["products", shopId, "list", filters] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    lowStock: (shopId: string) => ["products", shopId, "lowStock"] as const,
  },

  tenants: {
    all: () => ["tenants"] as const,
    me: () => ["tenants", "me"] as const,
  },
  dashboard: {
    stats: (shopId: string) => ["dashboard", shopId, "stats"] as const,
  },

  auth: {
    me: () => ["auth", "me"] as const,
  },
  orders: {
    all: (shopId: string) => ["orders", shopId] as const,
    list: (shopId: string, filters: any) => ["orders", shopId, "list", filters] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },
  inventory: {
    summary: (shopId: string) => ["inventory", shopId, "summary"] as const,
    movements: (shopId: string, filters: any) => ["inventory", shopId, "movements", filters] as const,
  },
  customers: {
    all: (shopId: string) => ["customers", shopId] as const,
    list: (shopId: string, filters: any) => ["customers", shopId, "list", filters] as const,
    detail: (id: string) => ["customers", "detail", id] as const,
  },
};


