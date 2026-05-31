import authService from "@/services/authService";
import type {
  ApiResponse,
  AuthResponse,
  User,
  LoginPayload,
  RegisterPayload,
} from "@/types";

// ─── Auth API layer ────────────────────────────────────────────────────────────
// Consistent with services/authService.ts

export async function loginUser(
  payload: LoginPayload
): Promise<ApiResponse<AuthResponse>> {
  const res = await authService.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload
  );
  return res.data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<AuthResponse>> {
  const res = await authService.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload
  );
  return res.data;
}

export async function getMe(): Promise<ApiResponse<User>> {
  const res = await authService.get<ApiResponse<User>>("/auth/me");
  return res.data;
}
