"use client"

import * as React from "react"
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  Zap, 
  ShoppingCart, 
  User, 
  Printer, 
  X, 
  Keyboard,
  ArrowRight,
  ChevronDown,
  Smartphone,
  Tag,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const QUICK_ITEMS = [
  { id: "1", name: "iPhone 13 OLED", price: 85000, category: "Screens" },
  { id: "2", name: "Samsung S22 Battery", price: 3200, category: "Batteries" },
  { id: "3", name: "Charging Port Flex", price: 1200, category: "Spares" },
  { id: "4", name: "Back Glass 14 Pro", price: 4500, category: "Glass" },
]

// ─── Main POS Page ──────────────────────────────────────────────────────────

export default function POSPage() {
  const router = useRouter()
  const [cart, setCart] = React.useState<any[]>([])
  const [discount, setDiscount] = React.useState(0)
  const [paymentMethod, setPaymentMethod] = React.useState<"cash" | "card" | "wallet">("cash")
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05 // 5% GST
  const total = subtotal + tax - discount

  const addToCart = (item: any) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = Math.max(1, c.quantity + delta)
        return { ...c, quantity: newQty }
      }
      return c
    }))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(c => c.id !== id))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-700">
      
      {/* Left Column: Product Discovery (65%) */}
      <div className="lg:w-[65%] flex flex-col gap-6 overflow-hidden">
         
         {/* Search Bar & Shortcuts */}
         <div className="flex items-center gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
               <Input 
                placeholder="Scan Barcode or Search (Press '/' to focus)..." 
                className="pl-12 h-14 rounded-2xl border-none bg-white shadow-xl shadow-primary/5 font-bold text-lg focus:ring-primary/20"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-slate-100 text-[10px] font-black uppercase">F10: Variants</Badge>
                  <Keyboard size={18} className="text-slate-300" />
               </div>
            </div>
            <Button variant="primary" className="h-14 w-14 rounded-2xl shadow-lg shadow-primary/20">
               <Plus size={24} />
            </Button>
         </div>

         {/* Quick Categories */}
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All Items", "Screens", "Batteries", "Spares", "Glass", "Tools", "Housings"].map((cat, i) => (
              <Badge key={cat} className={cn("px-4 py-2 rounded-xl cursor-pointer whitespace-nowrap transition-all", i === 0 ? "bg-primary text-white" : "bg-white text-slate-500 border-[var(--border)] hover:border-primary")}>
                {cat}
              </Badge>
            ))}
         </div>

         {/* Product Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {Array.from({ length: 12 }).map((_, i) => {
              const item = QUICK_ITEMS[i % QUICK_ITEMS.length]
              return (
                <Card 
                  key={i} 
                  onClick={() => addToCart(item)}
                  className="group cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all rounded-[28px] border-[var(--border)] overflow-hidden bg-white/50 backdrop-blur-sm"
                >
                   <CardContent className="p-4 flex flex-col h-full">
                      <div className="aspect-square rounded-2xl bg-slate-100 mb-3 flex items-center justify-center text-slate-300 relative overflow-hidden">
                         <Smartphone size={32} className="group-hover:scale-110 transition-transform" />
                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Badge className="bg-primary/90 text-white text-[8px] font-black uppercase">Add</Badge>
                         </div>
                      </div>
                      <div className="flex-1 space-y-1">
                         <p className="text-[10px] font-black uppercase tracking-tighter text-primary">{item.category}</p>
                         <h4 className="font-bold text-sm text-[var(--text-main)] line-clamp-1">{item.name}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-sm">Rs {item.price.toLocaleString()}</span>
                            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">8+</div>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              )
            })}
         </div>
      </div>

      {/* Right Column: Checkout & Cart (35%) */}
      <div className="lg:w-[35%] flex flex-col h-full gap-6">
         <Card className="flex-1 rounded-[32px] border-[var(--border)] bg-slate-900 text-white shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20 text-primary">
                     <ShoppingCart size={20} />
                  </div>
                  <div>
                     <h3 className="font-black text-lg uppercase tracking-tight">Active Sale</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order #TP-8842</p>
                  </div>
               </div>
               <Button variant="ghost" className="text-slate-400 hover:text-white" size="icon">
                  <User size={20} />
               </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
               {cart.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <div className="p-6 rounded-full bg-white/5">
                       <Zap size={48} className="text-slate-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">Scan items to begin checkout</p>
                 </div>
               ) : (
                 cart.map((item) => (
                   <div key={item.id} className="flex items-center gap-4 group">
                      <div className="flex-1">
                         <h4 className="font-bold text-sm text-white">{item.name}</h4>
                         <p className="text-xs text-slate-500">Rs {item.price.toLocaleString()} / unit</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
                         <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
                            <Minus size={14} />
                         </button>
                         <span className="w-6 text-center font-black text-sm">{item.quantity}</span>
                         <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
                            <Plus size={14} />
                         </button>
                      </div>
                      <div className="w-20 text-right font-black text-sm text-primary">
                         Rs {(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-600 hover:text-danger transition-colors">
                         <Trash2 size={16} />
                      </button>
                   </div>
                 ))
               )}
            </div>

            {/* Checkout Actions */}
            <div className="p-6 bg-white/5 border-t border-white/5 space-y-4">
               
               {/* Totals */}
               <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                     <span>Subtotal</span>
                     <span className="font-bold">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                     <span>Tax (GST 5%)</span>
                     <span className="font-bold text-success">+ Rs {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/10 mt-2">
                     <span className="text-lg font-black uppercase tracking-tighter">Grand Total</span>
                     <span className="text-3xl font-black text-primary">Rs {total.toLocaleString()}</span>
                  </div>
               </div>

               {/* Payment Selection */}
               <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setPaymentMethod("cash")}
                    className={cn("p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border", paymentMethod === "cash" ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-slate-400")}
                  >
                     <DollarSign size={20} />
                     <span className="text-[8px] font-black uppercase">Cash</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("card")}
                    className={cn("p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border", paymentMethod === "card" ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-slate-400")}
                  >
                     <CreditCard size={20} />
                     <span className="text-[8px] font-black uppercase">Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("wallet")}
                    className={cn("p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border", paymentMethod === "wallet" ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-slate-400")}
                  >
                     <Wallet size={20} />
                     <span className="text-[8px] font-black uppercase">Wallet</span>
                  </button>
               </div>

               {/* Primary Action */}
               <div className="flex gap-2">
                  <Button variant="outline" className="h-16 flex-1 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold gap-2">
                     <Printer size={20} />
                     Park Sale
                  </Button>
                  <Button variant="primary" className="h-16 flex-[2] rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-2xl shadow-primary/40 gap-2">
                     Complete & Print
                     <ArrowRight size={20} />
                  </Button>
               </div>
            </div>

            {/* Hotkey Hint */}
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30" />
            <div className="text-[9px] font-black uppercase text-slate-500 absolute bottom-1 right-6">Press F12 for Fast Checkout</div>
         </Card>
      </div>

    </div>
  )
}
