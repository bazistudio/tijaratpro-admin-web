export type BusinessType =
  | "RETAIL"
  | "MEDICAL"
  | "AUTO"
  | "WHOLESALE";

export type TenantStatus = "ACTIVE" | "SUSPENDED" | "TRIAL" | "EXPIRED";

export interface Tenant {
  _id: string;
  name: string;
  businessType: BusinessType;
  logo?: string;
  isActive: boolean;
  status: TenantStatus;
  createdAt: string;
}

export interface TenantState {
  activeTenant: Tenant | null;
  tenantList: Tenant[];
  isLoading: boolean;
  setTenantList: (tenants: Tenant[]) => void;
  setActiveTenant: (tenant: Tenant) => void;
  setLoading: (isLoading: boolean) => void;
  clearTenancy: () => void;
}

