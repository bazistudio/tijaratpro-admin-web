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
  "/shops"
];

export function authMiddleware(request: NextRequest) {
  return NextResponse.next();
  // const { pathname } = request.nextUrl;
  // ...
}
