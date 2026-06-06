"use client";

import React from "react";
import { X, Zap, Mail, Phone, MapPin, Loader2, Percent } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useCreateActivator } from "../../hooks/useActivators";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:           z.string().min(2, "Name required"),
  email:          z.string().email("Valid email required"),
  phone:          z.string().min(5, "Phone required"),
  region:         z.string().min(2, "Region required"),
  commissionRate: z.number().min(0).max(100),
});
type FormValues = z.infer<typeof schema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-[var(--text)]">{label}</label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

const INPUT_CLS = "w-full px-3 py-2.5 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-soft)] focus:outline-none focus:border-amber-500/50 transition-all";

interface Props { open: boolean; onClose: () => void }

export function CreateActivatorModal({ open, onClose }: Props) {
  const createMut = useCreateActivator();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { commissionRate: 10 },
  });

  const onSubmit = (values: FormValues) => {
    createMut.mutate(values, {
      onSuccess: () => { reset(); onClose(); },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] animate-in fade-in" />
        <Dialog.Content className={cn(
          "fixed left-1/2 top-1/2 z-[201] w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2",
          "bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl",
          "animate-in slide-in-from-top-4 fade-in duration-200"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Zap size={18} className="text-amber-500" />
              </div>
              <div>
                <Dialog.Title className="text-base font-black text-[var(--text)]">New Activator</Dialog.Title>
                <Dialog.Description className="text-xs text-[var(--text-soft)]">Onboard a new regional sales agent</Dialog.Description>
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
            <Field label="Full Name *" error={errors.name?.message}>
              <input {...register("name")} placeholder="Hamza Ali" className={INPUT_CLS} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Email *" error={errors.email?.message}>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input {...register("email")} placeholder="agent@example.com" className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
              <Field label="Phone *" error={errors.phone?.message}>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input {...register("phone")} placeholder="+92 300 1234567" className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Region *" error={errors.region?.message}>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input {...register("region")} placeholder="Karachi South" className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
              <Field label="Commission Rate (%) *" error={errors.commissionRate?.message}>
                <div className="relative">
                  <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                  <input type="number" {...register("commissionRate", { valueAsNumber: true })} className={cn(INPUT_CLS, "pl-8")} />
                </div>
              </Field>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-all">
                Cancel
              </button>
              <button type="submit" disabled={createMut.isPending} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-60">
                {createMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />}
                Add Activator
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
