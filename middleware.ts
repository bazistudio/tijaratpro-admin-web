import { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth.middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

// Only run middleware on app routes — skip _next assets, API routes, favicon
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
