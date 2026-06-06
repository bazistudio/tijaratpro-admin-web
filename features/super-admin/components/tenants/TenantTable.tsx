"use client";

import React, { useMemo } from "react";
import {
  useReactTable, getCoreRowModel, flexRender,
  createColumnHelper, type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, Eye, Ban, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTenants, useUpdateTenantStatus } from "../../hooks/useTenants";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import type { TenantListItem } from "../../types/superAdmin.types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const col = createColumnHelper<TenantListItem>();

// ── Storage usage bar ─────────────────────────────────────────────────────────
function StorageBar({ pct }: { pct: number }) {
  const color = pct > 80 ? "bg-danger" : pct > 60 ? "bg-warning" : "bg-primary";
  return (
    <div className="w-20">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-[var(--text-soft)]">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-secondary)]">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  );
}

// ── Row actions dropdown ───────────────────────────────────────────────────────
function RowActions({ tenant }: { tenant: TenantListItem }) {
  const { openDrawer, openConfirm } = useSuperAdminStore();
  const statusMut = useUpdateTenantStatus();
  const [open, setOpen] = React.useState(false);

  const handleStatus = (status: "active" | "suspended") => {
    openConfirm({
      title:   status === "active" ? "Activate Tenant?" : "Suspend Tenant?",
      message: status === "active"
        ? `Grant ${tenant.name} full platform access.`
        : `Block ${tenant.name} from accessing the platform.`,
      variant:      status === "active" ? "warning" : "danger",
      confirmLabel: status === "active" ? "Activate" : "Suspend",
      onConfirm: () => statusMut.mutate({ id: tenant._id, status }),
    });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-all"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl py-1 overflow-hidden">
            <button
              onClick={() => { openDrawer("tenant", tenant._id); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Eye size={14} /> View Details
            </button>
            {tenant.status !== "active" && (
              <button
                onClick={() => handleStatus("active")}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-success hover:bg-success/10 transition-colors"
              >
                <CheckCircle2 size={14} /> Activate
              </button>
            )}
            {tenant.status === "active" && (
              <button
                onClick={() => handleStatus("suspended")}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                <Ban size={14} /> Suspend
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Tenant Table ─────────────────────────────────────────────────────────────
export function TenantTable() {
  const { data, isLoading, isFetching } = useTenants();
  const { tenantFilters, setTenantFilters, toggleSelect, selectAll, isSelected, selectedIds } = useSuperAdminStore();
  const { openDrawer } = useSuperAdminStore();

  const tenants     = data?.data ?? [];
  const pagination  = data?.pagination;
  const allIds      = useMemo(() => tenants.map((t) => t._id), [tenants]);
  const allSelected = allIds.length > 0 && allIds.every((id) => isSelected(id));

  const columns = useMemo<ColumnDef<TenantListItem, any>[]>(() => [
    // Checkbox
    col.display({
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => allSelected
            ? useSuperAdminStore.getState().clearSelection()
            : selectAll(allIds, "tenants")
          }
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={isSelected(row.original._id)}
          onChange={() => toggleSelect(row.original._id, "tenants")}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      size: 40,
    }),

    // Shop
    col.accessor("name", {
      header: "Shop",
      cell: ({ row }) => {
        const t = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xs shrink-0">
              {t.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--text)] truncate">{t.name}</p>
              <p className="text-xs text-[var(--text-soft)] truncate">{t.owner.email}</p>
            </div>
            {t.trial && (
              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                Trial
              </span>
            )}
          </div>
        );
      },
    }),

    // Owner
    col.accessor("owner.name", {
      header: "Owner",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{row.original.owner.name}</p>
          <p className="text-xs text-[var(--text-soft)]">{row.original.businessType}</p>
        </div>
      ),
    }),

    // Plan
    col.accessor("plan", {
      header: "Plan",
      cell: ({ getValue }) => {
        const plan = getValue();
        return plan
          ? <span className="text-sm font-bold text-primary">{plan.name}</span>
          : <span className="text-xs text-[var(--text-soft)]">No plan</span>;
      },
    }),

    // Status
    col.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => <StatusBadge value={getValue()} variant="shop" dot />,
    }),

    // Storage
    col.accessor("storageUsed", {
      header: "Storage",
      cell: ({ getValue }) => <StorageBar pct={getValue()} />,
    }),

    // Overdue warning
    col.accessor("overdue", {
      header: "Billing",
      cell: ({ getValue }) =>
        getValue()
          ? <span className="text-[10px] font-black text-danger bg-danger/10 px-2 py-0.5 rounded-full border border-danger/20">Overdue</span>
          : <span className="text-[10px] font-bold text-[var(--text-soft)]">—</span>,
    }),

    // Joined
    col.accessor("createdAt", {
      header: "Joined",
      cell: ({ getValue }) => (
        <span className="text-xs text-[var(--text-soft)]">
          {formatDistanceToNow(new Date(getValue()), { addSuffix: true })}
        </span>
      ),
    }),

    // Actions
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => <RowActions tenant={row.original} />,
      size: 50,
    }),
  ], [allSelected, allIds, isSelected, toggleSelect, selectAll]);

  const table = useReactTable({
    data:    tenants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total ?? 0,
  });

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!isLoading && tenants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
          <span className="text-2xl">🏪</span>
        </div>
        <p className="text-sm font-bold text-[var(--text)]">No tenants found</p>
        <p className="text-xs text-[var(--text-soft)] mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Fetching overlay */}
      {isFetching && !isLoading && (
        <div className="absolute inset-0 bg-[var(--card)]/60 rounded-xl z-10 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[var(--border)]">
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    style={{ width: h.getSize() !== 150 ? h.getSize() : undefined }}
                    className="px-4 py-3 text-left text-[10px] font-black text-[var(--text-soft)] uppercase tracking-wider whitespace-nowrap"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-4">
                        <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => openDrawer("tenant", row.original._id)}
                    className={cn(
                      "border-b border-[var(--border)] cursor-pointer transition-colors",
                      isSelected(row.original._id)
                        ? "bg-primary/5"
                        : "hover:bg-[var(--bg-secondary)]/60"
                    )}
                  >
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

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-soft)]">
            {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of <strong>{pagination.total}</strong> tenants
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTenantFilters({ page: pagination.page - 1 })}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-[var(--text)] px-2">
              Page {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setTenantFilters({ page: pagination.page + 1 })}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
