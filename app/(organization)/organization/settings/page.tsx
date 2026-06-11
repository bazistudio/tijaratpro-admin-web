"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Building, 
  Paintbrush, 
  BellRing, 
  ShieldCheck, 
  Check,
  Save
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";

export default function OrgSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    orgName: user?.shopName || "Tijarat Pro Enterprise",
    taxNumber: "NTN-4892019-3",
    billingEmail: user?.email || "owner@tijarat.pro",
    themePrimary: "#3b82f6",
    autoLock: "30",
    requireMfa: "false"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black gradient-text tracking-tighter">
          Organization Settings
        </h1>
        <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
          Adjust branding assets, tax configurations, and system-wide default settings for your workspace.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: General Profile Card & Security */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* General Corporate Identity */}
          <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
              <Building size={20} className="text-primary" />
              <span>Corporate Profile</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Organization Name
                </label>
                <input 
                  type="text" 
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Corporate Registration/Tax ID
                </label>
                <input 
                  type="text" 
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Corporate Billing Email
              </label>
              <input 
                type="email" 
                name="billingEmail"
                value={formData.billingEmail}
                onChange={handleInputChange}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Security & Access Policies */}
          <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" />
              <span>Workspace Security Protocols</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Session Autolock Timeout
                </label>
                <select 
                  name="autoLock" 
                  value={formData.autoLock}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                  <option value="never">Never Autolock</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Enforce MFA / 2FA Login
                </label>
                <select 
                  name="requireMfa" 
                  value={formData.requireMfa}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="false">MFA Optional for Staff</option>
                  <option value="true">Enforced MFA for Cashiers & Managers</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Theme customization & Save Panel */}
        <div className="space-y-6">
          
          {/* Visual Customization Branding */}
          <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
              <Paintbrush size={20} className="text-primary" />
              <span>Corporate Branding</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Primary Theme Color Hex
                </label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    name="themePrimary"
                    value={formData.themePrimary}
                    onChange={handleInputChange}
                    className="w-11 h-11 p-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] cursor-pointer"
                  />
                  <input 
                    type="text" 
                    name="themePrimary"
                    value={formData.themePrimary}
                    onChange={handleInputChange}
                    className="flex-1 h-11 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider block">
                  Corporate Logo (SVG / PNG)
                </label>
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <Building size={24} className="text-[var(--text-soft)] mb-2" />
                  <p className="text-xs font-semibold text-[var(--text)]">Upload Corporate Logo</p>
                  <p className="text-[10px] text-[var(--text-soft)] mt-0.5">Max size 2MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-4">
            <Button 
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Saving Options...</span>
              ) : success ? (
                <>
                  <Check size={16} />
                  <span>Branding Saved!</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Persist Config</span>
                </>
              )}
            </Button>
            <p className="text-[10px] text-[var(--text-soft)] font-medium text-center">
              System changes apply across all connected cashier workstations immediately.
            </p>
          </div>

        </div>

      </form>

    </div>
  );
}
