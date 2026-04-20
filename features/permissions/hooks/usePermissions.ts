import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "../services/permission.service";
import { usePermissionStore } from "../store/permission.store";
import { hasPermission, hasRole, canAccessModule } from "../utils/permission.utils";
import { UserRole, PermissionString, PermissionModule } from "../types/permission.types";

export const usePermissions = () => {
  const queryClient = useQueryClient();
  const { currentUserRole, userPermissions, isAdminOverride } = usePermissionStore();

  const context = {
    userId: "current-user", // In production, get from AuthStore
    role: currentUserRole,
    permissions: userPermissions,
  };

  // Queries
  const useRolesData = () => useQuery({
    queryKey: ["rbac", "roles"],
    queryFn: permissionService.fetchRoles
  });

  const useAllPermissions = () => useQuery({
    queryKey: ["rbac", "all-permissions"],
    queryFn: permissionService.fetchPermissions
  });

  // Mutations
  const updateRoleMutation = useMutation({
    mutationFn: ({ roleId, permissions }: { roleId: string, permissions: PermissionString[] }) =>
      permissionService.updateRolePermissions(roleId, permissions),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rbac"] })
  });

  // Core Access Control Logic (The Consumption Layer)
  const useAccessControl = () => ({
    checkPermission: (permission: PermissionString) => hasPermission(context, permission),
    checkRole: (role: UserRole) => hasRole(context, role),
    checkModule: (module: PermissionModule) => canAccessModule(context, module),
    isAdmin: currentUserRole === UserRole.ADMIN || isAdminOverride,
  });

  return {
    useRolesData,
    useAllPermissions,
    updateRoleMutation,
    useAccessControl,
  };
};
