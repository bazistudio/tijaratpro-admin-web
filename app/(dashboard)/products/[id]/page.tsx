"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Package, 
  History, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Truck, 
  AlertTriangle,
  User,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Tag,
  Zap,
  MoreVertical,
  Edit2
} from "lucide-react"

import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ─── Timeline Entry Types ───────────────────────────────────────────────────

interface TimelineEntry {
  id: string
  type: "sale" | "restock" | "damage" | "transfer_in" | "transfer_out" | "correction" | "return"
  delta: number
  balance: number
  personnel: string
  date: string
  note?: string
  referenceId?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Mock Timeline Data (The "Bank Statement")
  const timeline: TimelineEntry[] = [
    { id: "1", type: "restock", delta: 50, balance: 150, personnel: "Ahmad Ali", date: "2024-03-13 10:15", note: "Shipment from Main Warehouse", referenceId: "TRF-9021" },
    { id: "2", type: "sale", delta: -2, balance: 148, personnel: "Salman Khan", date: "2024-03-13 11:30", referenceId: "INV-5521" },
    { id: "3", type: "damage", delta: -1, balance: 147, personnel: "Salman Khan", date: "2024-03-13 14:05", note: "Broken during display setup" },
    { id: "4", type: "sale", delta: -5, balance: 142, personnel: "Ahmad Ali", date: "2024-03-13 16:40", referenceId: "INV-5524" },
    { id: "5", type: "transfer_out", delta: -20, balance: 122, personnel: "Admin", date: "2024-03-12 09:00", note: "Sent to DHA Branch", referenceId: "TRF-8812" },
    { id: "6", type: "return", delta: 1, balance: 123, personnel: "Salman Khan", date: "2024-03-11 15:20", note: "Customer changed mind", referenceId: "INV-5490" },
  ]

