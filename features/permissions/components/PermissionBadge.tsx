import React from "react";
import { UserRole } from "../types/permission.types";
import { ROLE_LABELS } from "../constants/permission.constants";
import { Shield, ShieldAlert, Award, User, Clock } from "lucide-react";
import { clsx } from "clsx";

interface PermissionBadgeProps {
  role: UserRole;
  size?: "sm" | "md";
  className?: string;
}

const roleConfig: Record<UserRole, { icon: any; color: string; bgColor: string }> = {
  [UserRole.ADMIN]: { icon: ShieldAlert, color: "text-red-600", bgColor: "bg-red-500/10" },
  [UserRole.MANAGER]: { icon: Shield, color: "text-blue-600", bgColor: "bg-blue-500/10" },
  [UserRole.SALESMAN]: { icon: Award, color: "text-green-600", bgColor: "bg-green-500/10" },
  [UserRole.CASHIER]: { icon: User, color: "text-purple-600", bgColor: "bg-purple-500/10" },
  [UserRole.VIEWER]: { icon: Clock, color: "text-gray-600", bgColor: "bg-gray-500/10" },
};

export const PermissionBadge: React.FC<PermissionBadgeProps> = ({ 
  role, 
  size = "md",
  className 
}) => {
  const config = roleConfig[role] || roleConfig[UserRole.VIEWER];
  const Icon = config.icon;

  return (
    <div className={clsx(
      "inline-flex items-center gap-1.5 font-black uppercase tracking-tighter rounded-lg border border-current/10",
      config.bgColor, 
      config.color,
      size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]",
      className
    )}>
      <Icon size={size === "sm" ? 10 : 12} />
      {ROLE_LABELS[role]}
    </div>
  );
};
