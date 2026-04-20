import React, { useState } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { RoleTable } from "../components/RoleTable";
import { RoleForm } from "../components/RoleForm";
import { Role } from "../types/permission.types";
import { ShieldCheck, Plus, RefreshCcw } from "lucide-react";

export const RolesPage: React.FC = () => {
  const { useRolesData } = usePermissions();
  const { data: response, isLoading, refetch } = useRolesData();
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const roles = response?.data || [];

  if (isCreating || editingRole) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <RoleForm 
          initialData={editingRole || undefined}
          onSave={(data) => {
            console.log("Saving role:", data);
            setIsCreating(false);
            setEditingRole(null);
          }}
          onCancel={() => {
            setIsCreating(false);
            setEditingRole(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-primary" size={32} />
            Role Management
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Define organizational roles and assign standardized permission sets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => refetch()}
            className="p-2.5 border border-border rounded-xl hover:bg-muted transition-all active:scale-95 group"
            title="Refresh Roles"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
          <button 
            onClick={() => setIsCreating(true)}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
          >
            <Plus size={18} />
            Create Role
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground pl-1">System Roles</h3>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            {roles.length} Registered Roles
          </span>
        </div>

        <RoleTable 
          roles={roles} 
          onEdit={setEditingRole} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};
