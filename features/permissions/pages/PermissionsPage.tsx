import React, { useState } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { PermissionMatrix } from "../components/PermissionMatrix";
import { PermissionString } from "../types/permission.types";
import { Fingerprint, Save, Info } from "lucide-react";
import { toast } from "sonner";

export const PermissionsPage: React.FC = () => {
  const { useRolesData, updateRoleMutation } = usePermissions();
  const { data: response } = useRolesData();
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [tempPermissions, setTempPermissions] = useState<PermissionString[]>([]);

  const roles = response?.data || [];
  const selectedRole = roles.find(r => r.id === selectedRoleId);

  const handleToggle = (permission: PermissionString) => {
    setTempPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };

  const handleSave = async () => {
    if (!selectedRoleId) return;
    try {
      await updateRoleMutation.mutateAsync({
        roleId: selectedRoleId,
        permissions: tempPermissions
      });
      toast.success("Security matrix updated successfully");
    } catch (error) {
      toast.error("Failed to update security matrix");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Fingerprint className="text-primary" size={32} />
            Security Matrix
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Global module access control and functional permission mapping.
          </p>
        </div>

        {selectedRoleId && (
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
          >
            <Save size={18} />
            Commit Matrix Changes
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Role Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Select Role Context</h3>
          <div className="bg-card border border-border rounded-2xl p-2 space-y-1">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRoleId(role.id);
                  setTempPermissions(role.permissions);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all group ${
                  selectedRoleId === role.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-black" 
                    : "hover:bg-muted text-muted-foreground font-bold text-sm"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

          <div className="bg-muted/50 rounded-2xl p-4 flex gap-3 border border-border">
            <Info size={18} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground font-medium">
              Changes made here are global. Every user assigned to the selected role will have their access updated immediately across all platforms.
            </p>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="lg:col-span-3 space-y-4">
          {selectedRoleId ? (
            <>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Mapping for {selectedRole?.name}
                </h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {tempPermissions.length} Active Rules
                </span>
              </div>
              <PermissionMatrix 
                currentPermissions={tempPermissions} 
                onToggle={handleToggle} 
              />
            </>
          ) : (
            <div className="h-[400px] bg-card border border-border border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-8">
              <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mb-4 text-muted-foreground/30">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-muted-foreground">No Context Selected</h3>
              <p className="text-xs text-muted-foreground/60 mt-2 max-w-xs">
                Please select a role from the sidebar to view and edit its global security permissions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
