"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  History, 
  Save, 
  Eye, 
  Plus,
  Trash2,
  Globe,
  Settings,
  Briefcase,
  Wallet,
  Star,
  Smartphone
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

export default function CustomerCreatePage() {
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
             Back to CRM
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Register New Customer
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <History size={18} />
             View Logs
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Create Customer
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Core Identity (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Basic Profile */}
           <SectionCard title="Business Profile" description="Legal name and primary contact details for the account.">
              <div className="grid gap-6 py-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Full Name / Contact Person</Label>
                       <Input leftIcon={<User />} placeholder="e.g. Zeeshan Haider" className="h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Business Name (Optional)</Label>
                       <Input leftIcon={<Building2 />} placeholder="e.g. Haider Mobile Center" className="h-12" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Primary Phone (WhatsApp)</Label>
                       <Input leftIcon={<Smartphone />} placeholder="+92 3XX XXXXXXX" className="h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Email Address</Label>
                       <Input leftIcon={<Mail />} placeholder="customer@example.com" className="h-12" />
                    </div>
                 </div>
              </div>
           </SectionCard>

           {/* Section 2: Address & Logistics */}
           <SectionCard title="Shipping & Logistics" description="Where should orders be delivered?">
              <div className="space-y-6 py-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">City / Region</Label>
                       <Select defaultValue="lahore">
                         <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                           <SelectValue placeholder="Select City" />
                         </SelectTrigger>
                         <SelectContent className="rounded-xl border-[var(--border)]">
                           <SelectItem value="lahore">Lahore, Punjab</SelectItem>
                           <SelectItem value="karachi">Karachi, Sindh</SelectItem>
                           <SelectItem value="islamabad">Islamabad, ICT</SelectItem>
                           <SelectItem value="faisalabad">Faisalabad, Punjab</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Postal Code / Area Code</Label>
                       <Input leftIcon={<MapPin />} placeholder="54000" className="h-12" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Complete Address</Label>
                    <Textarea 
                      leftIcon={<MapPin />}
                      placeholder="Shop #, Building, Street, Main Market..." 
                      className="min-h-[100px]" 
                    />
                 </div>
              </div>
           </SectionCard>

           {/* Section 3: Financial Settings */}
           <SectionCard title="Financial Controls" description="Configure credit limits and payment terms for this account.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Credit Limit (Rs)</Label>
                    <Input leftIcon={<Wallet />} defaultValue="50,000" className="h-12 font-black text-primary" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Payment Terms</Label>
                    <Select defaultValue="net30">
                       <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Select Terms" />
                       </SelectTrigger>
                       <SelectContent className="rounded-xl border-[var(--border)]">
                         <SelectItem value="cod">Cash on Delivery</SelectItem>
                         <SelectItem value="net15">Net 15 Days</SelectItem>
                         <SelectItem value="net30">Net 30 Days</SelectItem>
                         <SelectItem value="advance">Advance Payment Only</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                       <ShieldCheck size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-primary">Risk Assessment</p>
                       <p className="text-xs font-bold text-[var(--text-main)]">"This customer will be flagged if their balance exceeds Rs 50,000."</p>
                    </div>
                 </div>
                 <Badge variant="outline" className="text-[9px] uppercase font-black border-primary/20 text-primary">Standard Risk</Badge>
              </div>
           </SectionCard>

        </div>

        {/* Right Column: Meta & Preferences (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <Star size={20} className="text-warning" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Customer Tier</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Segmentation Logic</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="space-y-4">
                    {["Wholesale Partner", "Retail Customer", "VIP / Corporate", "Service Center"].map((tier, i) => (
                      <div key={tier} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group", i === 0 ? "bg-primary/10 border-primary shadow-lg shadow-primary/5" : "border-[var(--border)] hover:border-primary/50")}>
                         <div className="flex items-center gap-3">
                            <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-primary" : "bg-slate-300")} />
                            <span className={cn("text-sm font-bold", i === 0 ? "text-primary" : "text-[var(--text-soft)]")}>{tier}</span>
                         </div>
                         {i === 0 && <ShieldCheck size={16} className="text-primary" />}
                      </div>
                    ))}
                 </div>
                 <div className="p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-dashed border-[var(--border)]">
                    <p className="text-[10px] font-medium text-[var(--text-soft)] leading-relaxed text-center">
                       "Selecting **Wholesale Partner** will automatically apply trade pricing (15% discount) to all invoices."
                    </p>
                 </div>
              </CardContent>
           </Card>

           <SectionCard title="Verification Info">
              <div className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Tax ID / NTN</Label>
                    <Input placeholder="XXXXXXX-X" className="h-10" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">CNIC Number</Label>
                    <Input placeholder="XXXXX-XXXXXXX-X" className="h-10" />
                 </div>
              </div>
           </SectionCard>

           <Card className="rounded-[32px] border-none bg-indigo-900 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 rounded-2xl bg-white/10 w-fit">
                    <Globe size={24} className="text-indigo-400" />
                 </div>
                 <h4 className="text-lg font-black font-heading tracking-tight">Geo-Targeting</h4>
                 <p className="text-xs text-indigo-200 font-medium leading-relaxed">
                    "Assign this customer to a specific sales territory for accurate regional performance reporting."
                 </p>
                 <Button variant="link" className="text-indigo-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest">Configure Regions</Button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
           </Card>

        </div>

      </div>

    </div>
  )
}
