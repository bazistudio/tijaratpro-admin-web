import axiosInstance from "@/lib/api/axios";
import type {
  ApiResponse,
  AuthResponse,
  User,
  LoginPayload,
  RegisterPayload,
} from "@/types";

// ─── Auth API layer ────────────────────────────────────────────────────────────
// All axios calls for auth are here. hooks.ts imports from here.

export async function loginUser(
  payload: LoginPayload
): Promise<ApiResponse<AuthResponse>> {
  const res = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload
  );
  return res.data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<AuthResponse>> {
  const res = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload
  );
  return res.data;
}

export async function getMe(): Promise<ApiResponse<User>> {
  const res = await axiosInstance.get<ApiResponse<User>>("/auth/me");
  return res.data;
}
