"use client";

import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { cn } from "@/lib/utils";

export function SubscriptionFilters() {
  const { subscriptionFilters, setSubscriptionFilters } = useSuperAdminStore();

  const STATUS_OPTIONS = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" },
    { value: "pending", label: "Pending" },
  ];

  const hasFilters = subscriptionFilters.status !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status */}
      <div className="relative">
        <select
          value={subscriptionFilters.status}
          onChange={(e) => setSubscriptionFilters({ status: e.target.value, page: 1 })}
          className={cn(
            "appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-semibold",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "focus:outline-none focus:border-primary/40 transition-all cursor-pointer"
          )}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)] pointer-events-none" />
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={() => setSubscriptionFilters({ status: "all", page: 1 })}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] border border-[var(--border)] transition-all"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
}
