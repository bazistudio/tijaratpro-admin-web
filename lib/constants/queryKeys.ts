// ─── React Query Key Factories ────────────────────────────────────────────────
// Centralized key management. Prevents cache collisions between modules.
// Pattern: [entity, scope?, filters?] — always use these, never raw strings.

export const queryKeys = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    me: () => ["auth", "me"] as const,
  },

  // ── Shops (superadmin) ────────────────────────────────────────────────────
  shops: {
    all:    ()                                          => ["shops"] as const,
    list:   (filters?: Record<string, unknown>)        => ["shops", "list", filters] as const,
    detail: (id: string)                               => ["shops", id] as const,
    me:     ()                                          => ["shops", "me"] as const,
  },

  // ── Plans (superadmin) ────────────────────────────────────────────────────
  plans: {
    all:    ()             => ["plans"] as const,
    list:   ()             => ["plans", "list"] as const,
    detail: (id: string)  => ["plans", id] as const,
  },

  // ── Subscriptions ─────────────────────────────────────────────────────────
  subscriptions: {
    active:  ()             => ["subscriptions", "active"] as const,
    history: ()             => ["subscriptions", "history"] as const,
    detail:  (id: string)  => ["subscriptions", id] as const,
  },

  // ── Billing ───────────────────────────────────────────────────────────────
  billing: {
    invoices: (filters?: Record<string, unknown>) => ["billing", "invoices", filters] as const,
    invoice:  (id: string)                         => ["billing", "invoices", id] as const,
    payments: ()                                    => ["billing", "payments"] as const,
    usage:    (filters?: Record<string, unknown>) => ["billing", "usage", filters] as const,
    summary:  ()                                    => ["billing", "summary"] as const,
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: {
    summary:   ()             => ["dashboard", "summary"] as const,
    shopStats: (shopId: string) => ["dashboard", "shopStats", shopId] as const,
  },

  // ── Notifications ─────────────────────────────────────────────────────────
  notifications: {
    all:    (shopId?: string) => ["notifications", shopId] as const,
    unread: (shopId?: string) => ["notifications", "unread", shopId] as const,
  },

  // ── Products (shop-scoped) ────────────────────────────────────────────────
  products: {
    all:    (shopId: string)                                              => ["products", shopId] as const,
    list:   (shopId: string, filters?: Record<string, unknown>)          => ["products", shopId, "list", filters] as const,
    detail: (id: string)                                                  => ["products", id] as const,
    lowStock: (shopId: string)                                            => ["products", shopId, "lowStock"] as const,
  },

  // ── Orders (shop-scoped) ──────────────────────────────────────────────────
  orders: {
    all:    (shopId: string)                                              => ["orders", shopId] as const,
    list:   (shopId: string, filters?: Record<string, unknown>)          => ["orders", shopId, "list", filters] as const,
    detail: (id: string)                                                  => ["orders", id] as const,
  },

  // ── Customers (shop-scoped) ───────────────────────────────────────────────
  customers: {
    all:    (shopId: string)                                              => ["customers", shopId] as const,
    list:   (shopId: string, filters?: Record<string, unknown>)          => ["customers", shopId, "list", filters] as const,
    detail: (id: string)                                                  => ["customers", id] as const,
  },

  // ── Inventory (shop-scoped) ───────────────────────────────────────────────
  inventory: {
    summary:   (shopId: string)                                           => ["inventory", shopId, "summary"] as const,
    movements: (shopId: string, filters?: Record<string, unknown>)        => ["inventory", shopId, "movements", filters] as const,
  },

  // ── Reports (shop-scoped) ─────────────────────────────────────────────────
  reports: {
    sales:        (shopId: string, filters?: Record<string, unknown>)     => ["reports", shopId, "sales", filters] as const,
    topProducts:  (shopId: string, filters?: Record<string, unknown>)     => ["reports", shopId, "topProducts", filters] as const,
    topCustomers: (shopId: string, filters?: Record<string, unknown>)     => ["reports", shopId, "topCustomers", filters] as const,
  },
} as const;
