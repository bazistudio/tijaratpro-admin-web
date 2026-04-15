// ─── Route constants ───────────────────────────────────────────────────────────
// Single source of truth for all app routes — keeps nav, middleware, and
// redirects in sync without magic strings scattered through the codebase.

export const ROUTES = {
  // ── Public ───────────────────────────────────────────────────────────────
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // ── Shared (all authenticated roles) ─────────────────────────────────────
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",

  // ── Superadmin only ───────────────────────────────────────────────────────
  SHOPS: "/shops",
  SHOP_DETAIL: (id: string) => `/shops/${id}`,

  PLANS: "/plans",
  PLAN_DETAIL: (id: string) => `/plans/${id}`,

  SUBSCRIPTIONS: "/subscriptions",
  SUBSCRIPTION_DETAIL: (id: string) => `/subscriptions/${id}`,

  BILLING: "/billing",
  INVOICE_DETAIL: (id: string) => `/billing/invoices/${id}`,

  REPORTS: "/reports",

  // ── ERP / Shop-scoped (shop_owner | manager | staff | salesman) ───────────
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PRODUCT_NEW: "/products/new",

  ORDERS: "/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_NEW: "/orders/new",

  CUSTOMERS: "/customers",
  CUSTOMER_DETAIL: (id: string) => `/customers/${id}`,
  CUSTOMER_NEW: "/customers/new",

  INVENTORY: "/inventory",
  INVENTORY_MOVEMENTS: "/inventory/movements",

  SALES: "/sales",
  SALES_ANALYTICS: "/sales/analytics",

  SUPPLIERS: "/suppliers",
  SUPPLIER_DETAIL: (id: string) => `/suppliers/${id}`,
} as const;

// ── Protected prefixes — checked by Next.js middleware ───────────────────────
export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/shops",
  "/plans",
  "/subscriptions",
  "/billing",
  "/reports",
  "/notifications",
  "/products",
  "/orders",
  "/customers",
  "/inventory",
  "/sales",
  "/suppliers",
  "/settings",
] as const;

// ── Auth routes — redirect away if already authenticated ─────────────────────
export const AUTH_ROUTES = ["/login", "/register"] as const;

// ── Role-to-route permission map (used by RBAC helper) ───────────────────────
// Lists the route prefixes each role is allowed to visit.
// Middleware uses hasMinRole(); this map is for nav visibility.
export const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  superadmin: [
    "/dashboard",
    "/shops",
    "/plans",
    "/subscriptions",
    "/billing",
    "/reports",
    "/notifications",
    "/settings",
  ],
  shop_owner: [
    "/dashboard",
    "/products",
    "/orders",
    "/customers",
    "/inventory",
    "/sales",
    "/suppliers",
    "/reports",
    "/notifications",
    "/settings",
  ],
  manager: [
    "/dashboard",
    "/products",
    "/orders",
    "/customers",
    "/inventory",
    "/sales",
    "/suppliers",
    "/reports",
    "/notifications",
    "/settings",
  ],
  staff: [
    "/dashboard",
    "/products",
    "/orders",
    "/customers",
    "/inventory",
    "/notifications",
    "/settings",
  ],
  salesman: [
    "/dashboard",
    "/orders",
    "/customers",
    "/notifications",
    "/settings",
  ],
};
