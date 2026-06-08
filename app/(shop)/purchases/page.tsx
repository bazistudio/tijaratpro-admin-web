"use client"

import * as React from "react"
import { 
  ShoppingBag, 
  CreditCard, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Truck,
  Package,
  Calendar,
  ChevronRight,
  FileText,
  History,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CheckCircle2,
  AlertCircle
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
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const PURCHASE_STATS = [
  { title: "Monthly Purchases", value: "Rs 2.8M", trend: { value: 8, label: "vs last month" }, icon: ShoppingBag, color: "primary" },
  { title: "Active Expenses", value: "Rs 450k", trend: { value: 12, label: "Operating costs" }, icon: Wallet, color: "warning" },
  { title: "Pending Bills", value: "12 Invoices", trend: { value: -5, label: "Due to suppliers" }, icon: Clock, color: "danger" },
  { title: "Recent Orders", value: "24", trend: { value: 15, label: "Incoming stock" }, icon: Package, color: "success" },
]

const PURCHASES = [
  { 
    id: "PUR-2024-001", 
    supplier: "Kamran Shah", 
    items: 15, 
    cost: "Rs 125,000", 
    paymentStatus: "Paid", 
    deliveryStatus: "Delivered", 
    date: "2024-05-13" 
  },
  { 
    id: "PUR-2024-002", 
    supplier: "Rizwan Ahmed", 
    items: 45, 
    cost: "Rs 850,000", 
    paymentStatus: "Partial", 
    deliveryStatus: "In Transit", 
    date: "2024-05-12" 
  },
  { 
    id: "PUR-2024-003", 
    supplier: "Faisal Qureshi", 
    items: 8, 
    cost: "Rs 350,000", 
    paymentStatus: "Unpaid", 
    deliveryStatus: "Processing", 
    date: "2024-05-11" 
  },
  { 
    id: "PUR-2024-004", 
    supplier: "Adnan Malik", 
    items: 120, 
    cost: "Rs 45,000", 
    paymentStatus: "Paid", 
    deliveryStatus: "Delivered", 
    date: "2024-05-10" 
  },
  { 
    id: "PUR-2024-005", 
    supplier: "Shahzad Iqbal", 
    items: 25, 
    cost: "Rs 12,400", 
    paymentStatus: "Paid", 
    deliveryStatus: "Delivered", 
    date: "2024-05-09" 
  },
]

const TRENDS_DATA = [
  { name: "Mon", amount: 450000 },
  { name: "Tue", amount: 600000 },
  { name: "Wed", amount: 300000 },
  { name: "Thu", amount: 850000 },
  { name: "Fri", amount: 125000 },
]

const SPEND_BREAKDOWN = [
  { name: "Shenzhen Mobile", value: 1200000 },
  { name: "HK Display", value: 850000 },
  { name: "Galaxy Electronics", value: 450000 },
  { name: "Prime Battery", value: 300000 },
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

export default function PurchasesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Inventory Procurement
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Purchase Ledger • Incoming Assets Tracking
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Download size={16} />
            Export Ledger
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Procurement Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {PURCHASE_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Purchase Table */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search + Filter Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search ID or supplier..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Date range..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </Card>

          {/* Purchases Table */}
          <SectionCard 
            title="Incoming Stock Log" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">ID / Date</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Supplier</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Items</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Total Cost</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Payment</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Delivery</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PURCHASES.map((purchase) => (
                    <TableRow key={purchase.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-xs text-[var(--text-main)] uppercase tracking-tighter">{purchase.id}</span>
                          <span className="text-[10px] text-[var(--text-soft)] font-bold">{purchase.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-sm text-[var(--text-main)]">{purchase.supplier}</TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-soft)]">{purchase.items} Units</TableCell>
                      <TableCell className="font-black text-sm text-primary">{purchase.cost}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": purchase.paymentStatus === "Paid",
                          "bg-warning/10 text-warning border-warning/20": purchase.paymentStatus === "Partial",
                          "bg-danger/10 text-danger border-danger/20": purchase.paymentStatus === "Unpaid",
                        })}>
                          {purchase.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                           <div className={cn("w-1.5 h-1.5 rounded-full", {
                             "bg-success": purchase.deliveryStatus === "Delivered",
                             "bg-info animate-pulse": purchase.deliveryStatus === "In Transit",
                             "bg-warning": purchase.deliveryStatus === "Processing",
                           })} />
                           <span className="text-xs font-bold text-[var(--text-soft)]">{purchase.deliveryStatus}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/5 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Order Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <FileText size={14} className="text-primary" />
                              <span className="font-bold text-sm">View Invoice</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <Truck size={14} className="text-info" />
                              <span className="font-bold text-sm">Track shipment</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer text-danger focus:text-danger">
                              <AlertCircle size={14} />
                              <span className="font-bold text-sm">Cancel Order</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

        </div>

        {/* Right: Analytics Widgets */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Purchase Trends Chart */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <BarChart3 size={16} className="text-primary" />
                Procurement Velocity
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TRENDS_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="procGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                            <p className="text-sm font-bold text-[var(--text-main)]">Rs {(payload[0].value as number).toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#procGradient)" dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "white" }} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase text-[var(--text-soft)]">Weekly Spend</p>
                <div className="flex items-center gap-1 text-success font-black text-xs">
                   <ArrowUpRight size={14} /> +12.5%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Spend Breakdown */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/30">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <TrendingUp size={16} className="text-success" />
                Supplier Spend Share
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {SPEND_BREAKDOWN.map((item, i) => (
                  <div key={i} className="p-4 space-y-2 hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[var(--text-main)]">{item.name}</span>
                      <span className="font-black text-primary">Rs {(item.value/1000).toLocaleString()}k</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${(item.value / 1200000) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--bg-secondary)]/10">
                <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5">
                  View Full Distribution
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights Card */}
          <Card className="bg-gradient-to-br from-info to-info-dark text-white p-6 rounded-3xl shadow-xl shadow-info/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Efficiency</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Order Batching Suggested</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                You have 4 small orders pending for "Galaxy Electronics". Consolidating them could reduce tax overhead by 8%.
              </p>
              <Button variant="secondary" className="w-full bg-white text-info font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Consolidate Orders
              </Button>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
          </Card>

        </div>
      </div>
    </div>
  )
}
