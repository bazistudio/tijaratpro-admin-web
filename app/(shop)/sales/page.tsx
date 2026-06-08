"use client"

import * as React from "react"
import { 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Wallet, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FileText,
  History,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const SALES_STATS = [
  { title: "Today Sales", value: "Rs 45,280", trend: { value: 12, label: "vs yesterday" }, icon: Wallet, color: "primary" },
  { title: "Weekly Sales", value: "Rs 284,900", trend: { value: 8, label: "vs last week" }, icon: TrendingUp, color: "success" },
  { title: "Net Revenue", value: "Rs 1,240,000", trend: { value: 5, label: "vs last month" }, icon: ShoppingCart, color: "info" },
  { title: "Pending Payments", value: "Rs 12,450", trend: { value: -2, label: "vs yesterday" }, icon: Clock, color: "warning" },
]

const RECENT_SALES = [
  { id: "INV-2024-001", customer: "Ahmed Khan", items: 4, amount: 4500, status: "Paid", method: "Cash", date: "2024-05-13 14:20" },
  { id: "INV-2024-002", customer: "Kamran Shah", items: 2, amount: 1200, status: "Partial", method: "Bank Transfer", date: "2024-05-13 13:45" },
  { id: "INV-2024-003", customer: "Zubair Ali", items: 12, amount: 15600, status: "Paid", method: "JazzCash", date: "2024-05-13 12:10" },
  { id: "INV-2024-004", customer: "Salman Farooq", items: 1, amount: 800, status: "Unpaid", method: "N/A", date: "2024-05-13 11:30" },
  { id: "INV-2024-005", customer: "Mohsin Raza", items: 6, amount: 7200, status: "Paid", method: "EasyPaisa", date: "2024-05-13 10:15" },
]

const BEST_SELLING = [
  { name: "iPhone 13 Pro Max Screen", sales: 145, revenue: 29000 },
  { name: "Samsung S22 Ultra Battery", sales: 89, revenue: 44500 },
  { name: "Type-C Charging Cable", sales: 210, revenue: 10500 },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
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

export default function SalesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Sales Management
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Commercial Operations • Real-time Monitoring
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <CreditCard size={16} />
            POS Billing
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Add Sale
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {SALES_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Filters & Table */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Filters Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search invoice..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Customer..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Date range..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Advanced Filters
              </Button>
            </div>
          </Card>

          {/* Sales Table */}
          <SectionCard 
            title="Recent Sales Transactions" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Invoice ID</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Customer</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-center">Items</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Total Amount</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Method</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Date</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_SALES.map((sale) => (
                    <TableRow key={sale.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      <TableCell className="font-bold text-sm text-primary">{sale.id}</TableCell>
                      <TableCell className="font-medium text-sm text-[var(--text-main)]">{sale.customer}</TableCell>
                      <TableCell className="text-center font-bold text-sm text-[var(--text-soft)]">{sale.items}</TableCell>
                      <TableCell className="font-black text-sm text-[var(--text-main)]">Rs {sale.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": sale.status === "Paid",
                          "bg-warning/10 text-warning border-warning/20": sale.status === "Partial",
                          "bg-danger/10 text-danger border-danger/20": sale.status === "Unpaid",
                        })}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-soft)]">{sale.method}</TableCell>
                      <TableCell className="text-xs font-medium text-[var(--text-soft)]">{sale.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/5 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Transaction Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <FileText size={14} className="text-primary" />
                              <span className="font-bold text-sm">View Invoice</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <History size={14} className="text-info" />
                              <span className="font-bold text-sm">Sale History</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer text-danger focus:text-danger">
                              <Plus size={14} className="rotate-45" />
                              <span className="font-bold text-sm">Refund/Cancel</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--bg-secondary)]/10">
              <span className="text-xs font-bold text-[var(--text-soft)]">Showing 5 of 1,240 entries</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold px-4">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold px-4">Next</Button>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right: Sidebar Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Best Selling Products */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <Star size={16} className="text-warning fill-warning" />
                Best Selling
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {BEST_SELLING.map((product, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[var(--text-main)]">{product.name}</p>
                      <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-tight">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-primary">Rs {product.revenue.toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-success uppercase">Top {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--bg-secondary)]/30 border-t border-[var(--border)]">
                <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5">
                  View Sales Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sales Timeline */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <History size={16} className="text-primary" />
                Sales Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pb-8">
              <div className="absolute left-[27px] top-4 bottom-8 w-0.5 bg-[var(--border)]" />
              <div className="space-y-6 relative">
                {[
                  { time: "14:20", msg: "Large order completed by Ahmed Khan", type: "success" },
                  { time: "13:45", msg: "Partial payment received from Saira Bibi", type: "warning" },
                  { time: "12:10", msg: "New invoice generated for Zubair Ali", type: "primary" },
                  { time: "11:30", msg: "Unpaid order alert for INV-2024-004", type: "danger" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={cn("w-3 h-3 rounded-full mt-1.5 shrink-0 z-10 border-2 border-white ring-4 shadow-sm", {
                      "bg-success ring-success/10": item.type === "success",
                      "bg-warning ring-warning/10": item.type === "warning",
                      "bg-primary ring-primary/10": item.type === "primary",
                      "bg-danger ring-danger/10": item.type === "danger",
                    })} />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-[var(--text-soft)] uppercase">{item.time}</p>
                      <p className="text-xs font-bold text-[var(--text-main)] group-hover:text-primary transition-colors leading-relaxed">{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 h-8 text-[10px] font-black uppercase text-[var(--text-soft)] hover:bg-[var(--bg-secondary)]">
                Load More History
              </Button>
            </CardContent>
          </Card>

          {/* Quick Support Card */}
          <Card className="bg-[var(--bg-secondary)] border-[var(--border)] p-6 rounded-3xl overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)] mb-2">Need help?</h4>
              <p className="text-sm font-bold text-[var(--text-main)] mb-4">Exporting reports for tax filing?</p>
              <Button variant="outline" className="w-full h-10 rounded-xl font-bold bg-white/50 border-[var(--border)] text-xs">
                Read Guide
              </Button>
            </div>
            <FileText size={80} className="absolute -right-4 -bottom-4 text-primary opacity-[0.05] group-hover:scale-110 transition-transform duration-500" />
          </Card>

        </div>
      </div>
    </div>
  )
}
