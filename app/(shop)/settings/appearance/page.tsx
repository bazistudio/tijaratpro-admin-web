"use client"

import * as React from "react"
import { 
  Palette, 
  Moon, 
  Sun, 
  Laptop, 
  Check, 
  Eye, 
  Sparkles, 
  MousePointer2, 
  Zap, 
  Layout, 
  Type, 
  Waves,
  ArrowLeft,
  Save,
  RotateCcw,
  GlassWater,
  Torus
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ─── Theme Data ──────────────────────────────────────────────────────────────

const THEMES = [
  { id: "clean", name: "Forest Clean", primary: "#6a994e", bg: "#f8fafc", type: "light" },
  { id: "slate", name: "Modern Slate", primary: "#0f172a", bg: "#f1f5f9", type: "light" },
  { id: "ocean", name: "Deep Ocean", primary: "#1e40af", bg: "#eff6ff", type: "light" },
  { id: "neon", name: "Cyber Neon", primary: "#a855f7", bg: "#0f172a", type: "dark" },
  { id: "glassy", name: "Glassmorphism", primary: "#3b82f6", bg: "rgba(255,255,255,0.4)", type: "glass" },
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AppearancePage() {
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = React.useState("clean")
  const [isGlassy, setIsGlassy] = React.useState(true)
  const [animations, setAnimations] = React.useState([80])

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-soft)] hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Settings
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Visual Identity
           </h1>
           <p className="text-[var(--text-soft)] font-medium">Customize the aesthetic experience of your dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <RotateCcw size={18} />
             Reset Defaults
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Apply Theme
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Theme Select (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Core Theme Selection */}
           <SectionCard title="Dashboard Themes" description="Choose a base aesthetic for your workspace.">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
                 {THEMES.map((theme) => (
                   <div 
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={cn(
                      "group relative cursor-pointer p-2 rounded-[32px] border-2 transition-all hover:scale-[1.02]",
                      selectedTheme === theme.id ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" : "border-[var(--border)] hover:border-primary/30"
                    )}
                   >
                      <div className="h-24 rounded-[24px] mb-3 overflow-hidden flex flex-col p-3 gap-2" style={{ backgroundColor: theme.bg }}>
                         <div className="w-1/2 h-2 rounded-full bg-slate-300/50" />
                         <div className="w-3/4 h-2 rounded-full bg-slate-300/30" />
                         <div className="mt-auto flex justify-between items-end">
                            <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: theme.primary }} />
                            {selectedTheme === theme.id && <div className="p-1 rounded-full bg-primary text-white"><Check size={10} /></div>}
                         </div>
                      </div>
                      <div className="px-2 pb-2">
                         <p className="text-xs font-black uppercase tracking-tighter text-center">{theme.name}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </SectionCard>

           {/* Section 2: Glassmorphism & Effects */}
           <SectionCard title="Surface & Depth" description="Configure visual layers and glass-morphism effects.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                 
                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 group transition-all hover:border-primary/30">
                       <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-white border border-slate-200 text-primary">
                             <GlassWater size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-bold">Glassmorphism</p>
                             <p className="text-[10px] text-slate-500 font-medium italic">Acrylic translucent surfaces</p>
                          </div>
                       </div>
                       <Switch checked={isGlassy} onCheckedChange={setIsGlassy} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 group transition-all hover:border-primary/30">
                       <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-white border border-slate-200 text-primary">
                             <Waves size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-bold">Micro-Animations</p>
                             <p className="text-[10px] text-slate-500 font-medium italic">Smooth transitions & hovers</p>
                          </div>
                       </div>
                       <Switch defaultChecked />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Animation Intensity</Label>
                          <span className="text-[10px] font-black text-primary">{animations[0]}%</span>
                       </div>
                       <input 
                        type="range"
                        value={animations[0]} 
                        onChange={(e) => setAnimations([parseInt(e.target.value)])} 
                        max={100} 
                        step={1} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                       />
                       <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                          <span>Subtle</span>
                          <span>Expressive</span>
                       </div>
                    </div>
                 </div>

              </div>
           </SectionCard>

        </div>

        {/* Right Column: Preview & Polish (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Real-time Preview */}
           <Card className="rounded-[40px] border-[var(--border)] overflow-hidden shadow-2xl">
              <CardHeader className="bg-slate-900 text-white p-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10">
                       <Eye size={20} className="text-primary" />
                    </div>
                    <div>
                       <CardTitle className="text-lg font-black font-heading uppercase tracking-tight">Live Preview</CardTitle>
                       <CardDescription className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Aesthetic Simulation</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-8 bg-slate-100 space-y-6 flex flex-col items-center">
                 <div className={cn(
                   "w-full p-6 rounded-[32px] border shadow-xl transition-all duration-700",
                   isGlassy ? "bg-white/40 backdrop-blur-xl border-white/50" : "bg-white border-slate-200"
                 )}>
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                          <Zap size={20} className="fill-white" />
                       </div>
                       <div className="space-y-1">
                          <div className="w-20 h-2 bg-slate-200 rounded-full" />
                          <div className="w-12 h-1.5 bg-slate-200/50 rounded-full" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="h-10 rounded-xl bg-primary/10 border border-primary/20" />
                       <div className="h-10 rounded-xl bg-slate-100 border border-slate-200" />
                    </div>
                 </div>
                 <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-300">Previewing: {selectedTheme}</Badge>
              </CardContent>
           </Card>

           <SectionCard title="Accessibility">
              <div className="space-y-4 py-4">
                 <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2">
                       <Type size={14} className="text-slate-400 group-hover:text-primary" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Font Legibility</span>
                    </div>
                    <Badge className="bg-slate-100 text-slate-500 text-[9px] uppercase font-black">Medium</Badge>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2">
                       <Torus size={14} className="text-slate-400 group-hover:text-primary" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Icon Contrast</span>
                    </div>
                    <Badge className="bg-success/10 text-success text-[9px] uppercase font-black border-none">High</Badge>
                 </div>
              </div>
           </SectionCard>

           <Card className="rounded-[40px] border-none bg-primary text-white p-8 relative overflow-hidden group">
              <div className="relative z-10 space-y-4 text-center">
                 <div className="p-4 rounded-3xl bg-white/20 w-fit mx-auto shadow-xl backdrop-blur-md">
                    <Sparkles size={32} className="animate-pulse" />
                 </div>
                 <h4 className="text-xl font-black font-heading tracking-tight">"Wow" Effect</h4>
                 <p className="text-xs text-white/80 font-medium leading-relaxed">
                    "TijaratPro's glassy theme is designed to make your business data look premium and state-of-the-art."
                 </p>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           </Card>

        </div>

      </div>

    </div>
  )
}
