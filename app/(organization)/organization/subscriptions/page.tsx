"use client";

import React from "react";
import { 
  CreditCard, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionsTierPage() {
  
  // Unlocked SaaS feature flags mapping
  const features = [
    { name: "Unlimited Shop Branches", description: "Deploy branches without limit across multiple cities.", enabled: true },
    { name: "Medicines & Expiry Modules", description: "Full pharmaceutical batch track, expiry tags, prescription logs.", enabled: true },
    { name: "Auto Parts Compatibility Module", description: "Vehicle compatibility lookup, spare parts database.", enabled: true },
    { name: "SaaS Multi-Tenant Isolation", description: "Bank-grade database separation and cryptographic tenant keys.", enabled: true },
    { name: "Workforce Staffing Control", description: "Role-based authorization and customized manager dashboards.", enabled: true },
    { name: "Custom Domain White-Labeling", description: "Route your ERP dashboard through dashboard.mybusiness.com.", enabled: false }
  ];

  const invoices = [
    { id: "inv_482", date: "May 15, 2026", amount: "PKR 14,500", status: "Paid" },
    { id: "inv_310", date: "Apr 15, 2026", amount: "PKR 14,500", status: "Paid" },
    { id: "inv_209", date: "Mar 15, 2026", amount: "PKR 14,500", status: "Paid" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter">
            Subscriptions & Licenses
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Manage your tier quotas, view invoice logs, and activate professional feature layers.
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Zap size={16} />
          <span>Modify Subscription</span>
        </Button>
      </div>

      {/* Subscription Tier Info & Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier Details Card */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 md:col-span-2 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full w-fit">
                Active License
              </p>
              <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">
                Enterprise Multi-Shop Plan
              </h2>
              <p className="text-sm text-[var(--text-soft)] mt-1 font-medium">
                Perfect for expanding distribution networks and multi-shop franchisees.
              </p>
            </div>
            <CreditCard size={40} className="text-primary/20 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border)]/50 pt-4">
            <div>
              <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">License Cost</p>
              <p className="text-lg font-black text-[var(--text)] mt-0.5">PKR 14,500/mo</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Active Shop Branches</p>
              <p className="text-lg font-black text-[var(--text)] mt-0.5">Unlimited</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Billing Interval</p>
              <p className="text-lg font-black text-[var(--text)] mt-0.5">Monthly</p>
            </div>
          </div>
        </div>

        {/* Expiry Counter Card */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
          <div>
            <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
              Countdown to Renewal
            </p>
            <div className="flex items-baseline gap-1 mt-4">
              <h3 className="text-5xl font-black text-[var(--text)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                28
              </h3>
              <span className="text-sm font-extrabold text-[var(--text-soft)]">
                Days Left
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full" style={{ width: "93%" }} />
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-soft)]">
              <span>Renewal Date: June 15, 2026</span>
              <span className="text-success font-bold">Auto-debit Active</span>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Flags Grid & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Unlocked feature flags list */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">
              License Feature Allocation
            </h3>
            <p className="text-xs text-[var(--text-soft)] font-medium">
              Capability switches and feature flag statuses assigned to your tenant space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className={`p-4 border rounded-xl flex items-start gap-3 transition-colors ${
                  feat.enabled 
                    ? "bg-success/5 border-success/15" 
                    : "bg-[var(--bg-secondary)]/30 border-[var(--border)]/40 opacity-70"
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  feat.enabled ? "bg-success/10 text-success" : "bg-gray-500/10 text-gray-400"
                }`}>
                  {feat.enabled ? <Check size={14} /> : <Zap size={12} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)]">{feat.name}</h4>
                  <p className="text-xs text-[var(--text-soft)] font-medium mt-0.5">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Payment History log */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <History size={18} className="text-primary" />
            <span>Invoice Ledger</span>
          </h3>

          <div className="space-y-4">
            {invoices.map((inv) => (
              <div 
                key={inv.id}
                className="flex items-center justify-between p-3.5 border border-[var(--border)]/40 rounded-xl hover:bg-[var(--bg-secondary)]/10 transition-colors text-xs font-semibold"
              >
                <div>
                  <p className="font-bold text-[var(--text)]">{inv.id.toUpperCase()}</p>
                  <p className="text-[10px] text-[var(--text-soft)] mt-0.5">{inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--text)]">{inv.amount}</p>
                  <span className="text-[9px] font-black uppercase text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
