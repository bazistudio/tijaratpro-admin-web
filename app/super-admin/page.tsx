import React from "react";
import {
  Building2, DollarSign, Ticket, Activity,
  TrendingUp, TrendingDown, AlertCircle, Clock,
} from "lucide-react";
import { KPICard } from "@/features/super-admin/components/overview/KPICard";
import { MRRChart } from "@/features/super-admin/components/overview/MRRChart";
import { PlanDistChart } from "@/features/super-admin/components/overview/PlanDistChart";
import { SystemHealthBar } from "@/features/super-admin/components/overview/SystemHealthBar";
import { ActivityFeed } from "@/features/super-admin/components/overview/ActivityFeed";
import { SystemControlsPanel } from "@/features/super-admin/components/overview/SystemControlsPanel";
import { useSAOverview } from "@/features/super-admin/hooks/useSAOverview";

// ─── Overview Page ────────────────────────────────────────────────────────────
export default function SuperAdminOverviewPage() {
  const { data: overview, isLoading } = useSAOverview();

  const fmt  = (n?: number) => (n ?? 0).toLocaleString();
  const fmtK = (n?: number) => `PKR ${((n ?? 0) / 1000).toFixed(0)}k`;

  return (
    <div className="space-y-8">

      {/* ── Page title ──────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-black text-[var(--text)] tracking-tight">
          Platform Overview
        </h1>
        <p className="text-sm text-[var(--text-soft)] mt-1">
          Real-time snapshot of TijaratPro across all tenants
        </p>
      </div>

      {/* ── System Health ────────────────────────────────────────────── */}
      <SystemHealthBar />

      {/* ── KPI Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Tenants"
          value={fmt(overview?.totalShops)}
          subtitle={`${fmt(overview?.activeShops)} active · ${fmt(overview?.pendingShops)} pending`}
          trend={12}
          icon={Building2}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
          loading={isLoading}
        />
        <KPICard
          title="Monthly Revenue"
          value={fmtK(overview?.mrr)}
          subtitle={`ARR: ${fmtK(overview?.arr)}`}
          trend={overview ? Math.round(((overview.newMrrThisMonth - overview.churnedMrrThisMonth) / (overview.mrr || 1)) * 100) : 0}
          trendLabel="net MRR growth"
          icon={DollarSign}
          iconColor="text-success"
          iconBg="bg-success/10"
          loading={isLoading}
        />
        <KPICard
          title="Open Tickets"
          value={fmt(overview?.openTickets)}
          subtitle={`${fmt(overview?.urgentTickets)} urgent — need immediate attention`}
          icon={Ticket}
          iconColor="text-violet-500"
          iconBg="bg-violet-500/10"
          loading={isLoading}
        />
        <KPICard
          title="Active Subscriptions"
          value={fmt(overview?.activeSubscriptions)}
          subtitle={`${fmt(overview?.expiringIn30Days)} expiring in 30 days`}
          icon={Activity}
          iconColor="text-amber-500"
          iconBg="bg-amber-500/10"
          loading={isLoading}
        />
      </div>

      {/* ── Revenue + Plan Distribution ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR Chart — 2/3 width */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-black text-[var(--text)]">Revenue Trend</h2>
              <p className="text-xs text-[var(--text-soft)]">MRR & ARR — last 12 months</p>
            </div>
            <div className="flex items-center gap-1.5 text-success text-xs font-bold bg-success/10 px-2.5 py-1 rounded-lg">
              <TrendingUp size={13} /> +12% vs last month
            </div>
          </div>
          <MRRChart />
        </div>

        {/* Plan distribution — 1/3 width */}
        <div className="glass-card p-6">
          <div className="mb-4">
            <h2 className="text-base font-black text-[var(--text)]">Plan Distribution</h2>
            <p className="text-xs text-[var(--text-soft)]">Active tenants by plan</p>
          </div>
          <PlanDistChart />
        </div>
      </div>

      {/* ── MRR breakdown ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "New MRR",     value: fmtK(overview?.newMrrThisMonth),     icon: TrendingUp,   color: "text-success",  bg: "bg-success/10"  },
          { label: "Churned MRR", value: fmtK(overview?.churnedMrrThisMonth), icon: TrendingDown, color: "text-danger",   bg: "bg-danger/10"   },
          { label: "Pending",     value: "PKR 0",                              icon: Clock,        color: "text-warning",  bg: "bg-warning/10"  },
          { label: "Overdue",     value: "PKR 0",                              icon: AlertCircle,  color: "text-danger",   bg: "bg-danger/10"   },
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

      {/* ── Activity Feed + System Controls ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-black text-[var(--text)]">Recent Activity</h2>
            <p className="text-xs text-[var(--text-soft)]">Last 24 hours of admin actions</p>
          </div>
          <ActivityFeed items={overview?.recentActivity} loading={isLoading} />
        </div>

        {/* System Controls */}
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <h2 className="text-base font-black text-[var(--text)]">System Controls</h2>
            <p className="text-xs text-[var(--text-soft)]">Global platform switches and actions</p>
          </div>
          <SystemControlsPanel />
        </div>
      </div>

    </div>
  );
}
