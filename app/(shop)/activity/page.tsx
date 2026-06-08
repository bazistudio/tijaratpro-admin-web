"use client"

import * as React from "react"
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  User, 
  Package, 
  CreditCard, 
  ShieldAlert, 
  FileEdit, 
  Trash2, 
  RefreshCcw, 
  ChevronRight, 
  MoreVertical,
  Calendar,
  Zap,
  Tag,
  AlertCircle,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ─── Activity Mock Data ───────────────────────────────────────────────────────

const ACTIVITY_LOGS = [
  {
    id: "LOG-10293",
    user: { name: "Muhammad Ali", role: "Administrator", avatar: "MA" },
    action: "Edited Product",
    target: "iPhone 13 Pro Max",
    category: "Inventory",
    type: "update",
    time: "2 mins ago",
    date: "Oct 14, 2026 - 14:32:10",
    details: "Price changed from Rs 85,000 to Rs 82,500"
  },
  {
    id: "LOG-10292",
    user: { name: "Ahmed Khan", role: "Cashier", avatar: "AK" },
    action: "Refunded Invoice",
    target: "INV-9821",
    category: "Sales",
    type: "delete",
    time: "15 mins ago",
    date: "Oct 14, 2026 - 14:19:45",
    details: "Full refund issued for OLED Assembly defective unit."
  },
  {
    id: "LOG-10291",
    user: { name: "Sara Sheikh", role: "Manager", avatar: "SS" },
    action: "Modified Stock",
    target: "Samsung S23 Panel",
    category: "Inventory",
    type: "update",
    time: "1 hour ago",
    date: "Oct 14, 2026 - 13:20:00",
    details: "Manual adjustment: +10 units (New shipment batch #884)"
  },
  {
    id: "LOG-10290",
    user: { name: "System", role: "Auto-Guard", avatar: "SG" },
    action: "Failed Login Attempt",
    target: "192.168.1.102",
    category: "Security",
    type: "alert",
    time: "2 hours ago",
    date: "Oct 14, 2026 - 12:45:12",
    details: "Unauthorized access attempt from unlisted IP in Lahore."
  },
  {
    id: "LOG-10289",
    user: { name: "Muhammad Ali", role: "Administrator", avatar: "MA" },
    action: "Changed Role",
    target: "User: Ahmed Khan",
    category: "Security",
    type: "update",
    time: "4 hours ago",
    date: "Oct 14, 2026 - 10:15:30",
    details: "Upgraded from Junior Cashier to Senior Cashier."
  },
  {
    id: "LOG-10288",
    user: { name: "Sara Sheikh", role: "Manager", avatar: "SS" },
    action: "Edited Expense",
    target: "Electric Bill #442",
    category: "Financial",
    type: "update",
    time: "Yesterday",
    date: "Oct 13, 2026 - 18:30:10",
    details: "Updated billing period to include last quarter tax."
  }
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ActivityLogPage() {
  
  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Audit Trail & Security
           </h1>
           <p className="text-[var(--text-soft)] font-medium">Immutable timeline of every critical business operation.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <Calendar size={18} />
             Select Date
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Download size={18} />
             Export Compliance Log
           </Button>
        </div>
      </div>

      {/* Analytics & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Total Actions", value: "1,284", trend: "+42 today", icon: History, color: "primary" },
           { label: "Critical Edits", value: "18", trend: "-5% vs last week", icon: FileEdit, color: "info" },
           { label: "Stock Changes", value: "244", trend: "Batch imports active", icon: Package, color: "success" },
           { label: "Security Alerts", value: "3", trend: "Immediate attention", icon: ShieldAlert, color: "danger" },
         ].map((stat) => (
           <Card key={stat.label} className="rounded-3xl border-[var(--border)] bg-white/50 backdrop-blur-sm shadow-xl shadow-slate-200/40 border-none p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("p-3 rounded-2xl", {
                   "bg-primary/10 text-primary": stat.color === "primary",
                   "bg-info/10 text-info": stat.color === "info",
                   "bg-success/10 text-success": stat.color === "success",
                   "bg-danger/10 text-danger": stat.color === "danger",
                 })}>
                    <stat.icon size={20} />
                 </div>
                 <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-100">{stat.trend}</Badge>
              </div>
              <h3 className="text-3xl font-black font-heading tracking-tight">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)] mt-1">{stat.label}</p>
           </Card>
         ))}
      </div>

      {/* Filter Bar */}
      <Card className="rounded-[32px] border-none bg-white shadow-2xl shadow-slate-200/50 p-4">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
               <Input 
                placeholder="Search logs by ID, User, or Item..." 
                className="h-12 pl-12 rounded-2xl border-[var(--border)] bg-[var(--bg-secondary)]/30 font-bold"
               />
            </div>
            <div className="md:col-span-2">
               <Select defaultValue="all">
                  <SelectTrigger className="h-12 rounded-2xl border-[var(--border)] bg-[var(--bg-secondary)]/30 font-bold">
                     <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                     <SelectItem value="all">All Categories</SelectItem>
                     <SelectItem value="inventory">Inventory</SelectItem>
                     <SelectItem value="sales">Sales</SelectItem>
                     <SelectItem value="financial">Financial</SelectItem>
                     <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="md:col-span-2">
               <Select defaultValue="all">
                  <SelectTrigger className="h-12 rounded-2xl border-[var(--border)] bg-[var(--bg-secondary)]/30 font-bold">
                     <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                     <SelectItem value="all">All Actions</SelectItem>
                     <SelectItem value="create">Create</SelectItem>
                     <SelectItem value="update">Update</SelectItem>
                     <SelectItem value="delete">Delete/Refund</SelectItem>
                     <SelectItem value="alert">Alerts</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="md:col-span-2">
               <Select defaultValue="all">
                  <SelectTrigger className="h-12 rounded-2xl border-[var(--border)] bg-[var(--bg-secondary)]/30 font-bold">
                     <SelectValue placeholder="User Role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                     <SelectItem value="all">All Roles</SelectItem>
                     <SelectItem value="admin">Admins</SelectItem>
                     <SelectItem value="manager">Managers</SelectItem>
                     <SelectItem value="cashier">Cashiers</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="md:col-span-2">
               <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 font-bold gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all">
                  <RefreshCcw size={16} />
                  Sync Logs
               </Button>
            </div>
         </div>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-4">
         {ACTIVITY_LOGS.map((log) => (
           <Card key={log.id} className="rounded-[32px] border-none bg-white shadow-xl shadow-slate-200/30 overflow-hidden group hover:shadow-2xl transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center">
                 {/* Indicator Strip */}
                 <div className={cn("w-full lg:w-2 h-2 lg:h-auto shrink-0", {
                   "bg-primary": log.type === "create",
                   "bg-info": log.type === "update",
                   "bg-danger": log.type === "delete",
                   "bg-warning": log.type === "alert",
                 })} />
                 
                 <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:items-center">
                    
                    {/* User Info */}
                    <div className="lg:col-span-3 flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center font-black text-primary border border-[var(--border)] shadow-inner">
                          {log.user.avatar}
                       </div>
                       <div>
                          <h4 className="font-black text-sm text-[var(--text-main)]">{log.user.name}</h4>
                          <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-widest">{log.user.role}</p>
                       </div>
                    </div>

                    {/* Action & Target */}
                    <div className="lg:col-span-4 space-y-1">
                       <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px] font-black uppercase py-0.5 px-2 bg-slate-50 border-slate-200">{log.category}</Badge>
                          <span className="text-xs font-black text-[var(--text-main)]">{log.action}</span>
                       </div>
                       <h5 className="font-black text-lg tracking-tight flex items-center gap-2">
                          {log.target}
                          <ArrowRight size={14} className="text-slate-300" />
                       </h5>
                    </div>

                    {/* Snapshot Metadata */}
                    <div className="lg:col-span-3 space-y-1">
                       <p className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                          <Clock size={14} className="text-primary" />
                          {log.time}
                       </p>
                       <p className="text-[10px] font-medium text-[var(--text-soft)] uppercase tracking-widest">{log.date}</p>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-2 flex justify-end items-center gap-3">
                       <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl font-bold text-xs gap-2 group-hover:border-primary transition-all">
                          <Eye size={14} />
                          Details
                       </Button>
                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                          <MoreVertical size={18} />
                       </Button>
                    </div>

                 </div>
              </div>
              
              {/* Expandable Detail Section (Simulated) */}
              <div className="bg-slate-50/50 border-t border-slate-100 p-6 flex gap-4 items-start">
                 <div className="mt-1 p-1 rounded-full bg-white border border-slate-200">
                    <Zap size={14} className="text-primary" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)]">Operation Payload</p>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                       "{log.details}"
                    </p>
                 </div>
              </div>

           </Card>
         ))}
      </div>

      {/* Infinite Scroll Indicator */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-4">
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-24 bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loading Archive</span>
            <div className="h-[1px] w-24 bg-slate-200" />
         </div>
         <Button variant="ghost" className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/5">
            Load More Activity
         </Button>
      </div>

    </div>
  )
}
