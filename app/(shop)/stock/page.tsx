"use client"

import * as React from "react"
import { 
  Package, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  History, 
  Smartphone, 
  Box, 
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Tag,
  Warehouse,
  BarChart3,
  Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const STOCK_STATS = [
  { title: "Total Units", value: "14,250", sub: "Across all categories", icon: Package, color: "primary" },
  { title: "Low Stock Items", value: "24", sub: "Requires immediate reorder", icon: AlertTriangle, color: "danger" },
  { title: "Stock Value", value: "Rs 8.4M", sub: "Estimated current value", icon: TrendingUp, color: "success" },
  { title: "Inbound Today", value: "850", sub: "Supplier shipments", icon: Truck, color: "info" },
]

const STOCK_LEVELS = [
  { id: "STK-101", name: "iPhone 13 OLED Screen", category: "Screens", stock: 12, min: 20, status: "Low", value: "Rs 240,000" },
  { id: "STK-102", name: "Samsung S22 Battery", category: "Batteries", stock: 85, min: 30, status: "Healthy", value: "Rs 125,000" },
  { id: "STK-103", name: "iPhone 12 Housing (Blue)", category: "Housings", stock: 5, min: 10, status: "Critical", value: "Rs 45,000" },
  { id: "STK-104", name: "Charging Port Flex (Universal)", category: "Spares", stock: 1200, min: 200, status: "Overstock", value: "Rs 320,000" },
  { id: "STK-105", name: "Back Glass - 14 Pro Max", category: "Glass", stock: 42, min: 50, status: "Low", value: "Rs 68,000" },
]

const CATEGORY_CHART_DATA = [
  { name: "Screens", value: 450, color: "var(--primary)" },
  { name: "Batteries", value: 320, color: "var(--info)" },
  { name: "Spares", value: 1200, color: "var(--success)" },
  { name: "Housings", value: 180, color: "var(--warning)" },
  { name: "Glass", value: 95, color: "var(--danger)" },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    danger: "text-danger bg-danger/10 border-danger/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
  }

  return (
    <Card className="glass-card border-[var(--border)] group hover:shadow-xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className={cn("p-3 rounded-2xl border transition-transform group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
             <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-[var(--border)]">Inventory Pulse</Badge>
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">{title}</p>
             <h3 className="text-2xl font-black text-[var(--text-main)] font-heading">{value}</h3>
             <p className="text-[11px] font-bold text-[var(--text-soft)]">{sub}</p>
          </div>
       </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StockPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Inventory Core
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Stock Intelligence • Adjustment Ledgers • Multi-Warehouse Tracking
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-xl font-bold gap-2 border-[var(--border)] bg-white/50">
             <Download size={16} />
             Export Inventory
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
             <Plus size={16} />
             Manual Adjustment
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STOCK_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Category Breakdown */}
        <div className="lg:col-span-4">
           <SectionCard 
            title="Category Density" 
            description="Units distribution across major stock categories."
            className="border border-[var(--border)] h-[400px]"
            contentClassName="h-full p-6"
          >
             <ResponsiveContainer width="100%" height="90%">
                <BarChart data={CATEGORY_CHART_DATA} layout="vertical" margin={{ left: -20, right: 20 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" stroke="var(--text-soft)" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} width={80} />
                   <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                   <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {CATEGORY_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* Stock Movement Insights */}
        <div className="lg:col-span-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <Card className="border-[var(--border)] bg-slate-900 text-white rounded-[32px] p-6 flex flex-col justify-between overflow-hidden relative group">
                 <div className="relative z-10 space-y-4">
                    <div className="p-3 rounded-2xl bg-white/10 w-fit">
                       <Zap size={24} className="text-primary" />
                    </div>
                    <h4 className="text-lg font-black font-heading">Auto-Restock Intelligence</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                       "Based on 30-day velocity, **Samsung S-series batteries** will hit critical zero in 4 days. AI recommends generating a PO for 500 units today."
                    </p>
                    <Button variant="primary" className="w-full h-10 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
                       Generate PO
                    </Button>
                 </div>
                 <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
              </Card>

              <Card className="border-[var(--border)] bg-primary/5 rounded-[32px] p-6 flex flex-col justify-between">
                 <div className="space-y-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
                       <Warehouse size={24} />
                    </div>
                    <h4 className="text-lg font-black font-heading text-[var(--text-main)]">Warehouse Sync</h4>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[var(--text-soft)] uppercase tracking-tighter">Hall Road A</span>
                          <span className="font-black text-success">Online • 8.2k units</span>
                       </div>
                       <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[var(--text-soft)] uppercase tracking-tighter">Rafi Mansion B</span>
                          <span className="font-black text-warning">Syncing • 4.1k units</span>
                       </div>
                       <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[var(--text-soft)] uppercase tracking-tighter">Rawalpindi Hub</span>
                          <span className="font-black text-primary">Pending • 1.9k units</span>
                       </div>
                    </div>
                 </div>
                 <Button variant="ghost" className="w-full h-10 text-[10px] font-black uppercase tracking-widest text-primary">Manage Locations</Button>
              </Card>
           </div>
        </div>

      </div>

      {/* Stock Ledger */}
      <SectionCard 
        title="Inventory Matrix" 
        description="Detailed breakdown of stock levels, thresholds, and valuation for individual SKUs."
        className="border border-[var(--border)] shadow-xl"
        contentClassName="p-0"
      >
        <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
              <Input placeholder="Search inventory by SKU, name or category..." className="pl-10 h-10 rounded-xl bg-white/50" />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Filter size={16} />
                 Filter Levels
              </Button>
              <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
                 <Tag size={16} />
                 All Categories
              </Button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">SKU / Item</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Category</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Stock Level</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Min. Threshold</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Asset Value</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Health</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STOCK_LEVELS.map((item) => (
                <TableRow key={item.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <TableCell className="font-bold text-sm text-[var(--text-main)]">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                           <Smartphone size={14} />
                        </div>
                        <div>
                           <p className="font-black text-xs">{item.name}</p>
                           <p className="text-[9px] font-bold text-[var(--text-soft)] uppercase tracking-tighter">{item.id}</p>
                        </div>
                     </div>
                  </TableCell>
                  <TableCell>
                     <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded-lg border-none px-2">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-black text-sm text-[var(--text-main)]">
                     <div className="flex items-center gap-2">
                        {item.stock}
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                           <div 
                              className={cn("h-full", item.status === "Low" || item.status === "Critical" ? "bg-danger" : "bg-success")} 
                              style={{ width: `${Math.min((item.stock/item.min)*100, 100)}%` }} 
                           />
                        </div>
                     </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-[var(--text-soft)]">{item.min} Units</TableCell>
                  <TableCell className="font-black text-sm text-[var(--text-main)]">{item.value}</TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                      "bg-success/10 text-success border-success/20": item.status === "Healthy",
                      "bg-warning/10 text-warning border-warning/20": item.status === "Overstock",
                      "bg-danger/10 text-danger border-danger/20": item.status === "Low" || item.status === "Critical",
                    })}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/5">
                           <History size={14} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-[var(--text-soft)]">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--border)] shadow-2xl backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-[var(--text-soft)] px-3 py-2">Stock Control</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><Layers size={14} className="text-primary" /> Adjust Inventory</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><Truck size={14} className="text-info" /> Transfer Stock</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 font-bold text-sm"><AlertTriangle size={14} className="text-warning" /> Set Thresholds</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 font-bold text-sm text-danger"><Trash2 size={14} /> Remove SKU</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

    </div>
  )
}

function Trash2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}
