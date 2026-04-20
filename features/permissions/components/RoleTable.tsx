import React from "react";
import { Role } from "../types/permission.types";
import { PermissionBadge } from "./PermissionBadge";
import { Users, ShieldCheck, MoreVertical, Edit2 } from "lucide-react";
import { ROLE_LABELS } from "../constants/permission.constants";

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  isLoading?: boolean;
}

export const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, isLoading }) => {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-black tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">Role Name</th>
              <th className="px-6 py-4">Assigned Users</th>
              <th className="px-6 py-4">Permission Count</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <PermissionBadge role={role.name} size="sm" className="w-fit mb-1" />
                    <span className="text-xs text-muted-foreground">{role.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-muted-foreground" />
                    <span className="font-bold">{role.userCount} Users</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary" />
                    <span className="font-medium text-xs">{role.permissions.length} Active Rules</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => onEdit(role)}
                      className="p-2 hover:bg-muted rounded-xl transition-all active:scale-95 text-muted-foreground hover:text-primary"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-xl transition-all active:scale-95 text-muted-foreground">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
