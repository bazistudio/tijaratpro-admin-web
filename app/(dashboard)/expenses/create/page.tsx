"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Receipt, 
  DollarSign, 
  Calendar, 
  Tag, 
  FileText, 
  Save, 
  Plus, 
  Trash2, 
  Wallet, 
  CreditCard, 
  History, 
  AlertCircle, 
  TrendingDown, 
  Clock, 
  Upload,
  X,
  Building2,
  Users
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

export default function ExpenseCreatePage() {
  const router = useRouter()
  const [isRecurring, setIsRecurring] = React.useState(false)
  
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
             Back to Expenses
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Log Operational Outflow
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <History size={18} />
             View History
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Save Expense
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Core Expense Data (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Basic Details */}
           <SectionCard title="Expense Particulars" description="Define the purpose and cost of this outflow.">
              <div className="grid gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Expense Title / Reason</Label>
                    <Input leftIcon={<FileText />} placeholder="e.g. Hall Road Office Electricity Bill - Oct" className="h-12" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Amount (Rs)</Label>
                       <Input leftIcon={<DollarSign />} defaultValue="15,400" className="h-12 font-black text-danger" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Expense Category</Label>
                       <Select defaultValue="utilities">
                         <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                           <SelectValue placeholder="Select Category" />
                         </SelectTrigger>
                         <SelectContent className="rounded-xl border-[var(--border)]">
                           <SelectItem value="utilities">Utilities (Elec/Water/Net)</SelectItem>
                           <SelectItem value="rent">Rent / Property Lease</SelectItem>
                           <SelectItem value="salaries">Staff Salaries & Bonuses</SelectItem>
                           <SelectItem value="logistics">Shipping & Logistics</SelectItem>
                           <SelectItem value="marketing">Marketing & Ads</SelectItem>
                           <SelectItem value="others">Miscellaneous Expenses</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                 </div>
              </div>
           </SectionCard>

           {/* Section 2: Payment & Documentation */}
           <SectionCard title="Verification & Source" description="How was this paid and where is the proof?">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Payment Source</Label>
                    <Select defaultValue="cash">
                       <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                         <SelectValue placeholder="Select Wallet/Account" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="cash">Business Petty Cash</SelectItem>
                         <SelectItem value="hbl">HBL Corporate Account</SelectItem>
                         <SelectItem value="easypaisa">EasyPaisa Business Wallet</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Reference / Bill ID</Label>
                    <Input leftIcon={<Receipt />} placeholder="e.g. BILL-9924-X" className="h-12" />
                 </div>
              </div>
              <div className="space-y-2 pt-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Receipt Upload (Scan/Photo)</Label>
                 <div className="h-32 rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2 bg-[var(--bg-secondary)]/20 cursor-pointer group">
                    <Upload size={24} className="text-[var(--text-soft)] group-hover:text-primary transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Click to Upload JPG/PDF</span>
                 </div>
              </div>
           </SectionCard>

        </div>

        {/* Right Column: Scheduling & Impact (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Schedule</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Recurrence Logic</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--text-soft)]">Recurring Expense?</span>
                    <button 
                      onClick={() => setIsRecurring(!isRecurring)}
                      className={cn("w-12 h-6 rounded-full transition-all relative p-1", isRecurring ? "bg-primary" : "bg-slate-200")}
                    >
                       <div className={cn("w-4 h-4 bg-white rounded-full transition-all", isRecurring ? "ml-6" : "ml-0")} />
                    </button>
                 </div>
                 {isRecurring && (
                   <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <Select defaultValue="monthly">
                         <SelectTrigger className="h-10">
                            <SelectValue placeholder="Frequency" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="weekly">Every Week</SelectItem>
                            <SelectItem value="monthly">Every Month</SelectItem>
                            <SelectItem value="quarterly">Every Quarter</SelectItem>
                         </SelectContent>
                      </Select>
                      <p className="text-[10px] font-medium text-primary">"System will auto-generate a draft for this expense on the 1st of every month."</p>
                   </div>
                 )}
                 <div className="pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3 text-danger mb-2">
                       <TrendingDown size={18} />
                       <h5 className="font-black text-[10px] uppercase tracking-widest">Burn Rate Impact</h5>
                    </div>
                    <p className="text-[11px] font-bold text-[var(--text-main)]">
                       This expense increases your current month's burn rate by **4.2%**.
                    </p>
                 </div>
              </CardContent>
           </Card>

           <SectionCard title="Quick Suggestions">
              <div className="space-y-3 py-4">
                 {[
                   { label: "Hall Road Rent", icon: Building2, amount: "Rs 45,000" },
                   { label: "Staff Lunch", icon: Users, amount: "Rs 1,200" },
                   { label: "Petrol / Logistics", icon: Wallet, amount: "Rs 3,500" },
                 ].map((s) => (
                   <div key={s.label} className="p-3 rounded-xl border border-[var(--border)] hover:bg-primary/5 hover:border-primary/20 cursor-pointer transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                         <s.icon size={14} className="text-[var(--text-soft)]" />
                         <span className="text-xs font-bold text-[var(--text-soft)] group-hover:text-[var(--text-main)]">{s.label}</span>
                      </div>
                      <span className="text-[10px] font-black text-danger">{s.amount}</span>
                   </div>
                 ))}
              </div>
           </SectionCard>

           <Card className="rounded-[32px] border-none bg-danger/90 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 rounded-2xl bg-white/10 w-fit">
                    <AlertCircle size={24} />
                 </div>
                 <h4 className="text-lg font-black font-heading tracking-tight">Audit Alert</h4>
                 <p className="text-xs text-white/70 font-medium leading-relaxed">
                    "Expenses over Rs 10,000 without a receipt upload will be flagged for Managerial Review."
                 </p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
           </Card>

        </div>

      </div>

    </div>
  )
}
