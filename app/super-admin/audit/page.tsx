import React from "react";
import { Activity, Download } from "lucide-react";
import { AuditTable, AuditFilters } from "@/features/super-admin/components/audit/AuditTable";

export default function SuperAdminAuditPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <Activity className="text-primary w-6 h-6" />
            Audit Logs
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            System-wide trail of administrative actions and changes.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all active:scale-95">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
        <AuditFilters />
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <AuditTable />
      </div>
    </div>
  );
}
