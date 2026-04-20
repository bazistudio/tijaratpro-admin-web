import React, { ReactNode } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { PermissionString, AccessMode } from "../types/permission.types";
import { ShieldAlert, Lock } from "lucide-react";

interface AccessGuardProps {
  permission: PermissionString;
  mode?: AccessMode;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AccessGuard (MOST IMPORTANT)
 * Wraps protected UI elements and enforces RBAC rules.
 * Supports HIDE, DISABLE, and REDIRECT modes.
 */
export const AccessGuard: React.FC<AccessGuardProps> = ({ 
  permission, 
  mode = "HIDE", 
  children,
  fallback
}) => {
  const { useAccessControl } = usePermissions();
  const { checkPermission, isAdmin } = useAccessControl();

  const hasAccess = checkPermission(permission);

  // If user has access (or is Admin), render children immediately
  if (hasAccess || isAdmin) {
    return <>{children}</>;
  }

  // Handle HIDE mode (Default)
  if (mode === "HIDE") {
    return <>{fallback || null}</>;
  }

  // Handle DISABLE mode
  if (mode === "DISABLE") {
    return (
      <div className="relative group grayscale opacity-60 cursor-not-allowed select-none">
        <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-lg pointer-events-none">
          <div className="bg-white/90 px-3 py-1.5 rounded-full shadow-lg border border-border flex items-center gap-2">
            <Lock size={12} className="text-red-500" />
            <span className="text-[10px] font-black uppercase text-red-600">Restricted Access</span>
          </div>
        </div>
        {children}
      </div>
    );
  }

  // Handle REDIRECT mode (Simplified for component level)
  if (mode === "REDIRECT") {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border border-dashed rounded-3xl text-center">
        <div className="h-16 w-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-lg font-black tracking-tight">Access Restricted</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Your role does not have permission to view this module ({permission}). 
          Please contact your administrator.
        </p>
      </div>
    );
  }

  return null;
};
