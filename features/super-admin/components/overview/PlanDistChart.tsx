"use client";

import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { usePlanDistribution } from "../../hooks/useBilling";
import { Loader2 } from "lucide-react";

const DEMO_DATA = [
  { planName: "Basic",        count: 45, percentage: 45, color: "#94A3B8" },
  { planName: "Professional", count: 32, percentage: 32, color: "#2EC4B6" },
  { planName: "Enterprise",   count: 23, percentage: 23, color: "#3B82F6" },
];

function PlanTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const { planName, count, percentage } = payload[0].payload;
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-3 text-xs">
      <p className="font-black text-[var(--text)]">{planName}</p>
      <p className="text-[var(--text-soft)]">{count} tenants · {percentage}%</p>
    </div>
  );
}

export function PlanDistChart() {
  const { data, isLoading } = usePlanDistribution();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
      </div>
    );
  }

  const chartData = data ?? DEMO_DATA;

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={78}
            dataKey="count"
            nameKey="planName"
            paddingAngle={3}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<PlanTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="space-y-2">
        {chartData.map((item) => (
          <div key={item.planName} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
              <span className="text-xs font-semibold text-[var(--text-soft)]">{item.planName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text)]">{item.count}</span>
              <span className="text-[10px] text-[var(--text-soft)]">({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
