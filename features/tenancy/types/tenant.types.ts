export type BusinessType =
  | "RETAIL"
  | "MEDICAL"
  | "AUTO"
  | "WHOLESALE";

export interface Tenant {
  id: string;
  name: string;
  businessType: BusinessType;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface TenantState {
  activeTenant: Tenant | null;
  tenantList: Tenant[];
  setTenantList: (tenants: Tenant[]) => void;
  setActiveTenant: (tenant: Tenant) => void;
  clearTenancy: () => void;
}
