"use client";

import React from "react";
import { X, Building2, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useCreateTenant } from "../../hooks/useTenants";
import { cn } from "@/lib/utils";
import type { BusinessType } from "../../types/superAdmin.types";

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  name:         z.string().min(2, "Shop name must be at least 2 characters"),
  email:        z.string().email("Valid email required").optional().or(z.literal("")),
  phone:        z.string().optional(),
  address:      z.string().optional(),
  businessType: z.enum(["RETAIL", "MEDICAL", "AUTO", "WHOLESALE", "SYSTEM"]),
  ownerId:      z.string().min(1, "Owner ID is required"),
});
type FormValues = z.infer<typeof schema>;

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "RETAIL",    label: "Retail"    },
  { value: "MEDICAL",   label: "Medical"   },
  { value: "AUTO",      label: "Auto"      },
  { value: "WHOLESALE", label: "Wholesale" },
  { value: "SYSTEM",    label: "System"    },
];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-[var(--text)]">{label}</label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

const INPUT_CLS = "w-full px-3 py-2.5 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-soft)] focus:outline-none focus:border-primary/40 transition-all";

// ─── Modal ────────────────────────────────────────────────────────────────────
interface Props { open: boolean; onClose: () => void }

export function CreateTenantModal({ open, onClose }: Props) {
  const createMut = useCreateTenant();

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { businessType: "RETAIL" },
  });

  const onSubmit = (values: FormValues) => {
    createMut.mutate(
      {
        name:         values.name,
        email:        values.email || undefined,
        phone:        values.phone || undefined,
        address:      values.address || undefined,
        businessType: values.businessType,
        ownerId:      values.ownerId,
      },
      {
        onSuccess: () => { reset(); onClose(); },
      }
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] animate-in fade-in" />
        <Dialog.Content className={cn(
          "fixed left-1/2 top-1/2 z-[201] w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2",
          "bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl",
          "animate-in slide-in-from-top-4 fade-in duration-200"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 size={18} className="text-primary" />
              </div>
              <div>
                <Dialog.Title className="text-base font-black text-[var(--text)]">Create New Tenant</Dialog.Title>
                <Dialog.Description className="text-xs text-[var(--text-soft)]">Add a new shop to the platform</Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-all">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <Field label="Shop Name *" error={errors.name?.message}>
              <input {...register("name")} placeholder="Al-Madina General Store" className={INPUT_CLS} />
            </Field>

            <Field label="Business Type *" error={errors.businessType?.message}>
              <select {...register("businessType")} className={INPUT_CLS}>
                {BUSINESS_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>

            <Field label="Owner ID *" error={errors.ownerId?.message}>
              <input {...register("ownerId")} placeholder="user_abc123" className={INPUT_CLS} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Email" error={errors.email?.message}>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input {...register("email")} placeholder="store@example.com" className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
              <Field label="Phone">
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input {...register("phone")} placeholder="+92 300 1234567" className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
            </div>

            <Field label="Address">
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-3.5 text-[var(--text-soft)]" />
                <textarea {...register("address")} rows={2} placeholder="Shop address…" className={cn(INPUT_CLS, "pl-8 resize-none")} />
              </div>
            </Field>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMut.isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-60"
              >
                {createMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Building2 size={15} />}
                Create Tenant
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
