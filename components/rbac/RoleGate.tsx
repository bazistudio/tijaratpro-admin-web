"use client";

import { useAuthStore } from "@/store";
import { canVisit } from "@/lib/rbac";
import type { Role } from "@/types";

interface RoleGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  
  // Either specify an array of explicit roles that can see this
  allowedRoles?: Role[];
  
  // OR specify a route prefix, and it will use the central RBAC map
  route?: string;
}

export function RoleGate({ children, fallback = null, allowedRoles, route }: RoleGateProps) {
  const { user } = useAuthStore();
  
  if (!user) return <>{fallback}</>;

  if (allowedRoles) {
    if (!allowedRoles.includes(user.role)) {
      return <>{fallback}</>;
    }
  } else if (route) {
    if (!canVisit(user.role, route)) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
