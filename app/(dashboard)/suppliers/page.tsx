"use client"

import * as React from "react"
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Phone,
  Building2,
  Package,
  Calendar,
  ChevronRight,
  FileText,
  History,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
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

const SUPPLIER_STATS = [
  { title: "Total Suppliers", value: "48", trend: { value: 2, label: "Onboarded" }, icon: Truck, color: "primary" },
  { title: "Active Partners", value: "32", trend: { value: 8, label: "Active orders" }, icon: CheckCircle2, color: "success" },
  { title: "Pending Payments", value: "Rs 1.2M", trend: { value: 15, label: "Due this week" }, icon: Clock, color: "danger" },
  { title: "Purchase Volume", value: "Rs 4.5M", trend: { value: 12, label: "Monthly spend" }, icon: BarChart3, color: "info" },
]

const SUPPLIERS = [
  { 
    id: "SUP-001", 
    name: "Kamran Shah", 
    contact: "0300-9876543", 
    company: "Shenzhen Mobile Tech", 
    products: "Display Panels, ICs", 
    balance: "Rs 450,000", 
    lastPurchase: "2024-05-10", 
    status: "Active" 
  },
  { 
    id: "SUP-002", 
    name: "Rizwan Ahmed", 
    contact: "0321-1122334", 
    company: "Galaxy Electronics Co.", 
    products: "Batteries, Charging Ports", 
    balance: "Rs 125,000", 
    lastPurchase: "2024-05-12", 
    status: "Pending Pay" 
  },
  { 
    id: "SUP-003", 
    name: "Faisal Qureshi", 
    contact: "0345-5566778", 
    company: "HK Display Solutions", 
    products: "iPhone Oled Screens", 
    balance: "Rs 0", 
    lastPurchase: "2024-05-08", 
    status: "Active" 
  },
  { 
    id: "SUP-004", 
    name: "Adnan Malik", 
    contact: "0312-9988776", 
    company: "Prime Battery Corp", 
    products: "Lithium-Ion Cells", 
    balance: "Rs 650,000", 
    lastPurchase: "2024-05-13", 
    status: "Critical Due" 
  },
  { 
    id: "SUP-005", 
    name: "Shahzad Iqbal", 
    contact: "0300-4455667", 
    company: "Global Spares Ltd", 
    products: "Cables, Cases, Glass", 
    balance: "Rs 0", 
    lastPurchase: "2024-05-05", 
    status: "Inactive" 
  },
]

const PERFORMANCE = [
  { name: "Shenzhen Mobile", rating: 98, delivery: "3 Days", quality: "Elite" },
  { name: "HK Display", rating: 95, delivery: "5 Days", quality: "Premium" },
  { name: "Galaxy Electronics", rating: 88, delivery: "7 Days", quality: "Standard" },
]

const OUTSTANDING = [
  { company: "Prime Battery Corp", amount: "Rs 650,000", due: "In 2 Days" },
  { company: "Shenzhen Mobile Tech", amount: "Rs 450,000", due: "In 5 Days" },
  { company: "Galaxy Electronics", amount: "Rs 125,000", due: "Overdue" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
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

export default function SuppliersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Supply Chain Management
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Global Procurement • Quality Verified Sources
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Download size={16} />
            Export Supplier List
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Add New Supplier
          </Button>
        </div>
      </div>

      {/* Supply Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPLIER_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Supplier Table */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Filter Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search by name, company or product..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Company..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </Card>

          {/* Suppliers Table */}
          <SectionCard 
            title="Procurement Partners" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Supplier / Company</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Contact</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Main Products</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Balance Due</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Last Purchase</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SUPPLIERS.map((supplier) => (
                    <TableRow key={supplier.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[var(--text-main)]">{supplier.name}</span>
                          <span className="text-[10px] font-black uppercase text-primary tracking-tighter">{supplier.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-main)]">{supplier.contact}</TableCell>
                      <TableCell className="text-xs font-medium text-[var(--text-soft)]">{supplier.products}</TableCell>
                      <TableCell>
                        <span className={cn("text-sm font-black", supplier.balance !== "Rs 0" ? "text-danger" : "text-[var(--text-soft)]")}>
                          {supplier.balance}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-soft)]">{supplier.lastPurchase}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": supplier.status === "Active",
                          "bg-warning/10 text-warning border-warning/20": supplier.status === "Pending Pay",
                          "bg-danger/10 text-danger border-danger/20": supplier.status === "Critical Due",
                          "bg-[var(--bg-secondary)] text-[var(--text-soft)] border-[var(--border)]": supplier.status === "Inactive",
                        })}>
                          {supplier.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/5 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Supplier Controls</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <Package size={14} className="text-primary" />
                              <span className="font-bold text-sm">Place New Order</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <History size={14} className="text-info" />
                              <span className="font-bold text-sm">Purchase History</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer text-danger focus:text-danger">
                              <Clock size={14} />
                              <span className="font-bold text-sm">Settle Balance</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer">
                              <FileText size={14} className="text-[var(--text-soft)]" />
                              <span className="font-bold text-sm">View Agreement</span>
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

        {/* Right: Side Widgets */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Outstanding Payments */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)] bg-danger/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-danger flex items-center gap-2">
                <AlertCircle size={16} />
                Payable Dues
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {OUTSTANDING.map((item, i) => (
                  <div key={i} className="p-4 hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-[var(--text-main)]">{item.company}</p>
                      <span className={cn("text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md", {
                        "bg-danger/10 text-danger": item.due === "Overdue",
                        "bg-warning/10 text-warning": item.due !== "Overdue",
                      })}>{item.due}</span>
                    </div>
                    <p className="text-lg font-black text-danger-dark">{item.amount}</p>
                    <Button variant="ghost" size="sm" className="w-full mt-2 h-8 text-[10px] font-black uppercase text-danger hover:bg-danger/5">
                      Pay Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Supplier Performance */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {PERFORMANCE.map((item, i) => (
                  <div key={i} className="p-4 space-y-3 hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-[var(--text-main)]">{item.name}</p>
                      <Badge variant="outline" className="text-[10px] font-black text-success border-success/20">{item.quality}</Badge>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-[var(--text-soft)] uppercase">
                        <span>Reliability Score</span>
                        <span>{item.rating}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success transition-all duration-1000" 
                          style={{ width: `${item.rating}%` }} 
                        />
                      </div>
                      <p className="text-[10px] text-[var(--text-soft)] font-medium">Avg Lead Time: {item.delivery}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logistics Insight Card */}
          <Card className="bg-gradient-to-br from-warning to-warning-dark text-white p-6 rounded-3xl shadow-xl shadow-warning/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Zap size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Supply Chain</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Freight Optimization</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                Consolidating orders from Shenzhen Mobile and HK Display could save 15% in shipping costs next month.
              </p>
              <Button variant="secondary" className="w-full bg-white text-warning-dark font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Optimize Freight
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
