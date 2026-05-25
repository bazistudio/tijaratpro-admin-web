"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Minus, 
  Trash2, 
  Save, 
  Search, 
  AlertCircle, 
  ArrowLeft,
  Package,
  History,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Info
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

// ─── Types & Constants ──────────────────────────────────────────────────────

const ADJUSTMENT_REASONS = [
  { id: "restock", label: "Restock / New Shipment", type: "increase" },
  { id: "correction", label: "Inventory Correction", type: "neutral" },
  { id: "damaged", label: "Damaged Goods", type: "decrease" },
  { id: "expired", label: "Expired Product", type: "decrease" },
  { id: "missing", label: "Missing / Theft", type: "decrease" },
  { id: "returned", label: "Customer Return", type: "increase" },
]

interface AdjustmentItem {
  id: string
  name: string
  sku: string
  currentStock: number
  adjustment: number
  reason: string
  note: string
}

export default function BulkAdjustmentPage() {
  const router = useRouter()
  const { addNotification } = useNotificationStore()
  const { can } = usePermission()

  // ─── Permission Guard ──────────────────────────────────────────────────────
  if (!can("canAdjustStock")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in zoom-in duration-500">
         <div className="h-20 w-20 rounded-[2rem] bg-danger-light text-danger flex items-center justify-center shadow-lg shadow-danger/10">
            <ShieldAlert size={40} />
         </div>
         <h2 className="text-2xl font-black tracking-tight">Access Locked</h2>
         <p className="text-slate-400 text-sm font-bold text-center max-w-xs">
            Your role (Cashier) does not have permission to adjust stock levels manually. Please contact a Manager or Admin.
         </p>
         <Button onClick={() => router.back()} variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest px-8">
            Return to Safety
         </Button>
      </div>
    )
  }

  // ─── State ──────────────────────────────────────────────────────────────
  const [products, setProducts] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<any[]>([])
  
  const [queue, setQueue] = React.useState<AdjustmentItem[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // ─── Initial Fetch ────────────────────────────────────────────────────────
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api("/products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Failed to fetch products", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()
  }, [])

  // ─── Search Logic ─────────────────────────────────────────────────────────
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

  // ─── Queue Management ─────────────────────────────────────────────────────
  const addToQueue = (product: any) => {
    if (queue.find(item => item.id === product.id)) {
      addNotification({ title: "Already in Queue", description: `${product.name} is already listed below.`, type: "info" })
      return
    }
    const newItem: AdjustmentItem = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      currentStock: product.stock,
      adjustment: 0,
      reason: "restock",
      note: ""
    }
    setQueue([...queue, newItem])
    setSearchQuery("")
    setSearchResults([])
  }

  const updateItem = (id: string, updates: Partial<AdjustmentItem>) => {
    setQueue(queue.map(item => item.id === id ? { ...item, ...updates } : item))
  }

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter(item => item.id !== id))
  }

  // ─── Bulk Submit ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (queue.length === 0) return
    
    // Validation: Check for zero adjustments
    const hasZero = queue.some(item => item.adjustment === 0)
    if (hasZero && !confirm("Some items have 0 adjustment. Continue?")) return

    setIsSubmitting(true)
    try {
      // 1. Process Adjustments via Authoritative Backend API
      const promises = queue.map(async (item) => {
        // The Backend now:
        // - Re-calculates new balance
        // - Verifies user permissions
        // - Auto-generates Audit Log
        // - Creates Stock Movement Entry
        await api(`/inventory/adjust`, {
          method: "POST",
          body: JSON.stringify({
            productId: item.id,
            type: item.adjustment > 0 ? "INCREASE" : "DECREASE",
            quantity: Math.abs(item.adjustment),
            reason: item.reason,
            notes: item.note
          })
        })
      })

      await Promise.all(promises)

      addNotification({
        title: "Inventory Synced",
        description: `Successfully adjusted ${queue.length} products. Audit logs generated.`,
        type: "success"
      })

      router.push("/stock")
    } catch (error) {
      addNotification({ title: "Sync Failed", description: "Could not complete bulk adjustment.", type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Inventory
           </button>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Package className="text-primary" size={32} />
             Bulk Stock Adjustment
           </h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200">
           <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><ShieldCheck size={20} /></div>
           <div>
              <p className="text-[10px] font-black uppercase text-slate-500 leading-tight">Audited System</p>
              <p className="text-[10px] font-bold text-slate-400 leading-tight">Every change is recorded</p>
           </div>
        </div>
      </div>

      {/* Product Search & Selection */}
      <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-100 overflow-visible z-50">
         <CardContent className="p-8">
            <div className="max-w-2xl mx-auto relative">
               <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 text-center">Add Products to Adjustment Queue</Label>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <Input 
                    placeholder="Search by Name or SKU..." 
                    className="h-16 pl-12 rounded-2xl bg-slate-50 border-none text-lg font-bold shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isLoading && <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />}
               </div>

               {/* Search Results Dropdown */}
               {searchResults.length > 0 && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 overflow-hidden divide-y divide-slate-50">
                    {searchResults.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => addToQueue(p)}
                        className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors text-left"
                      >
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 font-black text-xs uppercase">{p.name[0]}</div>
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
         </CardContent>
      </Card>

      {/* Adjustment Queue Table */}
      <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
         <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <History className="text-slate-400" size={20} />
                  <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">Adjustment Queue ({queue.length} Items)</h3>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            {queue.length === 0 ? (
              <div className="p-20 text-center space-y-4 opacity-30">
                 <Zap size={64} className="mx-auto" />
                 <p className="text-xs font-black uppercase tracking-widest">Adjustment Queue is Empty</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100">
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Product Details</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Current Stock</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Adjustment</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Reason</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400">Notes</th>
                          <th className="p-6"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {queue.map(item => (
                         <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-6">
                               <p className="text-sm font-black text-slate-900">{item.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.sku}</p>
                            </td>
                            <td className="p-6">
                               <Badge className="bg-slate-100 text-slate-500 border-none font-bold">{item.currentStock} Units</Badge>
                            </td>
                            <td className="p-6">
                               <div className="flex items-center gap-2">
                                  <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                     <button 
                                      onClick={() => updateItem(item.id, { adjustment: item.adjustment - 1 })}
                                      className="h-10 w-10 flex items-center justify-center hover:bg-slate-50 text-slate-500"
                                     ><Minus size={14} /></button>
                                     <input 
                                       type="number"
                                       className={cn(
                                         "w-16 text-center h-10 bg-transparent font-black text-sm focus:outline-none",
                                         item.adjustment > 0 ? "text-success" : item.adjustment < 0 ? "text-danger" : "text-slate-400"
                                       )}
                                       value={item.adjustment}
                                       onChange={(e) => updateItem(item.id, { adjustment: Number(e.target.value) })}
                                     />
                                     <button 
                                      onClick={() => updateItem(item.id, { adjustment: item.adjustment + 1 })}
                                      className="h-10 w-10 flex items-center justify-center hover:bg-slate-50 text-slate-500"
                                     ><Plus size={14} /></button>
                                  </div>
                               </div>
                            </td>
                            <td className="p-6 min-w-[200px]">
                               <Select value={item.reason} onValueChange={(val) => updateItem(item.id, { reason: val })}>
                                  <SelectTrigger className="h-10 rounded-xl border-slate-200 text-xs font-bold">
                                     <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                     {ADJUSTMENT_REASONS.map(r => (
                                       <SelectItem key={r.id} value={r.id} className="text-xs font-bold">{r.label}</SelectItem>
                                     ))}
                                  </SelectContent>
                                </Select>
                            </td>
                            <td className="p-6">
                               <Input 
                                 placeholder="Optional memo..." 
                                 className="h-10 rounded-xl bg-slate-50 border-none text-xs font-medium"
                                 value={item.note}
                                 onChange={(e) => updateItem(item.id, { note: e.target.value })}
                               />
                            </td>
                            <td className="p-6 text-right">
                               <button 
                                onClick={() => removeFromQueue(item.id)}
                                className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-danger hover:bg-danger/5 transition-all"
                               >
                                  <Trash2 size={18} />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            )}
         </CardContent>
      </Card>

      {/* Sync Action Bar */}
      {queue.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 p-4 bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl z-[100] min-w-[600px] animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex-1 px-4">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Queue Overview</p>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-white text-xs font-black">{queue.filter(i => i.adjustment > 0).length} Additions</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-danger" />
                    <span className="text-white text-xs font-black">{queue.filter(i => i.adjustment < 0).length} Reductions</span>
                 </div>
              </div>
           </div>
           
           <div className="h-12 w-px bg-white/10" />

           <div className="flex items-center gap-3">
              <Button 
                onClick={() => setQueue([])}
                variant="ghost" 
                className="h-14 px-8 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest"
              >
                Clear Queue
              </Button>
              <Button 
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-primary/30 gap-3"
              >
                {isSubmitting ? "Syncing Stock..." : <><Save size={20} /> Commit Changes</>}
              </Button>
           </div>
        </div>
      )}

    </div>
  )
}
