import { NextRequest, NextResponse } from "next/server";

// ─── Next.js Edge Middleware ──────────────────────────────────────────────────
// Runs on every matched request BEFORE it hits a page or API route.
// Reads the tp_token cookie (mirrored from localStorage at login) to decide
// whether the request is authenticated.
//
// Rules:
//  1. Authenticated → visiting /login or /register  → redirect to /dashboard
//  2. Unauthenticated → visiting a protected route  → redirect to /login
//  3. Everything else passes through

const AUTH_ROUTES       = ["/login", "/register"];
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the JS-accessible cookie set by setStoredToken() in axios.ts
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
    // Preserve the intended destination so we can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Rule 3: pass through ──────────────────────────────────────────────────
  return NextResponse.next();
}

// Only run middleware on app routes — skip _next assets, API routes, favicon
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
