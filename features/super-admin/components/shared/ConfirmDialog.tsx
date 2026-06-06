"use client";

import React from "react";
import { AlertTriangle, AlertCircle, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useSuperAdminStore } from "../../store/superAdmin.store";

// ─── Confirm Dialog — store-driven Radix AlertDialog ─────────────────────────
// Usage: openConfirm({ title, message, variant: 'danger', onConfirm: fn })

export function ConfirmDialog() {
  const { confirmOpen, confirmConfig, closeConfirm, executeConfirm } =
    useSuperAdminStore();

  const variant   = confirmConfig?.variant ?? "danger";
  const isDanger  = variant === "danger";
  const label     = confirmConfig?.confirmLabel ?? (isDanger ? "Delete" : "Confirm");

  return (
    <Dialog.Root open={confirmOpen} onOpenChange={(open) => !open && closeConfirm()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Panel */}
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[201] w-full max-w-[448px] -translate-x-1/2 -translate-y-1/2",
            "bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          {/* Icon */}
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
            isDanger ? "bg-danger/10" : "bg-warning/10"
          )}>
            {isDanger
              ? <AlertTriangle className="w-6 h-6 text-danger" />
              : <AlertCircle   className="w-6 h-6 text-warning" />
            }
          </div>

          {/* Title + message */}
          <Dialog.Title className="text-lg font-black text-[var(--text)] mb-2">
            {confirmConfig?.title ?? "Confirm Action"}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-[var(--text-soft)] mb-6 leading-relaxed">
            {confirmConfig?.message ?? "Are you sure you want to proceed? This action cannot be undone."}
          </Dialog.Description>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={closeConfirm}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--border)] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={executeConfirm}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95",
                isDanger
                  ? "bg-danger hover:bg-danger/90 shadow-lg shadow-danger/20"
                  : "bg-warning hover:bg-warning/90 shadow-lg shadow-warning/20"
              )}
            >
              {label}
            </button>
          </div>

          {/* Close */}
          <Dialog.Close asChild>
            <button
              onClick={closeConfirm}
              className="absolute top-4 right-4 text-[var(--text-soft)] hover:text-[var(--text)] transition-colors"
            >
              <X size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
