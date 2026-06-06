"use client";

import React from "react";
import { Activity, Database, Clock, TrendingUp, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSystemHealth } from "../../hooks/useSAOverview";
import type { SystemHealth } from "../../types/superAdmin.types";

// ─── Status indicator pill ─────────────────────────────────────────────────────
function StatusPill({ status }: { status: SystemHealth["apiStatus"] }) {
  const cfg = {
    operational: { label: "Operational", icon: CheckCircle2, color: "text-success",  bg: "bg-success/10",  border: "border-success/20"  },
    degraded:    { label: "Degraded",    icon: AlertTriangle, color: "text-warning",  bg: "bg-warning/10",  border: "border-warning/20"  },
    outage:      { label: "Outage",      icon: XCircle,       color: "text-danger",   bg: "bg-danger/10",   border: "border-danger/20"   },
  }[status];
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider", cfg.color, cfg.bg, cfg.border)}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
}

// ─── System Health Bar ────────────────────────────────────────────────────────
export function SystemHealthBar() {
  const { data: health, isLoading } = useSystemHealth();

  const demo: SystemHealth = {
    apiStatus: "operational",
    dbStatus:  "operational",
    avgResponseTimeMs: 124,
    uptimePercent: 99.97,
  };

  const h = health ?? demo;

  const metrics = [
    {
      label: "API Server",
      icon:  Activity,
      iconColor: "text-primary",
      iconBg:    "bg-primary/10",
      value: <StatusPill status={h.apiStatus} />,
    },
    {
      label: "Database",
      icon:  Database,
      iconColor: "text-blue-500",
      iconBg:    "bg-blue-500/10",
      value: <StatusPill status={h.dbStatus} />,
    },
    {
      label: "Avg Response",
      icon:  Clock,
      iconColor: "text-amber-500",
      iconBg:    "bg-amber-500/10",
      value: <span className="text-sm font-black text-[var(--text)]">{h.avgResponseTimeMs}ms</span>,
    },
    {
      label: "Uptime (30d)",
      icon:  TrendingUp,
      iconColor: "text-success",
      iconBg:    "bg-success/10",
      value: <span className="text-sm font-black text-[var(--text)]">{h.uptimePercent.toFixed(2)}%</span>,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
          {isLoading ? (
            <div className="w-8 h-8 rounded-lg bg-[var(--border)] animate-pulse shrink-0" />
          ) : (
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", m.iconBg)}>
              <m.icon className={cn("w-4 h-4", m.iconColor)} />
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider mb-0.5">{m.label}</p>
            {isLoading
              ? <div className="h-4 bg-[var(--border)] rounded w-16 animate-pulse" />
              : m.value
            }
          </div>
        </div>
      ))}
    </div>
  );
}
