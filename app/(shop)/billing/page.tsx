"use client"

import * as React from "react"
import { 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Printer, 
  FileText, 
  Clock, 
  AlertCircle,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Receipt,
  ShieldCheck,
  Zap,
  Globe,
  Building2,
  Calendar,
  Filter,
  Search
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
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const BILLING_STATS = [
  { title: "Total Revenue", value: "Rs 12.4M", sub: "+12% this month", icon: TrendingUp, color: "success" },
  { title: "Pending Collections", value: "Rs 1.8M", sub: "24 Invoices", icon: Clock, color: "warning" },
  { title: "Overdue Amount", value: "Rs 450k", sub: "8 Invoices", icon: AlertCircle, color: "danger" },
  { title: "Tax (GST) Liability", value: "Rs 2.1M", sub: "Current Qtr", icon: Receipt, color: "info" },
]

const RECENT_INVOICES = [
  { id: "INV-2024-001", customer: "Muhammad Bilal", date: "Oct 12, 2024", amount: "Rs 85,000", status: "Paid", method: "Bank Transfer" },
  { id: "INV-2024-002", customer: "Ali Raza", date: "Oct 14, 2024", amount: "Rs 120,000", status: "Pending", method: "Cash" },
  { id: "INV-2024-003", customer: "Zubair Khan", date: "Oct 15, 2024", amount: "Rs 45,000", status: "Overdue", method: "Check" },
  { id: "INV-2024-004", customer: "Kamran Shah", date: "Oct 15, 2024", amount: "Rs 210,000", status: "Paid", method: "Bank Transfer" },
  { id: "INV-2024-005", customer: "Rizwan Ahmed", date: "Oct 16, 2024", amount: "Rs 15,500", status: "Partial", method: "Cash" },
]

const SUBSCRIPTION_INFO = {
  plan: "Enterprise Pro",
  price: "Rs 15,000 /mo",
  renewal: "Nov 24, 2024",
  usage: {
    invoices: 840,
    limit: 2000,
    staff: 12,
    staffLimit: 20
  }
}

const PAYMENT_METHODS = [
  { type: "Bank Account", label: "Meezan Bank - Corporate", ending: "8890", primary: true },
  { type: "Digital Wallet", label: "EasyPaisa Business", ending: "4567", primary: false },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    success: "text-success bg-success/10 border-success/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    danger: "text-danger bg-danger/10 border-danger/20",
    info: "text-info bg-info/10 border-info/20",
    primary: "text-primary bg-primary/10 border-primary/20",
  }

  return (
    <Card className="glass-card border-[var(--border)] group hover:shadow-xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-[var(--border)]">Live Insight</Badge>
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

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Financial Ledger
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Billing • Invoicing • Subscription Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-xl font-bold gap-2 border-[var(--border)] bg-white/50">
             <FileText size={16} />
             Tax Reports
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
             <Plus size={16} />
             Create New Invoice
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {BILLING_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Invoice Ledger */}
        <div className="lg:col-span-8 space-y-6">
           <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search invoice by ID, customer or status..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Filter Date
              </Button>
            </div>
          </Card>

          <SectionCard 
            title="Recent Billing Activity" 
            description="Track and manage outgoing invoices and incoming payments."
            className="border border-[var(--border)] shadow-xl"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Invoice ID</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Customer</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Date</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Amount</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_INVOICES.map((inv) => (
                    <TableRow key={inv.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                      <TableCell className="font-bold text-sm text-[var(--text-main)]">
                         <div className="flex items-center gap-2">
                            <Receipt size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            {inv.id}
                         </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-main)]">{inv.customer}</TableCell>
                      <TableCell className="text-xs font-medium text-[var(--text-soft)]">{inv.date}</TableCell>
                      <TableCell className="font-black text-sm text-[var(--text-main)]">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": inv.status === "Paid",
                          "bg-warning/10 text-warning border-warning/20": inv.status === "Pending" || inv.status === "Partial",
                          "bg-danger/10 text-danger border-danger/20": inv.status === "Overdue",
                        })}>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                               <Printer size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-info hover:bg-info/5">
                               <Download size={14} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-[var(--text-soft)]">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                                <DropdownMenuItem className="gap-2 font-bold text-sm"><CheckCircle2 size={14} className="text-success" /> Mark as Paid</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 font-bold text-sm"><FileText size={14} className="text-info" /> View Details</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 font-bold text-sm text-danger"><XCircle size={14} /> Void Invoice</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                         </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 bg-[var(--bg-secondary)]/10 text-center border-t border-[var(--border)]">
               <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-primary">Load More Transactions</Button>
            </div>
          </SectionCard>
        </div>

        {/* Right: Subscription & Methods */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Subscription Card */}
           <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-[32px] relative overflow-hidden group shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                       <Zap size={24} className="text-primary" />
                    </div>
                    <Badge className="bg-primary text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">Active</Badge>
                 </div>
                 <div className="space-y-1 mb-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Plan</p>
                    <h3 className="text-3xl font-black font-heading">{SUBSCRIPTION_INFO.plan}</h3>
                    <p className="text-sm font-bold text-slate-300">{SUBSCRIPTION_INFO.price}</p>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                    <div className="space-y-1.5">
                       <div className="flex justify-between text-[10px] font-black uppercase">
                          <span>Monthly Invoices</span>
                          <span>{SUBSCRIPTION_INFO.usage.invoices} / {SUBSCRIPTION_INFO.usage.limit}</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(SUBSCRIPTION_INFO.usage.invoices/SUBSCRIPTION_INFO.usage.limit)*100}%` }} />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <div className="flex justify-between text-[10px] font-black uppercase">
                          <span>Staff Seats</span>
                          <span>{SUBSCRIPTION_INFO.usage.staff} / {SUBSCRIPTION_INFO.usage.staffLimit}</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-success" style={{ width: `${(SUBSCRIPTION_INFO.usage.staff/SUBSCRIPTION_INFO.usage.staffLimit)*100}%` }} />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-3">
                    <Button className="flex-1 h-11 rounded-xl bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 shadow-xl">Upgrade Plan</Button>
                    <Button variant="ghost" className="h-11 rounded-xl text-white font-bold text-[10px] uppercase">Next Renewal: {SUBSCRIPTION_INFO.renewal}</Button>
                 </div>
              </div>
              {/* Background Art */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
           </Card>

           {/* Payment Methods */}
           <SectionCard title="Payment Channels" description="Manage your payout and receiving accounts.">
              <div className="space-y-4 mt-4">
                 {PAYMENT_METHODS.map((method, i) => (
                   <div key={i} className="p-4 rounded-2xl border border-[var(--border)] bg-white hover:border-primary/50 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-soft)] group-hover:text-primary transition-colors">
                            <CreditCard size={18} />
                         </div>
                         <div>
                            <p className="text-sm font-black text-[var(--text-main)]">{method.label}</p>
                            <p className="text-[10px] font-bold text-[var(--text-soft)]">Ending in •••• {method.ending}</p>
                         </div>
                      </div>
                      {method.primary ? <Badge className="bg-success/10 text-success uppercase text-[9px] font-black border-none">Primary</Badge> : <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--text-soft)]"><MoreVertical size={14} /></Button>}
                   </div>
                 ))}
                 <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 font-bold text-[var(--text-soft)] hover:text-primary hover:border-primary transition-all">
                    <Plus size={18} className="mr-2" /> Add Payment Method
                 </Button>
              </div>
           </SectionCard>

           {/* Tax Summary Widget */}
           <Card className="border-[var(--border)] bg-primary/5 p-6 rounded-[32px]">
              <div className="flex items-center gap-3 mb-4 text-primary">
                 <ShieldCheck size={20} />
                 <h4 className="font-black text-sm uppercase tracking-widest">Tax Compliance</h4>
              </div>
              <p className="text-xs font-medium text-[var(--text-soft)] leading-relaxed mb-6">
                 "Your Q3 GST filings are due in 12 days. You have Rs 2.1M in collected taxes ready for submission. Download the reconciled ledger to simplify the process."
              </p>
              <Button variant="primary" className="w-full h-10 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                 Download Q3 Ledger
              </Button>
           </Card>

        </div>
      </div>
    </div>
  )
}
