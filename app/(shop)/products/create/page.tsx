"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  ArrowLeft, 
  ArrowRight,
  Check,
  DollarSign, 
  Info,
  Package,
  Plus, 
  Save,
  Tag, 
  TrendingUp,
  X,
  AlertCircle,
  Truck,
  ShieldCheck,
  Layers,
  Image as ImageIcon,
  Eye,
  Trash2,
  ExternalLink
} from "lucide-react"
import { productSchema, type Product } from "@/lib/validations/product"
import { useNotificationStore } from "@/hooks/use-notifications"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { MODULE_FIELD_PROFILES } from "@/lib/moduleFields"
import { useAuthStore } from "@/store/auth.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Steps Definition ────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, name: "Identity", description: "Basics", icon: Info },
  { id: 2, name: "Pricing", description: "Margins", icon: DollarSign },
  { id: 3, name: "Stock", description: "Warehouse", icon: Package },
  { id: 4, name: "Variants", description: "Options", icon: Layers },
  { id: 5, name: "Media", description: "Images", icon: ImageIcon },
  { id: 6, name: "Review", description: "Finalize", icon: Eye },
]

export default function ProductCreatePage() {
  const router = useRouter()
  const { addNotification } = useNotificationStore()
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { shops, activeShopId } = useAuthStore()

  const activeShop = shops?.find(s => s._id === activeShopId)
  const enabledModules = activeShop?.enabledModules || ["PRODUCTS", "SALES", "INVENTORY"]
  
  // Aggregate all product fields from enabled modules
  const dynamicFields = enabledModules
    .map((m: string) => MODULE_FIELD_PROFILES[m]?.productFields || [])
    .flat()

  // ─── Form Initialization ───────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      unit: "pcs",
      trackInventory: true,
      status: "published",
      taxRate: 0,
      stock: 0,
      costPrice: 0,
      sellingPrice: 0,
      variants: [],
      gallery: [],
      tags: [],
      industryMetadata: {}
    }
  })

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: "variants"
  })

  const formData = watch()
  
  // ─── UX: Unsaved Changes Guard ───────────────────────────────────────────
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(formData).length > 0 && !isSubmitting) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [formData, isSubmitting])

  // Margin Calculation
  const margin = formData.sellingPrice - formData.costPrice
  const marginPercent = formData.sellingPrice > 0 ? (margin / formData.sellingPrice) * 100 : 0

  const nextStep = async () => {
    let fieldsToValidate: any[] = []
    if (currentStep === 1) fieldsToValidate = ["name", "sku", "categoryId"]
    if (currentStep === 2) fieldsToValidate = ["costPrice", "sellingPrice"]
    if (currentStep === 3) fieldsToValidate = ["stock"]

    const isValid = await trigger(fieldsToValidate as any)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: any) => {
    const validatedData = data as Product
    setIsSubmitting(true)
    try {
      const response = await api("/products", {
        method: "POST",
        body: JSON.stringify(validatedData),
      })
      const result = await response.json()

      await api("/activity", {
        method: "POST",
        body: JSON.stringify({
          action: "PRODUCT_CREATE",
          entityId: result.id,
          entityType: "product",
          description: `Created new product: ${validatedData.name} (SKU: ${validatedData.sku})`,
          metadata: { sku: validatedData.sku, price: validatedData.sellingPrice }
        }),
      }).catch(err => console.error("Audit logging failed:", err))

      addNotification({
        title: "Product Created Successfully",
        description: `${validatedData.name} has been added to the inventory.`,
        type: "success"
      })

      localStorage.removeItem("product_draft")
      router.push(`/products/${result.id || ""}`)
      
    } catch (error: any) {
      addNotification({
        title: "Failed to create product",
        description: error.message || "Please check the form for errors and try again.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back to Catalog
           </button>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">
             Create New Product
           </h1>
        </div>
      </div>

      {/* Industrial Stepper (6 Steps) */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 p-2 bg-slate-100/50 rounded-[2rem] border border-slate-200">
         {STEPS.map((step) => (
            <div 
              key={step.id}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-[1.5rem] transition-all",
                currentStep === step.id 
                  ? "bg-white shadow-sm ring-1 ring-slate-200" 
                  : currentStep > step.id ? "opacity-60" : "opacity-30"
              )}
            >
               <div className={cn(
                 "h-8 w-8 rounded-lg flex items-center justify-center font-black text-[10px]",
                 currentStep === step.id ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
               )}>
                  {currentStep > step.id ? <Check size={14} /> : step.id}
               </div>
               <span className={cn("text-[8px] font-black uppercase tracking-widest", currentStep === step.id ? "text-slate-900" : "text-slate-400")}>{step.name}</span>
            </div>
         ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
         
         {/* Step 1: Basic Information */}
         {currentStep === 1 && (
            <div className="space-y-6">


               <SectionCard title="General Identity" description="Basic product details and branding.">
                  <div className="grid gap-6 py-4">
                     <div className="space-y-3">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Product Name</Label>
                        <Input {...register("name")} placeholder="e.g. iPhone 15 Pro Max" className="h-14 rounded-2xl bg-white text-lg font-bold" />
                        {errors.name && <p className="text-[10px] font-bold text-danger">{errors.name.message}</p>}
                     </div>
                     
                     {/* Dynamic Module Fields */}
                     {dynamicFields.length > 0 && (
                        <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                           {dynamicFields.map((field: any) => (
                              <div key={field.name} className="space-y-3">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Tag size={12} />
                                    {field.label}
                                 </Label>
                                 {field.type === "text" && (
                                    <Input 
                                       {...register(`industryMetadata.${field.name}` as any)} 
                                       placeholder={field.placeholder} 
                                       className="h-12 rounded-xl bg-white" 
                                    />
                                 )}
                                 {field.type === "number" && (
                                    <Input 
                                       type="number"
                                       {...register(`industryMetadata.${field.name}` as any, { valueAsNumber: true })} 
                                       placeholder={field.placeholder} 
                                       className="h-12 rounded-xl bg-white" 
                                    />
                                 )}
                                 {field.type === "date" && (
                                    <Input 
                                       type="date"
                                       {...register(`industryMetadata.${field.name}` as any)} 
                                       className="h-12 rounded-xl bg-white" 
                                    />
                                 )}
                                 {field.type === "select" && (
                                    <Select onValueChange={(val) => setValue(`industryMetadata.${field.name}` as any, val)}>
                                       <SelectTrigger className="h-12 rounded-xl bg-white">
                                          <SelectValue placeholder={`Select ${field.label}`} />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {field.options?.map((opt: string) => (
                                             <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 )}
                                 {field.type === "boolean" && (
                                    <div className="flex items-center gap-2 h-12">
                                       <input 
                                          type="checkbox" 
                                          {...register(`industryMetadata.${field.name}` as any)} 
                                          className="h-5 w-5 rounded border-slate-300 text-primary"
                                       />
                                       <span className="text-xs font-bold text-slate-600">Yes / No</span>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     )}

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">SKU Code</Label>
                           <Input {...register("sku")} placeholder="IP15-PM-256" className="h-12 rounded-xl uppercase font-black" />
                           {errors.sku && <p className="text-[10px] font-bold text-danger">{errors.sku.message}</p>}
                        </div>
                        <div className="space-y-3">
                           <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Category</Label>
                           <Select onValueChange={(v) => setValue("categoryId", v)}>
                              <SelectTrigger className="h-12 rounded-xl">
                                 <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="cat-1">Mobiles</SelectItem>
                                 <SelectItem value="cat-2">Screens</SelectItem>
                                 <SelectItem value="cat-3">Batteries</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </div>
               </SectionCard>
            </div>
         )}

         {/* Step 2: Pricing */}
         {currentStep === 2 && (
            <SectionCard title="Pricing & Profitability" description="Calculate your margins and taxes.">
               <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Cost Price</Label>
                        <Input 
                          type="number" 
                          {...register("costPrice", { valueAsNumber: true })} 
                          className="h-14 rounded-2xl text-xl font-black" 
                        />
                     </div>
                     <div className="space-y-3">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Selling Price</Label>
                        <Input 
                          type="number" 
                          {...register("sellingPrice", { valueAsNumber: true })} 
                          className="h-14 rounded-2xl text-xl font-black text-primary" 
                        />
                     </div>
                  </div>
                  <div className="bg-slate-50 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center space-y-4 border border-slate-100">
                     <TrendingUp className={cn("h-12 w-12 transition-colors", margin >= 0 ? "text-success" : "text-danger")} />
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Projected Margin</p>
                        <h3 className={cn("text-4xl font-black tracking-tight", margin >= 0 ? "text-slate-900" : "text-danger")}>
                          {margin >= 0 ? "+" : ""}Rs {margin.toLocaleString()}
                        </h3>
                        <Badge variant={margin >= 0 ? "success" : "destructive"} className="mt-2 px-4 py-1 rounded-full text-[10px] font-black">
                          {marginPercent.toFixed(1)}% Profit
                        </Badge>
                     </div>
                  </div>
               </div>
            </SectionCard>
         )}

         {/* Step 3: Inventory */}
         {currentStep === 3 && (
            <SectionCard title="Inventory Control" description="Initial stock and warehouse settings.">
               <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="space-y-3">
                     <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Opening Stock</Label>
                     <Input 
                        type="number" 
                        {...register("stock", { valueAsNumber: true })} 
                        className="h-14 rounded-2xl text-xl font-black" 
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Min Stock Alert</Label>
                     <Input 
                        type="number" 
                        {...register("minStockAlert", { valueAsNumber: true })} 
                        className="h-14 rounded-2xl text-xl font-black border-warning" 
                     />
                  </div>
               </div>
            </SectionCard>
         )}

         {/* Step 4: Variants */}
         {currentStep === 4 && (
            <SectionCard title="Product Variants" description="Manage sizes, colors, and options.">
               <div className="space-y-4 py-4">
                  {variantFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <div className="flex-1 space-y-2">
                          <Label className="text-[9px] font-black uppercase">Type</Label>
                          <Select onValueChange={(v) => setValue(`variants.${index}.type` as any, v)}>
                             <SelectTrigger className="h-10 rounded-lg">
                                <SelectValue placeholder="Size/Color..." />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="size">Size</SelectItem>
                                <SelectItem value="color">Color</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="flex-[2] space-y-2">
                          <Label className="text-[9px] font-black uppercase">Value</Label>
                          <Input {...register(`variants.${index}.value` as any)} placeholder="e.g. XL, Red" className="h-10 rounded-lg" />
                       </div>
                       <Button variant="ghost" size="icon" onClick={() => removeVariant(index)} className="text-danger h-10 w-10">
                          <Trash2 size={18} />
                       </Button>
                    </div>
                  ))}
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => appendVariant({ type: "size", value: "" })}
                    className="w-full h-12 rounded-xl border-dashed border-2 hover:bg-slate-50 text-primary font-bold gap-2"
                  >
                     <Plus size={18} /> Add New Variant
                  </Button>
               </div>
            </SectionCard>
         )}

         {/* Step 5: Media */}
         {currentStep === 5 && (
            <SectionCard title="Product Gallery" description="Visual assets for the shopfront.">
               <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all cursor-pointer">
                     <ImageIcon size={32} />
                     <span className="text-[10px] font-black uppercase mt-2">Upload Main</span>
                  </div>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200">
                       <ImageIcon size={24} />
                    </div>
                  ))}
               </div>
            </SectionCard>
         )}

         {/* Step 6: Review */}
         {currentStep === STEPS.length && (
            <div className="space-y-6">
               <Card className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                     <Check size={200} />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <Badge className="bg-primary/20 text-primary border-none font-black px-4 py-1 uppercase text-[10px] tracking-widest">Review & Finalize</Badge>
                     <div className="space-y-2">
                        <h2 className="text-5xl font-black tracking-tighter">{formData.name || "Untitled Product"}</h2>
                        <p className="text-slate-400 font-bold flex items-center gap-2">
                           <Tag size={16} /> SKU: {formData.sku || "N/A"} • Category: {formData.categoryId || "N/A"}
                        </p>
                     </div>
                     <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/10">
                        <div>
                           <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Selling Price</p>
                           <p className="text-2xl font-black text-primary">Rs {formData.sellingPrice.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Stock Level</p>
                           <p className="text-2xl font-black text-white">{formData.stock} {formData.unit}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Enabled Modules</p>
                           <p className="text-xs font-black text-white uppercase tracking-tight line-clamp-2">{enabledModules.join(", ")}</p>
                        </div>
                     </div>
                  </div>
               </Card>
               <div className="p-6 rounded-[2rem] bg-amber-50 border border-amber-100 flex gap-4">
                  <AlertCircle className="text-amber-500 shrink-0" size={24} />
                  <p className="text-xs font-medium text-amber-900 leading-relaxed">
                     By publishing this product, it will become immediately available in the POS system and sales inventory. Please ensure all pricing information is accurate.
                  </p>
               </div>
            </div>
         )}

         {/* Navigation Footer */}
         <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-primary/20 z-[100] min-w-[400px]">
            {currentStep > 1 && (
               <Button 
                type="button"
                variant="ghost" 
                onClick={prevStep}
                className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-400"
               >
                 Back
               </Button>
            )}
            {currentStep < STEPS.length ? (
               <Button 
                type="button"
                onClick={nextStep}
                className="h-14 flex-1 rounded-2xl bg-primary text-white hover:bg-primary-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-primary/30 gap-2"
               >
                 Next Step
                 <ArrowRight size={18} />
               </Button>
            ) : (
               <Button 
                type="submit"
                disabled={isSubmitting}
                className="h-14 flex-1 rounded-2xl bg-success text-white hover:bg-success-dark font-black uppercase text-[12px] tracking-[0.1em] shadow-xl shadow-success/30 gap-2"
               >
                 {isSubmitting ? "Syncing..." : <><ShieldCheck size={18} /> Publish to Catalog</>}
               </Button>
            )}
         </div>

      </form>
    </div>
  )
}
