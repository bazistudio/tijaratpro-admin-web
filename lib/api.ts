/**
 * Global API Service Layer (Scalable SaaS Version)
 * Handles Auth, Base URL, Error Interception, and Response Normalization.
 */
export const api = async (url: string, options: any = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("tp_token") : null;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const processedUrl = url.startsWith("/api") ? url.replace("/api", "") : url;
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${processedUrl}`;

  let activeShopId = null;
  if (typeof window !== "undefined") {
    try {
      const persistedAuth = localStorage.getItem("tp_auth");
      if (persistedAuth) {
        const parsed = JSON.parse(persistedAuth);
        activeShopId = parsed?.state?.activeShopId;
      }
    } catch (_) {}
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(activeShopId ? { "x-shop-id": activeShopId } : {}),
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

    // --- TRANSITIONAL COMPATIBILITY LAYER ---
    // Safely unwrap new backend standardized responses without breaking legacy components.
    const originalJson = response.json.bind(response);
    response.json = async () => {
      const json = await originalJson();
      // If it's the new standard { success, data, meta }
      if (json && json.success !== undefined && json.data !== undefined) {
        // If meta exists, we can attach it non-enumerable to the data if needed,
        // but for now, just returning data keeps legacy components happy.
        return json.data; 
      }
      return json; // Fallback for endpoints not yet migrated
    };

    return response;
  } catch (error: any) {
    console.error(`[API ERROR] ${url}:`, error.message);
    throw error;
  }
};

