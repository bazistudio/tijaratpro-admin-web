"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  Trash2, 
  Smartphone, 
  Tag, 
  DollarSign, 
  Layers, 
  Search, 
  Info,
  ChevronRight,
  Save,
  Eye,
  MoreVertical,
  X,
  Package,
  Globe,
  Settings,
  Image as ImageIcon,
  TrendingUp
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ─── Types & Constants ────────────────────────────────────────────────────────

type FormSection = "basic" | "media" | "pricing" | "variants" | "seo";

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductCreatePage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = React.useState<FormSection>("basic")
  
  // Form State (Simplified for UI demo)
  const [variants, setVariants] = React.useState([
    { id: 1, type: "Color", value: "Space Gray", price: "85,000", sku: "IP13-SG-128" },
    { id: 2, type: "Color", value: "Midnight Blue", price: "85,000", sku: "IP13-MB-128" },
  ])

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), type: "Color", value: "", price: "", sku: "" }])
  }

  const removeVariant = (id: number) => {
    setVariants(variants.filter(v => v.id !== id))
  }

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
             Back to Catalog
           </button>
           <h1 className="text-4xl font-black font-heading text-[var(--text-main)] tracking-tight">
             Create New Product
           </h1>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 rounded-xl px-6 font-bold gap-2 border-[var(--border)] bg-white/50">
             <Eye size={18} />
             Preview
           </Button>
           <Button variant="primary" className="h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/20">
             <Save size={18} />
             Publish Product
           </Button>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-2">
           {[
             { id: "basic", label: "General Info", icon: Info },
             { id: "media", label: "Media Assets", icon: ImageIcon },
             { id: "pricing", label: "Pricing & Inventory", icon: DollarSign },
             { id: "variants", label: "Product Variants", icon: Layers },
             { id: "seo", label: "Search Engine (SEO)", icon: Globe },
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveSection(item.id as FormSection)}
               className={cn(
                 "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                 activeSection === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "bg-white border border-[var(--border)] text-[var(--text-soft)] hover:border-primary/50"
               )}
             >
                <div className="flex items-center gap-3">
                   <item.icon size={18} className={cn(activeSection === item.id ? "text-white" : "text-[var(--text-soft)] group-hover:text-primary")} />
                   <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
                </div>
                {activeSection === item.id && <ChevronRight size={16} />}
             </button>
           ))}

           <Card className="mt-8 border-dashed border-2 border-[var(--border)] bg-primary/5 p-6 rounded-[32px]">
              <div className="flex items-center gap-3 mb-2 text-primary">
                 <Package size={20} />
                 <h4 className="font-black text-xs uppercase tracking-widest">Inventory Logic</h4>
              </div>
              <p className="text-[10px] font-medium text-[var(--text-soft)] leading-relaxed">
                 "TijaratPro will automatically generate SKUs and barcodes based on your variant configuration. Ensure pricing matches regional tax guidelines."
              </p>
           </Card>
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-9 space-y-8">
           
           {/* Section 1: Basic Info */}
           <SectionCard title="General Information" description="Primary details about your product and its branding.">
              <div className="grid gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Product Title</Label>
                    <Input placeholder="e.g. iPhone 13 Pro Max - OLED Assembly" className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)] font-bold text-lg" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Brand / Manufacturer</Label>
                       <Select defaultValue="apple">
                         <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                           <SelectValue placeholder="Select Brand" />
                         </SelectTrigger>
                         <SelectContent className="rounded-xl border-[var(--border)]">
                           <SelectItem value="apple">Apple Inc.</SelectItem>
                           <SelectItem value="samsung">Samsung Electronics</SelectItem>
                           <SelectItem value="huawei">Huawei Technologies</SelectItem>
                           <SelectItem value="oppo">Oppo</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Primary Category</Label>
                       <Select defaultValue="screens">
                         <SelectTrigger className="h-12 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)]">
                           <SelectValue placeholder="Select Category" />
                         </SelectTrigger>
                         <SelectContent className="rounded-xl border-[var(--border)]">
                           <SelectItem value="screens">Display Assemblies (OLED/LCD)</SelectItem>
                           <SelectItem value="batteries">Power & Batteries</SelectItem>
                           <SelectItem value="spares">IC & Component Spares</SelectItem>
                           <SelectItem value="housings">Body & Housings</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Product Description (Brief)</Label>
                    <Textarea placeholder="Describe the quality (Original, A+, Copy) and compatibility details..." className="min-h-[120px] rounded-2xl bg-[var(--bg-secondary)]/30 border-[var(--border)] p-4 font-medium" />
                 </div>
              </div>
           </SectionCard>

           {/* Section 2: Media */}
           <SectionCard title="Product Media" description="Upload high-resolution images. First image is the primary thumbnail.">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4">
                 <button className="aspect-square rounded-3xl border-2 border-dashed border-[var(--border)] hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group">
                    <div className="p-3 rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-soft)] group-hover:text-primary transition-colors">
                       <Plus size={24} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Add Photo</span>
                 </button>
                 {[1, 2].map((i) => (
                   <div key={i} className="aspect-square rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border)] relative group overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-[var(--text-soft)] opacity-20">
                         <ImageIcon size={48} />
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="danger" size="icon" className="h-7 w-7 rounded-lg">
                            <X size={14} />
                         </Button>
                      </div>
                      {i === 1 && (
                        <div className="absolute bottom-2 left-2">
                           <Badge className="bg-primary text-white text-[8px] font-black uppercase">Primary</Badge>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </SectionCard>

           {/* Section 3: Pricing & Inventory */}
           <SectionCard title="Pricing & Inventory" description="Configure your base price and tracking metrics.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Selling Price (Rs)</Label>
                    <div className="relative">
                       <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                       <Input defaultValue="85,000" className="pl-10 h-11 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)] font-black text-primary" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Cost Per Item (Rs)</Label>
                    <div className="relative">
                       <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                       <Input defaultValue="62,000" className="pl-10 h-11 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)] font-bold" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">SKU / Code</Label>
                    <div className="relative">
                       <Smartphone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
                       <Input defaultValue="IP13-PRM-OLED-01" className="pl-10 h-11 rounded-xl bg-[var(--bg-secondary)]/30 border-[var(--border)] font-bold uppercase tracking-tighter" />
                    </div>
                 </div>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-success/5 border border-success/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10 text-success">
                       <TrendingUp size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-success">Estimated Margin</p>
                       <p className="text-xs font-bold text-[var(--text-main)]">You will earn **Rs 23,000** (27.1%) profit per unit sold.</p>
                    </div>
                 </div>
                 <Badge variant="success" className="text-[9px] uppercase font-black">Profitable</Badge>
              </div>
           </SectionCard>

           {/* Section 4: Variants */}
           <SectionCard 
            title="Product Variants" 
            description="Manage different colors, storage sizes, or quality grades."
            action={
              <Button onClick={addVariant} variant="outline" size="sm" className="h-9 rounded-lg font-bold gap-2 border-primary/20 text-primary hover:bg-primary/5">
                <Plus size={16} />
                Add Variant
              </Button>
            }
           >
              <div className="space-y-4 py-4">
                 {variants.map((v) => (
                   <div key={v.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-[var(--border)] bg-white hover:border-primary/50 transition-all relative group">
                      <div className="space-y-2">
                         <Label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Option Type</Label>
                         <Input defaultValue={v.type} className="h-9 rounded-lg bg-[var(--bg-secondary)]/20" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Value</Label>
                         <Input defaultValue={v.value} className="h-9 rounded-lg font-bold" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Price Adjust</Label>
                         <Input defaultValue={v.price} className="h-9 rounded-lg font-black text-primary" />
                      </div>
                      <div className="space-y-2 flex items-end gap-2">
                         <div className="flex-1 space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-[var(--text-soft)]">Variant SKU</Label>
                            <Input defaultValue={v.sku} className="h-9 rounded-lg text-xs" />
                         </div>
                         <Button onClick={() => removeVariant(v.id)} variant="ghost" size="icon" className="h-9 w-9 text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                         </Button>
                      </div>
                   </div>
                 ))}
              </div>
           </SectionCard>

           {/* Section 5: SEO */}
           <SectionCard title="Search & Discovery (SEO)" description="Optimize how your product appears in searches and external marketplace syncs.">
              <div className="space-y-6 py-4">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Meta Title</Label>
                    <Input placeholder="SEO Optimized Title..." className="h-11 rounded-xl bg-[var(--bg-secondary)]/30" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">Meta Description</Label>
                    <Textarea placeholder="Detailed keywords for search engines..." className="min-h-[80px] rounded-xl bg-[var(--bg-secondary)]/30" />
                 </div>
                 <div className="p-4 rounded-2xl border border-[var(--border)] bg-white/50">
                    <div className="flex items-center gap-3 text-info mb-2">
                       <Globe size={18} />
                       <h5 className="font-black text-xs uppercase tracking-widest">Marketplace Sync</h5>
                    </div>
                    <div className="flex items-center justify-between">
                       <p className="text-xs font-medium text-[var(--text-soft)]">"Automatically push this product to your E-commerce storefront and Daraz API?"</p>
                       <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                       </div>
                    </div>
                 </div>
              </div>
           </SectionCard>

        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] lg:w-[50%] z-50">
         <Card className="bg-slate-900/90 backdrop-blur-2xl border-none text-white p-4 px-6 rounded-[32px] shadow-2xl flex items-center justify-between">
            <div className="hidden md:flex items-center gap-4">
               <div className="p-2 rounded-xl bg-white/10">
                  <Package size={20} className="text-primary" />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Status</p>
                  <p className="text-sm font-bold text-white">Draft Saved</p>
               </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <Button variant="ghost" className="text-white font-bold text-sm hover:bg-white/10 flex-1 md:flex-none">Discard</Button>
               <Button className="h-12 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[11px] px-8 hover:bg-slate-100 flex-1 md:flex-none">Save & Continue</Button>
            </div>
         </Card>
      </div>

    </div>
  )
}
