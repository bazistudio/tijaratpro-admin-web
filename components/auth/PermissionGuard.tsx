"use client"

import * as React from "react"
import { usePermission, type Capabilities } from "@/hooks/use-permissions"
import { ShieldAlert } from "lucide-react"

interface PermissionGuardProps {
  permission: keyof Capabilities
  children: React.ReactNode
  fallback?: React.ReactNode
  mode?: "hide" | "disable"
}

/**
 * Higher Order Component to guard sensitive UI actions.
 */
export function PermissionGuard({ 
  permission, 
  children, 
  fallback, 
  mode = "hide" 
}: PermissionGuardProps) {
  const { can } = usePermission()

  if (!can(permission)) {
    if (mode === "disable") {
      return (
        <div className="opacity-50 pointer-events-none cursor-not-allowed grayscale relative group">
           {children}
           <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-slate-900 text-white text-[8px] font-black uppercase px-2 py-1 rounded flex items-center gap-1">
                 <ShieldAlert size={10} /> Access Locked
              </div>
           </div>
        </div>
      )
    }

    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
