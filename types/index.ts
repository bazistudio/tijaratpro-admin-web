// ─── Types barrel ─────────────────────────────────────────────────────────────
// Single import point: import type { X } from "@/types"

// API shape
export type { ApiResponse, PaginatedResponse, ApiFieldError, ApiError } from "./api.types";

// Auth & Users
export type { User, Role, LoginPayload, RegisterPayload, AuthResponse } from "./auth.types";

// SaaS layer (superadmin)
export type {
  Shop,
  ShopStatus,
  CreateShopPayload,
  UpdateShopPayload,
  ToggleShopStatusPayload,
} from "./shop.types";

export type {
  Plan,
  PlanStatus,
  BillingCycle,
  PlanFeatures,
  CreatePlanPayload,
  UpdatePlanPayload,
} from "./plan.types";

export type {
  Subscription,
  SubscriptionStatus,
  SubscribePayload,
  RenewPayload,
} from "./subscription.types";

export type {
  Invoice,
  InvoiceStatus,
  Payment,
  PaymentMethod,
  UsageLog,
  BillingSummary,
  RecordPaymentPayload,
  LogUsagePayload,
} from "./billing.types";

export type {
  DashboardSummary,
  ActivityItem,
  RevenueDataPoint,
  PlanDistributionItem,
} from "./dashboard.types";

// ERP layer (shop-scoped)
export type {
  Product,
  ProductStatus,
  CreateProductPayload,
  UpdateProductPayload,
  AdjustStockPayload,
  ProductFilter,
} from "./product.types";

export type {
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  OrderFilter,
} from "./order.types";

export type {
  Customer,
  CreateCustomerPayload,
  UpdateCustomerPayload,
  CustomerFilter,
} from "./customer.types";

export type {
  StockMovement,
  StockMovementType,
  InventorySummary,
  LowStockProduct,
  StockMovementFilter,
} from "./inventory.types";

export type {
  Notification,
  NotificationType,
  MarkReadPayload,
} from "./notification.types";

export type {
  SalesReport,
  SalesDataPoint,
  TopProduct,
  TopCustomer,
  ShopDashboardSummary,
  ReportFilter,
} from "./report.types";
