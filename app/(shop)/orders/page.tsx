"use client"

import * as React from "react"
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Printer, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertCircle,
  Plus,
  Box,
  ChevronRight,
  History,
  Smartphone,
  MapPin,
  ClipboardList
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

const ORDER_STATS = [
  { title: "New Orders", value: "24", sub: "Awaiting approval", icon: Box, color: "primary" },
  { title: "In Fulfillment", value: "18", sub: "Being packed", icon: Clock, color: "warning" },
  { title: "Shipped Today", value: "42", sub: "En route to Hall Road", icon: Truck, color: "info" },
  { title: "Cancelled", value: "3", sub: "Stock unavailability", icon: XCircle, color: "danger" },
]

const ORDERS_LIST = [
  { id: "ORD-9921", customer: "Muhammad Bilal", items: 4, total: "Rs 85,000", status: "Processing", date: "Oct 15, 2024", region: "Lahore" },
  { id: "ORD-9922", customer: "Ali Raza", items: 12, total: "Rs 12,400", status: "Shipped", date: "Oct 15, 2024", region: "Karachi" },
  { id: "ORD-9923", customer: "Zubair Khan", items: 2, total: "Rs 45,000", status: "New", date: "Oct 16, 2024", region: "Faisalabad" },
  { id: "ORD-9924", customer: "Kamran Shah", items: 8, total: "Rs 210,000", status: "Delivered", date: "Oct 14, 2024", region: "Lahore" },
  { id: "ORD-9925", customer: "Rizwan Ahmed", items: 1, total: "Rs 1,500", status: "Cancelled", date: "Oct 16, 2024", region: "Islamabad" },
  { id: "ORD-9926", customer: "Hamza Malik", items: 5, total: "Rs 32,000", status: "Processing", date: "Oct 16, 2024", region: "Rawalpindi" },
]

const PIPELINE_STEPS = [
  { id: "new", label: "New", count: 24, color: "bg-slate-200" },
  { id: "verified", label: "Verified", count: 12, color: "bg-blue-100" },
  { id: "packing", label: "Packing", count: 8, color: "bg-amber-100" },
  { id: "shipped", label: "Shipped", count: 42, color: "bg-emerald-100" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    info: "text-info bg-info/10 border-info/20",
    danger: "text-danger bg-danger/10 border-danger/20",
  }

  return (
    <Card className="glass-card border-[var(--border)] group hover:shadow-xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-[var(--border)]">Real-time</Badge>
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

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Order Fulfillment
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Pipeline Management • Logistics • Inventory Outflow
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-xl font-bold gap-2 border-[var(--border)] bg-white/50">
             <History size={16} />
             Fulfillment Logs
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
             <Plus size={16} />
             Create Custom Order
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {ORDER_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Pipeline Visualizer */}
      <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm overflow-hidden rounded-[32px]">
         <CardContent className="p-1 px-1">
            <div className="flex flex-col md:flex-row items-stretch">
               {PIPELINE_STEPS.map((step, i) => (
                 <div key={step.id} className={cn(
                   "flex-1 p-6 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-[var(--border)] last:border-0 group hover:bg-white/50 transition-all",
                   i === 0 ? "rounded-l-[32px]" : "",
                   i === PIPELINE_STEPS.length - 1 ? "rounded-r-[32px]" : ""
                 )}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)] mb-1">{step.label}</p>
                    <h4 className="text-3xl font-black text-[var(--text-main)] font-heading">{step.count}</h4>
                    <div className={cn("w-12 h-1 rounded-full mt-4", i === 0 ? "bg-slate-300" : i === 1 ? "bg-blue-400" : i === 2 ? "bg-amber-400" : "bg-emerald-400")} />
                    {i < PIPELINE_STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white border border-[var(--border)] shadow-sm text-[var(--text-soft)]">
                         <ChevronRight size={10} />
                      </div>
                    )}
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>

      {/* Orders Ledger */}
      <SectionCard 
        title="Active Dispatch Ledger" 
        description="Live view of current orders moving through the fulfillment pipeline."
        className="border border-[var(--border)] shadow-xl"
        contentClassName="p-0"
      >
        <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
              <Input placeholder="Search orders by ID, customer name or region..." className="pl-10 h-10 rounded-xl bg-white/50" />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Filter size={16} />
                 All Statuses
              </Button>
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <MapPin size={16} />
                 All Regions
              </Button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Order ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Customer</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Items</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Region</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Total Amount</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS_LIST.map((order) => (
                <TableRow key={order.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <TableCell className="font-bold text-sm text-[var(--text-main)]">
                     <div className="flex items-center gap-2">
                        <ClipboardList size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {order.id}
                     </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-[var(--text-main)]">{order.customer}</TableCell>
                  <TableCell className="text-xs font-medium text-[var(--text-soft)]">{order.items} Product(s)</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-info" />
                        <span className="text-xs font-bold text-[var(--text-soft)]">{order.region}</span>
                     </div>
                  </TableCell>
                  <TableCell className="font-black text-sm text-[var(--text-main)]">{order.total}</TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                      "bg-primary/10 text-primary border-primary/20": order.status === "New",
                      "bg-warning/10 text-warning border-warning/20": order.status === "Processing",
                      "bg-info/10 text-info border-info/20": order.status === "Shipped",
                      "bg-success/10 text-success border-success/20": order.status === "Delivered",
                      "bg-danger/10 text-danger border-danger/20": order.status === "Cancelled",
                    })}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                           <Printer size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Fulfillment Control</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><CheckCircle2 size={14} className="text-success" /> Mark as Packed</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><Truck size={14} className="text-info" /> Ship Order</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><Eye size={14} className="text-primary" /> View Details</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm text-danger"><XCircle size={14} /> Cancel Order</DropdownMenuItem>
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

      {/* Intelligence Advice */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
         <Card className="bg-primary/5 border border-primary/20 p-6 rounded-[32px] flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
               <AlertCircle size={24} />
            </div>
            <div className="space-y-1">
               <h4 className="text-sm font-black uppercase text-primary">Logistics Alert</h4>
               <p className="text-xs font-medium text-[var(--text-soft)] leading-relaxed">
                  "Orders for Karachi are experiencing a 12-hour delay due to regional courier backlogs. Recommend notifying 8 customers via SMS about the updated fulfillment timeline."
               </p>
               <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-primary px-0 hover:bg-transparent">Send SMS Updates</Button>
            </div>
         </Card>
         <Card className="bg-info/5 border border-info/20 p-6 rounded-[32px] flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-info/10 text-info shrink-0">
               <Smartphone size={24} />
            </div>
            <div className="space-y-1">
               <h4 className="text-sm font-black uppercase text-info">Inventory Optimization</h4>
               <p className="text-xs font-medium text-[var(--text-soft)] leading-relaxed">
                  "4 processing orders contain low-stock **iPhone 13 OLED screens**. Priority allocation has been assigned to wholesale partners in Hall Road."
               </p>
               <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-info px-0 hover:bg-transparent">Adjust Allocation</Button>
            </div>
         </Card>
      </div>

    </div>
  )
}
