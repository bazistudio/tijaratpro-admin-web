"use client"

import * as React from "react"
import { 
  Package, 
  TrendingUp, 
  Users, 
  Wallet, 
  AlertCircle, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  FileText,
  PieChart,
  Activity,
  ChevronRight,
  Zap,
  Boxes,
  Truck
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { useDashboardStore } from "@/store/dashboard.store"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn, formatCurrency, formatRelative } from "@/lib/utils"

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  description, 
  color = "primary",
  loading = false
}: {
  title: string;
  value: string | number;
  trend?: { value: number; label: string };
  icon: any;
  description?: string;
  color?: "primary" | "success" | "danger" | "info" | "warning";
  loading?: boolean;
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
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 bg-[var(--bg-secondary)] animate-pulse rounded-lg" />
            <div className="h-4 w-32 bg-[var(--bg-secondary)] animate-pulse rounded-md" />
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardContent>
      {/* Decorative Background Element */}
      <div className={cn(
        "absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity",
        color === "primary" ? "text-primary" : 
        color === "success" ? "text-success" : 
        color === "danger" ? "text-danger" : 
        color === "info" ? "text-info" : "text-warning"
      )}>
        <Icon size={96} />
      </div>
    </Card>
  );
};

const QuickAction = ({ label, icon: Icon, href, color = "primary" }: { label: string, icon: any, href: string, color?: string }) => (
  <Link href={href} className="group">
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-primary/50 hover:bg-primary/5 transition-all hover:shadow-lg">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm", {
        "bg-primary/10 text-primary": color === "primary",
        "bg-success/10 text-success": color === "success",
        "bg-info/10 text-info": color === "info",
        "bg-warning/10 text-warning": color === "warning",
      })}>
        <Icon size={22} />
      </div>
      <span className="text-xs font-bold text-[var(--text-main)] group-hover:text-primary transition-colors">{label}</span>
    </div>
  </Link>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { stats, salesChart, topProducts, recentActivities, fetchDashboardData, isLoading } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const isNewBusiness = !isLoading && stats?.totalOrders === 0

  if (isNewBusiness) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-700">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-[var(--card)] p-8 rounded-[32px] border border-[var(--border)] shadow-2xl">
            <Boxes size={64} className="text-primary animate-bounce" />
          </div>
        </div>
        <h2 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
          Initiate Business Engine
        </h2>
        <p className="text-[var(--text-soft)] max-w-lg mt-4 text-center text-lg leading-relaxed font-medium">
          Your command center is online and optimized. We're just waiting for your first stream of data to start the intelligence analysis.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button asChild size="lg" className="h-14 px-8 text-base font-bold rounded-2xl shadow-xl shadow-primary/20">
            <Link href="/orders/new" className="flex items-center gap-2">
              <Plus size={20} />
              Create First Order
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-base font-bold rounded-2xl border-[var(--border)] bg-white/50 backdrop-blur-sm">
            <Link href="/settings/import" className="flex items-center gap-2 text-[var(--text-main)]">
              <Truck size={20} className="text-primary" />
              Migrate Data (Excel)
            </Link>
          </Button>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { title: "Inventory Ready", desc: "Add products to start tracking real-time stock levels.", icon: Package },
            { title: "CRM Optimized", desc: "Register your customers to analyze buying patterns.", icon: Users },
            { title: "Financial Ledger", desc: "Automate your profit and expense tracking.", icon: Wallet },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm text-center">
              <item.icon size={24} className="mx-auto mb-3 text-primary/60" />
              <h4 className="text-sm font-bold text-[var(--text-main)] mb-1">{item.title}</h4>
              <p className="text-xs text-[var(--text-soft)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header with quick status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Executive Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Live Intelligence Stream • {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <FileText size={16} />
            Generate Report
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Quick Entry
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Daily Revenue" 
          value={formatCurrency(stats?.todayRevenue || 0)}
          trend={{ value: stats?.revenueGrowth || 0, label: "vs yesterday" }}
          icon={Wallet}
          color="primary"
          loading={isLoading}
        />
        <StatCard 
          title="Monthly Profit" 
          value={formatCurrency(stats?.monthlyProfit || 0)}
          description="Net Surplus this month"
          icon={TrendingUp}
          color="success"
          loading={isLoading}
        />
        <StatCard 
          title="Stock Alerts" 
          value={`${stats?.lowStockCount || 0} Items`}
          trend={stats?.lowStockCount && stats.lowStockCount > 0 ? { value: -12, label: "Needs Restock" } : undefined}
          icon={Package}
          color={stats?.lowStockCount && stats.lowStockCount > 0 ? "danger" : "success"}
          description={stats?.lowStockCount && stats.lowStockCount > 0 ? "Critical Inventory" : "Healthy Levels"}
          loading={isLoading}
        />
        <StatCard 
          title="Active Customers" 
          value={stats?.totalCustomers?.toLocaleString() || "0"}
          description="Total business partners"
          icon={Users}
          color="info"
          loading={isLoading}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <QuickAction label="New Order" icon={ShoppingCart} href="/orders/new" color="primary" />
        <QuickAction label="Add Product" icon={Plus} href="/products/new" color="success" />
        <QuickAction label="New Expense" icon={Wallet} href="/expenses/new" color="danger" />
        <QuickAction label="Register Party" icon={Users} href="/customers/new" color="info" />
        <QuickAction label="Analytics" icon={PieChart} href="/reports" color="warning" />
        <QuickAction label="Inventory" icon={Boxes} href="/stock" color="primary" />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Charts */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Sales Trends */}
          <SectionCard 
            title="Sales Velocity Index" 
            action={
              <div className="flex items-center gap-1 bg-[var(--bg-secondary)] p-1 rounded-lg">
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-2 rounded-md bg-white shadow-sm">WEEK</Button>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold px-2 rounded-md">MONTH</Button>
              </div>
            }
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="h-[350px] p-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChart} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-soft)" 
                  fontSize={10} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--text-soft)" 
                  fontSize={10} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `Rs ${value/1000}k`} 
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)] mb-1">{label}</p>
                          <p className="text-sm font-bold text-[var(--text-main)]">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--primary)" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#salesGradient)"
                  animationDuration={2000}
                  dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 6, fill: "var(--primary)", strokeWidth: 2, stroke: "white", className: "shadow-lg" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          {/* Top Products */}
          <SectionCard 
            title="Revenue Contribution by Product" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="h-[300px] p-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" strokeOpacity={0.5} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="var(--text-main)" 
                  fontSize={11} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                   cursor={{fill: 'var(--bg-secondary)', radius: 8}}
                   content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                          <p className="text-sm font-bold text-[var(--text-main)]">{formatCurrency(payload[0].value as number)} Profit</p>
                          <p className="text-[10px] font-bold text-success uppercase mt-1">ROI Optimized</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="profit" radius={[0, 8, 8, 0]} barSize={20}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : 'var(--primary-light)'} fillOpacity={1 - (index * 0.15)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

        </div>

        {/* Right Column: Activities */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Recent Activities */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                  <Activity size={16} className="text-primary" />
                  Live Activity
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentActivities.length === 0 ? (
                <div className="p-10 text-center">
                  <Activity size={32} className="mx-auto text-[var(--text-soft)] opacity-20 mb-3" />
                  <p className="text-xs text-[var(--text-soft)] font-medium">No recent logs</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="p-5 flex gap-4 hover:bg-[var(--bg-secondary)]/50 transition-colors group">
                      <div className={cn("w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm", {
                        "bg-primary/10 text-primary": act.type === 'order',
                        "bg-danger/10 text-danger": act.type === 'stock',
                        "bg-info/10 text-info": act.type === 'customer',
                        "bg-warning/10 text-warning": act.type === 'expense',
                      })}>
                        {act.type === 'order' && <ShoppingCart size={16} />}
                        {act.type === 'stock' && <Boxes size={16} />}
                        {act.type === 'customer' && <Users size={16} />}
                        {act.type === 'expense' && <Wallet size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-[var(--text-main)] truncate">{act.title}</h4>
                          <span className="text-[10px] font-bold text-[var(--text-soft)] whitespace-nowrap">
                            {formatRelative(act.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)] line-clamp-1">{act.description}</p>
                        {act.status && (
                          <div className="mt-2">
                            <span className={cn("text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md", {
                              "bg-warning/10 text-warning": act.status === 'pending' || act.status === 'warning',
                              "bg-success/10 text-success": act.status === 'completed',
                            })}>
                              {act.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center">
                         <ChevronRight size={14} className="text-[var(--text-soft)]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Insights Card */}
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-3xl shadow-xl shadow-primary/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Zap size={20} className="text-white fill-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Growth Engine</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Insights Ready</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                Our analysis shows that "iPhone 13 Pro Max Screen" has 40% higher ROI than other products. Increase stock for the upcoming week.
              </p>
              <Button variant="secondary" className="w-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Check Inventory Strategy
              </Button>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl group-hover:scale-125 transition-transform duration-1000" />
          </Card>

        </div>
      </div>
    </div>
  )
}
