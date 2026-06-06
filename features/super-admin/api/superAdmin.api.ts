// ─── TijaratPro Super Admin — Unified API Layer ───────────────────────────────
// All super admin API calls in one file.
// Uses axiosInstance (auth + tenant header interceptors built-in).

import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type { Plan } from "@/types";
import type {
  PlatformOverview,
  SystemHealth,
  TenantListItem,
  TenantDetail,
  CreateTenantPayload,
  UpdateTenantPayload,
  SubscriptionWithTenant,
  MRRMetrics,
  MRRDataPoint,
  InvoiceWithTenant,
  RecordPaymentPayload,
  SupportTicket,
  TicketDetail,
  TicketReply,
  Activator,
  CreateActivatorPayload,
  AuditEntry,
  SystemSettings,
  GlobalSearchResult,
  BulkActionPayload,
  TenantFilters,
  TicketFilters,
  SubscriptionFilters,
  AuditFilters,
  PlanDistributionItem,
  TenantGrowthPoint,
} from "../types/superAdmin.types";

// ─── Helper ───────────────────────────────────────────────────────────────────
// Strip 'all' sentinels before sending to backend
function cleanFilters<T extends Record<string, unknown>>(filters: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(filters)) {
    if (v !== "all" && v !== "" && v !== undefined && v !== null) {
      (out as any)[k] = v;
    }
  }
  return out;
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export const getSAOverview = async (): Promise<PlatformOverview> => {
  const res = await axiosInstance.get<ApiResponse<PlatformOverview>>("/super-admin/overview");
  return res.data.data!;
};

export const getSystemHealth = async (): Promise<SystemHealth> => {
  const res = await axiosInstance.get<ApiResponse<SystemHealth>>("/super-admin/health");
  return res.data.data!;
};

// ─── Tenants ──────────────────────────────────────────────────────────────────

export const getTenants = async (
  filters: Partial<TenantFilters>
): Promise<PaginatedResponse<TenantListItem>> => {
  const res = await axiosInstance.get<PaginatedResponse<TenantListItem>>(
    "/super-admin/tenants",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

export const getTenantById = async (id: string): Promise<TenantDetail> => {
  const res = await axiosInstance.get<ApiResponse<TenantDetail>>(
    `/super-admin/tenants/${id}`
  );
  return res.data.data!;
};

export const createTenant = async (
  payload: CreateTenantPayload
): Promise<TenantListItem> => {
  const res = await axiosInstance.post<ApiResponse<TenantListItem>>(
    "/super-admin/tenants",
    payload
  );
  return res.data.data!;
};

export const updateTenant = async (
  id: string,
  payload: UpdateTenantPayload
): Promise<TenantListItem> => {
  const res = await axiosInstance.patch<ApiResponse<TenantListItem>>(
    `/super-admin/tenants/${id}`,
    payload
  );
  return res.data.data!;
};

export const updateTenantStatus = async (
  id: string,
  status: "active" | "suspended" | "inactive"
): Promise<TenantListItem> => {
  const res = await axiosInstance.patch<ApiResponse<TenantListItem>>(
    `/super-admin/tenants/${id}/status`,
    { status }
  );
  return res.data.data!;
};

export const deleteTenant = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/super-admin/tenants/${id}`);
};

export const bulkActionTenants = async (
  payload: BulkActionPayload
): Promise<void> => {
  await axiosInstance.post("/super-admin/tenants/bulk", payload);
};

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const getSubscriptions = async (
  filters: Partial<SubscriptionFilters>
): Promise<PaginatedResponse<SubscriptionWithTenant>> => {
  const res = await axiosInstance.get<PaginatedResponse<SubscriptionWithTenant>>(
    "/super-admin/subscriptions",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

export const assignPlan = async (
  tenantId: string,
  planId: string,
  billingCycle: string
): Promise<SubscriptionWithTenant> => {
  const res = await axiosInstance.post<ApiResponse<SubscriptionWithTenant>>(
    "/super-admin/subscriptions",
    { tenantId, planId, billingCycle }
  );
  return res.data.data!;
};

export const changePlan = async (
  subscriptionId: string,
  planId: string
): Promise<SubscriptionWithTenant> => {
  const res = await axiosInstance.patch<ApiResponse<SubscriptionWithTenant>>(
    `/super-admin/subscriptions/${subscriptionId}/plan`,
    { planId }
  );
  return res.data.data!;
};

export const renewSubscription = async (
  subscriptionId: string,
  durationMonths?: number
): Promise<SubscriptionWithTenant> => {
  const res = await axiosInstance.patch<ApiResponse<SubscriptionWithTenant>>(
    `/super-admin/subscriptions/${subscriptionId}/renew`,
    { durationMonths }
  );
  return res.data.data!;
};

export const cancelSubscription = async (
  subscriptionId: string
): Promise<SubscriptionWithTenant> => {
  const res = await axiosInstance.patch<ApiResponse<SubscriptionWithTenant>>(
    `/super-admin/subscriptions/${subscriptionId}/cancel`,
    {}
  );
  return res.data.data!;
};

// ─── Billing ──────────────────────────────────────────────────────────────────

export const getBillingSummary = async (): Promise<MRRMetrics> => {
  const res = await axiosInstance.get<ApiResponse<MRRMetrics>>(
    "/super-admin/billing/summary"
  );
  return res.data.data!;
};

export const getInvoices = async (filters: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<InvoiceWithTenant>> => {
  const res = await axiosInstance.get<PaginatedResponse<InvoiceWithTenant>>(
    "/super-admin/billing/invoices",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

export const recordPayment = async (
  payload: RecordPaymentPayload
): Promise<void> => {
  await axiosInstance.post("/super-admin/billing/payments", payload);
};

// ─── Analytics ────────────────────────────────────────────────────────────────

export const getMRRTimeSeries = async (months = 12): Promise<MRRDataPoint[]> => {
  const res = await axiosInstance.get<ApiResponse<MRRDataPoint[]>>(
    "/super-admin/analytics/mrr",
    { params: { months } }
  );
  return res.data.data!;
};

export const getPlanDistribution = async (): Promise<PlanDistributionItem[]> => {
  const res = await axiosInstance.get<ApiResponse<PlanDistributionItem[]>>(
    "/super-admin/analytics/plans"
  );
  return res.data.data!;
};

export const getTenantGrowth = async (
  months = 12
): Promise<TenantGrowthPoint[]> => {
  const res = await axiosInstance.get<ApiResponse<TenantGrowthPoint[]>>(
    "/super-admin/analytics/tenants",
    { params: { months } }
  );
  return res.data.data!;
};

// ─── Support Tickets ──────────────────────────────────────────────────────────

export const getTickets = async (
  filters: Partial<TicketFilters>
): Promise<PaginatedResponse<SupportTicket>> => {
  const res = await axiosInstance.get<PaginatedResponse<SupportTicket>>(
    "/super-admin/support/tickets",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

export const getTicketById = async (id: string): Promise<TicketDetail> => {
  const res = await axiosInstance.get<ApiResponse<TicketDetail>>(
    `/super-admin/support/tickets/${id}`
  );
  return res.data.data!;
};

export const replyToTicket = async (
  id: string,
  message: string
): Promise<TicketReply> => {
  const res = await axiosInstance.post<ApiResponse<TicketReply>>(
    `/super-admin/support/tickets/${id}/reply`,
    { message }
  );
  return res.data.data!;
};

export const updateTicketStatus = async (
  id: string,
  status: string
): Promise<SupportTicket> => {
  const res = await axiosInstance.patch<ApiResponse<SupportTicket>>(
    `/super-admin/support/tickets/${id}/status`,
    { status }
  );
  return res.data.data!;
};

export const assignTicket = async (
  id: string,
  assignedTo: string
): Promise<SupportTicket> => {
  const res = await axiosInstance.patch<ApiResponse<SupportTicket>>(
    `/super-admin/support/tickets/${id}/assign`,
    { assignedTo }
  );
  return res.data.data!;
};

// ─── Activators ───────────────────────────────────────────────────────────────

export const getActivators = async (filters: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Activator>> => {
  const res = await axiosInstance.get<PaginatedResponse<Activator>>(
    "/super-admin/activators",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

export const createActivator = async (
  payload: CreateActivatorPayload
): Promise<Activator> => {
  const res = await axiosInstance.post<ApiResponse<Activator>>(
    "/super-admin/activators",
    payload
  );
  return res.data.data!;
};

export const updateActivator = async (
  id: string,
  payload: Partial<Activator>
): Promise<Activator> => {
  const res = await axiosInstance.patch<ApiResponse<Activator>>(
    `/super-admin/activators/${id}`,
    payload
  );
  return res.data.data!;
};

export const deleteActivator = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/super-admin/activators/${id}`);
};

