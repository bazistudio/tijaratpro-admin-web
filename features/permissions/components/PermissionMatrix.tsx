import React from "react";
import { 
  PermissionString, 
  PermissionModule, 
  PermissionAction 
} from "../types/permission.types";
import { 
  PERMISSION_MODULES, 
  PERMISSION_ACTIONS 
} from "../constants/permission.constants";
import { Check, X, Shield } from "lucide-react";
import { clsx } from "clsx";

interface PermissionMatrixProps {
  currentPermissions: PermissionString[];
  onToggle: (permission: PermissionString) => void;
  isEditable?: boolean;
}

/**
 * PermissionMatrix (Enterprise Admin UI)
 * Visual grid mapping Modules vs Actions.
 */
export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ 
  currentPermissions, 
  onToggle,
  isEditable = true
}) => {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-black tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4 flex items-center gap-2">
                <Shield size={14} className="text-primary" />
                Module Name
              </th>
              {PERMISSION_ACTIONS.map(action => (
                <th key={action} className="px-6 py-4 text-center">{action}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PERMISSION_MODULES.map(module => (
              <tr key={module} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-bold text-xs">
                  {module}
                </td>
                {PERMISSION_ACTIONS.map(action => {
                  const permissionStr: PermissionString = `${module as PermissionModule}.${action as PermissionAction}`;
                  const isActive = currentPermissions.includes(permissionStr);

                  return (
                    <td key={action} className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => isEditable && onToggle(permissionStr)}
                          disabled={!isEditable}
                          className={clsx(
                            "h-8 w-8 rounded-lg flex items-center justify-center transition-all active:scale-90",
                            isActive 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {isActive ? <Check size={16} strokeWidth={3} /> : <X size={14} className="opacity-30" />}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
