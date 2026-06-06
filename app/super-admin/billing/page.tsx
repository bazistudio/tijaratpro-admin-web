"use client";

import React from "react";
import { DollarSign, Download, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { useBillingSummary } from "@/features/super-admin/hooks/useBilling";
import { MRRChart } from "@/features/super-admin/components/overview/MRRChart";
import { KPICard } from "@/features/super-admin/components/overview/KPICard";

export default function SuperAdminBillingPage() {
  const { data: summary, isLoading } = useBillingSummary();

  const fmtK = (n?: number) => `PKR ${((n ?? 0) / 1000).toFixed(0)}k`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <DollarSign className="text-success w-6 h-6" />
            Billing & MRR
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            Revenue tracking, pending invoices, and overall platform growth.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all active:scale-95"
        >
          <Download size={16} />
          Export Invoices
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Recurring Rev."
          value={fmtK(summary?.mrr)}
          subtitle={`ARR: ${fmtK(summary?.arr)}`}
          icon={DollarSign}
          iconColor="text-success"
          iconBg="bg-success/10"
          loading={isLoading}
        />
        <KPICard
          title="New MRR (This Month)"
          value={fmtK(summary?.newMrr)}
          icon={TrendingUp}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
          loading={isLoading}
        />
        <KPICard
          title="Churned MRR"
          value={fmtK(summary?.churnedMrr)}
          icon={TrendingDown}
          iconColor="text-danger"
          iconBg="bg-danger/10"
          loading={isLoading}
        />
        <KPICard
          title="Net MRR Growth"
          value={fmtK(summary?.netMrrGrowth)}
          trend={summary ? Math.round((summary.netMrrGrowth / (summary.mrr || 1)) * 100) : 0}
          icon={TrendingUp}
          iconColor="text-primary"
          iconBg="bg-primary/10"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending Revenue", value: fmtK(summary?.pendingAmount), icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Overdue Invoices", value: fmtK(summary?.overdueAmount), icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${m.bg}`}>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">{m.label}</p>
              <p className={`text-base font-black ${m.color}`}>{isLoading ? "…" : m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card p-6">
        <div className="mb-4">
          <h2 className="text-base font-black text-[var(--text)]">Revenue Trend</h2>
          <p className="text-xs text-[var(--text-soft)]">MRR & ARR over the last 12 months</p>
        </div>
        <MRRChart />
      </div>

      {/* Placeholder for Invoice Table */}
      <div className="glass-card p-6 text-center">
        <p className="text-sm font-bold text-[var(--text)]">Invoice Table</p>
        <p className="text-xs text-[var(--text-soft)] mt-1">Invoice list and record payment components go here.</p>
      </div>

    </div>
  );
}
