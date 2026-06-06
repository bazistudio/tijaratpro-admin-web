"use client";

import React, { useMemo } from "react";
import {
  useReactTable, getCoreRowModel, flexRender,
  createColumnHelper, type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, Eye, ChevronLeft, ChevronRight, Loader2, Ban, CheckCircle2 } from "lucide-react";
import { useSubscriptions, useCancelSubscription } from "../../hooks/useSubscriptions";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import type { SubscriptionWithTenant } from "../../types/superAdmin.types";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

const col = createColumnHelper<SubscriptionWithTenant>();

function RowActions({ sub }: { sub: SubscriptionWithTenant }) {
  const { openDrawer, openConfirm } = useSuperAdminStore();
  const cancelMut = useCancelSubscription();
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    openConfirm({
      title: "Cancel Subscription?",
      message: `Are you sure you want to cancel the subscription for ${sub.tenantName}? They will lose access at the end of their billing cycle.`,
      variant: "danger",
      onConfirm: () => cancelMut.mutate(sub._id),
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
              onClick={() => { openDrawer("subscription", sub._id); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Eye size={14} /> View Details
            </button>
            {sub.status === "active" && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                <Ban size={14} /> Cancel Sub
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function SubscriptionTable() {
  const { data, isLoading, isFetching } = useSubscriptions();
  const { setSubscriptionFilters, toggleSelect, selectAll, isSelected, selectedIds, openDrawer } = useSuperAdminStore();

  const subs = data?.data ?? [];
  const pagination = data?.pagination;
  const allIds = useMemo(() => subs.map((s) => s._id), [subs]);
  const allSelected = allIds.length > 0 && allIds.every((id) => isSelected(id));

  const columns = useMemo<ColumnDef<SubscriptionWithTenant, any>[]>(() => [
    col.display({
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => allSelected ? useSuperAdminStore.getState().clearSelection() : selectAll(allIds, "subscriptions")}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={isSelected(row.original._id)}
          onChange={() => toggleSelect(row.original._id, "subscriptions")}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      size: 40,
    }),
    col.accessor("tenantName", {
      header: "Tenant",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xs shrink-0">
            {row.original.tenantName.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-[var(--text)]">{row.original.tenantName}</span>
        </div>
      ),
    }),
    col.accessor("plan.name", {
      header: "Plan",
      cell: ({ getValue, row }) => (
        <div>
          <p className="text-sm font-bold text-primary">{getValue()}</p>
          <p className="text-xs text-[var(--text-soft)] capitalize">{row.original.plan.billingCycle}</p>
        </div>
      ),
    }),
    col.accessor("mrr", {
      header: "MRR",
      cell: ({ getValue }) => <span className="text-sm font-black text-[var(--text)]">PKR {getValue()?.toLocaleString() ?? 0}</span>,
    }),
    col.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => <StatusBadge value={getValue()} variant="subscription" dot />,
    }),
    col.accessor("endDate", {
      header: "Renews/Expires",
      cell: ({ getValue }) => {
        const d = new Date(getValue());
        return (
          <div>
            <p className="text-sm text-[var(--text)]">{format(d, "MMM d, yyyy")}</p>
            <p className="text-xs text-[var(--text-soft)]">{formatDistanceToNow(d, { addSuffix: true })}</p>
          </div>
        );
      },
    }),
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => <RowActions sub={row.original} />,
      size: 50,
    }),
  ], [allSelected, allIds, isSelected, toggleSelect, selectAll]);

  const table = useReactTable({
    data: subs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total ?? 0,
  });

  if (!isLoading && subs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 text-2xl">💳</div>
        <p className="text-sm font-bold text-[var(--text)]">No subscriptions found</p>
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
                  <th key={h.id} style={{ width: h.getSize() !== 150 ? h.getSize() : undefined }} className="px-4 py-3 text-left text-[10px] font-black text-[var(--text-soft)] uppercase tracking-wider whitespace-nowrap">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[var(--border)]">
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-4">
                        <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => openDrawer("subscription", row.original._id)}
                    className={cn(
                      "border-b border-[var(--border)] cursor-pointer transition-colors",
                      isSelected(row.original._id) ? "bg-primary/5" : "hover:bg-[var(--bg-secondary)]/60"
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
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-soft)]">
            {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of <strong>{pagination.total}</strong>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setSubscriptionFilters({ page: pagination.page - 1 })} disabled={pagination.page <= 1} className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-[var(--text)] px-2">Page {pagination.page} / {pagination.totalPages}</span>
            <button onClick={() => setSubscriptionFilters({ page: pagination.page + 1 })} disabled={pagination.page >= pagination.totalPages} className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
