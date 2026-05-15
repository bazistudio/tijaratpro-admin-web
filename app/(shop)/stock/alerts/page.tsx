"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  TrendingDown, 
  ShieldAlert, 
  ArrowRight,
  PackageSearch,
  ShoppingCart,
  Trash2,
  Calendar,
  Zap,
  Info,
  DollarSign
} from "lucide-react"

import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ─── Alerts Definitions ──────────────────────────────────────────────────────

type AlertCategory = "critical" | "expiry" | "dead" | "overstock"

interface StockAlert {
  id: string
  productName: string
  sku: string
  category: AlertCategory
  severity: "high" | "medium" | "low"
  message: string
  metric: string
  value: string
  action: string
}

export default function SmartAlertsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = React.useState<AlertCategory | "all">("all")

  // Mock Data for "Weaponized" Alerts
  const alerts: StockAlert[] = [
    { 
      id: "1", 
      productName: "Panadol CF 500mg", 
      sku: "MD-9021", 
      category: "expiry", 
      severity: "high", 
      message: "Expiring in 14 days", 
      metric: "Expiry Date",
      value: "2024-03-26",
      action: "Return to Supplier / Clearance"
    },
    { 
      id: "2", 
      productName: "iPhone 15 Screen Guard", 
      sku: "ACC-012", 
      category: "critical", 
      severity: "high", 
      message: "Below minimum stock level", 
      metric: "Current Stock",
      value: "2 Units (Min: 10)",
      action: "Create Purchase Order"
    },
    { 
      id: "3", 
      productName: "Honda Civic Air Filter (Old Model)", 
      sku: "AP-882", 
      category: "dead", 
      severity: "medium", 
      message: "No sales in 90+ days", 
      metric: "Last Sale",
      value: "Dec 12, 2023",
      action: "Move to Clearance"
    },
    { 
      id: "4", 
      productName: "Tapal Danedar 950g", 
      sku: "GR-TEA-01", 
      category: "overstock", 
      severity: "low", 
      message: "Overstock Warning (Sitting Capital)", 
      metric: "Stock Value",
      value: "Rs 45,000 (150 Units)",
      action: "Pause Procurement"
    },
  ]

  const filteredAlerts = activeCategory === "all" ? alerts : alerts.filter(a => a.category === activeCategory)

  const categoryIcons = {
    critical: { icon: AlertTriangle, color: "text-red-500", label: "Critical Stock" },
    expiry: { icon: Clock, color: "text-amber-500", label: "Near Expiry" },
    dead: { icon: Trash2, color: "text-slate-500", label: "Dead Inventory" },
    overstock: { icon: DollarSign, color: "text-primary", label: "Overstock" },
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Bell className="text-primary animate-pulse" size={32} />
             Smart Alerts Center
           </h1>
           <p className="text-slate-500 font-medium">Actionable intelligence for your inventory.</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-[2rem]">
           {["all", "critical", "expiry", "dead", "overstock"].map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat as any)}
               className={cn(
                 "px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all",
                 activeCategory === cat ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
               )}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {filteredAlerts.map((alert) => {
           const info = categoryIcons[alert.category]
           return (
             <Card key={alert.id} className="rounded-[3rem] border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden group">
                <div className="p-10 flex gap-8">
                   <div className={cn("h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center shrink-0 shadow-inner", info.color)}>
                      <info.icon size={32} />
                   </div>
                   <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className={cn("px-4 py-1 rounded-full text-[9px] font-black uppercase border shadow-none", info.color, "border-current bg-transparent")}>
                            {info.label}
                         </Badge>
                         <span className="text-[10px] font-black text-slate-300 uppercase">{alert.sku}</span>
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{alert.productName}</h3>
                         <p className="text-sm font-bold text-danger leading-tight">{alert.message}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                         <div>
                            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{alert.metric}</p>
                            <p className="text-sm font-black text-slate-900">{alert.value}</p>
                         </div>
                         <Button className="h-10 rounded-xl bg-slate-900 text-white hover:bg-primary font-black uppercase text-[10px] tracking-widest gap-2">
                            {alert.action} <ArrowRight size={14} />
                         </Button>
                      </div>
                   </div>
                </div>
             </Card>
           )
         })}
      </div>

      {/* Intelligence Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 rounded-[3rem] bg-slate-900 text-white p-10 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-12 opacity-10">
               <TrendingDown size={160} />
            </div>
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                     <Zap size={28} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black tracking-tight">Sitting Capital Analysis</h3>
                     <p className="text-slate-400 text-xs font-medium">Your warehouse has dead or overstocked items impacting cashflow.</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-10 pt-6">
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Total Sitting Capital</p>
                     <h4 className="text-4xl font-black tracking-tighter text-white">Rs 842,000</h4>
                     <p className="text-[10px] font-bold text-amber-500 mt-2 flex items-center gap-1">
                        <TrendingDown size={12} /> 12% higher than last month
                     </p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase text-slate-500">Top Categories in Overstock</p>
                     <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold"><span>Electronics</span><span>42%</span></div>
                        <div className="h-1 w-full bg-white/10 rounded-full"><div className="h-full bg-primary w-[42%] rounded-full" /></div>
                        <div className="flex justify-between text-xs font-bold"><span>Grocery</span><span>18%</span></div>
                        <div className="h-1 w-full bg-white/10 rounded-full"><div className="h-full bg-success w-[18%] rounded-full" /></div>
                     </div>
                  </div>
               </div>
            </div>
         </Card>

         <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 flex flex-col justify-between">
            <div className="space-y-4">
               <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm"><Info size={28} /></div>
               <h3 className="text-xl font-black text-slate-900 leading-tight">Automated Reordering</h3>
               <p className="text-xs font-bold text-slate-500 leading-relaxed">
                  Based on your current low stock alerts, we can generate a bulk Purchase Order for 12 items across 3 suppliers.
               </p>
            </div>
            <Button className="h-14 w-full rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[11px] tracking-widest shadow-xl shadow-primary/20">
               Generate Bulk PO Now
            </Button>
         </div>
      </div>

    </div>
  )
}
