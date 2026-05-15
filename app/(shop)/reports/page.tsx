"use client"

import * as React from "react"
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Calendar, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Target,
  Zap,
  Activity,
  Package,
  Users,
  Wallet,
  Percent,
  FileText
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, ComposedChart, Line
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const SALES_REVENUE_DATA = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 2000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 },
]

const MARGIN_EXPENSE_DATA = [
  { name: "Week 1", margin: 45, expense: 20 },
  { name: "Week 2", margin: 52, expense: 25 },
  { name: "Week 3", margin: 48, expense: 22 },
  { name: "Week 4", margin: 61, expense: 18 },
]

const CATEGORY_DATA = [
  { name: "Screens", value: 45, color: "var(--primary)" },
  { name: "Batteries", value: 25, color: "var(--info)" },
  { name: "Accessories", value: 20, color: "var(--success)" },
  { name: "ICs/Spares", value: 10, color: "var(--warning)" },
]

const BEST_SELLERS = [
  { name: "iPhone 13 Pro Max Screen", units: 450, revenue: "Rs 8.1M", growth: "+12%" },
  { name: "Samsung S22 Ultra Battery", units: 320, revenue: "Rs 2.4M", growth: "+8%" },
  { name: "iPhone 15 Tempered Glass", units: 1200, revenue: "Rs 960k", growth: "+25%" },
]

const WORST_SELLERS = [
  { name: "Nokia 3310 Housing", units: 2, loss: "Rs 1,500", status: "Dead Stock" },
  { name: "Old MicroUSB Cables", units: 5, loss: "Rs 500", status: "Clearing" },
  { name: "Pixel 4 Screen (Copy)", units: 1, loss: "Rs 12,000", status: "Return High" },
]

