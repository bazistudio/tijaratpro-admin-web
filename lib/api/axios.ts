import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@/types";
import { useTenantStore } from "@/features/tenancy/store/tenant.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// ─── Token helpers (client-only) ──────────────────────────────────────────────
// Auth strategy: read token from localStorage (set at login).
// Middleware reads the same token via an httpOnly-style cookie set at login.
// This file is client-only — never imported on the server.

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  // Fallback to localStorage if we use Zustand persist or old system
  return localStorage.getItem("tp_token") || getCookie("tp_token");
}

export function getStoredShopId(): string | null {
   if (typeof window === "undefined") return null;
   return localStorage.getItem("tp_shopId") || getCookie("tp_shopId");
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("tp_token", token);
  // Mirror to cookie so Next.js middleware can read it (JS-accessible cookie)
  document.cookie = `tp_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("tp_token");
  localStorage.removeItem("tp_shopId");
  document.cookie = "tp_token=; path=/; max-age=0; SameSite=Lax";
  document.cookie = "tp_shopId=; path=/; max-age=0; SameSite=Lax";
}

// ─── Axios instance ───────────────────────────────────────────────────────────

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send cookies cross-origin too
  timeout: 15_000,
});

// ─── Request interceptor: attach JWT ─────────────────────────────────────────

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    // Multi-tenant isolation: Always inject active tenant ID into query params
    // We use getState() to access the store outside of React components
    const tenantId = useTenantStore.getState().activeTenant?.id;
    if (tenantId) {
      config.params = {
        ...config.params,
        tenantId
      };
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: global 401 handler + error normalizer ──────────────

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      clearStoredToken();
      // Client-side redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Normalize backend error shape: { success, message, errors[] }
    const backendError: ApiError = error.response?.data ?? {
      success: false,
      message: error.message ?? "An unexpected error occurred",
    };

    return Promise.reject(backendError);
  }
);

export default axiosInstance;
