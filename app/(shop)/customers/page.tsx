"use client"

import * as React from "react"
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  UserPlus, 
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  FileText,
  History,
  TrendingUp,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Trophy
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const CUSTOMER_STATS = [
  { title: "Total Customers", value: "842", trend: { value: 5, label: "vs last month" }, icon: Users, color: "primary" },
  { title: "Loyal Customers", value: "156", trend: { value: 12, label: "Recurring buyers" }, icon: UserCheck, color: "success" },
  { title: "Credit Customers", value: "42", trend: { value: -2, label: "Pending dues" }, icon: CreditCard, color: "warning" },
  { title: "New This Month", value: "28", trend: { value: 15, label: "New registrations" }, icon: UserPlus, color: "info" },
]

const CUSTOMERS = [
  { 
    id: "CUST-001", 
    name: "Muhammad Bilal", 
    phone: "0300-1234567", 
    email: "bilal@mobile-link.com", 
    totalPurchases: "Rs 145,200", 
    pendingBalance: "Rs 0", 
    lastOrder: "2024-05-13", 
    status: "Active" 
  },
  { 
    id: "CUST-002", 
    name: "Zubair Khan", 
    phone: "0321-7654321", 
    email: "zubair.parts@gmail.com", 
    totalPurchases: "Rs 89,500", 
    pendingBalance: "Rs 12,400", 
    lastOrder: "2024-05-12", 
    status: "Due" 
  },
  { 
    id: "CUST-003", 
    name: "Ali Raza", 
    phone: "0345-9876543", 
    email: "ali.tech@outlook.com", 
    totalPurchases: "Rs 210,000", 
    pendingBalance: "Rs 0", 
    lastOrder: "2024-05-13", 
    status: "Active" 
  },
  { 
    id: "CUST-004", 
    name: "Hassan Mahmood", 
    phone: "0312-5556667", 
    email: "hassan.repair@yahoo.com", 
    totalPurchases: "Rs 45,000", 
    pendingBalance: "Rs 5,500", 
    lastOrder: "2024-05-10", 
    status: "Due" 
  },
  { 
    id: "CUST-005", 
    name: "Omar Farooq", 
    phone: "0300-8889990", 
    email: "omar.farooq@shop.com", 
    totalPurchases: "Rs 12,400", 
    pendingBalance: "Rs 0", 
    lastOrder: "2024-05-11", 
    status: "Inactive" 
  },
]

const GROWTH_DATA = [
  { name: "Jan", count: 400 },
  { name: "Feb", count: 450 },
  { name: "Mar", count: 520 },
  { name: "Apr", count: 680 },
  { name: "May", count: 842 },
]

