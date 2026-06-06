"use client";

import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

export function TicketFilters() {
  const { ticketFilters, setTicketFilters, resetTicketFilters } = useSuperAdminStore();

  const [searchInput, setSearchInput] = React.useState(ticketFilters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  React.useEffect(() => {
    setTicketFilters({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const STATUS_OPTIONS = [
    { value: "all", label: "All Statuses" },
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  const PRIORITY_OPTIONS = [
    { value: "all", label: "All Priorities" },
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const hasActive =
    ticketFilters.status !== "all" ||
    ticketFilters.priority !== "all" ||
    ticketFilters.search !== "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
        <input
          type="text"
          placeholder="Search tickets…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2 rounded-xl text-sm",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "placeholder:text-[var(--text-soft)] focus:outline-none focus:border-primary/40 transition-all"
          )}
        />
      </div>

      {/* Status */}
      <div className="relative">
        <select
          value={ticketFilters.status}
          onChange={(e) => setTicketFilters({ status: e.target.value as any, page: 1 })}
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

      {/* Priority */}
      <div className="relative">
        <select
          value={ticketFilters.priority}
          onChange={(e) => setTicketFilters({ priority: e.target.value as any, page: 1 })}
          className={cn(
            "appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-semibold",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "focus:outline-none focus:border-primary/40 transition-all cursor-pointer"
          )}
        >
          {PRIORITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)] pointer-events-none" />
      </div>

      {/* Clear */}
      {hasActive && (
        <button
          onClick={() => { resetTicketFilters(); setSearchInput(""); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] border border-[var(--border)] transition-all"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
}
