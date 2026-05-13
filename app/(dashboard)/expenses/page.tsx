"use client"

import * as React from "react"
import { 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  FileText, 
  Clock, 
  AlertCircle,
  Plus,
  MoreVertical,
  TrendingDown,
  Receipt,
  Building2,
  Calendar,
  Filter,
  Search,
  Truck,
  Lightbulb,
  Home,
  Users,
  Image as ImageIcon,
  Paperclip
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const EXPENSE_STATS = [
  { title: "Total Expenses", value: "Rs 840k", sub: "Oct 2024", icon: TrendingDown, color: "danger" },
  { title: "Rent & Utilities", value: "Rs 120k", sub: "Hall Road Store", icon: Home, color: "info" },
  { title: "Staff Salaries", value: "Rs 450k", sub: "12 Employees", icon: Users, color: "primary" },
  { title: "Logistics", value: "Rs 65k", sub: "Import & Courier", icon: Truck, color: "warning" },
]

const EXPENSE_LEDGER = [
  { id: "EXP-001", category: "Rent", item: "October Store Rent", amount: "Rs 95,000", date: "Oct 01, 2024", status: "Paid", method: "Check" },
  { id: "EXP-002", category: "Utilities", item: "Electricity Bill (LESCO)", amount: "Rs 24,500", date: "Oct 05, 2024", status: "Paid", method: "Cash" },
  { id: "EXP-003", category: "Salaries", item: "Staff Monthly Payout", amount: "Rs 450,000", date: "Oct 10, 2024", status: "Paid", method: "Bank Transfer" },
  { id: "EXP-004", category: "Logistics", item: "DHL Import Tax - Screens", amount: "Rs 42,000", date: "Oct 12, 2024", status: "Paid", method: "Online" },
  { id: "EXP-005", category: "Marketing", item: "Facebook Ads Campaign", amount: "Rs 15,000", date: "Oct 14, 2024", status: "Pending", method: "Credit Card" },
  { id: "EXP-006", category: "Supplies", item: "Packaging Boxes & Tape", amount: "Rs 8,400", date: "Oct 15, 2024", status: "Paid", method: "Cash" },
]

const CATEGORY_DATA = [
  { name: "Salaries", value: 450000, color: "var(--primary)" },
  { name: "Rent", value: 95000, color: "var(--info)" },
  { name: "Logistics", value: 65000, color: "var(--warning)" },
  { name: "Utilities", value: 24500, color: "var(--success)" },
  { name: "Others", value: 35000, color: "var(--danger)" },
]

const BUDGET_DATA = [
  { name: "Salaries", budget: 500000, actual: 450000 },
  { name: "Rent", budget: 100000, actual: 95000 },
  { name: "Logistics", budget: 80000, actual: 65000 },
  { name: "Utilities", budget: 30000, actual: 24500 },
  { name: "Marketing", budget: 20000, actual: 15000 },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    danger: "text-danger bg-danger/10 border-danger/20",
    info: "text-info bg-info/10 border-info/20",
    primary: "text-primary bg-primary/10 border-primary/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  }

  return (
    <Card className="glass-card border-[var(--border)] group hover:shadow-xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-[var(--border)]">Expense Pulse</Badge>
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">{title}</p>
             <h3 className="text-2xl font-black text-[var(--text-main)] font-heading">{value}</h3>
             <p className="text-[11px] font-bold text-[var(--text-soft)]">{sub}</p>
          </div>
       </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExpensesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Operational Outflow
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Expense Tracking • Budget Auditing • Cost Control
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-xl font-bold gap-2 border-[var(--border)] bg-white/50">
             <Download size={16} />
             Financial Audit
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
             <Plus size={16} />
             Record New Expense
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {EXPENSE_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Category Breakdown (Pie) */}
        <div className="lg:col-span-4">
           <SectionCard 
            title="Cost Distribution" 
            description="Breakdown of business costs by category."
            className="border border-[var(--border)] h-[450px]"
            contentClassName="h-full p-0"
          >
            <div className="h-[250px] w-full mt-4">
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
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="px-8 pb-8 space-y-3">
              {CATEGORY_DATA.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase text-[var(--text-soft)]">{item.name}</span>
                   </div>
                   <span className="text-xs font-black text-[var(--text-main)]">Rs {(item.value/1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Budget Utilization (Bar) */}
        <div className="lg:col-span-8">
          <SectionCard 
            title="Budget Utilization Analysis" 
            description="Comparing actual spending against set departmental budgets."
            className="border border-[var(--border)] h-[450px]"
            contentClassName="h-full p-6"
          >
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={BUDGET_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="var(--text-soft)" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="budget" fill="var(--bg-secondary)" radius={[6, 6, 0, 0]} barSize={40} name="Budget Limit" />
                <Bar dataKey="actual" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} name="Actual Spent" />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

      </div>

      {/* Expense Ledger */}
      <SectionCard 
        title="Transaction Ledger" 
        description="Detailed record of all business outflows for the current month."
        className="border border-[var(--border)] shadow-xl"
        contentClassName="p-0"
      >
        <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
              <Input placeholder="Search expenses by item, category or method..." className="pl-10 h-10 rounded-xl bg-white/50" />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Calendar size={16} />
                 Oct 2024
              </Button>
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Filter size={16} />
                 All Categories
              </Button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Expense ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Category</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Description</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Date</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Amount</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EXPENSE_LEDGER.map((exp) => (
                <TableRow key={exp.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <TableCell className="font-bold text-sm text-[var(--text-main)]">{exp.id}</TableCell>
                  <TableCell>
                     <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-[9px] font-black uppercase rounded-lg border-none">{exp.category}</Badge>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-[var(--text-main)]">{exp.item}</TableCell>
                  <TableCell className="text-xs font-medium text-[var(--text-soft)]">{exp.date}</TableCell>
                  <TableCell className="font-black text-sm text-danger">{exp.amount}</TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                      "bg-success/10 text-success border-success/20": exp.status === "Paid",
                      "bg-warning/10 text-warning border-warning/20": exp.status === "Pending",
                    })}>
                      {exp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                           <Paperclip size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><FileText size={14} className="text-info" /> View Receipt</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><TrendingDown size={14} className="text-warning" /> Edit Record</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 font-bold text-sm text-danger"><AlertCircle size={14} /> Delete Entry</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      {/* Intelligence Insight */}
      <Card className="bg-slate-900 text-white rounded-[32px] p-8 relative overflow-hidden border-none shadow-2xl group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 rounded-3xl bg-primary/20 backdrop-blur-xl border border-primary/30 group-hover:scale-110 transition-transform">
               <Lightbulb size={32} className="text-primary" />
            </div>
            <div className="flex-1 space-y-2">
               <h3 className="text-2xl font-black font-heading tracking-tight">Optimization Alert</h3>
               <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-2xl">
                 "Logistics costs are **18% lower** than last month due to bulk shipment batching. However, Utility costs have spiked by Rs 5,000. Recommend auditing Hall Road store HVAC systems during off-peak hours."
               </p>
            </div>
            <Button variant="primary" className="h-11 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
               View Full Audit
            </Button>
         </div>
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
      </Card>

    </div>
  )
}
