import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/verify-otp", "/reset-password"];
const PROTECTED_PREFIXES = [
  "/dashboard",
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
  "/shops"
];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("tp_token")?.value;
  const isAuthenticated = Boolean(token);

  // 1. Authenticated user trying to access auth pages -> Redirect to dashboard
  if (isAuthenticated && AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. Unauthenticated user trying to access protected route -> Redirect to login
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
