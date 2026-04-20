import axios from "@/lib/api/axios";
import { UserRole, PermissionString, Role } from "../types/permission.types";
import { ApiResponse } from "@/types";

const ROLES_PATH = "/roles";
const PERMISSIONS_PATH = "/permissions";

export const permissionService = {
  /**
   * Fetches all registered roles and their base permission sets.
   */
  fetchRoles: () =>
    axios.get<ApiResponse<Role[]>>(ROLES_PATH).then(res => res.data),

  /**
   * Fetches all available permission strings in the system.
   */
  fetchPermissions: () =>
    axios.get<ApiResponse<PermissionString[]>>(PERMISSIONS_PATH).then(res => res.data),

  /**
   * Updates the permissions assigned to a specific role.
   */
  updateRolePermissions: (roleId: string, permissions: PermissionString[]) =>
    axios.patch<ApiResponse<Role>>(`${ROLES_PATH}/${roleId}`, { permissions }).then(res => res.data),

  /**
   * Assigns a specific role to a user.
   */
  assignRoleToUser: (userId: string, role: UserRole) =>
    axios.patch<ApiResponse<any>>(`/users/${userId}/role`, { role }).then(res => res.data),
};
