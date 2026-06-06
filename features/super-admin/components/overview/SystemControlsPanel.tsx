"use client";

import React from "react";
import { Power, Shield, RefreshCw, Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSystemSettings, updateSystemSettings,
  recalculateMetrics, cleanInactiveTenants,
} from "../../api/superAdmin.api";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Toggle row ───────────────────────────────────────────────────────────────
function ToggleRow({
  icon: Icon, iconColor, label, description,
  checked, onChange, loading,
}: {
  icon: React.ElementType; iconColor: string;
  label: string; description: string;
  checked: boolean; onChange: (v: boolean) => void; loading: boolean;
}) {
  return (
    <label className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer group">
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", `bg-${iconColor}/10`)}>
        <Icon className={cn("w-5 h-5", `text-${iconColor}`)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--text)]">{label}</p>
        <p className="text-xs text-[var(--text-soft)]">{description}</p>
      </div>
      {/* Toggle switch */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); onChange(!checked); }}
        disabled={loading}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 focus:outline-none",
          checked ? "bg-primary" : "bg-[var(--border)] border border-[var(--border)]"
        )}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </label>
  );
}

// ─── System Controls Panel ────────────────────────────────────────────────────
export function SystemControlsPanel() {
  const qc          = useQueryClient();
  const { openConfirm } = useSuperAdminStore();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["sa-settings"],
    queryFn:  getSystemSettings,
    staleTime: 1000 * 60 * 5,
  });

  const updateMut = useMutation({
    mutationFn: updateSystemSettings,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sa-settings"] });
      toast.success("Settings updated");
    },
    onError: () => toast.error("Failed to update settings"),
  });

  const recalcMut = useMutation({
    mutationFn: recalculateMetrics,
    onSuccess: () => toast.success("Metrics recalculated"),
    onError:   () => toast.error("Recalculation failed"),
  });

  const cleanMut = useMutation({
    mutationFn: cleanInactiveTenants,
    onSuccess: (res) => toast.success(`Cleaned ${res.cleaned} inactive tenant(s)`),
    onError:   ()    => toast.error("Clean operation failed"),
  });

  const handleClean = () => openConfirm({
    title:        "Clean Inactive Tenants?",
    message:      "This will permanently remove tenants that have been inactive for over 90 days. This action cannot be undone.",
    variant:      "danger",
    confirmLabel: "Clean Now",
    onConfirm:    () => cleanMut.mutate(),
  });

  const isBusy = isLoading || updateMut.isPending;

  return (
    <div className="space-y-1">
      <ToggleRow
        icon={Power} iconColor="danger"
        label="Maintenance Mode"
        description="Blocks all shop user access — only super admins can log in"
        checked={settings?.maintenanceMode ?? false}
        onChange={(v) => updateMut.mutate({ maintenanceMode: v })}
        loading={isBusy}
      />
      <ToggleRow
        icon={Shield} iconColor="warning"
        label="Block New Signups"
        description="Prevents new tenants from registering on the platform"
        checked={settings?.blockSignups ?? false}
        onChange={(v) => updateMut.mutate({ blockSignups: v })}
        loading={isBusy}
      />

      {/* Danger actions */}
      <div className="pt-2 border-t border-[var(--border)] flex flex-wrap gap-2 px-4 pb-2">
        <button
          onClick={() => recalcMut.mutate()}
          disabled={recalcMut.isPending}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all active:scale-95 disabled:opacity-50"
        >
          {recalcMut.isPending
            ? <Loader2 size={13} className="animate-spin" />
            : <RefreshCw size={13} />
          }
          Recalculate Metrics
        </button>
        <button
          onClick={handleClean}
          disabled={cleanMut.isPending}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {cleanMut.isPending
            ? <Loader2 size={13} className="animate-spin" />
            : <Trash2 size={13} />
          }
          Clean Inactive Tenants
        </button>
      </div>
    </div>
  );
}
