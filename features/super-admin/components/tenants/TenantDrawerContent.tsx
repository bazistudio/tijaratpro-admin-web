"use client";

import React from "react";
import {
  User, Mail, Phone, MapPin, CreditCard, Package,
  BarChart3, Clock, Ban, CheckCircle2, Loader2, ExternalLink,
} from "lucide-react";
import { useTenantDetail, useUpdateTenantStatus } from "../../hooks/useTenants";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, format } from "date-fns";

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

export default function TenantDrawerContent({ id }: Props) {
  const { data: tenant, isLoading } = useTenantDetail(id);
  const { openConfirm } = useSuperAdminStore();
  const statusMut = useUpdateTenantStatus();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-[var(--bg-secondary)] rounded animate-pulse w-1/4" />
              <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tenant) return (
    <div className="flex items-center justify-center h-48">
      <p className="text-sm text-[var(--text-soft)]">Tenant not found</p>
    </div>
  );

  const handleStatus = (status: "active" | "suspended") => {
    openConfirm({
      title:   status === "active" ? "Activate Tenant?" : "Suspend Tenant?",
      message: `This will ${status === "active" ? "restore access for" : "block"} ${tenant.name}.`,
      variant: status === "active" ? "warning" : "danger",
      onConfirm: () => statusMut.mutate({ id, status }),
    });
  };

  const storageColor = tenant.storageUsed > 80 ? "bg-danger" : tenant.storageUsed > 60 ? "bg-warning" : "bg-primary";

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-[var(--border)]">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg shadow-primary/20">
            {tenant.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-black text-[var(--text)]">{tenant.name}</h3>
              {tenant.trial && (
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">Trial</span>
              )}
              {tenant.overdue && (
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-danger/10 text-danger border border-danger/20">Overdue</span>
              )}
            </div>
            <p className="text-sm text-[var(--text-soft)] mt-0.5">{tenant.slug}</p>
            <div className="mt-2">
              <StatusBadge value={tenant.status} variant="shop" dot />
            </div>
          </div>
        </div>

        {/* MRR */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "MRR",           value: `PKR ${(tenant.mrr / 1000).toFixed(0)}k` },
            { label: "Staff",         value: tenant.staffCount?.toLocaleString() ?? "—" },
            { label: "Orders (total)", value: tenant.orderCount?.toLocaleString() ?? "—" },
          ].map((m) => (
            <div key={m.label} className="text-center p-2 rounded-xl bg-[var(--bg-secondary)]">
              <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-black text-[var(--text)] mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Contact Info */}
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Contact</p>
          <div className="space-y-0">
            <InfoRow icon={User}    label="Owner"   value={tenant.owner.name} />
            <InfoRow icon={Mail}    label="Email"   value={tenant.owner.email} />
            {tenant.owner.phone && <InfoRow icon={Phone} label="Phone" value={tenant.owner.phone} />}
            {tenant.address && <InfoRow icon={MapPin} label="Address" value={tenant.address} />}
          </div>
        </section>

        {/* Subscription */}
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Subscription</p>
          {tenant.subscription ? (
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text)]">{tenant.plan?.name ?? "—"}</span>
                <StatusBadge value={tenant.subscription.status} variant="subscription" />
              </div>
              <div className="text-xs text-[var(--text-soft)] flex items-center gap-2">
                <Clock size={11} />
                Expires {format(new Date(tenant.subscription.endDate), "MMM d, yyyy")}
                {" "}({formatDistanceToNow(new Date(tenant.subscription.endDate), { addSuffix: true })})
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-[var(--border)] text-center">
              <p className="text-sm text-[var(--text-soft)]">No active subscription</p>
            </div>
          )}
        </section>

        {/* Storage */}
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Storage Usage</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[var(--text)]">{tenant.storageUsed}% used</span>
              <span className="text-[var(--text-soft)] text-xs">{100 - tenant.storageUsed}% remaining</span>
            </div>
            <div className="h-2.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div className={cn("h-full rounded-full transition-all", storageColor)} style={{ width: `${tenant.storageUsed}%` }} />
            </div>
          </div>
        </section>

        {/* Invoice Summary */}
        {tenant.invoiceSummary && (
          <section>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Invoice Summary</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Total",   value: tenant.invoiceSummary.total,   color: "text-[var(--text)]" },
                { label: "Paid",    value: tenant.invoiceSummary.paid,    color: "text-success" },
                { label: "Pending", value: tenant.invoiceSummary.pending, color: "text-warning" },
                { label: "Overdue", value: tenant.invoiceSummary.overdue, color: "text-danger" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-[var(--bg-secondary)] text-center">
                  <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase">{item.label}</p>
                  <p className={cn("text-sm font-black mt-0.5", item.color)}>
                    PKR {item.value?.toLocaleString() ?? 0}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-[var(--border)] flex gap-2 bg-[var(--bg-secondary)]/50 shrink-0">
        {tenant.status === "active" ? (
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
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all">
          <ExternalLink size={15} /> Full View
        </button>
      </div>
    </div>
  );
}
