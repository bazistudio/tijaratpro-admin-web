"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Truck, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  DollarSign, 
  CreditCard, 
  FileText, 
  Save, 
  Plus, 
  ShieldCheck, 
  History,
  Smartphone,
  Banknote,
  Package,
  Calendar,
  Box
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SupplierCreatePage() {
  const router = useRouter()
  
  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-soft)] hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Suppliers
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Onboard New Supplier
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <History size={18} />
             Vendor Logs
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Register Supplier
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Vendor Identity (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Company Profile */}
           <SectionCard title="Company Identity" description="Official company details and registration info.">
              <div className="grid gap-6 py-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Company Name</Label>
                       <Input leftIcon={<Building2 />} placeholder="e.g. Shenzhen Electronics Ltd." className="h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Primary Representative</Label>
                       <Input leftIcon={<User />} placeholder="e.g. John Chen" className="h-12" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Contact Number (Intl.)</Label>
                       <Input leftIcon={<Smartphone />} placeholder="+86 1XX XXXXXXX" className="h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Business Email</Label>
                       <Input leftIcon={<Mail />} placeholder="sales@shenzhen-tech.cn" className="h-12" />
                    </div>
                 </div>
              </div>
           </SectionCard>

           {/* Section 2: Financials & Banking */}
           <SectionCard title="Financial Configuration" description="How and when do you pay this vendor?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Preferred Currency</Label>
                    <Select defaultValue="usd">
                       <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Select Currency" />
                       </SelectTrigger>
                       <SelectContent className="rounded-xl border-[var(--border)]">
                         <SelectItem value="pkr">Pakistani Rupee (PKR)</SelectItem>
                         <SelectItem value="usd">US Dollar (USD)</SelectItem>
                         <SelectItem value="cny">Chinese Yuan (CNY)</SelectItem>
                         <SelectItem value="aed">UAE Dirham (AED)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Payment Terms</Label>
                    <Select defaultValue="advance">
                       <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Select Terms" />
                       </SelectTrigger>
                       <SelectContent className="rounded-xl border-[var(--border)]">
                         <SelectItem value="advance">Full Advance (100%)</SelectItem>
                         <SelectItem value="partial">50% Advance / 50% Delivery</SelectItem>
                         <SelectItem value="credit">Credit (Net 30)</SelectItem>
                         <SelectItem value="lc">Letter of Credit (L/C)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
              </div>
              <div className="space-y-2 pt-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Bank / Transfer Details</Label>
                 <Textarea 
                    leftIcon={<Banknote />}
                    placeholder="IBAN, Swift Code, Bank Name, Branch..." 
                    className="min-h-[80px]" 
                 />
              </div>
           </SectionCard>

           {/* Section 3: Sourcing & Logstics */}
           <SectionCard title="Logistics & Sourcing" description="Lead times and origin tracking.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Supplier Type</Label>
                    <Select defaultValue="intl">
                       <SelectTrigger className="h-10 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Type" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="local">Domestic (Pakistan)</SelectItem>
                         <SelectItem value="intl">International (Import)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Avg. Lead Time (Days)</Label>
                    <Input leftIcon={<Calendar />} defaultValue="15" className="h-10" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Port of Origin</Label>
                    <Input leftIcon={<Globe />} placeholder="e.g. Ningbo, China" className="h-10" />
                 </div>
              </div>
           </SectionCard>

        </div>

        {/* Right Column: Categorization & Risk (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <Package size={20} className="text-primary" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Category Focus</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">What do they supply?</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                 {[
                   { label: "OLED Screens", icon: Smartphone },
                   { label: "Power Batteries", icon: Banknote },
                   { label: "IC & Motherboards", icon: Box },
                   { label: "Optical Glass", icon: Globe },
                 ].map((cat, i) => (
                   <div key={cat.label} className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] hover:border-primary/50 cursor-pointer transition-all group">
                      <div className="flex items-center gap-3">
                         <cat.icon size={16} className="text-[var(--text-soft)] group-hover:text-primary" />
                         <span className="text-sm font-bold text-[var(--text-soft)] group-hover:text-[var(--text-main)]">{cat.label}</span>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] group-hover:border-primary" />
                   </div>
                 ))}
              </CardContent>
           </Card>

           <SectionCard title="Compliance Info">
              <div className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Vat / Tax ID</Label>
                    <Input placeholder="CN-XXXXXXXX" className="h-10" />
                 </div>
                 <div className="p-4 rounded-2xl bg-success/5 border border-success/10">
                    <div className="flex items-center gap-3 mb-2 text-success">
                       <ShieldCheck size={18} />
                       <h5 className="font-black text-[10px] uppercase tracking-widest">Verified Vendor</h5>
                    </div>
                    <p className="text-[9px] font-medium text-success/70 leading-relaxed">
                       "Suppliers with complete compliance documentation are prioritized in automated purchase ordering."
                    </p>
                 </div>
              </div>
           </SectionCard>

           <Card className="rounded-[32px] border-none bg-primary/90 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 rounded-2xl bg-white/10 w-fit">
                    <Truck size={24} />
                 </div>
                 <h4 className="text-lg font-black font-heading tracking-tight">Supply Reliability</h4>
                 <p className="text-xs text-white/70 font-medium leading-relaxed">
                    "This vendor has a historical delivery accuracy of **98.2%**. Ideal for bulk procurement."
                 </p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
           </Card>

        </div>

      </div>

    </div>
  )
}