// ─── Audit Log ────────────────────────────────────────────────────────────────

export const getAuditLog = async (
  filters: Partial<AuditFilters>
): Promise<PaginatedResponse<AuditEntry>> => {
  const res = await axiosInstance.get<PaginatedResponse<AuditEntry>>(
    "/super-admin/audit",
    { params: cleanFilters(filters) }
  );
  return res.data;
};

// ─── System Settings ──────────────────────────────────────────────────────────

export const getSystemSettings = async (): Promise<SystemSettings> => {
  const res = await axiosInstance.get<ApiResponse<SystemSettings>>(
    "/super-admin/settings"
  );
  return res.data.data!;
};

export const updateSystemSettings = async (
  payload: Partial<SystemSettings>
): Promise<SystemSettings> => {
  const res = await axiosInstance.patch<ApiResponse<SystemSettings>>(
    "/super-admin/settings",
    payload
  );
  return res.data.data!;
};

export const recalculateMetrics = async (): Promise<void> => {
  await axiosInstance.post("/super-admin/actions/recalculate");
};

export const cleanInactiveTenants = async (): Promise<{ cleaned: number }> => {
  const res = await axiosInstance.post<ApiResponse<{ cleaned: number }>>(
    "/super-admin/actions/clean-tenants"
  );
  return res.data.data!;
};

// ─── Global Search ────────────────────────────────────────────────────────────

export const globalSearch = async (
  q: string,
  limit = 5
): Promise<GlobalSearchResult> => {
  const res = await axiosInstance.get<ApiResponse<GlobalSearchResult>>(
    "/super-admin/search",
    { params: { q, limit } }
  );
  return res.data.data!;
};

// ─── Plans (for plan assignment dropdowns) ────────────────────────────────────

export const getPlans = async (): Promise<Plan[]> => {
  const res = await axiosInstance.get<ApiResponse<Plan[]>>("/plans");
  return res.data.data!;
};
