"use client";

import React from "react";
import { Zap, Phone, MapPin, Loader2, Ban, CheckCircle2 } from "lucide-react";
import { useActivators, useUpdateActivator } from "../../hooks/useActivators";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import { cn } from "@/lib/utils";

interface Props { id: string }

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
      <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-[var(--text-soft)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-soft)] mb-0.5">{label}</p>
        <div className="text-sm font-semibold text-[var(--text)]">{value}</div>
      </div>
    </div>
  );
}

export default function ActivatorDrawerContent({ id }: Props) {
  const { data } = useActivators();
  const activator = data?.data.find((a) => a._id === id);
  const { openConfirm } = useSuperAdminStore();
  const updateMut = useUpdateActivator();

  if (!activator) {
    return (
      <div className="p-6 flex justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const handleStatus = (status: "active" | "suspended") => {
    openConfirm({
      title: status === "active" ? "Activate?" : "Suspend?",
      message: `Change status of ${activator.name} to ${status}?`,
      variant: status === "active" ? "warning" : "danger",
      onConfirm: () => updateMut.mutate({ id, payload: { status } }),
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="p-6 bg-gradient-to-br from-amber-500/5 to-transparent border-b border-[var(--border)]">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg shadow-amber-500/20">
            {activator.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black text-[var(--text)]">{activator.name}</h3>
            <p className="text-sm text-[var(--text-soft)] mt-0.5">{activator.email}</p>
            <div className="mt-2">
              <StatusBadge value={activator.status} variant="shop" dot />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
            <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">Shops Activated</p>
            <p className="text-xl font-black text-[var(--text)] mt-0.5">{activator.tenantsActivated}</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
            <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">Commission</p>
            <p className="text-xl font-black text-[var(--text)] mt-0.5">{activator.commissionRate}%</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Info</p>
          <div className="space-y-0">
            <InfoRow icon={MapPin} label="Region" value={activator.region} />
            <InfoRow icon={Phone} label="Phone" value={activator.phone || "—"} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)] flex gap-2 bg-[var(--bg-secondary)]/50 shrink-0">
        {activator.status === "active" ? (
          <button
            onClick={() => handleStatus("suspended")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 transition-all"
          >
            <Ban size={15} /> Suspend
          </button>
        ) : (
          <button
            onClick={() => handleStatus("active")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-success bg-success/10 hover:bg-success/20 border border-success/20 transition-all"
          >
            <CheckCircle2 size={15} /> Activate
          </button>
        )}
      </div>
    </div>
  );
}
