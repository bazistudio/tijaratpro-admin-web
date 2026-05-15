"use client"

import * as React from "react"
import { 
  LifeBuoy, 
  Search, 
  MessageSquare, 
  FileQuestion, 
  BookOpen, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Video,
  Terminal,
  Activity,
  User,
  Settings,
  Mail,
  Smartphone
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SupportPage() {
  
  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Support Hub
           </h1>
           <p className="text-[var(--text-soft)] font-medium">How can we help you scale your business today?</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <BookOpen size={18} />
             Documentation
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <MessageSquare size={18} />
             New Ticket
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Tickets & KB (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Search KB */}
           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
              <Input 
               placeholder="Search articles, video tutorials, or system guides..." 
               className="h-20 pl-16 pr-8 rounded-[32px] border-none bg-white shadow-2xl shadow-primary/5 font-bold text-xl focus:ring-primary/20 placeholder:text-slate-300"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
                 <Badge variant="outline" className="text-[10px] uppercase font-black py-1 px-3 bg-slate-50 border-slate-200">Press Enter</Badge>
              </div>
           </div>

           {/* Active Tickets */}
           <SectionCard 
            title="Support Tickets" 
            description="Track your open requests with our engineering team."
           >
              <div className="space-y-4 py-4">
                 {[
                   { id: "TKT-9924", subject: "Thermal Printer Configuration (POS)", status: "In Progress", date: "2 Hours ago", type: "Hardware" },
                   { id: "TKT-9921", subject: "Bulk Inventory Import Error", status: "Resolved", date: "Yesterday", type: "Data" },
                   { id: "TKT-9882", subject: "Multi-branch User Permissions", status: "Awaiting Reply", date: "Oct 12", type: "Security" },
                 ].map(t => (
                   <div key={t.id} className="flex items-center gap-4 p-5 rounded-[28px] border border-[var(--border)] hover:border-primary/50 transition-all group cursor-pointer bg-white/30 backdrop-blur-sm">
                      <div className={cn("p-3 rounded-2xl", t.status === "Resolved" ? "bg-success/10 text-success" : "bg-primary/10 text-primary")}>
                         {t.status === "Resolved" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">{t.id}</span>
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-slate-200">{t.type}</Badge>
                         </div>
                         <h4 className="font-black text-sm text-[var(--text-main)] group-hover:text-primary transition-colors">{t.subject}</h4>
                         <p className="text-[10px] text-[var(--text-soft)] font-medium mt-1">{t.date}</p>
                      </div>
                      <div className="text-right">
                         <Badge className={cn("text-[9px] uppercase font-black", t.status === "Resolved" ? "bg-success text-white" : "bg-warning text-white")}>
                            {t.status}
                         </Badge>
                      </div>
                   </div>
                 ))}
              </div>
           </SectionCard>

           {/* Quick KB Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[32px] border-[var(--border)] hover:border-primary/30 transition-all cursor-pointer group">
                 <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                       <Video size={28} />
                    </div>
                    <h3 className="text-xl font-black font-heading tracking-tight">Video Tutorials</h3>
                    <p className="text-xs text-[var(--text-soft)] font-medium leading-relaxed">
                       "Step-by-step visual guides on setting up your first branch and bulk SKU uploads."
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                       Browse Library <ArrowRight size={14} />
                    </div>
                 </CardContent>
              </Card>
              <Card className="rounded-[32px] border-[var(--border)] hover:border-primary/30 transition-all cursor-pointer group">
                 <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                       <Terminal size={28} />
                    </div>
                    <h3 className="text-xl font-black font-heading tracking-tight">Developer API</h3>
                    <p className="text-xs text-[var(--text-soft)] font-medium leading-relaxed">
                       "Integrate your own custom hardware or external storefronts using our REST API."
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                       Read Specs <ArrowRight size={14} />
                    </div>
                 </CardContent>
              </Card>
           </div>

        </div>

        {/* Right Column: Health & Contact (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           <Card className="rounded-[32px] border-[var(--border)] overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <Activity size={20} className="text-success" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">System Health</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real-time status</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 {[
                   { label: "Core API Service", status: "Operational" },
                   { label: "POS Sync Engine", status: "Operational" },
                   { label: "Database Clusters", status: "Operational" },
                   { label: "Notification Relay", status: "Operational" },
                 ].map(s => (
                   <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-soft)]">{s.label}</span>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                         <span className="text-[10px] font-black uppercase text-success">{s.status}</span>
                      </div>
                   </div>
                 ))}
                 <div className="pt-4 border-t border-[var(--border)]">
                    <p className="text-[9px] font-medium text-[var(--text-soft)] leading-relaxed text-center italic">
                       "All systems are running optimally. Last checked 2m ago."
                    </p>
                 </div>
              </CardContent>
           </Card>

           <SectionCard title="Contact Support">
              <div className="space-y-4 py-4">
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                       <Smartphone size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Regional WhatsApp</p>
                       <p className="text-xs font-black text-[var(--text-main)]">+92 300 1234567</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                       <Mail size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Tech Support Email</p>
                       <p className="text-xs font-black text-[var(--text-main)]">help@tijaratpro.com</p>
                    </div>
                 </div>
              </div>
           </SectionCard>

           <Card className="rounded-[32px] border-none bg-indigo-900 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="p-3 rounded-2xl bg-white/10 w-fit">
                    <ShieldCheck size={24} className="text-success" />
                 </div>
                 <h4 className="text-lg font-black font-heading tracking-tight">VIP Onboarding</h4>
                 <p className="text-xs text-indigo-200 font-medium leading-relaxed">
                    "On the Business Pro plan, you have a dedicated Account Manager available for custom integrations."
                 </p>
                 <Button variant="link" className="text-indigo-400 p-0 h-auto text-[10px] font-black uppercase tracking-widest gap-2">
                    Contact Manager
                    <User size={14} />
                 </Button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
           </Card>

        </div>

      </div>

    </div>
  )
}
