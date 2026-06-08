"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Truck, 
  Building2, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  DollarSign, 
  FileText, 
  Save, 
  History,
  Package,
  Calendar,
  Box,
  ShoppingCart,
  Zap,
  ArrowRight,
  TrendingUp,
  Globe,
  Receipt,
  Smartphone
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
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

const PO_ITEMS = [
  { id: "1", name: "iPhone 13 OLED Assembly", price: 62000, category: "Screens", sku: "IP13-PRM-OLED" },
  { id: "2", name: "Samsung S22 Battery Original", price: 2100, category: "Batteries", sku: "SAM-S22-BAT" },
]

// ─── Main PO Page ────────────────────────────────────────────────────────────

export default function PurchaseCreatePage() {
  const router = useRouter()
  const [items, setItems] = React.useState<any[]>([])
  const [shipping, setShipping] = React.useState(0)
  const [duties, setDuties] = React.useState(0)
  
  const subtotal = items.reduce((sum, item) => sum + (item.cost * item.quantity), 0)
  const total = subtotal + Number(shipping) + Number(duties)

  const addItem = (product: any) => {
    const existing = items.find(i => i.id === product.id)
    if (existing) {
      setItems(items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 10 } : i))
    } else {
      setItems([...items, { ...product, quantity: 50, cost: product.price }])
    }
  }

  const updateItem = (id: string, field: string, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-soft)] hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Procurement
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Create Purchase Order
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <Receipt size={18} />
             Drafts
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Generate PO
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: PO Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Vendor Selection */}
           <SectionCard title="Vendor Selection" description="Select the supplier for this procurement.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Primary Supplier</Label>
                    <Select defaultValue="shenzhen">
                       <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Select Supplier" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="shenzhen">Shenzhen Tech Ltd. (Intl)</SelectItem>
                         <SelectItem value="lahore-parts">Lahore Mobile Parts Hub (Local)</SelectItem>
                         <SelectItem value="dubai-global">Dubai Global Trading (Intl)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Purchase Date</Label>
                    <Input leftIcon={<Calendar />} type="date" className="h-12" defaultValue={new Date().toISOString().split('T')[0]} />
                 </div>
              </div>
           </SectionCard>

           {/* Section 2: Items Table */}
           <SectionCard 
            title="Procurement List" 
            description="Add products and define quantities for this order."
            action={
              <div className="relative w-64">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                 <Input 
                  placeholder="Search SKU..." 
                  className="h-9 pl-9 rounded-lg text-xs" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addItem(PO_ITEMS[0])
                  }}
                 />
              </div>
            }
           >
              <div className="overflow-x-auto py-4">
                 <Table>
                    <TableHeader>
                       <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                          <TableHead className="text-xs font-black uppercase tracking-widest h-10">Product / SKU</TableHead>
                          <TableHead className="text-xs font-black uppercase tracking-widest h-10">Quantity</TableHead>
                          <TableHead className="text-xs font-black uppercase tracking-widest h-10">Unit Cost (Rs)</TableHead>
                          <TableHead className="text-xs font-black uppercase tracking-widest h-10 text-right">Line Total</TableHead>
                          <TableHead className="w-10"></TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {items.length === 0 ? (
                         <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-[var(--text-soft)] font-medium italic">
                               Search and add items to the purchase order...
                            </TableCell>
                         </TableRow>
                       ) : (
                         items.map((item) => (
                           <TableRow key={item.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/10 transition-colors">
                              <TableCell>
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                       <Box size={14} />
                                    </div>
                                    <div>
                                       <p className="font-bold text-xs">{item.name}</p>
                                       <p className="text-[9px] font-black uppercase tracking-tighter text-[var(--text-soft)]">{item.sku}</p>
                                    </div>
                                 </div>
                              </TableCell>
                              <TableCell>
                                 <Input 
                                  type="number" 
                                  value={item.quantity} 
                                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                  className="h-8 w-20 text-xs font-bold" 
                                 />
                              </TableCell>
                              <TableCell>
                                 <Input 
                                  type="number" 
                                  value={item.cost} 
                                  onChange={(e) => updateItem(item.id, 'cost', Number(e.target.value))}
                                  className="h-8 w-28 text-xs font-black text-primary" 
                                 />
                              </TableCell>
                              <TableCell className="text-right font-black text-xs">
                                 Rs {(item.cost * item.quantity).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                 <Button onClick={() => removeItem(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-danger hover:bg-danger/5">
                                    <Trash2 size={14} />
                                 </Button>
                              </TableCell>
                           </TableRow>
                         ))
                       )}
                    </TableBody>
                 </Table>
              </div>
           </SectionCard>

        </div>

        {/* Right Column: Calculations & Summary (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden bg-slate-900 text-white">
              <CardHeader className="p-6 bg-white/5 border-b border-white/10">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/20 text-primary">
                       <ShoppingCart size={20} />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Order Summary</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Financial Breakdown</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs text-slate-400">
                       <span>Items Subtotal</span>
                       <span className="font-bold">Rs {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Shipping & Logistics</Label>
                       <Input 
                        type="number" 
                        value={shipping} 
                        onChange={(e) => setShipping(Number(e.target.value))}
                        className="h-10 bg-white/5 border-white/10 text-white font-bold" 
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Custom Duties / Taxes</Label>
                       <Input 
                        type="number" 
                        value={duties} 
                        onChange={(e) => setDuties(Number(e.target.value))}
                        className="h-10 bg-white/5 border-white/10 text-white font-bold" 
                       />
                    </div>
                    <div className="pt-4 border-t border-white/10">
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-black uppercase tracking-tighter">Grand Total (Rs)</span>
                          <span className="text-2xl font-black text-primary">{total.toLocaleString()}</span>
                       </div>
                    </div>
                 </div>
                 <Button variant="primary" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30">
                    Submit Purchase Order
                 </Button>
              </CardContent>
           </Card>

           <SectionCard title="Inventory Impact">
              <div className="space-y-4 py-4">
                 <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                       <Zap size={18} />
                       <h5 className="font-black text-[10px] uppercase tracking-widest">Auto-Stock Update</h5>
                    </div>
                    <p className="text-[9px] font-medium text-[var(--text-soft)] leading-relaxed">
                       "Once this order is marked as **Received**, stock levels for {items.length} SKUs will automatically increment in the Warehouse Ledger."
                    </p>
                 </div>
                 <div className="flex items-center justify-between text-xs p-3 rounded-xl border border-[var(--border)]">
                    <span className="font-bold text-[var(--text-soft)] uppercase tracking-tighter">Current Valuation</span>
                    <span className="font-black text-[var(--text-main)]">Rs 12.4M</span>
                 </div>
                 <div className="flex items-center justify-between text-xs p-3 rounded-xl border border-[var(--border)]">
                    <span className="font-bold text-[var(--text-soft)] uppercase tracking-tighter">Projected Valuation</span>
                    <span className="font-black text-success">Rs {(12400000 + total).toLocaleString(undefined, {maximumFractionDigits: 1})}</span>
                 </div>
              </div>
           </SectionCard>

        </div>

      </div>

    </div>
  )
}
