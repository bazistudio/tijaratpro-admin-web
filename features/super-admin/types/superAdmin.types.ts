// ─── TijaratPro Super Admin — Type Definitions ────────────────────────────────
// All SA-specific types. Shop-level ERP types live in @/types.

// ── Primitive Enums ────────────────────────────────────────────────────────────

export type ShopStatus      = "active" | "inactive" | "suspended";
export type BusinessType    = "RETAIL" | "MEDICAL" | "AUTO" | "WHOLESALE" | "SYSTEM";
export type BillingCycle    = "monthly" | "yearly";
export type TicketStatus    = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority  = "urgent" | "high" | "medium" | "low";
export type ActivatorStatus = "active" | "inactive" | "suspended";
export type InvoiceStatus   = "pending" | "paid" | "overdue" | "cancelled";
export type PaymentMethod   = "cash" | "card" | "bank_transfer" | "online";
export type DrawerType      = "tenant" | "subscription" | "ticket" | "activator";
export type BulkContext     = "tenants" | "tickets" | "activators" | "subscriptions";

// ── Tenant (Super Admin view) ──────────────────────────────────────────────────

export interface TenantOwner {
  _id:    string;
  name:   string;
  email:  string;
  phone?: string;
}

export interface TenantPlan {
  _id:          string;
  name:         string;
  price:        number;
  billingCycle: BillingCycle;
}

export interface TenantListItem {
  _id:              string;
  name:             string;
  slug:             string;
  domain?:          string;
  email?:           string;
  phone?:           string;
  owner:            TenantOwner;
  plan:             TenantPlan | null;
  status:           ShopStatus;
  businessType:     BusinessType;
  storageUsed:      number;        // 0–100 percent
  trial:            boolean;
  overdue:          boolean;
  subscriptionEnd?: string;        // ISO date
  mrr:              number;        // monthly recurring revenue for this tenant
  createdAt:        string;
  updatedAt:        string;
}

export interface TenantSubscriptionSnapshot {
  _id:          string;
  status:       "active" | "expired" | "cancelled" | "pending";
  startDate:    string;
  endDate:      string;
  billingCycle: BillingCycle;
}

export interface TenantInvoiceSummary {
  total:   number;
  paid:    number;
  pending: number;
  overdue: number;
}

export interface TenantDetail extends TenantListItem {
  address?:       string;
  subscription:   TenantSubscriptionSnapshot | null;
  invoiceSummary: TenantInvoiceSummary;
  enabledModules: string[];
  staffCount:     number;
  productCount:   number;
  orderCount:     number;
  lastActivityAt: string;
}

export interface CreateTenantPayload {
  name:         string;
  email?:       string;
  phone?:       string;
  address?:     string;
  businessType: BusinessType;
  ownerId:      string;
  planId?:      string;
}

export interface UpdateTenantPayload {
  name?:    string;
  email?:   string;
  phone?:   string;
  address?: string;
}

// ── Subscription ───────────────────────────────────────────────────────────────

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "pending";

export interface SubscriptionWithTenant {
  _id:        string;
  tenantId:   string;
  tenantName: string;
  plan:       TenantPlan;
  status:     SubscriptionStatus;
  startDate:  string;
  endDate:    string;
  mrr:        number;
  autoRenew:  boolean;
  createdAt:  string;
}

// ── Billing ────────────────────────────────────────────────────────────────────

export interface MRRMetrics {
  mrr:            number;
  arr:            number;
  newMrr:         number;
  churnedMrr:     number;
  netMrrGrowth:   number;
  pendingAmount:  number;
  overdueAmount:  number;
}

export interface MRRDataPoint {
  month:      string;   // "Jan 2025"
  mrr:        number;
  arr:        number;
  newTenants: number;
}

export interface InvoiceWithTenant {
  _id:            string;
  tenantId:       string;
  tenantName:     string;
  subscriptionId: string;
  amount:         number;
  status:         InvoiceStatus;
  dueDate:        string;
  paidAt?:        string;
  createdAt:      string;
}

export interface RecordPaymentPayload {
  invoiceId:  string;
  amount:     number;
  method:     PaymentMethod;
  reference?: string;
}

// ── Support Tickets ────────────────────────────────────────────────────────────

export interface SupportTicket {
  _id:             string;
  title:           string;
  description:     string;
  shopId:          string;
  shopName:        string;
  priority:        TicketPriority;
  status:          TicketStatus;
  assignedTo?:     string;
  assignedToName?: string;
  slaHours:        number;  // deadline in hours from createdAt
  createdAt:       string;
  updatedAt:       string;
}

export interface TicketReply {
  _id:        string;
  authorId:   string;
  authorName: string;
  isAdmin:    boolean;
  message:    string;
  createdAt:  string;
}

export interface TicketDetail extends SupportTicket {
  replies: TicketReply[];
}

// ── Activators ─────────────────────────────────────────────────────────────────

