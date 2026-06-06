"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title:        string;
  value:        string | number;
  subtitle?:    string;
  trend?:       number;   // positive = up, negative = down
  trendLabel?:  string;
  icon:         React.ElementType;
  iconColor?:   string;   // tailwind text color
  iconBg?:      string;   // tailwind bg color
  loading?:     boolean;
  onClick?:     () => void;
}

export function KPICard({
  title, value, subtitle, trend, trendLabel,
  icon: Icon, iconColor = "text-primary", iconBg = "bg-primary/10",
  loading = false, onClick,
}: KPICardProps) {
  const hasTrend    = trend !== undefined && trend !== null;
  const isPositive  = (trend ?? 0) > 0;
  const isNegative  = (trend ?? 0) < 0;
  const TrendIcon   = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor  = isPositive ? "text-success" : isNegative ? "text-danger" : "text-[var(--text-soft)]";
  const trendBg     = isPositive ? "bg-success/10" : isNegative ? "bg-danger/10" : "bg-[var(--bg-secondary)]";

  return (
    <div
      className={cn(
        "glass-card p-5 flex flex-col gap-4 group",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-[var(--text-soft)]">{title}</p>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>

      {/* Value */}
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 bg-[var(--bg-secondary)] rounded-lg w-24 animate-pulse" />
          <div className="h-4 bg-[var(--bg-secondary)] rounded-lg w-32 animate-pulse" />
        </div>
      ) : (
        <div>
          <p className="text-3xl font-black text-[var(--text)] tracking-tight tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[var(--text-soft)] mt-1">{subtitle}</p>
          )}
        </div>
      )}

      {/* Trend */}
      {hasTrend && !loading && (
        <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-lg w-fit text-xs font-bold", trendBg, trendColor)}>
          <TrendIcon size={12} />
          <span>
            {isPositive ? "+" : ""}{trend}% {trendLabel ?? "vs last month"}
          </span>
        </div>
      )}
    </div>
  );
}
