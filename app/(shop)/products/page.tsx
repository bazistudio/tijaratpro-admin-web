"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Package, 
  AlertTriangle, 
  XCircle, 
  BarChart3, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Layers,
  Smartphone,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FileText,
  History,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { useNotificationStore } from "@/hooks/use-notifications"
import { Skeleton } from "@/components/ui/skeleton"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const INVENTORY_STATS = [
  { title: "Total Products", value: "1,284", trend: { value: 4, label: "vs last month" }, icon: Package, color: "primary" },
  { title: "Low Stock", value: "24 Items", trend: { value: -15, label: "Restock needed" }, icon: AlertTriangle, color: "warning" },
  { title: "Out of Stock", value: "8 Items", trend: { value: 2, label: "Critical" }, icon: XCircle, color: "danger" },
  { title: "Inventory Value", value: "Rs 8.4M", trend: { value: 12, label: "Asset growth" }, icon: BarChart3, color: "success" },
]

const LOW_STOCK_ALERTS = [
  { name: "S22 Ultra Battery", current: 5, min: 10, supplier: "Muhammad Ali" },
  { name: "Xiaomi Motherboard", current: 3, min: 5, supplier: "Zeeshan Ahmed" },
  { name: "Type-C Charging Port", current: 0, min: 20, supplier: "Bilal Hussain" },
]