export interface Activator {
  _id:               string;
  name:              string;
  email:             string;
  phone?:            string;
  region?:           string;
  commissionRate:    number;   // percentage e.g. 15 = 15%
  tenantsActivated:  number;
  totalRevenue:      number;
  status:            ActivatorStatus;
  createdAt:         string;
}

export interface CreateActivatorPayload {
  name:           string;
  email:          string;
  phone?:         string;
  commissionRate: number;
}

// ── Audit Log ──────────────────────────────────────────────────────────────────

export type AuditAction =
  | "TENANT_CREATED"        | "TENANT_SUSPENDED"  | "TENANT_ACTIVATED" | "TENANT_DELETED"
  | "SUBSCRIPTION_ASSIGNED" | "SUBSCRIPTION_RENEWED" | "SUBSCRIPTION_CANCELLED"
  | "INVOICE_PAID"          | "PLAN_CHANGED"
  | "ACTIVATOR_CREATED"     | "ACTIVATOR_UPDATED"
  | "TICKET_RESOLVED"       | "TICKET_ASSIGNED"
  | "SETTINGS_CHANGED"      | "BULK_ACTION";

export type AuditEntityType =
  | "TENANT" | "SUBSCRIPTION" | "INVOICE"
  | "ACTIVATOR" | "PLAN" | "SETTINGS" | "TICKET";

export interface AuditEntry {
  _id:        string;
  action:     AuditAction;
  entityType: AuditEntityType;
  entityId:   string;
  entityName: string;
  actorId:    string;
  actorName:  string;
  meta:       Record<string, unknown>;  // diff data (before/after)
  createdAt:  string;
}

export type AuditLogItem = AuditEntry;

// ── Platform Overview ──────────────────────────────────────────────────────────

export interface SystemHealth {
  apiStatus:         "operational" | "degraded" | "outage";
  dbStatus:          "operational" | "degraded" | "outage";
  avgResponseTimeMs: number;
  uptimePercent:     number;
}

export interface ActivityItem {
  id:        string;
  admin:     string;
  action:    string;
  target:    string;
  type:      "shop" | "subscription" | "ticket" | "activator" | "system";
  timestamp: string;
}

export interface PlatformOverview {
  totalShops:          number;
  activeShops:         number;
  pendingShops:        number;
  suspendedShops:      number;
  mrr:                 number;
  arr:                 number;
  newMrrThisMonth:     number;
  churnedMrrThisMonth: number;
  openTickets:         number;
  urgentTickets:       number;
  activeSubscriptions: number;
  expiringIn30Days:    number;
  recentActivity:      ActivityItem[];
  systemHealth:        SystemHealth;
}

// ── Analytics ──────────────────────────────────────────────────────────────────

export interface PlanDistributionItem {
  planName:   string;
  count:      number;
  percentage: number;
  color:      string;
}

export interface TenantGrowthPoint {
  month:   string;
  total:   number;
  new:     number;
  churned: number;
}

// ── Settings ───────────────────────────────────────────────────────────────────

export interface SystemSettings {
  maintenanceMode:    boolean;
  blockSignups:       boolean;
  defaultTrialDays:   number;
  supportEmail:       string;
  announcementBanner: string;
}

// ── Filters ────────────────────────────────────────────────────────────────────

export interface TenantFilters {
  status:       ShopStatus | "all";
  plan:         string | "all";
  businessType: BusinessType | "all";
  search:       string;
  page:         number;
  limit:        number;
  sortBy:       string;
  sortOrder:    "asc" | "desc";
}

export interface TicketFilters {
  status:     TicketStatus | "all";
  priority:   TicketPriority | "all";
  assignedTo: string | "all";
  search:     string;
  page:       number;
  limit:      number;
}

export interface SubscriptionFilters {
  status: string | "all";
  plan:   string | "all";
  page:   number;
  limit:  number;
}

export interface AuditFilters {
  entityType: AuditEntityType | "all";
  action:     AuditAction | "all";
  actorId:    string;
  search:     string;
  from:       string;
  to:         string;
  page:       number;
  limit:      number;
}

// ── Search ─────────────────────────────────────────────────────────────────────

export interface GlobalSearchResult {
  tenants:    Array<{ _id: string; name: string; status: ShopStatus; plan: string }>;
  tickets:    Array<{ _id: string; title: string; shopName: string; priority: TicketPriority }>;
  activators: Array<{ _id: string; name: string; email: string; status: ActivatorStatus }>;
}

// ── Bulk Actions ───────────────────────────────────────────────────────────────

export interface BulkActionPayload {
  action:   "approve" | "suspend" | "activate" | "delete" | "message" | "export" | "resolve" | "assign";
  ids:      string[];
  payload?: Record<string, unknown>;
}

// ── Confirm Dialog ─────────────────────────────────────────────────────────────

export interface ConfirmConfig {
  title:         string;
  message:       string;
  variant?:      "danger" | "warning";
  confirmLabel?: string;
  onConfirm:     () => void;
}
