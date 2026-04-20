import { create } from "zustand";
import { UserRole, PermissionString } from "../types/permission.types";
import { DEFAULT_ROLE_PERMISSIONS } from "../constants/permission.constants";

interface PermissionState {
  currentUserRole: UserRole;
  userPermissions: PermissionString[];
  isAdminOverride: boolean;
  isLoading: boolean;

  // Actions
  setUserRole: (role: UserRole) => void;
  setPermissions: (permissions: PermissionString[]) => void;
  toggleAdminOverride: () => void;
  setLoading: (loading: boolean) => void;
  resetPermissions: () => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  currentUserRole: UserRole.VIEWER, // Default for security
  userPermissions: DEFAULT_ROLE_PERMISSIONS[UserRole.VIEWER],
  isAdminOverride: false,
  isLoading: false,

  setUserRole: (role) => set({ 
    currentUserRole: role,
    userPermissions: DEFAULT_ROLE_PERMISSIONS[role] || [] 
  }),

  setPermissions: (userPermissions) => set({ userPermissions }),

  toggleAdminOverride: () => set((state) => ({ 
    isAdminOverride: !state.isAdminOverride 
  })),

  setLoading: (isLoading) => set({ isLoading }),

  resetPermissions: () => set({
    currentUserRole: UserRole.VIEWER,
    userPermissions: DEFAULT_ROLE_PERMISSIONS[UserRole.VIEWER],
    isAdminOverride: false,
  }),
}));
