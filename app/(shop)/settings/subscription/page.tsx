"use client"

import * as React from "react"
import { 
  Crown, 
  Zap, 
  ShieldCheck, 
  History, 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Package, 
  Users, 
  Building2,
  Clock,
  ExternalLink,
  Download,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SubscriptionPage() {
  
  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Subscription & Billing
           </h1>
           <p className="text-[var(--text-soft)] font-medium">Manage your TijaratPro SaaS plan and resource limits.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <CreditCard size={18} />
             Payment Methods
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Zap size={18} className="fill-white" />
             Upgrade Plan
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Plan & Usage (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Active Plan */}
           <Card className="rounded-[40px] border-none bg-indigo-950 text-white relative overflow-hidden p-8 shadow-2xl">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                 <div className="space-y-6">
                    <Badge className="bg-primary/20 text-primary border-primary/30 font-black uppercase text-[10px] tracking-widest">Active Plan</Badge>
                    <div className="space-y-2">
                       <h2 className="text-5xl font-black font-heading tracking-tighter flex items-center gap-4">
                          Business Pro
                          <Crown className="text-warning fill-warning" size={32} />
                       </h2>
                       <p className="text-indigo-200 text-sm font-medium leading-relaxed">
                          "You are currently on our most popular plan. Enjoy unlimited POS transactions and advanced multi-branch synchronization."
                       </p>
                    </div>
                    <div className="flex items-center gap-6">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Next Payment</p>
                          <p className="text-xl font-bold">Nov 14, 2026</p>
                       </div>
                       <div className="w-[1px] h-10 bg-white/10" />
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Amount Due</p>
                          <p className="text-xl font-bold text-primary">Rs 4,999</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white/5 rounded-[32px] p-6 border border-white/10 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-300">Plan Highlights</h4>
                    <div className="space-y-3">
                       {["Unlimited Products", "Up to 5 Branches", "AI Restock Alerts", "Thermal Receipt Customizer", "24/7 Priority Support"].map(f => (
                         <div key={f} className="flex items-center gap-2 text-sm font-bold">
                            <CheckCircle2 size={16} className="text-primary" />
                            {f}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
           </Card>

           {/* Section 2: Usage Meters */}
           <SectionCard title="Resource Utilization" description="Monitor your consumption against plan limits.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
                 
                 {/* Branches Meter */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Branches</span>
                       </div>
                       <span className="text-xs font-black">2 / 5</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                       <div className="h-full bg-primary w-[40%]" />
                    </div>
                    <p className="text-[9px] text-[var(--text-soft)] font-medium">3 Slots remaining for expansion.</p>
                 </div>

                 {/* Products Meter */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                          <Package size={16} className="text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">SKUs</span>
                       </div>
                       <span className="text-xs font-black">8,422 / ∞</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                       <div className="h-full bg-primary w-[75%]" />
                    </div>
                    <p className="text-[9px] text-[var(--text-soft)] font-medium">Unlimited product entries enabled.</p>
                 </div>

                 {/* Team Meter */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2">
                          <Users size={16} className="text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Team Roles</span>
                       </div>
                       <span className="text-xs font-black">12 / 20</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                       <div className="h-full bg-primary w-[60%]" />
                    </div>
                    <p className="text-[9px] text-[var(--text-soft)] font-medium">Invite more managers anytime.</p>
                 </div>

              </div>
           </SectionCard>

           {/* Section 3: Billing History */}
           <SectionCard title="Invoices & History" description="Download and view your past payments.">
              <div className="overflow-x-auto py-4">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">
                          <th className="pb-4">Invoice ID</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Plan</th>
                          <th className="pb-4">Amount</th>
                          <th className="pb-4 text-right">Status</th>
                          <th className="pb-4 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       {[
                         { id: "INV-2024-884", date: "Oct 14, 2026", plan: "Business Pro", amount: "Rs 4,999", status: "Paid" },
                         { id: "INV-2024-883", date: "Sep 14, 2026", plan: "Business Pro", amount: "Rs 4,999", status: "Paid" },
                         { id: "INV-2024-882", date: "Aug 14, 2026", plan: "Starter (Prorated)", amount: "Rs 1,200", status: "Paid" },
                       ].map(inv => (
                         <tr key={inv.id} className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-secondary)]/30 transition-colors">
                            <td className="py-4 font-black text-xs">{inv.id}</td>
                            <td className="py-4 font-medium text-[var(--text-soft)]">{inv.date}</td>
                            <td className="py-4 font-bold">{inv.plan}</td>
                            <td className="py-4 font-black text-primary">{inv.amount}</td>
                            <td className="py-4 text-right">
                               <Badge className="bg-success/10 text-success border-success/20 text-[9px] uppercase font-black">{inv.status}</Badge>
                            </td>
                            <td className="py-4 text-right">
                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Download size={14} className="text-[var(--text-soft)]" />
                               </Button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </SectionCard>

        </div>

        {/* Right Column: Settings & Support (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <ShieldCheck size={20} className="text-success" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Enterprise Trust</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Compliance & Security</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-dashed border-[var(--border)] flex gap-4">
                    <Zap size={24} className="text-primary shrink-0" />
                    <div className="space-y-1">
                       <h5 className="text-xs font-black uppercase tracking-tight">Data Ownership</h5>
                       <p className="text-[10px] text-[var(--text-soft)] leading-relaxed">
                          "Your data is hosted on secure regional nodes. You can export your full database anytime."
                       </p>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-dashed border-[var(--border)] flex gap-4">
                    <Clock size={24} className="text-primary shrink-0" />
                    <div className="space-y-1">
                       <h5 className="text-xs font-black uppercase tracking-tight">Audit Trail</h5>
                       <p className="text-[10px] text-[var(--text-soft)] leading-relaxed">
                          "We keep a 365-day history of all financial transactions for tax compliance."
                       </p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <SectionCard title="SaaS Insights">
              <div className="space-y-4 py-4">
                 <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                       <TrendingDown size={18} className="rotate-180" />
                       <h5 className="font-black text-[10px] uppercase tracking-widest">ROI Estimate</h5>
                    </div>
                    <p className="text-[10px] font-medium text-[var(--text-soft)] leading-relaxed">
                       "TijaratPro has saved your business ~**42 hours** this month in automated inventory tracking."
                    </p>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2">
                       <AlertCircle size={14} className="text-warning" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-soft)] group-hover:text-[var(--text-main)]">Upcoming Expiry</span>
                    </div>
                    <span className="text-[10px] font-black text-warning">28 Days</span>
                 </div>
              </div>
           </SectionCard>

           <Card className="rounded-[32px] border-none bg-indigo-900 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 rounded-2xl bg-white/10 w-fit">
                    <ExternalLink size={24} className="text-indigo-400" />
                 </div>
                 <h4 className="text-lg font-black font-heading tracking-tight">Need Support?</h4>
                 <p className="text-xs text-indigo-200 font-medium leading-relaxed">
                    "Our regional engineers are available to help you set up new branches or custom hardware."
                 </p>
                 <Button variant="link" className="text-indigo-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest gap-2">
                    Open Help Center
                    <ArrowUpRight size={14} />
                 </Button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
           </Card>

        </div>

      </div>

    </div>
  )
}

function TrendingDown({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}
