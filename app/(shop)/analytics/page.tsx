"use client"

import * as React from "react"
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Zap, 
  Target, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Layers,
  Activity,
  Cpu,
  Smartphone,
  Truck,
  TrendingDown,
  Info,
  MapPin
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, ComposedChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis, Legend
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const FORECAST_DATA = [
  { name: "Week 1", actual: 450, forecast: 420 },
  { name: "Week 2", actual: 520, forecast: 500 },
  { name: "Week 3", actual: 480, forecast: 510 },
  { name: "Week 4", actual: 610, forecast: 580 },
  { name: "Week 5", actual: 0, forecast: 650 },
  { name: "Week 6", actual: 0, forecast: 680 },
]

const OPERATIONAL_HEALTH = [
  { subject: 'Stock Turn', A: 120, B: 110, fullMark: 150 },
  { subject: 'Fulfillment', A: 98, B: 130, fullMark: 150 },
  { subject: 'Return Rate', A: 86, B: 130, fullMark: 150 },
  { subject: 'Profit Margin', A: 99, B: 100, fullMark: 150 },
  { subject: 'Customer LTV', A: 85, B: 90, fullMark: 150 },
  { subject: 'Market Share', A: 65, B: 85, fullMark: 150 },
]

const REGIONAL_PERFORMANCE = [
  { city: "Lahore", volume: 4500, growth: "+12%", color: "var(--primary)" },
  { city: "Karachi", volume: 3200, growth: "+8%", color: "var(--info)" },
  { city: "Islamabad", volume: 2100, growth: "+15%", color: "var(--success)" },
  { city: "Faisalabad", volume: 1800, growth: "-2%", color: "var(--danger)" },
]

const CUSTOMER_MATRIX = [
  { x: 10, y: 30, z: 200, name: 'Wholesale Group A' },
  { x: 30, y: 200, z: 260, name: 'Premium Retailers' },
  { x: 45, y: 100, z: 400, name: 'Hall Road Direct' },
  { x: 70, y: 400, z: 280, name: 'International Bulk' },
  { x: 85, y: 250, z: 500, name: 'Key Accounts' },
]