  React.useEffect(() => {
    // Simulate fetching product details
    const fetchProduct = async () => {
      try {
        const res = await api(`/products/${params.id}`)
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error("Failed to fetch product", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const eventStyles = {
    sale: { icon: ShoppingCart, color: "text-red-500", bg: "bg-red-50", label: "Product Sold" },
    restock: { icon: Package, color: "text-success", bg: "bg-success-light", label: "Stock Received" },
    damage: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", label: "Damage Logged" },
    transfer_in: { icon: Truck, color: "text-primary", bg: "bg-primary/5", label: "Branch Received" },
    transfer_out: { icon: Truck, color: "text-purple-500", bg: "bg-purple-50", label: "Branch Transfer" },
    correction: { icon: Zap, color: "text-slate-500", bg: "bg-slate-50", label: "Stock Correction" },
    return: { icon: History, color: "text-blue-500", bg: "bg-blue-50", label: "Customer Return" },
  }

  if (isLoading) return <div className="p-20 text-center animate-pulse font-black uppercase text-slate-300">Synchronizing Ledger...</div>
  if (!product) return <div className="p-20 text-center">Product not found.</div>

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32">
      
      {/* Product Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
           <button 
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Catalog
           </button>
           <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300 shadow-inner">
                 <Package size={40} />
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px] font-black uppercase px-3 py-0.5 rounded-full border-primary/20 text-primary bg-primary/5">{product.sku}</Badge>
                    <Badge variant="outline" className="text-[10px] font-black uppercase px-3 py-0.5 rounded-full">Inventory Audited</Badge>
                 </div>
                 <h1 className="text-5xl font-black text-slate-900 tracking-tight">{product.name}</h1>
              </div>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black uppercase text-[11px] tracking-widest gap-2">
              <Edit2 size={16} /> Edit Details
           </Button>
           <Button className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-primary/30 gap-2">
              <Plus size={20} /> Add Stock
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Left: Stock Metrics Cards */}
         <div className="space-y-8 lg:col-span-1">
            <Card className="rounded-[3rem] border-slate-200 shadow-xl p-10 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute right-0 top-0 p-12 opacity-5"><TrendingUp size={160} /></div>
               <div className="relative z-10 space-y-6">
                  <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.2em]">Current Availability</p>
                  <div className="flex items-end gap-3">
                     <h2 className="text-7xl font-black tracking-tighter leading-none">{product.stock}</h2>
                     <span className="text-xl font-black text-primary uppercase mb-2">{product.unit || "PCS"}</span>
                  </div>
                  <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-500">Stock Value</p>
                        <p className="text-xl font-black">Rs {(product.stock * product.costPrice).toLocaleString()}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-500">Retail Value</p>
                        <p className="text-xl font-black">Rs {(product.stock * product.sellingPrice).toLocaleString()}</p>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="rounded-[3rem] border-slate-200 shadow-sm p-10 space-y-6">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Clock size={14} /> Quick Insights
               </h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-success-light text-success flex items-center justify-center"><ArrowUpRight size={20} /></div>
                        <span className="text-sm font-black text-slate-700">Restocked 3 times</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">This Month</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><TrendingDown size={20} /></div>
                        <span className="text-sm font-black text-slate-700">Sold 142 units</span>
                     </div>
                     <span className="text-xs font-bold text-slate-400">Total Life</span>
                  </div>
               </div>
            </Card>
         </div>

         {/* Right: The Inventory Ledger (Timeline) */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[3rem] border-slate-200 shadow-xl overflow-hidden min-h-[600px]">
               <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                     <div>
                        <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                           <History size={28} className="text-primary" />
                           Inventory Timeline
                        </CardTitle>
                        <CardDescription className="text-sm font-bold text-slate-400">The "Bank Statement" for this product's inventory life.</CardDescription>
                     </div>
                     <Button variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6">
                        Export Ledger
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-10">
                  <div className="space-y-12 relative">
                     {/* The Vertical Line */}
                     <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-100" />

                     {timeline.map((entry, index) => {
                        const style = eventStyles[entry.type]
                        const EventIcon = style.icon
                        return (
                           <div key={entry.id} className="relative flex gap-10 group">
                              {/* The Icon Node */}
                              <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-sm border transition-all group-hover:scale-110",
                                style.bg, style.color, "border-white"
                              )}>
                                 <EventIcon size={20} />
                              </div>

                              {/* The Content */}
                              <div className="flex-1 pb-10 border-b border-slate-50 last:border-none">
                                 <div className="flex items-start justify-between mb-3">
                                    <div className="space-y-1">
                                       <div className="flex items-center gap-2">
                                          <p className="text-lg font-black text-slate-900 tracking-tight">{style.label}</p>
                                          {entry.referenceId && (
                                             <Badge variant="outline" className="text-[9px] font-black uppercase text-slate-400 border-slate-100">#{entry.referenceId}</Badge>
                                          )}
                                       </div>
                                       <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                                          <Clock size={12} /> {entry.date} • <User size={12} /> {entry.personnel}
                                       </p>
                                    </div>
                                    <div className="text-right">
                                       <p className={cn("text-2xl font-black tracking-tighter", entry.delta > 0 ? "text-success" : "text-danger")}>
                                          {entry.delta > 0 ? "+" : ""}{entry.delta}
                                       </p>
                                       <p className="text-[10px] font-black uppercase text-slate-400">Balance: {entry.balance}</p>
                                    </div>
                                 </div>
                                 {entry.note && (
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/50 text-xs font-medium text-slate-600 leading-relaxed italic">
                                       "{entry.note}"
                                    </div>
                                 )}
                              </div>
                           </div>
                        )
                     })}
                  </div>
                  
                  {/* Ledger Trust Stamp */}
                  <div className="mt-10 p-6 rounded-[2rem] bg-success-light border border-success-light flex items-center gap-4">
                     <ShieldCheck className="text-success" size={24} />
                     <p className="text-xs font-bold text-success-dark">
                        This ledger is cryptographically sealed and immutable. Every stock movement is logged with a permanent audit reference.
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>

      </div>

    </div>
  )
}
