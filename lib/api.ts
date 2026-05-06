/**
 * Global API Service Layer (Scalable SaaS Version)
 * Handles Auth, Base URL, Error Interception, and Response Normalization.
 */
export const api = async (url: string, options: any = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const baseUrl = "http://localhost:5000/api";

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
    });

    // Global Error Interception
    if (response.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
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

