"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  AlertTriangle, 
  Trash2, 
  Search, 
  ArrowLeft,
  Skull,
  TrendingDown,
  Info,
  Clock,
  ShieldAlert,
  ArrowRight
} from "lucide-react"

import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { usePermission } from "@/hooks/use-permissions"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Constants ──────────────────────────────────────────────────────────────

const DAMAGE_STATUSES = [
  { id: "damaged", label: "Damaged", color: "text-amber-500", bg: "bg-amber-50" },
  { id: "expired", label: "Expired", color: "text-red-500", bg: "bg-red-50" },
  { id: "lost", label: "Lost / Missing", color: "text-slate-500", bg: "bg-slate-50" },
  { id: "broken", label: "Broken", color: "text-orange-500", bg: "bg-orange-50" },
  { id: "defective", label: "Defective / Dead", color: "text-rose-500", bg: "bg-rose-50" },
  { id: "returned_damaged", label: "Customer Return (Damaged)", color: "text-purple-500", bg: "bg-purple-50" },
]

export default function DamageHubPage() {
  const router = useRouter()
  const { addNotification } = useNotificationStore()
  const { can } = usePermission()

  if (!can("canDamageStock")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in zoom-in duration-500">
         <div className="h-20 w-20 rounded-[2rem] bg-danger-light text-danger flex items-center justify-center shadow-lg shadow-danger/10">
            <ShieldAlert size={40} />
         </div>
         <h2 className="text-2xl font-black tracking-tight">Access Locked</h2>
         <p className="text-slate-400 text-sm font-bold text-center max-w-xs">
            Your role does not have permission to log damages or leakage. Please contact a Manager.
         </p>
         <Button onClick={() => router.back()} variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8">
            Return to Safety
         </Button>
      </div>
    )
  }

  // ─── State ──────────────────────────────────────────────────────────────
  const [products, setProducts] = React.useState<any[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<any[]>([])
  
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null)
  const [qty, setQty] = React.useState(1)
  const [status, setStatus] = React.useState("damaged")
  const [note, setNote] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // ─── Data Fetching ────────────────────────────────────────────────────────
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api("/products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Failed to fetch products", err)
      }
    }
    fetchItems()
  }, [])

  // ─── Search ───────────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    setSearchResults(filtered)
  }, [searchQuery, products])

  // ─── Calculations ─────────────────────────────────────────────────────────
  const lossAmount = selectedProduct ? (qty * selectedProduct.costPrice) : 0

  // ─── Action ───────────────────────────────────────────────────────────────
  const handleRecordDamage = async () => {
    if (!selectedProduct || qty <= 0) return

    setIsSubmitting(true)
    try {
      // 1. Adjust Stock (Decrease)
      await api(`/stock/${selectedProduct.id}`, {
        method: "POST",
        body: JSON.stringify({
          adjustment: -qty,
          reason: status,
          note: note
        })
      })

      // 2. Audit Log (Leakage Focus)
      await api("/activity", {
        method: "POST",
        body: JSON.stringify({
          action: "DAMAGE_LOG",
          entityId: selectedProduct.id,
          entityType: "product",
          description: `Logged leakage: ${qty} units of ${selectedProduct.name} (${status})`,
          metadata: { 
            sku: selectedProduct.sku, 
            loss: lossAmount, 
            status, 
            note 
          }
        })
      })

      addNotification({
        title: "Damage Recorded",
        description: `Leakage of Rs ${lossAmount.toLocaleString()} has been logged for audit.`,
        type: "success"
      })

      // Reset
      setSelectedProduct(null)
      setSearchQuery("")
      setQty(1)
      setNote("")
      
    } catch (error) {
      addNotification({ title: "Log Failed", description: "Could not record damage log.", type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Inventory Hub
           </button>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Skull className="text-danger" size={32} />
             Damage & Leakage Hub
           </h1>
        </div>
        <div className="bg-red-50 border border-red-100 p-4 rounded-[2rem] flex items-center gap-4">
           <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-red-500 shadow-sm"><ShieldAlert size={24} /></div>
           <div>
              <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">Leakage Control</p>
              <p className="text-sm font-black text-slate-900">Prevent Invisible Loss</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Entry Form */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="rounded-[3rem] border-slate-200 shadow-xl overflow-visible">
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-xl font-black">Record Inventory Leakage</CardTitle>
                 <CardDescription className="text-xs font-bold text-slate-400">Log damaged, expired, or lost stock to track monetary impact.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                 
                 {/* Product Search */}
                 <div className="space-y-3 relative">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Search Product</Label>
                    <div className="relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <Input 
                         placeholder="Type Name or SKU..." 
                         className="h-14 pl-12 rounded-2xl bg-slate-50 border-none text-base font-bold shadow-inner"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                    </div>

                    {/* Search Dropdown */}
                    {searchResults.length > 0 && (
                       <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 overflow-hidden divide-y divide-slate-50">
                          {searchResults.map(p => (
                            <button 
                              key={p.id}
                              onClick={() => { setSelectedProduct(p); setSearchQuery(""); setSearchResults([]) }}
                              className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors text-left"
                            >
                               <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">{p.name[0]}</div>
                                  <div>
                                     <p className="text-sm font-black text-slate-900">{p.name}</p>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase">{p.sku}</p>
                                  </div>
                               </div>
                               <Badge variant="outline" className="text-[10px] font-black">{p.stock} In Stock</Badge>
                            </button>
                          ))}
                       </div>
                    )}
                 </div>

                 {selectedProduct && (
                    <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
                       <div className="space-y-6">
                          <div className="space-y-3">
                             <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quantity Damaged</Label>
                             <div className="flex items-center gap-4">
                                <Input 
                                  type="number"
                                  className="h-14 rounded-2xl text-xl font-black text-danger bg-red-50/50 border-red-100"
                                  value={qty}
                                  onChange={(e) => setQty(Number(e.target.value))}
                                />
                                <Badge className="h-14 px-4 rounded-2xl bg-slate-100 text-slate-500 border-none font-black text-xs uppercase">{selectedProduct.unit}</Badge>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Leakage Status</Label>
                             <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="h-14 rounded-2xl text-sm font-black">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   {DAMAGE_STATUSES.map(s => (
                                     <SelectItem key={s.id} value={s.id} className="font-black text-xs">{s.label}</SelectItem>
                                   ))}
                                </SelectContent>
                             </Select>
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <div className="space-y-3">
                             <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Note / Reason</Label>
                             <Textarea 
                               placeholder="e.g. Broken during unloading..." 
                               className="h-[128px] rounded-2xl bg-slate-50 border-none resize-none p-4 text-xs font-bold"
                               value={note}
                               onChange={(e) => setNote(e.target.value)}
                             />
                          </div>
                       </div>
                    </div>
                 )}

                 {selectedProduct && (
                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500"><TrendingDown size={24} /></div>
                          <div>
                             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Calculated Monetary Loss</p>
                             <h3 className="text-3xl font-black tracking-tight text-white">Rs {lossAmount.toLocaleString()}</h3>
                          </div>
                       </div>
                       <Button 
                         disabled={isSubmitting}
                         onClick={handleRecordDamage}
                         className="h-14 px-10 rounded-2xl bg-red-600 text-white hover:bg-red-700 font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-red-900/40 gap-3"
                       >
                         {isSubmitting ? "Logging Loss..." : <><Trash2 size={20} /> Finalize Leakage Log</>}
                       </Button>
                    </div>
                 )}

              </CardContent>
           </Card>
        </div>

        {/* Right: Insights & Stats */}
        <div className="space-y-8">
           <Card className="rounded-[2.5rem] border-slate-200 bg-slate-50/50 shadow-sm overflow-hidden">
              <CardHeader className="p-6 pb-2">
                 <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Clock size={14} /> Leakage Statistics (30 Days)
                 </h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-400">Total Loss (Rs)</p>
                    <p className="text-3xl font-black text-danger tracking-tighter">Rs 142,500</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Expired", val: "45%", color: "bg-red-500" },
                      { label: "Damaged", val: "30%", color: "bg-amber-500" },
                      { label: "Lost", val: "25%", color: "bg-slate-400" },
                    ].map(stat => (
                      <div key={stat.label} className="space-y-2">
                         <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className="text-slate-500">{stat.label}</span>
                            <span className="text-slate-900">{stat.val}</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", stat.color)} style={{ width: stat.val }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 space-y-4">
              <div className="flex items-center gap-2 text-amber-600">
                 <Info size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Owner Advisory</span>
              </div>
              <p className="text-[11px] font-bold text-amber-900 leading-relaxed">
                 Frequent "Lost / Missing" logs indicate potential employee theft or process gaps. We recommend reviewing CCTV during these log timestamps.
              </p>
              <button className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-1 hover:underline">
                 View CCTV Activity Map <ArrowRight size={10} />
              </button>
           </div>
        </div>

      </div>

    </div>
  )
}

// Subcomponent for Textarea since it wasn't imported in full earlier
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ className, ...props }: TextareaProps) {
   return (
      <textarea 
         className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
         )}
         {...props}
      />
   )
}
