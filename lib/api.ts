/**
 * Global API Service Layer (Scalable SaaS Version)
 * Handles Auth, Base URL, Error Interception, and Response Normalization.
 */
export const api = async (url: string, options: any = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("tp_token") : null;
  const baseUrl = "http://localhost:5000/api";
  const processedUrl = url.startsWith("/api") ? url.replace("/api", "") : url;
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${processedUrl}`;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    let response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    // Global 401 Error Interception & Token Refresh
    if (response.status === 401 && !url.includes("/auth/refresh-token")) {
      const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: "POST",
      });

      if (refreshRes.ok) {
        const { token: newToken } = await refreshRes.json();
        if (typeof window !== "undefined") {
          localStorage.setItem("tp_token", newToken);
        }
        
        // Retry original request with new token
        response = await fetch(fullUrl, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
        });
      } else {
        // Refresh failed -> logout
        if (typeof window !== "undefined") {
          localStorage.removeItem("tp_token");
          window.location.href = "/login";
        }
        throw new Error("Session expired. Please login again.");
      }
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    console.error(`[API ERROR] ${url}:`, error.message);
    throw error;
  }
};

