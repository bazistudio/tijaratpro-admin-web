"use client";

import React, { useMemo } from "react";
import {
  useReactTable, getCoreRowModel, flexRender,
  createColumnHelper, type ColumnDef,
} from "@tanstack/react-table";
import { Loader2, Search, X, ChevronDown, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { useAuditLog } from "../../hooks/useAuditLog";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { AuditLogItem } from "../../types/superAdmin.types";

const col = createColumnHelper<AuditLogItem>();

// ─── Filters ──────────────────────────────────────────────────────────────────
export function AuditFilters() {
  const { auditFilters, setAuditFilters, resetAuditFilters } = useSuperAdminStore();

  const [searchInput, setSearchInput] = React.useState(auditFilters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  React.useEffect(() => {
    setAuditFilters({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const ACTION_OPTIONS = [
    { value: "all", label: "All Actions" },
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "suspend", label: "Suspend" },
  ];

  const hasActive = auditFilters.action !== "all" || auditFilters.search !== "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
        <input
          type="text"
          placeholder="Search audit logs…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2 rounded-xl text-sm",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "placeholder:text-[var(--text-soft)] focus:outline-none focus:border-primary/40 transition-all"
          )}
        />
      </div>

      {/* Action */}
      <div className="relative">
        <select
          value={auditFilters.action}
          onChange={(e) => setAuditFilters({ action: e.target.value as any, page: 1 })}
          className={cn(
            "appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-semibold",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "focus:outline-none focus:border-primary/40 transition-all cursor-pointer"
          )}
        >
          {ACTION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)] pointer-events-none" />
      </div>

      {/* Clear */}
      {hasActive && (
        <button
          onClick={() => { resetAuditFilters(); setSearchInput(""); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] border border-[var(--border)] transition-all"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
export function AuditTable() {
  const { data, isLoading, isFetching } = useAuditLog();
  const { setAuditFilters } = useSuperAdminStore();

  const logs = data?.data ?? [];
  const pagination = data?.pagination;

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "create": return "text-success bg-success/10 border-success/20";
      case "delete": case "suspend": return "text-danger bg-danger/10 border-danger/20";
      case "update": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-[var(--text)] bg-[var(--bg-secondary)] border-[var(--border)]";
    }
  };

  const columns = useMemo<ColumnDef<AuditLogItem, any>[]>(() => [
    col.accessor("createdAt", {
      header: "Timestamp",
      cell: ({ getValue }) => (
        <span className="text-xs text-[var(--text-soft)]">
          {format(new Date(getValue() as string), "MMM d, yyyy HH:mm:ss")}
        </span>
      ),
    }),
    col.accessor("actorName", {
      header: "Admin",
      cell: ({ getValue }) => <span className="text-sm font-bold text-[var(--text)]">{getValue() as string}</span>,
    }),
    col.accessor("action", {
      header: "Action",
      cell: ({ getValue }) => (
        <span className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border",
          getActionColor(getValue() as string)
        )}>
          {getValue() as string}
        </span>
      ),
    }),
    col.accessor("entityType", {
      header: "Resource Type",
      cell: ({ getValue }) => <span className="text-xs text-[var(--text-soft)] capitalize">{getValue() as string}</span>,
    }),
    col.accessor("entityName", {
      header: "Target",
      cell: ({ getValue }) => <span className="text-sm font-semibold text-[var(--text)]">{getValue() as string}</span>,
    }),
    col.display({
      id: "ipAddress",
      header: "IP Address",
      cell: ({ row }) => {
        const ip = row.original.meta?.ipAddress;
        return <span className="text-xs text-[var(--text-soft)] font-mono">{typeof ip === "string" ? ip : "—"}</span>;
      },
    }),
  ], []);

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total ?? 0,
  });

  if (!isLoading && logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 text-2xl">📋</div>
        <p className="text-sm font-bold text-[var(--text)]">No audit logs found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && !isLoading && (
        <div className="absolute inset-0 bg-[var(--card)]/60 rounded-xl z-10 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[var(--border)]">
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3 text-left text-[10px] font-black text-[var(--text-soft)] uppercase tracking-wider whitespace-nowrap">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-4">
                        <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-soft)]">
            {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of <strong>{pagination.total}</strong>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setAuditFilters({ page: pagination.page - 1 })} disabled={pagination.page <= 1} className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-[var(--text)] px-2">Page {pagination.page} / {pagination.totalPages}</span>
            <button onClick={() => setAuditFilters({ page: pagination.page + 1 })} disabled={pagination.page >= pagination.totalPages} className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
