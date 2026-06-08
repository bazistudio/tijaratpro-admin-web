"use client"

import * as React from "react"
import { 
  Store, 
  MapPin, 
  Wallet, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  ChevronRight, 
  Activity, 
  ClipboardList, 
  ArrowUpRight,
  User,
  Phone,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
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

const SHOPS_STATS = [
  { title: "Total Shops", value: "8", sub: "Active across Punjab", icon: Store, color: "primary" },
  { title: "Total Balance", value: "Rs 4.2M", sub: "Receivable from branches", icon: Wallet, color: "success" },
  { title: "Orders Today", value: "124", sub: "Consolidated volume", icon: ClipboardList, color: "info" },
  { title: "Average Margin", value: "18.5%", sub: "+2% from last month", icon: TrendingUp, color: "warning" },
]

const SHOPS_LIST = [
  { id: "SHP-001", name: "Hall Road Flagship", manager: "Muhammad Ali", balance: "Rs 1,250,000", status: "Active", location: "Lahore", lastOrder: "2 mins ago" },
  { id: "SHP-002", name: "Karachi Mobile Market", manager: "Zeeshan Ahmed", balance: "Rs 840,000", status: "Active", location: "Karachi", lastOrder: "15 mins ago" },
  { id: "SHP-003", name: "Faisalabad Tech Hub", manager: "Usman Raza", balance: "Rs 420,000", status: "Warning", location: "Faisalabad", lastOrder: "1 hour ago" },
  { id: "SHP-004", name: "Rawalpindi Center", manager: "Hamza Malik", balance: "Rs 95,000", status: "Active", location: "Rawalpindi", lastOrder: "3 hours ago" },
  { id: "SHP-005", name: "Gujranwala Electronics", manager: "Bilal Khan", balance: "Rs 560,000", status: "Inactive", location: "Gujranwala", lastOrder: "2 days ago" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  }

  return (
    <Card className="glass-card border-[var(--border)] group hover:shadow-xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-[var(--border)]">Shop Intel</Badge>
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

export default function ShopsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Network Management
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Branch Tracking • Balance Ledgers • Operational Status
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-xl font-bold gap-2 border-[var(--border)] bg-white/50">
             <Activity size={16} />
             Network Health
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
             <Plus size={16} />
             Register New Shop
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {SHOPS_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Shops Ledger */}
      <SectionCard 
        title="Active Branch Registry" 
        description="Monitor performance, outstanding balances, and real-time activity across your entire shop network."
        className="border border-[var(--border)] shadow-xl"
        contentClassName="p-0"
      >
        <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
              <Input placeholder="Search shops by name, manager or city..." className="pl-10 h-10 rounded-xl bg-white/50" />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Filter size={16} />
                 Filter Status
              </Button>
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <MapPin size={16} />
                 Regions
              </Button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Shop Name</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Manager</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Balance</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Activity</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SHOPS_LIST.map((shop) => (
                <TableRow key={shop.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <TableCell className="font-bold text-sm text-[var(--text-main)]">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                           <Store size={18} />
                        </div>
                        <div>
                           <p className="font-black text-sm">{shop.name}</p>
                           <p className="text-[10px] font-bold text-[var(--text-soft)] flex items-center gap-1 uppercase">
                              <MapPin size={10} /> {shop.location}
                           </p>
                        </div>
                     </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <User size={14} className="text-[var(--text-soft)]" />
                        <span className="text-xs font-bold text-[var(--text-main)]">{shop.manager}</span>
                     </div>
                  </TableCell>
                  <TableCell className="font-black text-sm text-[var(--text-main)]">{shop.balance}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Clock size={14} className="text-info" />
                        <span className="text-xs font-medium text-[var(--text-soft)]">{shop.lastOrder}</span>
                     </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                      "bg-success/10 text-success border-success/20": shop.status === "Active",
                      "bg-warning/10 text-warning border-warning/20": shop.status === "Warning",
                      "bg-slate-100 text-slate-400 border-slate-200": shop.status === "Inactive",
                    })}>
                      {shop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                           <Plus size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Shop Operations</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><Wallet size={14} className="text-success" /> Settle Balance</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><ClipboardList size={14} className="text-info" /> Order History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><ShieldCheck size={14} className="text-primary" /> Edit Permissions</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm text-danger"><AlertCircle size={14} /> Deactivate Shop</DropdownMenuItem>
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

      {/* Quick Insights */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
         <Card className="bg-slate-900 text-white rounded-[32px] p-6 relative overflow-hidden border-none shadow-2xl group">
            <div className="relative z-10 space-y-4">
               <div className="p-3 rounded-2xl bg-white/10 w-fit">
                  <Activity size={24} className="text-primary" />
               </div>
               <h4 className="text-lg font-black font-heading">High Velocity Branch</h4>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  "Hall Road Flagship has processed 42 orders in the last 2 hours. Stock levels for iPhone Screens are critical."
               </p>
               <Button variant="link" className="text-primary p-0 h-auto text-[10px] font-black uppercase tracking-widest">Stock Alert Details</Button>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
         </Card>

         <Card className="bg-indigo-900 text-white rounded-[32px] p-6 relative overflow-hidden border-none shadow-2xl group">
            <div className="relative z-10 space-y-4">
               <div className="p-3 rounded-2xl bg-white/10 w-fit">
                  <Smartphone size={24} className="text-indigo-400" />
               </div>
               <h4 className="text-lg font-black font-heading">New Expansion Opportunity</h4>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  "Multi-shop data suggests a high demand in Multan sector. Current partners are fulfilling 12% of total volume."
               </p>
               <Button variant="link" className="text-indigo-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest">Market Research</Button>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
         </Card>

         <Card className="bg-emerald-900 text-white rounded-[32px] p-6 relative overflow-hidden border-none shadow-2xl group">
            <div className="relative z-10 space-y-4">
               <div className="p-3 rounded-2xl bg-white/10 w-fit">
                  <CheckCircle2 size={24} className="text-emerald-400" />
               </div>
               <h4 className="text-lg font-black font-heading">Credit Limit Compliance</h4>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  "All Karachi branches have successfully settled their outstanding credit for Q3. Ready for next inventory push."
               </p>
               <Button variant="link" className="text-emerald-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest">View Settlements</Button>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all" />
         </Card>
      </div>

    </div>
  )
}
