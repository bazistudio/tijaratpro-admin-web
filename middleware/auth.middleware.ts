import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/verify-otp", "/reset-password"];
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/organization",
  "/analytics",
  "/billing",
  "/notifications",
  "/reports",
  "/settings",
  "/stock",
  "/subscriptions",
  "/suppliers",
  "/support",
  "/customers",
  "/expenses",
  "/orders",
  "/products",
  "/sales",
  "/shops",
  "/warehouse"
];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("tp_token")?.value;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && token) {
    if (request.nextUrl.searchParams.get("clearSession") === "true") {
      const response = NextResponse.next();
      response.cookies.delete("tp_token");
      response.cookies.delete("tp_shopId");
      return response;
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

