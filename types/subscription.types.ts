export type SubscriptionStatus = "active" | "expired" | "suspended" | "cancelled";

export interface Subscription {
  _id: string;
  shopId: string;
  planId: string;
  plan?: {
    _id: string;
    name: string;
    price: number;
    billingCycle: string;
  };
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribePayload {
  planId: string;
  shopId: string;
}

export interface RenewPayload {
  subscriptionId: string;
}