const CUSTOMER_SPENDING = [
  { name: "Muhammad Bilal", spent: "Rs 1.2M", frequency: "Weekly", type: "Wholesale" },
  { name: "Ali Raza", spent: "Rs 850k", frequency: "Bi-Weekly", type: "Retailer" },
  { name: "Zubair Khan", spent: "Rs 450k", frequency: "Monthly", type: "Wholesale" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    danger: "text-danger bg-danger/10 border-danger/20",
  }

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
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            trend.value >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {trend.value >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-[11px] font-medium text-[var(--text-soft)]">
            {trend.label}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Intelligence Center
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Business Performance • Multi-Layer Analysis
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border)]">
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase px-3 rounded-lg bg-white shadow-sm">Daily</Button>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase px-3 rounded-lg">Weekly</Button>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase px-3 rounded-lg">Monthly</Button>
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase px-3 rounded-lg"><Calendar size={14} /></Button>
          </div>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Download size={16} />
            Export Full BI Report
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Revenue Growth" value="+24.5%" trend={{ value: 12, label: "vs last month" }} icon={TrendingUp} color="success" />
        <StatCard title="Net Profit" value="Rs 1.8M" trend={{ value: 8, label: "Efficiency peak" }} icon={Wallet} color="primary" />
        <StatCard title="Avg Margin" value="38%" trend={{ value: 4, label: "ROI optimized" }} icon={Percent} color="info" />
        <StatCard title="Active Leads" value="124" trend={{ value: 15, label: "Conversion high" }} icon={Users} color="warning" />
      </div>

      {/* Big Charts Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        
        {/* Sales & Revenue Trends */}
        <SectionCard 
          title="Revenue vs Sales Trends" 
          description="Comparison of gross sales volume against net revenue inflow."
          className="border border-[var(--border)] shadow-xl"
          contentClassName="h-[400px] p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--info)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--info)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                        <p className="text-[10px] font-black uppercase text-[var(--text-soft)] mb-2">{payload[0].payload.name}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-primary">Sales: Rs {payload[0].value?.toLocaleString()}</p>
                          <p className="text-sm font-bold text-info">Revenue: Rs {payload[1].value?.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={4} fill="url(#salesGrad)" />
              <Area type="monotone" dataKey="revenue" stroke="var(--info)" strokeWidth={4} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Profit Margin vs Expense Analysis */}
        <SectionCard 
          title="Efficiency Index" 
          description="Tracking operational expenses against profit margins."
          className="border border-[var(--border)] shadow-xl"
          contentClassName="h-[400px] p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={MARGIN_EXPENSE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="expense" fill="var(--danger)" radius={[8, 8, 0, 0]} barSize={40} fillOpacity={0.6} />
              <Line type="monotone" dataKey="margin" stroke="var(--success)" strokeWidth={4} dot={{ r: 6, fill: "var(--success)", strokeWidth: 3, stroke: "white" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </SectionCard>

      </div>

      {/* Tables & Category Breakdown */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Top Performers Table */}
        <div className="lg:col-span-8 space-y-8">
          <SectionCard 
            title="Strategic Inventory Analysis" 
            className="border border-[var(--border)]"
            contentClassName="p-0"
          >
            <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)]">Best Performing Assets</h4>
              <Badge variant="outline" className="text-success border-success/20">High ROI</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[var(--border)] hover:bg-transparent">
                  <TableHead className="font-bold text-xs uppercase h-10">Product Name</TableHead>
                  <TableHead className="font-bold text-xs uppercase h-10 text-center">Volume</TableHead>
                  <TableHead className="font-bold text-xs uppercase h-10">Revenue</TableHead>
                  <TableHead className="font-bold text-xs uppercase h-10 text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BEST_SELLERS.map((item, i) => (
                  <TableRow key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <TableCell className="font-bold text-sm text-[var(--text-main)]">{item.name}</TableCell>
                    <TableCell className="text-center text-xs font-black text-[var(--text-soft)]">{item.units} Sold</TableCell>
                    <TableCell className="font-black text-sm text-primary">{item.revenue}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-[10px] font-black text-success flex items-center justify-end gap-1">
                        <ArrowUpRight size={12} /> {item.growth}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="p-4 border-y border-[var(--border)] bg-danger/5 flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-widest text-danger">Inventory At Risk (Worst Sellers)</h4>
              <Badge variant="outline" className="text-danger border-danger/20">Liquidate Suggested</Badge>
            </div>
            <Table>
              <TableBody>
                {WORST_SELLERS.map((item, i) => (
                  <TableRow key={i} className="border-b border-[var(--border)] hover:bg-danger/5 transition-colors">
                    <TableCell className="font-bold text-sm text-[var(--text-main)]">{item.name}</TableCell>
                    <TableCell className="text-center text-xs font-black text-[var(--text-soft)]">{item.units} Sold</TableCell>
                    <TableCell className="font-black text-sm text-danger">{item.loss}</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-danger/10 text-danger text-[9px] font-black uppercase border-none">{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </div>

        {/* Categories & Insights */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Category Share */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <PieChartIcon size={16} className="text-primary" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                        data={CATEGORY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {CATEGORY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-4 mt-6">
                 {CATEGORY_DATA.map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-[10px] font-black uppercase text-[var(--text-soft)]">{item.name}</span>
                     <span className="text-[10px] font-black text-[var(--text-main)] ml-auto">{item.value}%</span>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>

          {/* Customer Spending Leaderboard */}
          <SectionCard 
            title="Top Spenders" 
            className="border border-[var(--border)]"
            contentClassName="p-0"
          >
            <div className="divide-y divide-[var(--border)]">
              {CUSTOMER_SPENDING.map((cust, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/30 transition-colors">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-[var(--text-main)]">{cust.name}</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">{cust.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[var(--text-main)]">{cust.spent}</p>
                    <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase">{cust.frequency}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[var(--bg-secondary)]/10 text-center">
               <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-primary">View CRM Analytics</Button>
            </div>
          </SectionCard>

          {/* Intelligence Recommendation */}
          <Card className="bg-gradient-to-br from-info-dark to-info text-white p-6 rounded-3xl shadow-xl shadow-info/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Target size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">BI Intelligence</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Inventory Shift Alert</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                "Nokia 3310 Housing" and "MicroUSB Cables" are currently dragging your ROI down. We recommend a 50% discount clearance sale to free up Rs 150k in capital.
              </p>
              <Button variant="secondary" className="w-full bg-white text-info-dark font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Execute Clearance
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
          </Card>

        </div>
      </div>
    </div>
  )
}
