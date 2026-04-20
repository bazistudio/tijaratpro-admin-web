import React, { useState } from "react";
import { Role, UserRole, PermissionString } from "../types/permission.types";
import { ROLE_LABELS } from "../constants/permission.constants";
import { PermissionMatrix } from "./PermissionMatrix";
import { Save, X, Info } from "lucide-react";

interface RoleFormProps {
  initialData?: Role;
  onSave: (data: Partial<Role>) => void;
  onCancel: () => void;
}

export const RoleForm: React.FC<RoleFormProps> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState<UserRole>(initialData?.name || UserRole.VIEWER);
  const [description, setDescription] = useState(initialData?.description || "");
  const [permissions, setPermissions] = useState<PermissionString[]>(initialData?.permissions || []);

  const handleTogglePermission = (permission: PermissionString) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      permissions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight">{initialData ? "Edit Role" : "Create New Role"}</h2>
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Role Identifier</label>
            <select 
              value={name}
              onChange={(e) => setName(e.target.value as UserRole)}
              className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
            >
              {Object.entries(UserRole).map(([key, value]) => (
                <option key={value} value={value}>{ROLE_LABELS[value]}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Description</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Full system access for business owners"
              className="w-full bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/50 outline-none"
            />
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
          <Info size={20} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-primary/80 font-medium">
            Standardizing the permission model across all roles ensures that security enforcement is consistent on both Frontend and Backend layers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground pl-1">Permission Configuration</h3>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            {permissions.length} Rules Selected
          </span>
        </div>
        
        <PermissionMatrix 
          currentPermissions={permissions} 
          onToggle={handleTogglePermission} 
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 sticky bottom-6 z-10">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-2.5 border border-border rounded-xl text-sm font-bold hover:bg-muted transition-all active:scale-95"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </form>
  );
};
