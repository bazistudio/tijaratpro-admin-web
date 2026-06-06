"use client";

import React, { useMemo } from "react";
import {
  useReactTable, getCoreRowModel, flexRender,
  createColumnHelper, type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, Eye, Loader2, Ban, CheckCircle2 } from "lucide-react";
import { useActivators, useUpdateActivator } from "../../hooks/useActivators";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import type { Activator } from "../../types/superAdmin.types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const col = createColumnHelper<Activator>();

function RowActions({ activator }: { activator: Activator }) {
  const { openDrawer, openConfirm } = useSuperAdminStore();
  const updateMut = useUpdateActivator();
  const [open, setOpen] = React.useState(false);

  const handleStatus = (status: "active" | "suspended") => {
    openConfirm({
      title: status === "active" ? "Activate?" : "Suspend?",
      message: `Change status of ${activator.name} to ${status}?`,
      variant: status === "active" ? "warning" : "danger",
      onConfirm: () => updateMut.mutate({ id: activator._id, payload: { status } }),
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
              onClick={() => { openDrawer("activator", activator._id); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Eye size={14} /> View Details
            </button>
            {activator.status !== "active" && (
              <button
                onClick={() => handleStatus("active")}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-success hover:bg-success/10 transition-colors"
              >
                <CheckCircle2 size={14} /> Activate
              </button>
            )}
            {activator.status === "active" && (
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

export function ActivatorTable() {
  const { data, isLoading, isFetching } = useActivators();
  const { toggleSelect, selectAll, isSelected, selectedIds, openDrawer } = useSuperAdminStore();

  const activators = data?.data ?? [];
  const pagination = data?.pagination;
  const allIds = useMemo(() => activators.map((a) => a._id), [activators]);
  const allSelected = allIds.length > 0 && allIds.every((id) => isSelected(id));

  const columns = useMemo<ColumnDef<Activator, any>[]>(() => [
    col.display({
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => allSelected ? useSuperAdminStore.getState().clearSelection() : selectAll(allIds, "activators")}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={isSelected(row.original._id)}
          onChange={() => toggleSelect(row.original._id, "activators")}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      size: 40,
    }),
    col.accessor("name", {
      header: "Activator",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-xs shrink-0">
            {row.original.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--text)] truncate">{row.original.name}</p>
            <p className="text-xs text-[var(--text-soft)]">{row.original.email}</p>
          </div>
        </div>
      ),
    }),
    col.accessor("region", {
      header: "Region",
      cell: ({ getValue }) => <span className="text-sm font-semibold text-[var(--text)]">{getValue()}</span>,
    }),
    col.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => <StatusBadge value={getValue()} variant="shop" dot />, // Reuse shop badge for active/suspended
    }),
    col.accessor("tenantsActivated", {
      header: "Shops Activated",
      cell: ({ getValue }) => <span className="text-sm font-black text-[var(--text)]">{getValue()?.toLocaleString() ?? 0}</span>,
    }),
    col.accessor("commissionRate", {
      header: "Commission",
      cell: ({ getValue }) => <span className="text-sm text-[var(--text)]">{getValue()}%</span>,
    }),
    col.accessor("createdAt", {
      header: "Joined",
      cell: ({ getValue }) => <span className="text-xs text-[var(--text-soft)]">{formatDistanceToNow(new Date(getValue()), { addSuffix: true })}</span>,
    }),
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => <RowActions activator={row.original} />,
      size: 50,
    }),
  ], [allSelected, allIds, isSelected, toggleSelect, selectAll]);

  const table = useReactTable({
    data: activators,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total ?? 0,
  });

  if (!isLoading && activators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 text-2xl">⚡</div>
        <p className="text-sm font-bold text-[var(--text)]">No activators found</p>
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
                    onClick={() => openDrawer("activator", row.original._id)}
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
    </div>
  );
}
