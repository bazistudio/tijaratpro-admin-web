import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES       = ["/login", "/register", "/forgot-password"];
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/shops",
  "/plans",
  "/subscriptions",
  "/billing",
  "/reports",
  "/notifications",
  "/products",
  "/orders",
  "/customers",
  "/inventory",
  "/sales",
  "/suppliers",
  "/settings",
];

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("tp_token")?.value;
  const isAuthenticated = Boolean(token);

  // ── Rule 1: authenticated user visiting auth pages ────────────────────────
  if (isAuthenticated && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ── Rule 2: unauthenticated user visiting a protected route ───────────────
  if (
    !isAuthenticated &&
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Rule 3: pass through ──────────────────────────────────────────────────
  return NextResponse.next();
}
