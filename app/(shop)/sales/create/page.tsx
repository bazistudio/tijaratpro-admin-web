"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  ShoppingCart, 
  User, 
  Printer, 
  Keyboard,
  ArrowRight,
  Smartphone,
  Tag,
  CheckCircle2,
  AlertCircle,
  FileText,
  Scan,
  MoreVertical,
  ChevronRight,
  Package,
  Clock,
  Save,
  PauseCircle,
  Undo2,
  Share2,
  X,
  Zap
} from "lucide-react"

import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { usePermission } from "@/hooks/use-permissions"
import { PermissionGuard } from "@/components/auth/PermissionGuard"
import { useAuthStore } from "@/store/auth.store"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// ─── POS Configuration ──────────────────────────────────────────────────────

const PAYMENT_METHODS = [
  { id: "cash", label: "Cash", icon: DollarSign, color: "success" },
  { id: "card", label: "Card", icon: CreditCard, color: "primary" },
  { id: "jazzcash", label: "JazzCash", icon: Smartphone, color: "warning" },
  { id: "easypaisa", label: "EasyPaisa", icon: Smartphone, color: "success" },
  { id: "credit", label: "Credit / Due", icon: Clock, color: "danger" },
]

export default function POSPage() {
  const router = useRouter()
  const { addNotification } = useNotificationStore()
  const { can } = usePermission()
  const { shops, activeShopId } = useAuthStore()

  const activeShop = shops?.find(s => s._id === activeShopId)
  const enabledModules = activeShop?.enabledModules || ["PRODUCTS", "SALES", "INVENTORY"]

  // ─── State Management ─────────────────────────────────────────────────────
  const [products, setProducts] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState("All")
  
  const [cart, setCart] = React.useState<any[]>([])
  const [heldOrders, setHeldOrders] = React.useState<any[]>([])
  const [customer, setCustomer] = React.useState<any>(null)
  const [discount, setDiscount] = React.useState(0)
  const [paymentMethod, setPaymentMethod] = React.useState("cash")
  const [amountPaid, setAmountPaid] = React.useState(0)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [showHeldOrders, setShowHeldOrders] = React.useState(false)
  const [lastSale, setLastSale] = React.useState<any>(null)
  const [showReceiptModal, setShowReceiptModal] = React.useState(false)

  // ─── Calculations ────────────────────────────────────────────────────────
  const subtotal = cart.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0)
  const tax = subtotal * 0.05 // 5% GST Fixed
  const grandTotal = subtotal + tax - discount
  const changeDue = amountPaid - grandTotal

  // ─── Initial Fetch ────────────────────────────────────────────────────────
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api("/products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("POS Fetch Failed", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()
  }, [])

  // ─── Keyboard Shortcuts ──────────────────────────────────────────────────
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") { e.preventDefault(); document.getElementById("pos-search")?.focus(); }
      if (e.key === "F9") { e.preventDefault(); handleCheckout(); }
      if (e.key === "Escape") { e.preventDefault(); setCart([]); }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [cart, grandTotal])

  // ─── Logic: Cart Engine ───────────────────────────────────────────────────
  const addToCart = (product: any) => {
    // Stock Validation
    if (product.stock <= 0) {
      addNotification({ title: "Out of Stock", description: `${product.name} is unavailable.`, type: "error" })
      return
    }

    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      if (existing.quantity >= product.stock) {
        addNotification({ title: "Stock Limit", description: `Only ${product.stock} units available.`, type: "warning" })
        return
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        // Re-validate stock
        if (delta > 0 && newQty > item.stock) {
          addNotification({ title: "Stock Limit", description: "Insufficient stock.", type: "warning" })
          return item
        }
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  // ─── Logic: Hold/Draft Sale ───────────────────────────────────────────────
  const holdCurrentSale = () => {
    if (cart.length === 0) return
    
    const newHold = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      customer,
      discount,
      timestamp: new Date().toLocaleTimeString(),
      label: customer?.name || `Walk-in #${heldOrders.length + 1}`
    }
    
    setHeldOrders([newHold, ...heldOrders])
    setCart([])
    setCustomer(null)
    setDiscount(0)
    
    addNotification({
      title: "Order Held",
      description: `Transaction for ${newHold.label} moved to queue.`,
      type: "info"
    })
  }

  const restoreSale = (heldOrder: any) => {
    if (cart.length > 0 && !confirm("Current cart will be cleared. Continue?")) return
    
    setCart(heldOrder.items)
    setCustomer(heldOrder.customer)
    setDiscount(heldOrder.discount)
    setHeldOrders(heldOrders.filter(o => o.id !== heldOrder.id))
    setShowHeldOrders(false)
    
    addNotification({
      title: "Order Restored",
      description: `Resumed checkout for ${heldOrder.label}.`,
      type: "success"
    })
  }

  // ─── Logic: Checkout ──────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (cart.length === 0) return
    setIsProcessing(true)
    
    try {
      const payload = {
        items: cart.map(i => ({ productId: i.id, quantity: i.quantity })), // Send raw IDs/Quantities
        paymentMethod,
        amountPaid,
        customerId: customer?.id || null,
        taxRate: 5, // Fixed 5% GST (Backend will re-verify)
        discount: discount // Requested discount (Backend will re-verify permissions)
      }

      // 1. Submit to Authoritative Backend
      const res = await api("/orders", { method: "POST", body: JSON.stringify(payload) })
      const result = await res.json()

      if (!result.success) throw new Error(result.message)

      addNotification({
        title: "Sale Completed",
        description: `Invoice ${result.order?.orderNumber || "INV-NEW"} generated.`,
        type: "success"
      })

      // Set last sale for receipt
      setLastSale({ 
        ...payload, 
        total: result.order?.totalAmount || grandTotal,
        invoiceNumber: result.order?.orderNumber || "INV-NEW", 
        id: result.order?._id 
      })
      setShowReceiptModal(true)

      // Reset
      setCart([])
      setDiscount(0)
      setAmountPaid(0)
      setCustomer(null)

    } catch (error) {
      addNotification({ title: "Checkout Failed", description: "Server error during sale sync.", type: "error" })
    } finally {
      setIsProcessing(false)
    }
  }

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = activeCategory === "All" || p.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="flex flex-col xl:flex-row gap-4 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in duration-500">
      
      {/* ─── ZONE 1: Product Discovery (30%) ─── */}
      <div className="xl:w-[30%] flex flex-col gap-4 overflow-hidden h-full">
         <Card className="rounded-[2rem] border-slate-200 shadow-xl shadow-slate-100 flex flex-col overflow-hidden h-full">
            <CardHeader className="pb-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="pos-search"
                    placeholder="Search Products (F2)..." 
                    className="pl-10 h-11 rounded-xl bg-slate-50 border-none font-bold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Scan className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
               </div>
               

            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar pt-0 space-y-4">
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {["All", "Mobiles", "Screens", "Batteries", "Spares"].map(cat => (
                    <Badge 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap border-none font-bold text-[10px] uppercase tracking-widest",
                        activeCategory === cat ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {cat}
                    </Badge>
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-3">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-40 rounded-2xl bg-slate-50 animate-pulse" />)
                  ) : filteredProducts.map(product => (
                    <button 
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="group flex flex-col p-3 rounded-2xl bg-white border border-slate-100 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden"
                    >
                       <div className="aspect-square rounded-xl bg-slate-50 mb-3 flex items-center justify-center text-slate-200 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                          <Package size={24} />
                       </div>
                       <h4 className="text-[11px] font-black uppercase text-slate-900 line-clamp-1">{product.name}</h4>
                       <div className="flex flex-col gap-0.5 mb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{product.sku}</p>
                          {/* Module specific badges */}
                          {enabledModules.includes("EXPIRY_TRACKING") && product.industryMetadata?.expiryDate && (
                             <Badge variant="outline" className="text-[7px] font-black uppercase text-amber-500 border-amber-200 px-1 py-0 h-3 w-fit">
                                Exp: {product.industryMetadata.expiryDate}
                             </Badge>
                          )}
                          {enabledModules.includes("COMPATIBILITY") && product.industryMetadata?.partNumber && (
                             <Badge variant="outline" className="text-[7px] font-black uppercase text-blue-500 border-blue-200 px-1 py-0 h-3 w-fit">
                                {product.industryMetadata.partNumber}
                             </Badge>
                          )}
                       </div>
                       <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-black text-primary">Rs {product.sellingPrice?.toLocaleString()}</span>
                          <Badge variant="outline" className={cn("text-[8px] px-1.5 py-0 border-none", product.stock < 10 ? "text-danger" : "text-success")}>
                             {product.stock} In Stock
                          </Badge>
                       </div>
                    </button>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

      {/* ─── ZONE 2: Cart Engine (40%) ─── */}
      <div className="xl:w-[40%] flex flex-col gap-4 overflow-hidden h-full">
         <Card className="rounded-[2rem] border-slate-200 shadow-xl shadow-slate-100 flex flex-col overflow-hidden h-full">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-4">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                     <ShoppingCart size={20} />
                  </div>
                  <div>
                     <h3 className="font-black text-sm uppercase tracking-tight">Cart Items</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">{cart.length} Products Added</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => setShowHeldOrders(!showHeldOrders)} 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5 flex items-center gap-2"
                  >
                    <PauseCircle size={14} />
                    Held ({heldOrders.length})
                  </Button>
                  <Button onClick={() => setCart([])} variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-danger hover:bg-danger/5">Clear Cart</Button>
               </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0 relative">
               {/* Suspended Transaction Queue UI Overlay */}
               {showHeldOrders && (
                 <div className="absolute inset-0 z-50 bg-white p-6 space-y-4 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Held Orders Queue</h3>
                       <button onClick={() => setShowHeldOrders(false)}><X className="text-slate-400" size={18} /></button>
                    </div>
                    {heldOrders.length === 0 ? (
                      <div className="text-center py-10 opacity-30">
                         <Clock size={40} className="mx-auto mb-2" />
                         <p className="text-[10px] font-black uppercase">Queue is empty</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                         {heldOrders.map(order => (
                           <div key={order.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-primary transition-all">
                              <div className="flex items-center gap-3">
                                 <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400"><Package size={16} /></div>
                                 <div>
                                    <p className="text-sm font-black text-slate-900">{order.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.items.length} Items • {order.timestamp}</p>
                                 </div>
                              </div>
                              <Button onClick={() => restoreSale(order)} variant="primary" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Resume</Button>
                           </div>
                         ))}
                      </div>
                    )}
                 </div>
               )}

               {cart.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center opacity-30 text-center p-8">
                    <ShoppingCart size={64} className="mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">Scanning Terminal Ready</p>
                    <p className="text-[10px] font-medium mt-1">Start adding items to generate invoice.</p>
                 </div>
               ) : (
                 <div className="divide-y divide-slate-50">
                    {cart.map(item => (
                      <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors group">
                         <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-slate-900 line-clamp-1">{item.name}</h4>
                            <div className="flex items-center gap-2">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Rs {item.sellingPrice.toLocaleString()} / unit</p>
                               {enabledModules.includes("EXPIRY_TRACKING") && item.industryMetadata?.batchNumber && (
                                  <Badge variant="outline" className="text-[7px] font-black uppercase text-amber-600 bg-amber-50/50 border-amber-100 px-1 py-0 h-3">
                                     Batch: {item.industryMetadata.batchNumber}
                                  </Badge>
                               )}
                               {enabledModules.includes("COMPATIBILITY") && item.industryMetadata?.partNumber && (
                                  <Badge variant="outline" className="text-[7px] font-black uppercase text-blue-600 bg-blue-50/50 border-blue-100 px-1 py-0 h-3">
                                     Part: {item.industryMetadata.partNumber}
                                  </Badge>
                               )}
                            </div>
                         </div>
                         <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                            <button onClick={() => updateQty(item.id, -1)} className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-white text-slate-500"><Minus size={14} /></button>
                            <input 
                              type="number" 
                              value={item.quantity} 
                              readOnly
                              className="w-8 text-center bg-transparent text-xs font-black focus:outline-none" 
                            />
                            <button onClick={() => updateQty(item.id, 1)} className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-white text-slate-500"><Plus size={14} /></button>
                         </div>
                         <div className="w-24 text-right">
                            <p className="text-sm font-black text-primary">Rs {(item.sellingPrice * item.quantity).toLocaleString()}</p>
                         </div>
                         <button onClick={() => removeFromCart(item.id)} className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-danger hover:bg-danger/5 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                      </div>
                    ))}
                 </div>
               )}
            </CardContent>
            <div className="p-6 border-t border-slate-50 bg-slate-50/30">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300"><User size={20} /></div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Customer</p>
                        <p className="text-xs font-bold text-slate-900">{customer?.name || "Walk-in Customer"}</p>
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg text-[9px] font-black uppercase border-slate-200">Select Customer</Button>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span className="text-slate-900">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                     <span>Tax (GST 5%)</span>
                     <span className="text-success">+ Rs {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                     <span>Discount</span>
                     <div className="flex items-center gap-2">
                        <span className="text-danger">- Rs {discount.toLocaleString()}</span>
                        <button className="text-slate-300 hover:text-primary"><Plus size={12} /></button>
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      {/* ─── ZONE 3: Checkout Panel (30%) ─── */}
      <div className="xl:w-[30%] flex flex-col gap-4 overflow-hidden h-full">
         <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white shadow-2xl flex flex-col overflow-hidden h-full relative">
            
            <div className="p-8 border-b border-white/5 space-y-2">
               <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 text-center mb-4">Final Payable Amount</p>
               <h2 className="text-5xl font-black text-center text-primary tracking-tighter">
                  <span className="text-xl text-slate-500 mr-2 uppercase">Rs</span>
                  {grandTotal.toLocaleString()}
               </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
               
               {/* Payment Method Selector */}
               <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Payment Logic</Label>
                  <div className="grid grid-cols-2 gap-3">
                     {PAYMENT_METHODS.map(method => (
                        <button 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border transition-all text-left",
                            paymentMethod === method.id 
                              ? "bg-white text-slate-900 border-white shadow-xl shadow-white/5" 
                              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                          )}
                        >
                           <method.icon size={20} className={paymentMethod === method.id ? `text-${method.color}` : ""} />
                           <span className="text-[10px] font-black uppercase tracking-widest">{method.label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Amount Input */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cash Received</Label>
                     <button onClick={() => setAmountPaid(grandTotal)} className="text-[10px] font-black uppercase text-primary hover:underline">Exact Amount</button>
                  </div>
                  <div className="relative">
                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                     <Input 
                        type="number"
                        placeholder="0.00"
                        className="h-16 pl-12 rounded-2xl bg-white/5 border-white/10 text-2xl font-black text-white focus:bg-white/10"
                        value={amountPaid || ""}
                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                     />
                  </div>
                  
                  {changeDue > 0 && (
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase text-primary">Return Change</span>
                       <span className="text-xl font-black text-white">Rs {changeDue.toLocaleString()}</span>
                    </div>
                  )}
               </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl border-t border-white/5 space-y-4">
               <div className="flex gap-3">
                  <Button 
                    onClick={holdCurrentSale}
                    variant="ghost" 
                    className="flex-1 h-16 rounded-2xl border border-white/10 text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest gap-2"
                  >
                     <PauseCircle size={20} />
                     Hold (F8)
                  </Button>
                  <Button 
                    disabled={isProcessing || cart.length === 0}
                    onClick={handleCheckout}
                    className="flex-[2] h-16 rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-2xl shadow-primary/30 gap-2"
                  >
                     {isProcessing ? "Processing..." : <><Zap size={20} /> Complete Sale (F9)</>}
                  </Button>
               </div>
               <div className="flex items-center justify-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                     <Printer size={16} /> Print
                  </button>
                  <div className="w-px h-4 bg-white/10" />
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                     <Share2 size={16} /> WhatsApp
                  </button>
                  <div className="w-px h-4 bg-white/10" />
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                     <FileText size={16} /> PDF
                  </button>
               </div>
            </div>

            {/* Hotkey Indicator */}
            <div className="absolute bottom-1 left-8">
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">Terminal ID: T-PRO-PAK-01</p>
            </div>
         </Card>
      </div>

      {/* ─── Receipt Modal (Phase 2E) ─── */}
      {showReceiptModal && lastSale && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
           <Card className="w-full max-w-lg rounded-[3rem] bg-white overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <CardHeader className="text-center pb-2">
                 <div className="mx-auto w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900">Sale Confirmed</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Invoice #{lastSale.invoiceNumber}</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                       <span>Grand Total</span>
                       <span className="text-slate-900">Rs {lastSale.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-black uppercase text-slate-400">
                       <span>Amount Paid</span>
                       <span className="text-success">Rs {lastSale.amountPaid.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between text-lg font-black text-slate-900">
                       <span>Change Due</span>
                       <span className="text-primary">Rs {(lastSale.amountPaid - lastSale.total).toLocaleString()}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => window.print()}
                      variant="primary" 
                      className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-2 shadow-xl shadow-primary/20"
                    >
                       <Printer size={18} /> Print Thermal
                    </Button>
                    <Button 
                      onClick={() => {
                        const msg = `*Invoice: ${lastSale.invoiceNumber}*\nTotal: Rs ${lastSale.total.toLocaleString()}\nThank you for shopping at TijaratPro!`;
                        window.open(`https://wa.me/${customer?.phone || ""}?text=${encodeURIComponent(msg)}`, "_blank");
                      }}
                      variant="outline" 
                      className="h-14 rounded-2xl border-success/20 text-success hover:bg-success/5 font-black uppercase text-[10px] tracking-widest gap-2"
                    >
                       <Share2 size={18} /> WhatsApp
                    </Button>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="ghost" className="h-12 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 gap-2">
                       <FileText size={16} /> PDF Download
                    </Button>
                    <Button variant="ghost" className="h-12 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 gap-2">
                       <User size={16} /> Email Receipt
                    </Button>
                 </div>

                 <Button 
                  onClick={() => setShowReceiptModal(false)}
                  variant="ghost" 
                  className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-slate-100 mt-2"
                 >
                    Close & New Sale
                 </Button>
              </CardContent>
           </Card>

           {/* Hidden Printable Invoice (Thermal 80mm style) */}
           <div className="hidden print:block fixed inset-0 bg-white p-8 text-black font-mono text-[12px] w-[80mm]">
              <div className="text-center mb-4">
                 <h1 className="text-lg font-bold">TIJARAT PRO</h1>
                 <p>Pakistan's Premium Retail</p>
                 <p className="text-[10px]">Contact: 0300-1234567</p>
              </div>
              <div className="h-px my-2 bg-black" />
              <div className="flex justify-between mb-2 font-bold">
                 <span>INV: {lastSale.invoiceNumber}</span>
                 <span>{lastSale.timestamp.split("T")[0]}</span>
              </div>
              <div className="h-px my-2 bg-black" />
              <div className="space-y-1 mb-4">
                 {lastSale.items.map((item: any) => (
                   <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.sellingPrice * item.quantity).toLocaleString()}</span>
                   </div>
                 ))}
              </div>
              <div className="h-px my-2 bg-black border-dashed border-t" />
              <div className="space-y-1 text-right">
                 <p>Subtotal: {lastSale.subtotal.toLocaleString()}</p>
                 <p>Tax: {lastSale.tax.toLocaleString()}</p>
                 <p className="font-bold text-sm">TOTAL: {lastSale.total.toLocaleString()}</p>
                 <p>Paid: {lastSale.amountPaid.toLocaleString()}</p>
                 <p>Change: {(lastSale.amountPaid - lastSale.total).toLocaleString()}</p>
              </div>
              <div className="h-px my-4 bg-black" />
              <p className="text-center text-[10px]">Thank you for your business!</p>
              <p className="text-center text-[8px] mt-2 italic">Powered by TijaratPro SaaS</p>
           </div>
        </div>
      )}

    </div>
  )
}