const FAST_MOVING = [
  { name: "iPhone 15 Glass", growth: "+45%", sales: "240 units" },
  { name: "USB-C Cables", growth: "+32%", sales: "180 units" },
  { name: "Silicon Cases", growth: "+28%", sales: "150 units" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    danger: "text-danger bg-danger/10 border-danger/20",
  }

  return (
    <Card className="glass-card group overflow-hidden border-[var(--border)] transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-[var(--text-soft)]">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-xl border transition-colors", colorClasses[color])}>
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            trend.value >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {trend.value >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-[11px] font-medium text-[var(--text-soft)]">
            {trend.label}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const router = useRouter()
  const { addNotification } = useNotificationStore()
  const [products, setProducts] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await api("/products")
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
      // Fallback to mock for UI demonstration if API fails
      setProducts([
        { id: "1", name: "iPhone 13 Pro Max Screen", sku: "SCR-IP13-PM", category: "Display", stock: 15, sellingPrice: 18000, costPrice: 12000, status: "published" },
        { id: "2", name: "Samsung S22 Battery", sku: "BAT-S22-U", category: "Power", stock: 5, sellingPrice: 7500, costPrice: 4000, status: "published" }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    
    try {
      await api(`/products/${id}`, { method: "DELETE" })
      setProducts(prev => prev.filter(p => p.id !== id))
      addNotification({
        title: "Product Deleted",
        description: "The product and its stock history have been removed.",
        type: "success"
      })
    } catch (error) {
      addNotification({ title: "Error", description: "Failed to delete product.", type: "error" })
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Inventory Management
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Warehouse Control • Mobile Parts Specialist
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Download size={16} />
            Export Inventory
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Truck size={16} />
            Stock Intake
          </Button>
          <Button onClick={() => router.push("/products/create")} variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {INVENTORY_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Search, Filters & Products Table */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search + Filters Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input 
                  placeholder="Search by name, SKU or brand..." 
                  className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Category..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Brand..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </Card>

          {/* Products Table */}
          <SectionCard 
            title="Product Inventory List" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 w-[80px]">Preview</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Product Name</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">SKU</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Category</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-center">Stock</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Pricing</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-12 w-12 rounded-lg" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20 rounded-lg" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-[400px] text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                           <div className="p-6 rounded-full bg-slate-50 text-slate-300">
                              <Package size={64} />
                           </div>
                           <div className="space-y-1">
                              <p className="text-lg font-bold text-slate-900">No products found</p>
                              <p className="text-sm text-slate-500">Create your first product to start tracking inventory.</p>
                           </div>
                           <Button onClick={() => router.push("/products/create")} variant="primary" className="h-11 rounded-xl px-8 font-black uppercase text-[10px] tracking-widest gap-2">
                              <Plus size={18} /> Create First Product
                           </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                        <TableCell>
                          <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden flex items-center justify-center">
                            {product.thumbnail ? (
                              <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={16} className="text-[var(--text-soft)]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-sm text-[var(--text-main)] cursor-pointer hover:text-primary transition-colors" onClick={() => router.push(`/products/${product.id}`)}>
                          {product.name}
                        </TableCell>
                        <TableCell className="text-xs font-mono font-bold text-[var(--text-soft)] uppercase tracking-tighter">{product.sku}</TableCell>
                        <TableCell className="text-xs font-bold text-[var(--text-soft)]">{product.category || "General"}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn("text-sm font-black", {
                            "text-success": product.stock > 10,
                            "text-warning": product.stock <= 10 && product.stock > 0,
                            "text-danger": product.stock === 0,
                          })}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase leading-none mb-1">Rs {product.costPrice?.toLocaleString() || 0} Buy</span>
                            <span className="text-sm font-black text-primary leading-none">Rs {product.sellingPrice?.toLocaleString() || 0} Sell</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                            "bg-success/10 text-success border-success/20": product.stock > 10,
                            "bg-warning/10 text-warning border-warning/20": product.stock <= 10 && product.stock > 0,
                            "bg-danger/10 text-danger border-danger/20": product.stock === 0,
                          })}>
                            {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/5 text-[var(--text-soft)]">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                              <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Inventory Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => router.push(`/products/${product.id}/edit`)}
                                className="gap-2 px-3 py-2 rounded-lg cursor-pointer"
                              >
                                <FileText size={14} className="text-primary" />
                                <span className="font-bold text-sm">Edit Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => router.push(`/products/${product.id}`)}
                                className="gap-2 px-3 py-2 rounded-lg cursor-pointer"
                              >
                                <History size={14} className="text-info" />
                                <span className="font-bold text-sm">Stock Ledger</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 px-3 py-2 rounded-lg cursor-pointer text-danger focus:text-danger" onClick={() => handleDelete(product.id)}>
                                <XCircle size={14} />
                                <span className="font-bold text-sm">Remove Product</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--bg-secondary)]/10">
              <span className="text-xs font-bold text-[var(--text-soft)]">Total {products.length} Items Displayed</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold px-4" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold px-4" disabled>Next</Button>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right: Side Widgets */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Low Stock Alerts */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)] bg-danger/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-danger flex items-center gap-2">
                <AlertTriangle size={16} />
                Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {LOW_STOCK_ALERTS.map((alert, i) => (
                  <div key={i} className="p-4 hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-bold text-[var(--text-main)] group-hover:text-danger transition-colors">{alert.name}</p>
                      <Badge variant="outline" className="text-[9px] font-black uppercase text-danger border-danger/20">{alert.current} units</Badge>
                    </div>
                    <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase mb-3">Supplier: {alert.supplier}</p>
                    <Button variant="outline" size="sm" className="w-full h-8 text-[10px] font-black uppercase border-danger/20 text-danger hover:bg-danger/5">
                      Order Restock
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fast Moving Products */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="border-b border-[var(--border)] bg-success/5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-success flex items-center gap-2">
                <TrendingUp size={16} />
                Fast Moving
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {FAST_MOVING.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[var(--text-main)]">{item.name}</p>
                      <p className="text-[10px] font-black text-success uppercase tracking-widest">{item.growth} Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--text-soft)] uppercase">{item.sales}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--bg-secondary)]/10">
                <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase text-success hover:bg-success/5">
                  Full Analytics Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Widget */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-3xl shadow-xl shadow-blue-500/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Efficiency</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Turnover Optimized</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                Your average stock turnover is 14 days. This is 20% faster than last month. Keep optimizing your inventory levels.
              </p>
              <Button variant="secondary" className="w-full bg-white text-blue-600 font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                View Trends
              </Button>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
          </Card>

        </div>
      </div>
    </div>
  )
}
