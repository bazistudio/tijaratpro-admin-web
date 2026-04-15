import axiosInstance from "@/lib/api/axios";
import type { ApiResponse, PaginatedResponse, Customer, CreateCustomerPayload, UpdateCustomerPayload, CustomerFilter } from "@/types";

const BASE = "/customers";

export async function getCustomers(filters?: CustomerFilter): Promise<PaginatedResponse<Customer>> {
  const res = await axiosInstance.get<PaginatedResponse<Customer>>(BASE, { params: filters });
  return res.data;
}

export async function getCustomer(id: string): Promise<ApiResponse<Customer>> {
  const res = await axiosInstance.get<ApiResponse<Customer>>(`${BASE}/${id}`);
  return res.data;
}

export async function createCustomer(payload: CreateCustomerPayload): Promise<ApiResponse<Customer>> {
  const res = await axiosInstance.post<ApiResponse<Customer>>(BASE, payload);
  return res.data;
}

export async function updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<ApiResponse<Customer>> {
  const res = await axiosInstance.put<ApiResponse<Customer>>(`${BASE}/${id}`, payload);
  return res.data;
}

export async function deleteCustomer(id: string): Promise<ApiResponse<null>> {
  const res = await axiosInstance.delete<ApiResponse<null>>(`${BASE}/${id}`);
  return res.data;
}
