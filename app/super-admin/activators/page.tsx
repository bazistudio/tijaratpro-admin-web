"use client";

import React, { useState } from "react";
import { Zap, Plus, Download } from "lucide-react";
import { ActivatorTable } from "@/features/super-admin/components/activators/ActivatorTable";
import { CreateActivatorModal } from "@/features/super-admin/components/activators/CreateActivatorModal";

export default function SuperAdminActivatorsPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <Zap className="text-amber-500 w-6 h-6" />
            Activators (Sales)
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            Manage field agents, view activated shops, and track commissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all active:scale-95">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Plus size={16} />
            New Activator
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <ActivatorTable />
      </div>

      <CreateActivatorModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
