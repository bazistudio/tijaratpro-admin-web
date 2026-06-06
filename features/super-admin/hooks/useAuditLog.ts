import { useQuery } from "@tanstack/react-query";
import { getAuditLog } from "../api/superAdmin.api";
import { useSuperAdminStore } from "../store/superAdmin.store";

export const SA_AUDIT_KEY = ["sa-audit"] as const;

export function useAuditLog() {
  const filters = useSuperAdminStore((s) => s.auditFilters);
  return useQuery({
    queryKey: [...SA_AUDIT_KEY, filters],
    queryFn:  () => getAuditLog(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}
