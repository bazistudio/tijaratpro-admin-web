"use client"

import * as React from "react"
import { 
  Building2, 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Monitor, 
  Database, 
  Lock, 
  Palette,
  Camera,
  Check,
  ChevronRight,
  Globe,
  MapPin,
  Clock,
  Smartphone,
  Mail,
  Printer,
  QrCode,
  Percent,
  Download,
  Upload,
  Moon,
  Sun,
  Laptop,
  Save,
  Package,
  AlertCircle,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ─── Sub-Components ───────────────────────────────────────────────────────────

const SettingSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="pb-4 border-b border-[var(--border)]">
      <h3 className="text-xl font-black font-heading text-[var(--text-main)] tracking-tight">{title}</h3>
      <p className="text-sm font-medium text-[var(--text-soft)] mt-1">{description}</p>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
)

const FormGroup = ({ label, description, children }: { label: string, description?: string, children: React.ReactNode }) => (
  <div className="grid gap-2">
    <Label className="text-sm font-bold text-[var(--text-main)]">{label}</Label>
    {description && <p className="text-[11px] text-[var(--text-soft)] font-medium">{description}</p>}
    <div className="mt-1">{children}</div>
  </div>
)

const ToggleItem = ({ label, description, icon: Icon, checked, onCheckedChange }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-secondary)]/30 border border-[var(--border)] group hover:border-primary/30 transition-all">
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-xl bg-white border border-[var(--border)] text-[var(--text-soft)] group-hover:text-primary transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-bold text-[var(--text-main)]">{label}</p>
        <p className="text-[10px] font-medium text-[var(--text-soft)]">{description}</p>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("business")

  const sidebarItems = [
    { id: "business", label: "Business Settings", icon: Building2 },
    { id: "profile", label: "User Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "pos", label: "POS Settings", icon: Monitor },
    { id: "backup", label: "Backup & Data", icon: Database },
    { id: "permissions", label: "Roles & Permissions", icon: Lock },
    { id: "theme", label: "Theme Customization", icon: Palette },
  ]

  return (
    <div className="relative pb-24">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-1">
             <div className="px-4 py-2 mb-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Control Center</h2>
             </div>
             {sidebarItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={cn(
                   "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                   activeTab === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "text-[var(--text-soft)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]"
                 )}
               >
                 <item.icon size={18} className={cn(activeTab === item.id ? "text-white" : "text-[var(--text-soft)] group-hover:text-primary")} />
                 {item.label}
                 {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
               </button>
             ))}
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-1 max-w-4xl min-h-[70vh]">
          <Card className="border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
            <CardContent className="p-8">
              
              {/* Business Settings */}
              {activeTab === "business" && (
                <SettingSection title="Business Configuration" description="Manage your company's global identity and operational defaults.">
                  <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                    <div className="relative group">
                       <div className="w-24 h-24 rounded-3xl bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-[var(--text-soft)] group-hover:border-primary transition-colors cursor-pointer overflow-hidden">
                         <Building2 size={32} />
                         <span className="text-[9px] font-black uppercase mt-1">Upload Logo</span>
                       </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <FormGroup label="Business Name"><Input defaultValue="TijaratPro Mobile Solutions" className="h-11 rounded-xl" /></FormGroup>
                      <FormGroup label="Tax Number (NTN)"><Input defaultValue="1234567-8" className="h-11 rounded-xl" /></FormGroup>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormGroup label="Primary Currency">
                       <Select defaultValue="PKR">
                         <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                         <SelectContent><SelectItem value="PKR">Pakistani Rupee (Rs)</SelectItem><SelectItem value="USD">US Dollar ($)</SelectItem></SelectContent>
                       </Select>
                    </FormGroup>
                    <FormGroup label="Timezone">
                       <Select defaultValue="KHI">
                         <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                         <SelectContent><SelectItem value="KHI">(GMT+05:00) Karachi</SelectItem><SelectItem value="LON">(GMT+00:00) London</SelectItem></SelectContent>
                       </Select>
                    </FormGroup>
                    <FormGroup label="Business Address" description="Used for invoices and shipping labels.">
                      <Input defaultValue="Plaza 45, Hall Road, Lahore" className="h-11 rounded-xl" />
                    </FormGroup>
                    <FormGroup label="Contact Phone"><Input defaultValue="042-35889900" className="h-11 rounded-xl" /></FormGroup>
                  </div>
                </SettingSection>
              )}

              {/* User Profile */}
              {activeTab === "profile" && (
                <SettingSection title="My Profile" description="Update your personal information and administrative avatar.">
                   <div className="flex items-center gap-6 mb-8">
                     <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-white shadow-xl flex items-center justify-center overflow-hidden">
                           <User size={48} className="text-primary" />
                        </div>
                        <Button size="icon" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-[var(--border)] text-primary hover:bg-[var(--bg-secondary)] shadow-lg">
                           <Camera size={14} />
                        </Button>
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-[var(--text-main)]">Muhammad Ali</h4>
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">Global Administrator</p>
                     </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <FormGroup label="Full Name"><Input defaultValue="Muhammad Ali" className="h-11 rounded-xl" /></FormGroup>
                     <FormGroup label="Email Address"><Input defaultValue="ali@tijaratpro.com" className="h-11 rounded-xl" /></FormGroup>
                     <FormGroup label="Designation"><Input defaultValue="CEO & Founder" className="h-11 rounded-xl" disabled /></FormGroup>
                     <FormGroup label="Language">
                       <Select defaultValue="EN">
                         <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                         <SelectContent><SelectItem value="EN">English (US)</SelectItem><SelectItem value="UR">Urdu (اردو)</SelectItem></SelectContent>
                       </Select>
                     </FormGroup>
                   </div>
                </SettingSection>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <SettingSection title="Security & Authentication" description="Protect your account with advanced safety protocols.">
                   <div className="space-y-6">
                     <Card className="border-[var(--border)] bg-[var(--bg-secondary)]/30 border-dashed">
                        <CardContent className="p-6">
                           <h4 className="text-sm font-black uppercase text-[var(--text-main)] mb-4">Password Management</h4>
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <Input type="password" placeholder="Current Password" className="h-11 rounded-xl" />
                              <Input type="password" placeholder="New Password" className="h-11 rounded-xl" />
                              <Button variant="primary" className="h-11 rounded-xl font-black uppercase tracking-widest text-[10px]">Update Password</Button>
                           </div>
                        </CardContent>
                     </Card>
                     
                     <div className="space-y-4">
                        <ToggleItem label="Two-Factor Authentication" description="Require a secure code sent to your phone for login." icon={Smartphone} checked={true} />
                        <ToggleItem label="Biometric Login" description="Use Fingerprint or Face ID for faster dashboard access." icon={Shield} checked={false} />
                     </div>

                     <div className="p-6 rounded-2xl border border-[var(--border)]">
                        <div className="flex items-center justify-between mb-4">
                           <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-main)]">Active Sessions</h4>
                           <Button variant="ghost" size="sm" className="text-danger font-black text-[10px] uppercase">Logout All Devices</Button>
                        </div>
                        <div className="space-y-3">
                           {[
                             { device: "MacBook Pro - Chrome", ip: "182.168.1.1", location: "Lahore, PK", active: true },
                             { device: "iPhone 15 - Safari", ip: "182.168.1.45", location: "Karachi, PK", active: false },
                           ].map((session, i) => (
                             <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[var(--border)]">
                                <div className="flex items-center gap-3">
                                   <Laptop size={16} className="text-[var(--text-soft)]" />
                                   <div>
                                      <p className="text-xs font-bold text-[var(--text-main)]">{session.device}</p>
                                      <p className="text-[10px] text-[var(--text-soft)]">{session.ip} • {session.location}</p>
                                   </div>
                                </div>
                                {session.active ? <Badge className="bg-success/10 text-success uppercase text-[9px] font-black border-none">Current</Badge> : <Button variant="ghost" size="sm" className="h-6 text-[9px] font-bold text-danger hover:bg-danger/5">Revoke</Button>}
                             </div>
                           ))}
                        </div>
                     </div>
                   </div>
                </SettingSection>
              )}

              {/* Theme Settings */}
              {activeTab === "theme" && (
                <SettingSection title="Visual Appearance" description="Customize how TijaratPro looks and feels for your organization.">
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { id: "default", name: "Default (Clean)", colors: ["#6a994e", "#ffffff"] },
                        { id: "modern", name: "Modern (Slate)", colors: ["#0f172a", "#334155"] },
                        { id: "classic", name: "Classic (Blue)", colors: ["#1e40af", "#3b82f6"] },
                        { id: "futuristic", name: "Futuristic (Neon)", colors: ["#a855f7", "#ec4899"] },
                        { id: "glassy", name: "Glassy (Translucent)", colors: ["#f8fafc", "#e2e8f0"] },
                      ].map((theme) => (
                        <div 
                          key={theme.id}
                          className={cn(
                            "cursor-pointer group p-4 rounded-2xl border-2 transition-all",
                            activeTab === theme.id ? "border-primary bg-primary/5" : "border-[var(--border)] hover:border-primary/30"
                          )}
                        >
                          <div className="h-20 rounded-xl mb-3 overflow-hidden flex gap-0.5">
                             <div className="flex-1" style={{ backgroundColor: theme.colors[0] }} />
                             <div className="flex-1" style={{ backgroundColor: theme.colors[1] }} />
                          </div>
                          <p className="text-xs font-black text-center uppercase tracking-tight">{theme.name}</p>
                        </div>
                      ))}
                   </div>
                   
                   <div className="p-6 rounded-3xl bg-slate-900 text-white mt-8 relative overflow-hidden group">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2">
                              <Moon size={20} className="text-blue-400" />
                              <h4 className="font-black text-sm uppercase tracking-widest">Dark Mode Support</h4>
                           </div>
                           <Switch defaultChecked />
                        </div>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                           Switch to the high-contrast dark theme for better visibility in low-light environments and reduced eye strain.
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-110 transition-transform duration-1000" />
                   </div>
                </SettingSection>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <SettingSection title="Alert Channels" description="Configure how you receive critical business updates and reports.">
                   <div className="space-y-4">
                      <ToggleItem label="SMS Alerts" description="Get instant text messages for high-value sales and stock alerts." icon={Smartphone} checked={true} />
                      <ToggleItem label="Email Reports" description="Receive daily summaries and monthly financial analytics via email." icon={Mail} checked={true} />
                      <ToggleItem label="Stock Warnings" description="Notify when any product reaches the minimum inventory threshold." icon={Package} checked={true} />
                      <ToggleItem label="Order Confirmation" description="Auto-send receipt links to customers via WhatsApp/SMS." icon={Check} checked={false} />
                   </div>
                </SettingSection>
              )}

              {/* POS Settings */}
              {activeTab === "pos" && (
                <SettingSection title="Point of Sale Configuration" description="Customize your checkout experience and hardware integration.">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormGroup label="Receipt Format">
                        <Select defaultValue="thermal">
                          <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="thermal">Thermal (80mm)</SelectItem><SelectItem value="a4">Standard (A4)</SelectItem></SelectContent>
                        </Select>
                      </FormGroup>
                      <FormGroup label="Tax Calculation">
                        <div className="flex items-center gap-2">
                           <Input defaultValue="17" className="h-11 rounded-xl" />
                           <span className="font-bold text-sm">% (GST)</span>
                        </div>
                      </FormGroup>
                   </div>
                   <div className="space-y-4 mt-6">
                      <ToggleItem label="Auto-Generate Barcodes" description="Automatically create unique barcodes for new product entries." icon={QrCode} checked={true} />
                      <ToggleItem label="Apply Bulk Discounts" description="Allow sales team to apply manual discounts during checkout." icon={Percent} checked={true} />
                      <ToggleItem label="Print on Save" description="Instantly trigger the printer when a sale is confirmed." icon={Printer} checked={false} />
                   </div>
                </SettingSection>
              )}

              {/* Backup & Data */}
              {activeTab === "backup" && (
                <SettingSection title="Data Governance" description="Secure your data assets and manage global imports/exports.">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card className="p-4 border-[var(--border)] bg-white hover:shadow-lg transition-all group">
                         <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-3 group-hover:scale-110 transition-transform"><Download size={20} /></div>
                         <h5 className="font-bold text-sm mb-1">Export Database</h5>
                         <p className="text-[10px] text-[var(--text-soft)] font-medium">Download full JSON backup of all records.</p>
                      </Card>
                      <Card className="p-4 border-[var(--border)] bg-white hover:shadow-lg transition-all group">
                         <div className="p-3 rounded-xl bg-info/10 text-info w-fit mb-3 group-hover:scale-110 transition-transform"><Upload size={20} /></div>
                         <h5 className="font-bold text-sm mb-1">Import CSV</h5>
                         <p className="text-[10px] text-[var(--text-soft)] font-medium">Batch upload products or customer lists.</p>
                      </Card>
                      <Card className="p-4 border-[var(--border)] bg-white hover:shadow-lg transition-all group">
                         <div className="p-3 rounded-xl bg-success/10 text-success w-fit mb-3 group-hover:scale-110 transition-transform"><Database size={20} /></div>
                         <h5 className="font-bold text-sm mb-1">Cloud Backup</h5>
                         <p className="text-[10px] text-[var(--text-soft)] font-medium">Sync with TijaratPro secure cloud vault.</p>
                      </Card>
                   </div>
                   
                   <div className="p-6 rounded-2xl bg-danger/5 border border-danger/20 mt-8">
                      <div className="flex items-center gap-3 text-danger mb-4">
                         <AlertCircle size={20} />
                         <h4 className="font-black text-sm uppercase tracking-widest">Danger Zone</h4>
                      </div>
                      <p className="text-xs font-medium text-danger/80 mb-6">
                        Deleting or resetting data is irreversible. All inventory, sales logs, and customer records will be permanently erased.
                      </p>
                      <Button variant="outline" className="h-10 rounded-xl border-danger/50 text-danger font-bold hover:bg-danger/10">Factory Reset Dashboard</Button>
                   </div>
                </SettingSection>
              )}

              {/* Roles & Permissions */}
              {activeTab === "permissions" && (
                <SettingSection title="Role Management" description="Define organizational hierarchies and operational access levels.">
                   <div className="space-y-4">
                      {[
                        { role: "Administrator", desc: "Full system access, financial reports, and user management.", count: 1, color: "primary" },
                        { role: "Manager", desc: "Stock management, procurement, and staff attendance.", count: 2, color: "info" },
                        { role: "Cashier", desc: "Limited to POS, daily sales log, and customer registration.", count: 4, color: "success" },
                      ].map((role, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-[var(--border)] bg-white group hover:border-primary/50 transition-all">
                           <div className="flex items-center gap-4">
                              <div className={cn("p-3 rounded-xl", {
                                "bg-primary/10 text-primary": role.color === "primary",
                                "bg-info/10 text-info": role.color === "info",
                                "bg-success/10 text-success": role.color === "success",
                              })}>
                                 <Shield size={20} />
                              </div>
                              <div>
                                 <h5 className="font-black text-sm text-[var(--text-main)]">{role.role}</h5>
                                 <p className="text-[10px] font-medium text-[var(--text-soft)] max-w-sm">{role.desc}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-black text-[var(--text-soft)]">{role.count} Active User(s)</p>
                              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase text-primary mt-1">Edit Permissions</Button>
                           </div>
                        </div>
                      ))}
                   </div>
                   <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 font-bold text-[var(--text-soft)] hover:text-primary hover:border-primary transition-all">
                      <Plus size={18} className="mr-2" /> Add Custom Role
                   </Button>
                </SettingSection>
              )}

            </CardContent>
          </Card>
        </main>

      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50 animate-in slide-in-from-bottom-8 duration-1000">
         <div className="bg-[var(--card)]/80 backdrop-blur-2xl border border-primary/20 p-4 rounded-[28px] shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4 ml-2">
               <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <Save size={20} />
               </div>
               <div>
                  <p className="text-sm font-black text-[var(--text-main)]">Unsaved Changes</p>
                  <p className="text-[10px] font-medium text-[var(--text-soft)]">Modified configuration waiting for sync.</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" className="h-11 px-6 rounded-2xl font-bold text-[var(--text-soft)]">Discard</Button>
               <Button className="h-11 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20">
                  Update All Settings
               </Button>
            </div>
         </div>
      </div>
    </div>
  )
}
