// ─── Tenant Types (Shop Isolation) ────────────────────────────────────────────────

export type TenantType = 
  | "MEDICAL" 
  | "AUTO" 
  | "RETAIL" 
  | "GENERAL"
  | "PHARMACY"
  | "WHOLESALE";

export type TenantStatus = "ACTIVE" | "SUSPENDED" | "TRIAL" | "EXPIRED";

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  status: TenantStatus;
  logoUrl?: string;
  settings: TenantSettings;
  createdAt: string;
  updatedAt: string;
}

export interface TenantSettings {
  currency: string;
  timezone: string;
  language: string;
  printFormat: string;
  taxNumber?: string;
  contactEmail?: string;
}

export interface TenantListItem {
  id: string;
  name: string;
  type: TenantType;
  status: TenantStatus;
  userCount: number;
}
