import axiosInstance from "@/lib/api/axios";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  CreateProductPayload,
  UpdateProductPayload,
  AdjustStockPayload,
  LowStockProduct,
  ProductFilter,
} from "@/types";

const BASE = "/products";

// ─── Products API ─────────────────────────────────────────────────────────────

export async function getProducts(
  filters?: ProductFilter
): Promise<PaginatedResponse<Product>> {
  const res = await axiosInstance.get<PaginatedResponse<Product>>(BASE, {
    params: filters,
  });
  return res.data;
}

export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  const res = await axiosInstance.get<ApiResponse<Product>>(`${BASE}/${id}`);
  return res.data;
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<ApiResponse<Product>> {
  const res = await axiosInstance.post<ApiResponse<Product>>(BASE, payload);
  return res.data;
}

export async function updateProduct(
  id: string,
  payload: UpdateProductPayload
): Promise<ApiResponse<Product>> {
  const res = await axiosInstance.put<ApiResponse<Product>>(
    `${BASE}/${id}`,
    payload
  );
  return res.data;
}

export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
  const res = await axiosInstance.delete<ApiResponse<null>>(`${BASE}/${id}`);
  return res.data;
}

export async function adjustStock(
  id: string,
  payload: AdjustStockPayload
): Promise<ApiResponse<Product>> {
  const res = await axiosInstance.patch<ApiResponse<Product>>(
    `${BASE}/${id}/stock`,
    payload
  );
  return res.data;
}

export async function getLowStockProducts(): Promise<
  ApiResponse<LowStockProduct[]>
> {
  const res = await axiosInstance.get<ApiResponse<LowStockProduct[]>>(
    `${BASE}/low-stock`
  );
  return res.data;
}
