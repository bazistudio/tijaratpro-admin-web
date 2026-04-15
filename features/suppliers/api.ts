import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse } from "@/types";

// ─── Supplier types (local to this feature) ───────────────────────────────────
export interface Supplier {
  _id: string;
  shopId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  company?: string;
  notes?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  company?: string;
  notes?: string;
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload>;

const BASE = "/suppliers";

export async function getSuppliers(): Promise<PaginatedResponse<Supplier>> {
  const res = await axiosInstance.get<PaginatedResponse<Supplier>>(BASE);
  return res.data;
}

export async function getSupplier(id: string): Promise<ApiResponse<Supplier>> {
  const res = await axiosInstance.get<ApiResponse<Supplier>>(`${BASE}/${id}`);
  return res.data;
}

export async function createSupplier(payload: CreateSupplierPayload): Promise<ApiResponse<Supplier>> {
  const res = await axiosInstance.post<ApiResponse<Supplier>>(BASE, payload);
  return res.data;
}

export async function updateSupplier(id: string, payload: UpdateSupplierPayload): Promise<ApiResponse<Supplier>> {
  const res = await axiosInstance.put<ApiResponse<Supplier>>(`${BASE}/${id}`, payload);
  return res.data;
}

export async function deleteSupplier(id: string): Promise<ApiResponse<null>> {
  const res = await axiosInstance.delete<ApiResponse<null>>(`${BASE}/${id}`);
  return res.data;
}
