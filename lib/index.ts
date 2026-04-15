// ─── lib barrel ───────────────────────────────────────────────────────────────
// Convenience re-exports for the most-used lib utilities.
// Import from specific sub-paths for tree-shaking in large feature modules.

// Axios client + token helpers
export { default as axiosInstance, getStoredToken, setStoredToken, clearStoredToken } from "./api/axios";

// Class merging + status colors + debounce + pagination
export { cn, formatCurrency, formatDate, formatDateTime, formatRelative, getStatusColor, debounce, truncate, getPageRange } from "./utils";

// RBAC helpers
export {
  canAccess,
  hasMinRole,
  canVisit,
  getDefaultRoute,
  isSuperAdmin,
  isShopOwner,
  isShopAdmin,
  isManager,
  isStaff,
  isSalesman,
  isShopUser,
  SUPERADMIN_ONLY_ROUTES,
  SHOP_ONLY_ROUTES,
  SHARED_ROUTES,
} from "./rbac";

// Constants
export { ROUTES, PROTECTED_PREFIXES, AUTH_ROUTES, ROLE_ALLOWED_PREFIXES, queryKeys } from "./constants";