const LEADERBOARD = [
  { name: "Muhammad Bilal", spent: "Rs 145,200", orders: 24 },
  { name: "Ali Raza", spent: "Rs 122,500", orders: 18 },
  { name: "Zubair Khan", spent: "Rs 89,500", orders: 15 },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatCard = ({ title, value, trend, icon: Icon, color = "primary" }: any) => {
  const colorClasses: any = {
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
    info: "text-info bg-info/10 border-info/20",
    warning: "text-warning bg-warning/10 border-warning/20",
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

export default function CustomersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Customer Relations
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
            <p className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-widest">
              Business Network • Verified Mobile Dealers
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 rounded-xl font-bold gap-2">
            <Download size={16} />
            Export CRM Data
          </Button>
          <Button variant="primary" size="sm" className="h-10 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
            <Plus size={16} />
            Register Customer
          </Button>
        </div>
      </div>

      {/* CRM Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {CUSTOMER_STATS.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Table & Analytics */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search Bar */}
          <Card className="border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
                <Input placeholder="Search by name, phone, or email..." className="pl-10 h-11 rounded-xl bg-white/50 border-[var(--border)]" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl font-bold border-[var(--border)] bg-white/50 gap-2">
                <Filter size={18} />
                Advanced Filters
              </Button>
            </div>
          </Card>

          {/* Customers Table */}
          <SectionCard 
            title="Registered Business Partners" 
            className="border border-[var(--border)] shadow-xl shadow-slate-200/50"
            contentClassName="p-0"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Name</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Contact Info</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Purchases</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Balance</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Last Order</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider h-12 text-right">Profile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CUSTOMERS.map((customer) => (
                    <TableRow key={customer.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 transition-colors">
                      <TableCell className="font-bold text-sm text-[var(--text-main)]">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                            <Phone size={10} className="text-primary" /> {customer.phone}
                          </span>
                          <span className="text-[10px] text-[var(--text-soft)] font-medium">{customer.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-sm text-[var(--text-main)]">{customer.totalPurchases}</TableCell>
                      <TableCell>
                        <span className={cn("text-sm font-black", customer.pendingBalance !== "Rs 0" ? "text-danger" : "text-[var(--text-soft)]")}>
                          {customer.pendingBalance}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-[var(--text-soft)]">{customer.lastOrder}</TableCell>
                      <TableCell>
                        <Badge className={cn("rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-tight", {
                          "bg-success/10 text-success border-success/20": customer.status === "Active",
                          "bg-warning/10 text-warning border-warning/20": customer.status === "Due",
                          "bg-[var(--bg-secondary)] text-[var(--text-soft)] border-[var(--border)]": customer.status === "Inactive",
                        })}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5">
                              View Profile
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px] border-l border-[var(--border)] shadow-2xl backdrop-blur-3xl">
                            <SheetHeader className="pb-8 border-b border-[var(--border)]">
                              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                                <Users size={40} className="text-primary" />
                              </div>
                              <SheetTitle className="text-3xl font-black font-heading tracking-tight">{customer.name}</SheetTitle>
                              <SheetDescription className="text-sm font-bold uppercase tracking-widest text-primary">
                                Business Partner Profile • {customer.id}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-8 space-y-8 h-[calc(100vh-180px)] overflow-y-auto pr-2">
                              {/* Quick Info Grid */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                                  <p className="text-[10px] font-black uppercase text-[var(--text-soft)] mb-1">Total Purchases</p>
                                  <p className="text-lg font-black text-primary">{customer.totalPurchases}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                                  <p className="text-[10px] font-black uppercase text-[var(--text-soft)] mb-1">Pending Balance</p>
                                  <p className={cn("text-lg font-black", customer.pendingBalance !== "Rs 0" ? "text-danger" : "text-success")}>
                                    {customer.pendingBalance}
                                  </p>
                                </div>
                              </div>

                              {/* Contact & Address */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)] flex items-center gap-2">
                                  <MapPin size={14} /> Contact Details
                                </h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 text-sm font-bold">
                                    <Phone size={16} className="text-primary" />
                                    <span>{customer.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm font-bold">
                                    <Mail size={16} className="text-primary" />
                                    <span>{customer.email}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm font-bold">
                                    <MapPin size={16} className="text-primary" />
                                    <span>Plaza 45, Hall Road, Lahore</span>
                                  </div>
                                </div>
                              </div>

                              {/* Purchase History Preview */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)] flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <History size={14} /> Purchase History
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 text-[9px] font-black uppercase text-primary">View Full Ledger</Button>
                                </h4>
                                <div className="space-y-2">
                                  {[
                                    { date: "May 13, 2024", item: "iPhone 13 Screens x 5", amount: "Rs 65,000" },
                                    { date: "May 08, 2024", item: "Samsung Batteries x 10", amount: "Rs 45,000" },
                                    { date: "Apr 28, 2024", item: "Charging Ports Bulk", amount: "Rs 35,200" },
                                  ].map((order, i) => (
                                    <div key={i} className="p-3 rounded-xl border border-[var(--border)] bg-white/50 flex justify-between items-center hover:border-primary/30 transition-all">
                                      <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-[var(--text-main)]">{order.item}</p>
                                        <p className="text-[10px] text-[var(--text-soft)] font-medium">{order.date}</p>
                                      </div>
                                      <p className="text-xs font-black text-primary">{order.amount}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Notes */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)] flex items-center gap-2">
                                  <FileText size={14} /> Merchant Notes
                                </h4>
                                <div className="p-4 rounded-xl border border-warning/20 bg-warning/5 text-xs font-medium leading-relaxed italic text-warning-dark">
                                  "Wholesale buyer for North region. Prefers Cash on Delivery for high-value displays. Contact Muhammad Ali for verification."
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--border)] bg-white/80 backdrop-blur-md">
                              <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-11 rounded-xl font-bold">Edit Profile</Button>
                                <Button variant="primary" className="h-11 rounded-xl font-bold">Settle Balance</Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

        </div>

        {/* Right: Insights & Charts */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Customer Growth Chart */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                Network Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GROWTH_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--info)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--info)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} fontWeight={700} hide />
                  <YAxis stroke="var(--text-soft)" fontSize={10} fontWeight={700} hide />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[var(--card)] border border-[var(--border)] p-2 rounded-lg shadow-xl">
                            <p className="text-xs font-black text-info">{payload[0].value} Clients</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="var(--info)" strokeWidth={3} fillOpacity={1} fill="url(#growthGradient)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-[10px] font-black uppercase text-[var(--text-soft)]">Total Clients Acquired</p>
                <p className="text-2xl font-black text-info">842 <span className="text-xs text-success font-bold">+18%</span></p>
              </div>
            </CardContent>
          </Card>

          {/* Top Customers Leaderboard */}
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-xl shadow-slate-200/50">
            <CardHeader className="border-b border-[var(--border)]">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-[var(--text-main)] flex items-center gap-2">
                <Trophy size={16} className="text-warning fill-warning" />
                Top Partners
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {LEADERBOARD.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs", {
                        "bg-warning/10 text-warning": i === 0,
                        "bg-slate-200 text-slate-500": i === 1,
                        "bg-orange-100 text-orange-500": i === 2,
                      })}>
                        {i + 1}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-[var(--text-main)]">{item.name}</p>
                        <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-tight">{item.orders} Bulk Orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-primary">{item.spent}</p>
                      <p className="text-[9px] font-bold text-success uppercase">Platinum</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--bg-secondary)]/10">
                <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase text-primary hover:bg-primary/5">
                  Full Ranking Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Support Card */}
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-3xl shadow-xl shadow-primary/20 border-none relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Clock size={20} className="text-white" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">Retention</h4>
              </div>
              <h3 className="text-xl font-bold mb-2">Churn Risk: Low</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
                92% of your customers have made a purchase in the last 30 days. Your retention strategy is working effectively.
              </p>
              <Button variant="secondary" className="w-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-10 hover:bg-white/90">
                Contact Inactive
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
