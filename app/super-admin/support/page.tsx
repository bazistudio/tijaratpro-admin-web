import React from "react";
import { Ticket } from "lucide-react";
import { TicketFilters } from "@/features/super-admin/components/support/TicketFilters";
import { TicketTable } from "@/features/super-admin/components/support/TicketTable";

export default function SuperAdminSupportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <Ticket className="text-violet-500 w-6 h-6" />
            Support Tickets
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            Resolve tenant issues and manage SLA deadlines.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
        <TicketFilters />
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <TicketTable />
      </div>
    </div>
  );
}
