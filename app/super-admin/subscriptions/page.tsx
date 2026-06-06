import React from "react";
import { CreditCard, Download } from "lucide-react";
import { SubscriptionFilters } from "@/features/super-admin/components/subscriptions/SubscriptionFilters";
import { SubscriptionTable } from "@/features/super-admin/components/subscriptions/SubscriptionTable";

export default function SuperAdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <CreditCard className="text-primary w-6 h-6" />
            Subscriptions
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            Manage tenant plans, renewals, and cancellations.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all active:scale-95"
        >
          <Download size={16} />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm">
        <SubscriptionFilters />
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        <SubscriptionTable />
      </div>
    </div>
  );
}
