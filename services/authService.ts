"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Modern Auth Service
 * Single source of truth for authentication and identity.
 * Consolidates localStorage, Cookies, and Axios injection.
 */
const authService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor: Token Injection ─────────────────────────────────────
authService.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Priority: localStorage -> Cookies
    const token = 
      localStorage.getItem("tp_token") || 
      document.cookie.match(/tp_token=([^;]+)/)?.[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Tenant Context Injection
    const authState = localStorage.getItem("tp_auth");
    if (authState) {
      try {
        const parsed = JSON.parse(authState);
        const tenantId = parsed?.state?.organizationId;
        if (tenantId) {
          config.params = { ...config.params, tenantId };
        }
      } catch (e) {
        console.error("[AuthService] Failed to parse auth state for tenantId", e);
      }
    }
  }
  return config;
});

// ─── Response Interceptor: 401 Handling ──────────────────────────────────────
authService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("[AuthService] 401 Unauthorized detected. Purging state.");
      if (typeof window !== "undefined") {
        localStorage.removeItem("tp_token");
        localStorage.removeItem("tp_auth");
        localStorage.removeItem("tp_tenant_context");
        document.cookie = "tp_token=; path=/; max-age=0; SameSite=Lax";
        
        // Prevent redirect loop if already on login
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth Methods ─────────────────────────────────────────────────────────────

export const login = async (email: string, password: string) => {
  const res = await authService.post("/auth/login", { email, password });
  // The backend returns { token, user: { ... } } or { data: { token, user } }
  // Our transitional layer handle this, but let's be explicit.
  const data = res.data.data || res.data;
  if (data.token) {
    localStorage.setItem("tp_token", data.token);
    document.cookie = `tp_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  }
  return data;
};

export const getMe = async () => {
  const res = await authService.get("/auth/me");
  return res.data.data || res.data;
};

export const getCapabilities = async () => {
  const res = await authService.get("/auth/capabilities");
  return res.data.data || res.data;
};

export const logoutFromServer = async (): Promise<void> => {
  try {
    await authService.post("/auth/logout");
  } catch (e) {
    // Silently ignore — the server may already be unreachable.
    // Local state will be cleared regardless.
    console.warn("[AuthService] Server logout call failed. Clearing local state anyway.");
  }
};

export const logout = async (): Promise<void> => {
  await logoutFromServer();
  localStorage.removeItem("tp_token");
  localStorage.removeItem("tp_auth");
  localStorage.removeItem("tp_tenant_context");
  document.cookie = "tp_token=; path=/; max-age=0; SameSite=Lax";
  window.location.href = "/login";
};

export default authService;
