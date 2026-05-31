"use client"

import * as React from "react"
import { 
  Users, 
  Store, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Globe, 
  BarChart3,
  Server,
  Database,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { cn, formatCurrency } from "@/lib/utils"

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  description, 
  color = "primary"
}: {
  title: string;
  value: string | number;
  trend?: { value: number; label: string };
  icon: any;
  description?: string;
  color?: "primary" | "success" | "danger" | "info" | "warning";
}) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    danger: "text-danger bg-danger/10 border-danger/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  };

  return (
    <Card className="glass-card group overflow-hidden border-[var(--border)] transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--text-soft)]">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-xl border transition-colors", colorClasses[color])}>
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {trend ? (
            <div className={cn(
              "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              trend.value >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            )}>
              {trend.value >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {Math.abs(trend.value)}%
            </div>
          ) : null}
          <span className="text-[11px] font-medium text-[var(--text-soft)]">
            {description || (trend ? trend.label : "Updated just now")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SuperAdminDashboard() {
  // Mock data for initial render
  const growthData = [
    { name: "Mon", users: 400 },
    { name: "Tue", users: 700 },
    { name: "Wed", users: 650 },
    { name: "Thu", users: 1100 },
    { name: "Fri", users: 950 },
    { name: "Sat", users: 1300 },
    { name: "Sun", users: 1200 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Platform Overview
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
               Enterprise Intelligence Shell • System Global Context
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-2">
            <Server size={16} className="text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Core Status: Optimal</span>
          </div>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Shops" 
          value="452"
          trend={{ value: 12.5, label: "this month" }}
          icon={Store}
          color="primary"
        />
        <StatCard 
          title="Active Tenants" 
          value="389"
          trend={{ value: 8.2, label: "retention up" }}
          icon={Users}
          color="success"
        />
        <StatCard 
          title="Global Revenue" 
          value={formatCurrency(1250000)}
          trend={{ value: 24, label: "vs last month" }}
          icon={TrendingUp}
          color="info"
        />
        <StatCard 
          title="System Load" 
          value="14%"
          description="Avg response time 112ms"
          icon={Activity}
          color="warning"
        />
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          <SectionCard 
            title="Tenant Acquisition Growth" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="h-[350px] p-6"
          >
            <div className="h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="var(--text-soft)" fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
                  <Tooltip 
                     content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)] mb-1">{label}</p>
                            <p className="text-sm font-bold text-[var(--text-main)]">{payload[0].value} New Tenants</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--primary)" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#growthGradient)"
                    dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "white" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="border-[var(--border)] bg-[var(--card)] shadow-lg overflow-hidden">
                <CardHeader className="bg-[var(--bg-secondary)]/30 border-b border-[var(--border)]">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Database size={16} className="text-success" />
                    Infrastructure Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {[
                    { label: "PostgreSQL Cluster", status: "Online", health: 99.9 },
                    { label: "Redis Cache (Queue)", status: "Online", health: 98.4 },
                    { label: "S3 Storage", status: "Online", health: 100 },
                  ].map((sys, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-soft)]">{sys.label}</span>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-success uppercase">{sys.status}</span>
                         <div className="w-16 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                            <div className="h-full bg-success" style={{ width: `${sys.health}%` }} />
                         </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
             </Card>

             <Card className="border-[var(--border)] bg-[var(--card)] shadow-lg overflow-hidden">
                <CardHeader className="bg-[var(--bg-secondary)]/30 border-b border-[var(--border)]">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-primary">Threat Detection</span>
                      <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-[8px] font-black uppercase">Low Risk</span>
                    </div>
                    <p className="text-[10px] text-[var(--text-soft)] leading-tight">Last audit performed 12 hours ago. No anomalies detected in tenant isolation layers.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-[var(--text-soft)]" />
                      <span className="text-xs font-medium">SSL / Encryption</span>
                    </div>
                    <span className="text-[10px] font-bold text-success uppercase">Active (TLS 1.3)</span>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-[var(--border)]">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" />
                  Tenant Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[
                    { label: "Retail Stores", count: 245, color: "bg-primary" },
                    { label: "Pharmacy / Med", count: 98, color: "bg-success" },
                    { label: "Auto Parts", count: 64, color: "bg-info" },
                    { label: "Wholesale", count: 45, color: "bg-warning" },
                  ].map((dist, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span>{dist.label}</span>
                        <span className="text-[var(--text-soft)]">{dist.count}</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", dist.color)} style={{ width: `${(dist.count / 452) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-primary/20 backdrop-blur-md">
                    <Activity size={18} className="text-primary" />
                  </span>
                  Scale Strategy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  System utilization is at 14%. Current infrastructure can support up to 5,000 active tenants before regional expansion.
                </p>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 transition-all hover:bg-white/10">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expansion Score</span>
                      <span className="text-lg font-black text-white">8.4 / 10</span>
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin-slow flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary" />
                   </div>
                </div>
                <button className="w-full h-11 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-primary/20">
                   Launch Regional Node
                </button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
