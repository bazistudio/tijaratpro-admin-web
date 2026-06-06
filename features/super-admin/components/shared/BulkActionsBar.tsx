"use client";

import React from "react";
import {
  CheckCircle2, Ban, MessageSquare, Download,
  Ticket, X, Users2, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { toast } from "sonner";
import type { BulkContext } from "../../types/superAdmin.types";

// ─── Bulk Actions Bar ─────────────────────────────────────────────────────────
// Fixed bottom bar that slides up when items are selected.
// Context-aware — shows different actions for tenants / tickets / activators.

interface BulkAction {
  id:       string;
  label:    string;
  icon:     React.ElementType;
  variant?: "primary" | "danger" | "warning" | "default";
  onClick:  (ids: string[]) => void;
}

function useBulkActions(
  context: BulkContext | null,
  ids: string[],
  openConfirm: (config: import("../../types/superAdmin.types").ConfirmConfig) => void,
  clearSelection: () => void
): BulkAction[] {
  const count = ids.length;

  const confirm = (title: string, message: string, onConfirm: () => void, variant: "danger" | "warning" = "danger") => {
    openConfirm({ title, message, variant, onConfirm });
  };

  const stub = (action: string) => {
    toast.success(`${action} applied to ${count} item(s)`);
    clearSelection();
  };

  switch (context) {
    case "tenants":
      return [
        {
          id: "approve", label: "Approve", icon: CheckCircle2, variant: "primary",
          onClick: () => confirm(
            `Approve ${count} tenant(s)?`,
            `This will activate ${count} tenant account(s) and grant them platform access.`,
            () => stub("Approve"), "warning"
          ),
        },
        {
          id: "suspend", label: "Suspend", icon: Ban, variant: "danger",
          onClick: () => confirm(
            `Suspend ${count} tenant(s)?`,
            `These tenants will lose platform access immediately. You can re-activate them later.`,
            () => stub("Suspend")
          ),
        },
        {
          id: "message", label: "Send Message", icon: MessageSquare, variant: "default",
          onClick: () => stub("Message sent"),
        },
        {
          id: "export", label: "Export", icon: Download, variant: "default",
          onClick: () => stub("Export queued"),
        },
      ];

    case "tickets":
      return [
        {
          id: "resolve", label: "Resolve All", icon: CheckCircle2, variant: "primary",
          onClick: () => confirm(
            `Resolve ${count} ticket(s)?`,
            `All selected tickets will be marked as resolved.`,
            () => stub("Resolved"), "warning"
          ),
        },
        {
          id: "assign", label: "Assign", icon: Users2, variant: "default",
          onClick: () => stub("Assigned"),
        },
        {
          id: "export", label: "Export", icon: Download, variant: "default",
          onClick: () => stub("Export queued"),
        },
      ];

    case "activators":
      return [
        {
          id: "activate", label: "Activate", icon: Zap, variant: "primary",
          onClick: () => stub("Activated"),
        },
        {
          id: "suspend", label: "Suspend", icon: Ban, variant: "danger",
          onClick: () => confirm(
            `Suspend ${count} activator(s)?`,
            `These activators will be suspended and unable to onboard new tenants.`,
            () => stub("Suspended")
          ),
        },
        {
          id: "export", label: "Export", icon: Download, variant: "default",
          onClick: () => stub("Export queued"),
        },
      ];

    default:
      return [];
  }
}

export function BulkActionsBar() {
  const {
    selectedIds, bulkContext, clearSelection, openConfirm
  } = useSuperAdminStore();

  const ids     = Array.from(selectedIds);
  const count   = ids.length;
  const visible = count > 0;
  const actions = useBulkActions(bulkContext, ids, openConfirm, clearSelection);

  const btnClass = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20",
    danger:  "bg-danger  text-white hover:bg-danger/90  shadow-lg shadow-danger/20",
    warning: "bg-warning text-white hover:bg-warning/90 shadow-lg shadow-warning/20",
    default: "bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)]",
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]",
        "transition-all duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl backdrop-blur-md">
        {/* Count pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 mr-1 shrink-0">
          <Ticket size={14} className="shrink-0" />
          <span className="text-sm font-black">{count} selected</span>
        </div>

        {/* Actions */}
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => action.onClick(ids)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95",
              btnClass[action.variant ?? "default"]
            )}
          >
            <action.icon size={14} />
            {action.label}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--border)] mx-1" />

        {/* Clear */}
        <button
          onClick={clearSelection}
          className="p-2 rounded-xl text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-all"
          title="Clear selection"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
