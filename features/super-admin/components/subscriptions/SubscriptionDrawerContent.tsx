"use client";

import React from "react";
import { CreditCard, Clock, RefreshCw, Ban, DollarSign, Calendar } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import { cn } from "@/lib/utils";
// We reuse the tenant detail hook because the SA API returns full tenant info including subscription details
import { useTenantDetail } from "../../hooks/useTenants";
import { useRenewSubscription, useCancelSubscription } from "../../hooks/useSubscriptions";

interface Props { id: string }

export default function SubscriptionDrawerContent({ id }: Props) {
  // We use useTenantDetail instead of a separate useSubscriptionDetail
  // because the tenant detail endpoint includes full subscription and billing data
  const { data: tenant, isLoading } = useTenantDetail(id);
  const { openConfirm } = useSuperAdminStore();
  const renewMut = useRenewSubscription();
  const cancelMut = useCancelSubscription();

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

  if (!tenant || !tenant.subscription) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <CreditCard size={32} className="text-[var(--text-soft)] mb-3" />
        <p className="text-sm font-bold text-[var(--text)]">No active subscription</p>
        <p className="text-xs text-[var(--text-soft)] mt-1">This tenant does not have a linked subscription.</p>
      </div>
    );
  }

  const sub = tenant.subscription;

  const handleRenew = () => {
    openConfirm({
      title: "Renew Subscription?",
      message: `Manually trigger a renewal for ${tenant.name}? This will extend their cycle.`,
      variant: "warning",
      confirmLabel: "Renew Now",
      onConfirm: () => renewMut.mutate({ subscriptionId: sub._id }),
    });
  };

  const handleCancel = () => {
    openConfirm({
      title: "Cancel Subscription?",
      message: `Are you sure you want to cancel the subscription for ${tenant.name}? They will lose access at the end of their billing cycle.`,
      variant: "danger",
      onConfirm: () => cancelMut.mutate(sub._id),
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-[var(--border)]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-black text-[var(--text)]">{tenant.name}</h3>
            <p className="text-sm text-[var(--text-soft)] mt-0.5">Subscription Details</p>
          </div>
          <StatusBadge value={sub.status} variant="subscription" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={13} className="text-primary" />
              <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Plan</span>
            </div>
            <p className="text-base font-black text-[var(--text)]">{tenant.plan?.name ?? "Custom"}</p>
            <p className="text-xs text-[var(--text-soft)] mt-0.5 capitalize">{sub.billingCycle}</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={13} className="text-warning" />
              <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Renews</span>
            </div>
            <p className="text-base font-black text-[var(--text)]">{format(new Date(sub.endDate), "MMM d")}</p>
            <p className="text-xs text-[var(--text-soft)] mt-0.5">{formatDistanceToNow(new Date(sub.endDate), { addSuffix: true })}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-soft)] mb-3">Timeline</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <Calendar size={14} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text)]">Started On</p>
                <p className="text-xs text-[var(--text-soft)]">{format(new Date(sub.startDate), "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>
            <div className="w-px h-6 bg-[var(--border)] ml-4" />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <Clock size={14} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text)]">Current Period Ends</p>
                <p className="text-xs text-[var(--text-soft)]">{format(new Date(sub.endDate), "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)] flex gap-2 bg-[var(--bg-secondary)]/50 shrink-0">
        <button
          onClick={handleRenew}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all"
        >
          <RefreshCw size={15} /> Force Renew
        </button>
        {sub.status === "active" && (
          <button
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-danger bg-danger/10 hover:bg-danger/20 border border-danger/20 transition-all"
          >
            <Ban size={15} /> Cancel Sub
          </button>
        )}
      </div>
    </div>
  );
}
