"use client";

import React from "react";
import { 
  TrendingUp, 
  Store, 
  BarChart3, 
  Layers, 
  Percent, 
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Wrench,
  Pill
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export default function OrganizationAnalyticsPage() {
  const { shops } = useAuthStore();

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter">
            Corporate Analytics
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Realtime data collection, branch performance indexes, and overall SaaS organizational health.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
          <Sparkles size={14} className="animate-pulse" />
          <span>SaaS AI Optimized</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Combined Revenue */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
            Combined Gross Sales
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-[var(--text)] tracking-tight">
              PKR 1.84M
            </h3>
            <span className="text-xs font-extrabold text-success flex items-center gap-0.5">
              <ArrowUpRight size={14} />
              <span>+12.4%</span>
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Accumulated from {shops?.length || 0} active branches
          </p>
        </div>

        {/* Avg Ticket Size */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
            Average Ticket Value
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-[var(--text)] tracking-tight">
              PKR 4,820
            </h3>
            <span className="text-xs font-extrabold text-success flex items-center gap-0.5">
              <ArrowUpRight size={14} />
              <span>+3.8%</span>
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Calculated across 820 order events
          </p>
        </div>

        {/* Product Stock Valuation */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
            Consolidated Inventory Valuation
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-[var(--text)] tracking-tight">
              PKR 14.2M
            </h3>
            <span className="text-xs font-semibold text-[var(--text-soft)]">
              Stable
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            3,492 unique sku items stocked
          </p>
        </div>

        {/* Overall Profit Margin */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
            Average Net Margin
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-black text-[var(--text)] tracking-tight">
              28.4%
            </h3>
            <span className="text-xs font-extrabold text-success flex items-center gap-0.5">
              <ArrowUpRight size={14} />
              <span>+1.2%</span>
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Target margin for v1.2: 30%
          </p>
        </div>

      </div>

      {/* Main Charts & Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Branch Contribution */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">
              Branch Revenue Share & Targets
            </h3>
            <p className="text-xs text-[var(--text-soft)] font-medium">
              Daily revenue contributions versus branch milestones.
            </p>
          </div>

          <div className="space-y-4">
            {(shops || []).map((shop, idx) => {
              const percentages = [72, 45, 18];
              const sharePercent = percentages[idx % percentages.length];
              const shareVal = idx === 0 ? "1.24M" : idx === 1 ? "420K" : "180K";
              return (
                <div key={shop._id} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[var(--text)]">{shop.name}</span>
                    <span className="text-primary">PKR {shareVal} ({sharePercent}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000"
                      style={{ width: `${sharePercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product categories */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">
              Feature Usage Telemetry
            </h3>
            <p className="text-xs text-[var(--text-soft)] font-medium">
              Daily processing bandwidth utilized by industry templates.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Wrench size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Compatibility Engine</span>
                  <span className="text-amber-500">4,820 hits</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <Pill size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Prescriptions & Expiry</span>
                  <span className="text-emerald-500">1,940 hits</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <Store size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>General Stock mutated</span>
                  <span className="text-blue-500">18,290 events</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
