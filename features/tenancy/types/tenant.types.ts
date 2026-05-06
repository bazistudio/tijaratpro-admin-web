export type BusinessType =
  | "RETAIL"
  | "MEDICAL"
  | "AUTO"
  | "WHOLESALE";

export interface Tenant {
  _id: string;
  name: string;
  businessType: BusinessType;
  logo?: string;
  isActive: boolean;
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

