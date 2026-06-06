"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Building2, CreditCard, Ticket, Zap, Settings, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "../../types/superAdmin.types";

const TYPE_CONFIG = {
  shop:         { icon: Building2,  color: "text-blue-500",   bg: "bg-blue-500/10"   },
  subscription: { icon: CreditCard, color: "text-green-500",  bg: "bg-green-500/10"  },
  ticket:       { icon: Ticket,     color: "text-violet-500", bg: "bg-violet-500/10" },
  activator:    { icon: Zap,        color: "text-amber-500",  bg: "bg-amber-500/10"  },
  system:       { icon: Settings,   color: "text-slate-400",  bg: "bg-slate-500/10"  },
};

interface ActivityFeedProps {
  items?:   ActivityItem[];
  loading?: boolean;
}

const DEMO: ActivityItem[] = [
  { id: "1", admin: "Super Admin", action: "approved",      target: "Fashion Hub",            type: "shop",         timestamp: new Date(Date.now() - 1800_000).toISOString() },
  { id: "2", admin: "System",      action: "auto-renewed",  target: "Saddar Electronics",     type: "subscription", timestamp: new Date(Date.now() - 3600_000).toISOString() },
  { id: "3", admin: "Support",     action: "resolved",      target: "Ticket TKT-004",         type: "ticket",       timestamp: new Date(Date.now() - 7200_000).toISOString() },
  { id: "4", admin: "Super Admin", action: "created",       target: "Activator: Hamza Shah",  type: "activator",    timestamp: new Date(Date.now() - 10800_000).toISOString() },
  { id: "5", admin: "Super Admin", action: "suspended",     target: "Al-Madina Store",        type: "shop",         timestamp: new Date(Date.now() - 18000_000).toISOString() },
  { id: "6", admin: "System",      action: "updated",       target: "System settings",        type: "system",       timestamp: new Date(Date.now() - 86400_000).toISOString() },
];

export function ActivityFeed({ items, loading = false }: ActivityFeedProps) {
  const feed = items ?? DEMO;

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-[var(--bg-secondary)] rounded animate-pulse w-3/4" />
              <div className="h-3 bg-[var(--bg-secondary)] rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-[var(--border)]">
      {feed.map((item) => {
        const cfg  = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.system;
        const Icon = cfg.icon;
        return (
          <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[var(--bg-secondary)]/50 transition-colors">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", cfg.bg)}>
              <Icon className={cn("w-4 h-4", cfg.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--text)] leading-tight">
                <span className="font-bold">{item.admin}</span>
                {" "}<span className="text-[var(--text-soft)]">{item.action}</span>{" "}
                <span className="font-semibold">{item.target}</span>
              </p>
              <p className="text-xs text-[var(--text-soft)] mt-0.5 flex items-center gap-1">
                <Clock size={11} />
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
