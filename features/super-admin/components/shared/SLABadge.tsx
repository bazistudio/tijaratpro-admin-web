"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SLABadgeProps {
  createdAt: string;
  slaHours:  number;
  status:    string;
}

interface SLAInfo {
  label:    string;
  percent:  number;
  color:    string;
  bg:       string;
  breached: boolean;
}

function computeSLA(createdAt: string, slaHours: number): SLAInfo {
  const created  = new Date(createdAt).getTime();
  const deadline = created + slaHours * 3_600_000;
  const now      = Date.now();
  const remaining = deadline - now;
  const total     = slaHours * 3_600_000;
  const percent   = Math.max(0, Math.min(100, (remaining / total) * 100));

  if (remaining <= 0) {
    return { label: "SLA Breached", percent: 0, color: "text-danger", bg: "bg-danger/10", breached: true };
  }

  const hours = Math.floor(remaining / 3_600_000);
  const mins  = Math.floor((remaining % 3_600_000) / 60_000);
  const label = hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`;

  if (percent > 50) return { label, percent, color: "text-success",  bg: "bg-success/10",  breached: false };
  if (percent > 20) return { label, percent, color: "text-warning",  bg: "bg-warning/10",  breached: false };
  return               { label, percent, color: "text-danger",   bg: "bg-danger/10",   breached: false };
}

export function SLABadge({ createdAt, slaHours, status }: SLABadgeProps) {
  const isResolved = status === "resolved" || status === "closed";
  const [info, setInfo] = useState<SLAInfo>(() => computeSLA(createdAt, slaHours));

  useEffect(() => {
    if (isResolved) return;
    const id = setInterval(() => setInfo(computeSLA(createdAt, slaHours)), 60_000);
    return () => clearInterval(id);
  }, [createdAt, slaHours, isResolved]);

  if (isResolved) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
        <CheckCircle2 size={12} /> Resolved
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold", info.bg, info.color)}>
      {info.breached
        ? <AlertTriangle size={12} className="shrink-0" />
        : <Clock size={12} className={cn("shrink-0", !info.breached && "animate-pulse")} />
      }
      <span>{info.label}</span>
    </div>
  );
}