const CATEGORY_YIELD = [
  { name: "Screens", value: 45, yield: 65 },
  { name: "Batteries", value: 25, yield: 42 },
  { name: "Spares", value: 15, yield: 88 },
  { name: "Accessories", value: 15, yield: 35 },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

const AnalyticsStat = ({ title, value, sub, trend, icon: Icon, color = "primary" }: any) => {
  const colorMap: any = {
    primary: "text-primary border-primary/20 bg-primary/5",
    info: "text-info border-info/20 bg-info/5",
    success: "text-success border-success/20 bg-success/5",
    warning: "text-warning border-warning/20 bg-warning/5",
    danger: "text-danger border-danger/20 bg-danger/5",
  }

  return (
    <Card className="glass-card border-[var(--border)] overflow-hidden group hover:shadow-2xl transition-all">
       <CardContent className="p-6">
          <div className="flex items-start justify-between">
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">{title}</p>
                <h3 className="text-2xl font-black text-[var(--text-main)] font-heading">{value}</h3>
                <p className="text-[11px] font-bold text-[var(--text-soft)]">{sub}</p>
             </div>
             <div className={cn("p-3 rounded-2xl border transition-all group-hover:scale-110", colorMap[color])}>
                <Icon size={20} />
             </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2">
             <span className={cn("text-[10px] font-black px-1.5 py-0.5 rounded-lg flex items-center gap-0.5", 
               trend >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
             )}>
                {trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(trend)}%
             </span>
             <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-tighter">vs Predicted Baseline</span>
          </div>
       </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <Badge className="bg-primary/10 text-primary border-none rounded-lg text-[9px] font-black uppercase tracking-widest px-2 py-0.5">Pro Intelligence</Badge>
             <span className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-widest">Powered by TijaratAI</span>
          </div>
          <h1 className="text-3xl font-black font-heading text-[var(--text-main)] tracking-tight">
            Market Intelligence
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-10 rounded-xl border-[var(--border)] font-bold gap-2 bg-white/50 backdrop-blur-sm">
             <Calendar size={16} />
             H1 2026 Analysis
           </Button>
           <Button variant="primary" className="h-10 rounded-xl font-bold gap-2 shadow-xl shadow-primary/20">
             <Download size={16} />
             Export BI Dataset
           </Button>
        </div>
      </div>

      {/* High-Level Pulse */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsStat title="Sales Velocity" value="842" sub="Orders per week" trend={12.4} icon={Zap} color="warning" />
        <AnalyticsStat title="Market Share" value="18.5%" sub="Hall Road Sector" trend={2.1} icon={Globe} color="primary" />
        <AnalyticsStat title="Inventory ROI" value="142%" sub="Annualized growth" trend={8.5} icon={TrendingUp} color="success" />
        <AnalyticsStat title="Churn Risk" value="4.2%" sub="High-volume buyers" trend={-1.5} icon={TrendingDown} color="danger" />
      </div>

      {/* Middle Grid: Deep Visualization */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Sales Forecast & Actuals */}
        <div className="lg:col-span-8">
          <SectionCard 
            title="Predictive Sales Intelligence" 
            description="Comparing actual sales volume against AI-forecasted demand for next 2 weeks."
            className="border border-[var(--border)] h-[500px]"
            contentClassName="h-full p-6"
          >
            <ResponsiveContainer width="100%" height="85%">
              <ComposedChart data={FORECAST_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="var(--text-soft)" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '16px', 
                    border: '1px solid var(--border)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend verticalAlign="top" height={36}/>
                <Area type="monotone" dataKey="forecast" fill="var(--primary)" fillOpacity={0.05} stroke="var(--primary)" strokeDasharray="5 5" name="Forecasted Demand" />
                <Bar dataKey="actual" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} name="Actual Sales" />
                <Line type="monotone" dataKey="actual" stroke="var(--info)" strokeWidth={3} dot={{ r: 4, fill: "var(--info)" }} name="Growth Path" />
              </ComposedChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* Operational Health Spider Chart */}
        <div className="lg:col-span-4">
           <SectionCard 
            title="Operational Health" 
            description="Multi-factor business efficiency score across 6 key metrics."
            className="border border-[var(--border)] h-[500px]"
            contentClassName="h-full p-0"
          >
            <ResponsiveContainer width="100%" height="80%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={OPERATIONAL_HEALTH}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-soft)" fontSize={10} fontWeight={800} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                <Radar name="Current Period" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                <Radar name="Previous Period" dataKey="B" stroke="var(--info)" fill="var(--info)" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <div className="p-6 bg-[var(--bg-secondary)]/30 border-t border-[var(--border)]">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-[var(--text-soft)]">Aggregate Score</span>
                  <span className="text-lg font-black text-primary font-heading">92 / 100</span>
               </div>
               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%]" />
               </div>
            </div>
          </SectionCard>
        </div>

      </div>

      {/* Bottom Grid: Market Distribution */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        
        {/* Regional Performance Heat-list */}
        <SectionCard title="Regional Intelligence" description="Performance breakdown by major business hubs.">
           <div className="space-y-4 mt-4">
             {REGIONAL_PERFORMANCE.map((item, i) => (
               <div key={i} className="p-4 rounded-2xl border border-[var(--border)] bg-white hover:border-primary/50 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                        <MapPin size={18} />
                     </div>
                     <div>
                        <p className="text-sm font-black text-[var(--text-main)]">{item.city}</p>
                        <p className="text-[10px] font-bold text-[var(--text-soft)]">Rs {(item.volume/100).toFixed(1)}M Volume</p>
                     </div>
                  </div>
                  <div className={cn("text-[11px] font-black flex items-center gap-1 px-2 py-1 rounded-lg", 
                    item.growth.startsWith('+') ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  )}>
                     {item.growth}
                  </div>
               </div>
             ))}
           </div>
        </SectionCard>

        {/* Customer Matrix Scatter Chart */}
        <SectionCard title="Customer Segments" description="Lifetime Value (LTV) vs Purchase Frequency.">
           <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                 <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                    <XAxis type="number" dataKey="x" name="Frequency" unit="x" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                    <YAxis type="number" dataKey="y" name="LTV" unit="k" stroke="var(--text-soft)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Segments" data={CUSTOMER_MATRIX} fill="var(--primary)" />
                 </ScatterChart>
              </ResponsiveContainer>
           </div>
           <p className="text-[10px] text-center text-[var(--text-soft)] font-bold uppercase mt-2 tracking-widest">Bubble size represents transaction volume</p>
        </SectionCard>

        {/* Category Yield Analysis */}
        <SectionCard title="Asset Yield Matrix" description="Comparing inventory share against profit contribution.">
           <div className="space-y-5 mt-4">
             {CATEGORY_YIELD.map((cat, i) => (
               <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-[var(--text-main)]">{cat.name}</span>
                     <span className="text-primary">{cat.yield}% Yield</span>
                  </div>
                  <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div className="absolute top-0 left-0 h-full bg-slate-300 w-full" style={{ width: `${cat.value}%` }} />
                     <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${cat.yield}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-[var(--text-soft)]">
                     <span>Stock: {cat.value}%</span>
                     <span>Target: 75%</span>
                  </div>
               </div>
             ))}
           </div>
        </SectionCard>

      </div>

      {/* Pro Insights Footer */}
      <Card className="bg-slate-950 text-white rounded-[32px] p-8 relative overflow-hidden border-none shadow-2xl">
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30">
                     <Cpu size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-black font-heading tracking-tight">AI Strategy Insight</h3>
               </div>
               <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-2xl">
                  "Market analysis indicates a 15% surge in demand for **OLED iPhone Screens** in the Lahore region next month. Your current stock is 22% below the required buffer. We recommend placing a bulk order of 200 units with Rizwan Ahmed to capture the H1 peak."
               </p>
               <div className="flex gap-4 pt-2">
                  <Button variant="primary" className="h-11 rounded-xl font-black uppercase tracking-widest text-[10px] px-8">Execute Recommendation</Button>
                  <Button variant="ghost" className="h-11 rounded-xl font-black uppercase tracking-widest text-[10px] text-white hover:bg-white/10">View Logistics Analysis</Button>
               </div>
            </div>
            <div className="md:col-span-4 flex justify-end">
               <div className="text-right space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Next Shift Projection</p>
                  <h4 className="text-4xl font-black text-white font-heading">+Rs 2.4M</h4>
                  <p className="text-xs font-bold text-success flex items-center justify-end gap-1"><ArrowUpRight size={14} /> 22% Capacity</p>
               </div>
            </div>
         </div>
         {/* Decoration */}
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-info/10 rounded-full blur-3xl" />
      </Card>
    </div>
  )
}
