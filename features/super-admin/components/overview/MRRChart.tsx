"use client";

import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useMRRTimeSeries } from "../../hooks/useBilling";
import { Loader2 } from "lucide-react";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function MRRTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-3 text-xs">
      <p className="font-black text-[var(--text)] mb-2">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: PKR {entry.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── MRR Chart ────────────────────────────────────────────────────────────────
export function MRRChart() {
  const { data, isLoading } = useMRRTimeSeries(12);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Fallback demo data when backend is not yet ready
  const chartData = data ?? DEMO_MRR_DATA;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#2EC4B6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2EC4B6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--text-soft)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--text-soft)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<MRRTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          formatter={(value) => <span style={{ color: "var(--text-soft)" }}>{value}</span>}
        />
        <Area
          type="monotone"
          dataKey="mrr"
          name="MRR"
          stroke="#2EC4B6"
          strokeWidth={2.5}
          fill="url(#mrrGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#2EC4B6" }}
        />
        <Area
          type="monotone"
          dataKey="arr"
          name="ARR"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#arrGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#3B82F6" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Demo fallback ────────────────────────────────────────────────────────────
const DEMO_MRR_DATA = [
  { month: "Jul",  mrr: 125_000, arr: 1_500_000, newTenants: 4 },
  { month: "Aug",  mrr: 142_000, arr: 1_704_000, newTenants: 6 },
  { month: "Sep",  mrr: 158_000, arr: 1_896_000, newTenants: 5 },
  { month: "Oct",  mrr: 180_000, arr: 2_160_000, newTenants: 8 },
  { month: "Nov",  mrr: 210_000, arr: 2_520_000, newTenants: 10 },
  { month: "Dec",  mrr: 248_000, arr: 2_976_000, newTenants: 12 },
  { month: "Jan",  mrr: 265_000, arr: 3_180_000, newTenants: 7 },
  { month: "Feb",  mrr: 280_000, arr: 3_360_000, newTenants: 9 },
  { month: "Mar",  mrr: 305_000, arr: 3_660_000, newTenants: 11 },
  { month: "Apr",  mrr: 328_000, arr: 3_936_000, newTenants: 8 },
  { month: "May",  mrr: 360_000, arr: 4_320_000, newTenants: 13 },
  { month: "Jun",  mrr: 395_000, arr: 4_740_000, newTenants: 15 },
];
