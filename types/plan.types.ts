export type PlanStatus = "active" | "inactive";
export type BillingCycle = "monthly" | "yearly";

export interface PlanFeatures {
  maxProducts?: number;
  maxOrders?: number;
  maxStaff?: number;
  reports?: boolean;
  analytics?: boolean;
  [key: string]: unknown;
}

export interface Plan {
  _id: string;
  name: string;
  description?: string;
  price: number;
  billingCycle: BillingCycle;
  features: PlanFeatures;
  status: PlanStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanPayload {
  name: string;
  description?: string;
  price: number;
  billingCycle: BillingCycle;
  features?: PlanFeatures;
}

export interface UpdatePlanPayload {
  name?: string;
  description?: string;
  price?: number;
  billingCycle?: BillingCycle;
  features?: PlanFeatures;
}
