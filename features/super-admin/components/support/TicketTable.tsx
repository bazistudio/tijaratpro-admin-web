"use client";

import React, { useMemo } from "react";
import {
  useReactTable, getCoreRowModel, flexRender,
  createColumnHelper, type ColumnDef,
} from "@tanstack/react-table";
import { MoreHorizontal, Eye, Loader2, CheckCircle2 } from "lucide-react";
import { useTickets, useUpdateTicketStatus } from "../../hooks/useSupportTickets";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import { SLABadge } from "../shared/SLABadge";
import type { SupportTicket } from "../../types/superAdmin.types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const col = createColumnHelper<SupportTicket>();

function RowActions({ ticket }: { ticket: SupportTicket }) {
  const { openDrawer, openConfirm } = useSuperAdminStore();
  const statusMut = useUpdateTicketStatus();
  const [open, setOpen] = React.useState(false);

  const handleResolve = () => {
    openConfirm({
      title: "Resolve Ticket?",
      message: `Mark this ticket as resolved?`,
      variant: "warning",
      confirmLabel: "Resolve",
      onConfirm: () => statusMut.mutate({ id: ticket._id, status: "resolved" }),
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
              onClick={() => { openDrawer("ticket", ticket._id); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Eye size={14} /> View Details
            </button>
            {ticket.status !== "resolved" && ticket.status !== "closed" && (
              <button
                onClick={handleResolve}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-success hover:bg-success/10 transition-colors"
              >
                <CheckCircle2 size={14} /> Mark Resolved
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function TicketTable() {
  const { data, isLoading, isFetching } = useTickets();
  const { toggleSelect, selectAll, isSelected, selectedIds, openDrawer } = useSuperAdminStore();

  const tickets = data?.data ?? [];
  const pagination = data?.pagination;
  const allIds = useMemo(() => tickets.map((t) => t._id), [tickets]);
  const allSelected = allIds.length > 0 && allIds.every((id) => isSelected(id));

  const columns = useMemo<ColumnDef<SupportTicket, any>[]>(() => [
    col.display({
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => allSelected ? useSuperAdminStore.getState().clearSelection() : selectAll(allIds, "tickets")}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={isSelected(row.original._id)}
          onChange={() => toggleSelect(row.original._id, "tickets")}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
      ),
      size: 40,
    }),
    col.accessor("title", {
      header: "Ticket",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--text)] truncate max-w-sm">{row.original.title}</p>
          <p className="text-xs text-[var(--text-soft)]">{row.original.shopName}</p>
        </div>
      ),
    }),
    col.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => <StatusBadge value={getValue()} variant="ticket" dot />,
    }),
    col.accessor("priority", {
      header: "Priority",
      cell: ({ getValue }) => <StatusBadge value={getValue()} variant="priority" />,
    }),
    col.accessor("assignedToName", {
      header: "Assignee",
      cell: ({ getValue }) => <span className="text-sm text-[var(--text)]">{getValue() || <span className="text-[var(--text-soft)]">Unassigned</span>}</span>,
    }),
    col.display({
      id: "sla",
      header: "SLA Deadline",
      cell: ({ row }) => <SLABadge createdAt={row.original.createdAt} slaHours={row.original.slaHours} status={row.original.status} />,
    }),
    col.accessor("createdAt", {
      header: "Opened",
      cell: ({ getValue }) => <span className="text-xs text-[var(--text-soft)]">{formatDistanceToNow(new Date(getValue()), { addSuffix: true })}</span>,
    }),
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => <RowActions ticket={row.original} />,
      size: 50,
    }),
  ], [allSelected, allIds, isSelected, toggleSelect, selectAll]);

  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.total ?? 0,
  });

  if (!isLoading && tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4 text-2xl">🎫</div>
        <p className="text-sm font-bold text-[var(--text)]">No tickets found</p>
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
                    onClick={() => openDrawer("ticket", row.original._id)}
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
