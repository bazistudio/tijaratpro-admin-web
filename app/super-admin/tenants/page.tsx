import React from "react";
import { Building2, Plus } from "lucide-react";
import { TenantTable } from "@/features/super-admin/components/tenants/TenantTable";
import { TenantFilters } from "@/features/super-admin/components/tenants/TenantFilters";
import { CreateTenantModal } from "@/features/super-admin/components/tenants/CreateTenantModal";
import { useState } from "react";

export default function SuperAdminTenantsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <Building2 className="text-primary w-6 h-6" />
            Tenants
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            Manage shops, approve signups, and monitor usage.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <Plus size={16} />
          New Tenant
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
        <TenantFilters />
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <TenantTable />
      </div>

      {/* Create Modal */}
      <CreateTenantModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
