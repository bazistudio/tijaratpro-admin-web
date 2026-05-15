"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeftRight, 
  Plus, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin,
  Package,
  Search,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  ArrowLeft
} from "lucide-react"

import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── Constants ──────────────────────────────────────────────────────────────

const BRANCHES = [
  { id: "main", name: "Main Warehouse", location: "Industrial Area, Lahore" },
  { id: "branch-a", name: "Gulberg Branch", location: "Liberty, Lahore" },
  { id: "branch-b", name: "DHA Branch", location: "Phase 6, Lahore" },
]

const TRANSFER_STATUSES = {
  requested: { label: "Requested", icon: Clock, color: "bg-amber-100 text-amber-600 border-amber-200" },
  approved: { label: "Approved", icon: CheckCircle2, color: "bg-blue-100 text-blue-600 border-blue-200" },
  in_transit: { label: "In Transit", icon: Truck, color: "bg-purple-100 text-purple-600 border-purple-200" },
  received: { label: "Received", icon: CheckCircle2, color: "bg-success-light text-success border-success-light" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-danger-light text-danger border-danger-light" },
}

// ─── Hub Component ──────────────────────────────────────────────────────────

export default function BranchTransferHub() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"all" | "in-transit" | "completed">("all")

  // Mock Transfers for UI implementation
  const transfers = [
    { 
      id: "TRF-9021", 
      from: "Main Warehouse", 
      to: "Gulberg Branch", 
      items: 12, 
      status: "in_transit", 
      date: "2024-03-12 14:20",
      sender: "Ahmad Ali"
    },
    { 
      id: "TRF-9018", 
      from: "Main Warehouse", 
      to: "DHA Branch", 
      items: 45, 
      status: "received", 
      date: "2024-03-11 09:45",
      sender: "Ahmad Ali",
      receiver: "Salman Khan"
    },
    { 
      id: "TRF-9022", 
      from: "Gulberg Branch", 
      to: "DHA Branch", 
      items: 5, 
      status: "requested", 
      date: "2024-03-12 16:10",
      sender: "Farhan Malik"
    },
  ]

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.push("/stock")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Inventory Hub
           </button>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <ArrowLeftRight className="text-primary" size={32} />
             Branch Stock Transfers
           </h1>
        </div>
        <Button 
          onClick={() => router.push("/stock/transfers/create")}
          className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-primary/30 gap-3"
        >
          <Plus size={20} /> New Transfer Request
        </Button>
      </div>

      {/* Transfer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Active Transfers", val: "4", icon: Truck, color: "text-purple-500" },
           { label: "Pending Approvals", val: "2", icon: Clock, color: "text-amber-500" },
           { label: "Completed This Week", val: "28", icon: CheckCircle2, color: "text-success" },
         ].map(stat => (
           <Card key={stat.label} className="rounded-[2.5rem] border-slate-100 shadow-sm p-8 flex items-center gap-6">
              <div className={cn("h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner", stat.color)}>
                 <stat.icon size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
              </div>
           </Card>
         ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-2 bg-slate-100/50 border border-slate-200 rounded-[2rem] w-fit">
         {["all", "in-transit", "completed"].map((tab) => (
            <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={cn(
                  "px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === tab 
                     ? "bg-white text-primary shadow-sm border border-slate-200" 
                     : "text-slate-400 hover:text-slate-600"
               )}
            >
               {tab.replace("-", " ")}
            </button>
         ))}
      </div>

      {/* Transfers List */}
      <Card className="rounded-[3rem] border-slate-200 shadow-xl overflow-hidden">
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">Transfer ID</th>
                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">Source & Destination</th>
                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">Items</th>
                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">Status</th>
                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">Personnel</th>
                        <th className="p-8"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {transfers.map((trf) => {
                        const StatusIcon = TRANSFER_STATUSES[trf.status as keyof typeof TRANSFER_STATUSES].icon
                        return (
                           <tr key={trf.id} className="group hover:bg-slate-50/30 transition-all cursor-pointer">
                              <td className="p-8">
                                 <p className="text-sm font-black text-slate-900">{trf.id}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase">{trf.date}</p>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-4">
                                    <div className="text-right">
                                       <p className="text-xs font-black text-slate-900">{trf.from}</p>
                                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Source</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                       <ArrowRight size={14} />
                                    </div>
                                    <div>
                                       <p className="text-xs font-black text-slate-900">{trf.to}</p>
                                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Destination</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-2">
                                    <Package size={16} className="text-slate-300" />
                                    <span className="text-sm font-black text-slate-700">{trf.items} Units</span>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <Badge className={cn("px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider flex items-center gap-2 w-fit shadow-none", TRANSFER_STATUSES[trf.status as keyof typeof TRANSFER_STATUSES].color)}>
                                    <StatusIcon size={12} />
                                    {TRANSFER_STATUSES[trf.status as keyof typeof TRANSFER_STATUSES].label}
                                 </Badge>
                              </td>
                              <td className="p-8">
                                 <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                       <div className="h-1 w-1 rounded-full bg-slate-300" />
                                       By: {trf.sender}
                                    </div>
                                    {trf.receiver && (
                                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-success">
                                          <div className="h-1 w-1 rounded-full bg-success" />
                                          Rec: {trf.receiver}
                                       </div>
                                    )}
                                 </div>
                              </td>
                              <td className="p-8 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-400">
                                       <MoreVertical size={18} />
                                    </Button>
                                    <ChevronRight className="text-slate-200 group-hover:text-primary transition-colors" />
                                 </div>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>

      {/* Chain of Custody Warning */}
      <div className="p-8 rounded-[3rem] bg-slate-900 text-white flex items-center justify-between shadow-2xl relative overflow-hidden">
         <div className="absolute right-0 top-0 p-12 opacity-5">
            <ShieldCheck size={160} />
         </div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/20 border border-primary/20">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h3 className="text-xl font-black tracking-tight">Industrial Chain of Custody</h3>
               <p className="text-slate-400 text-xs font-medium max-w-md mt-1">
                  Every transfer requires digital approval. Once stock is "In Transit", it is deducted from the source but not yet added to destination, preventing "ghost stock" during migration.
               </p>
            </div>
         </div>
         <Button className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black uppercase text-[10px] tracking-widest border border-white/10">
            View Security Audit
         </Button>
      </div>

    </div>
  )
}
