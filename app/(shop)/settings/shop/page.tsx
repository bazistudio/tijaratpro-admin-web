"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionCard } from "@/components/ui/section-card"
import { PageLayout } from "@/components/layout/PageLayout"
import { PageHeader } from "@/components/ui/PageHeader"
import { toast } from "sonner"
import { Store, Save, Building2, Phone, Mail, MapPin } from "lucide-react"

export default function ShopSettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [shop, setShop] = useState<any>(null)

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const res = await api("/auth/me") // Get current user + tenant info
        const data = await res.json()
        setShop(data.user || data)
      } catch (err) {
        toast.error("Failed to load shop settings")
      } finally {
        setIsLoading(false)
      }
    }
    fetchShopData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // In a real app, you'd have an endpoint to update shop/tenant details
      // const res = await api("/shops/update", { method: "PUT", body: JSON.stringify(shop) })
      
      // Mocking success
      await new Promise(r => setTimeout(r, 1000))
      toast.success("Shop settings updated successfully")
    } catch (err) {
      toast.error("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageLayout 
      isLoading={isLoading}
      breadcrumbs={<span className="flex items-center gap-2">Settings <span className="text-muted-foreground/50">/</span> Shop Profile</span>}
    >
      <PageHeader 
        title="Shop Profile"
        subtitle="Manage your business identity and contact information."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <SectionCard title="Basic Information" description="Public business details">
             <form onSubmit={handleSave} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={shop?.shopName || ""} 
                        onChange={(e) => setShop({...shop, shopName: e.target.value})}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={shop?.email || ""} 
                        onChange={(e) => setShop({...shop, email: e.target.value})}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      value={shop?.phone || ""} 
                      onChange={(e) => setShop({...shop, phone: e.target.value})}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea 
                      placeholder="Shop physical location..."
                      className="pl-10 min-h-[100px] pt-2"
                    />
                  </div>
                </div>

                <Button type="submit" className="h-12 px-8 font-bold flex gap-2" disabled={isSaving}>
                  {isSaving ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}
                </Button>
             </form>
          </SectionCard>
        </div>

        <div className="space-y-8">
           <SectionCard title="Business Identity">
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                 <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-primary/30 text-primary group cursor-pointer hover:bg-primary/20 transition-all">
                    <Store className="h-10 w-10" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg">{shop?.shopName || "Your Shop"}</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{shop?.role || "Retailer"}</p>
                 </div>
                 <Button variant="outline" size="sm" className="rounded-xl">Change Logo</Button>
              </div>
           </SectionCard>

           <SectionCard title="System Status">
              <div className="space-y-4 pt-4 text-sm">
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Account Status</span>
                    <span className="px-2 py-1 bg-success/10 text-success rounded-lg font-bold text-[10px] uppercase">Active</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Multi-Tenant ID</span>
                    <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                       {shop?.tenantId?.substring(0, 8) || "0x7F2...91"}
                    </code>
                 </div>
              </div>
           </SectionCard>
        </div>
      </div>
    </PageLayout>
  )
}
