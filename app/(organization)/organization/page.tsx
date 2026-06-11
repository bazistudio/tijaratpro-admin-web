"use client";

import React, { useEffect, useState } from "react";
import { 
  Store, 
  Users, 
  CreditCard, 
  ArrowRight, 
  Plus, 
  TrendingUp, 
  Wrench, 
  Pill, 
  Building
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OrganizationPage() {
  const { user, shops, activeShopId, setActiveShop } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSwitchShop = (shopId: string) => {
    setActiveShop(shopId);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter">
            {user?.shopName || "Tijarat Pro SaaS"}
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Central Command Platform & Multi-Branch Enterprise Console.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => router.push("/organization/shops")}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Provision New Branch</span>
        </Button>
      </div>

      {/* Corporate KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Shops Card */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
                Total Shop Branches
              </p>
              <h3 className="text-3xl font-black text-[var(--text)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                {shops?.length || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Store size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-success">
            <TrendingUp size={14} />
            <span>Active & Resolving Contexts</span>
          </div>
        </div>

        {/* Subscription Plan Card */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
                Subscription Plan
              </p>
              <h3 className="text-3xl font-black text-[var(--text)] tracking-tight uppercase group-hover:scale-105 transition-transform origin-left">
                Enterprise Pro
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard size={22} />
            </div>
          </div>
          <div className="mt-4 text-xs font-semibold text-[var(--text-soft)] flex justify-between">
            <span>Next Invoice: June 15, 2026</span>
            <span className="text-primary hover:underline cursor-pointer" onClick={() => router.push("/organization/subscriptions")}>
              Manage Tier
            </span>
          </div>
        </div>

        {/* Unified Workforce Card */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-black text-[var(--text-soft)] uppercase tracking-wider">
                Workforce Members
              </p>
              <h3 className="text-3xl font-black text-[var(--text)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                {shops?.length ? shops.length * 3 + 2 : 5} Active
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={22} />
            </div>
          </div>
          <div className="mt-4 text-xs font-semibold text-[var(--text-soft)] flex justify-between">
            <span>RBAC Protected</span>
            <span className="text-primary hover:underline cursor-pointer" onClick={() => router.push("/organization/employees")}>
              Manage Roster
            </span>
          </div>
        </div>

      </div>

      {/* Active Shop Branches Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
          Shop Branch Context Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(shops || []).map((shop) => {
            const isActive = shop._id === activeShopId;
            return (
              <div 
                key={shop._id}
                className={`bg-[var(--card)]/80 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isActive 
                    ? "border-primary/60 ring-2 ring-primary/10 shadow-lg shadow-primary/5" 
                    : "border-[var(--border)] hover:border-primary/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      shop.industryType === "AUTO_PARTS"
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        : shop.industryType === "MEDICINES"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                    }`}>
                      {shop.industryType === "AUTO_PARTS" ? (
                        <>
                          <Wrench size={10} />
                          <span>Auto Parts</span>
                        </>
                      ) : shop.industryType === "MEDICINES" ? (
                        <>
                          <Pill size={10} />
                          <span>Pharmacy</span>
                        </>
                      ) : (
                        <>
                          <Building size={10} />
                          <span>General Retail</span>
                        </>
                      )}
                    </span>
                    
                    {isActive && (
                      <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] px-2 py-0.5 rounded-full font-bold">
                        ACTIVE CONTEXT
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-[var(--text)] truncate">
                    {shop.name}
                  </h4>
                  <p className="text-xs text-[var(--text-soft)] mt-1 font-medium">
                    Branch Identifier: {shop._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)]/50 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">
                      Stock Level
                    </p>
                    <p className="text-sm font-extrabold text-[var(--text)] mt-0.5">
                      348 items
                    </p>
                  </div>
                  
                  {isActive ? (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => router.push("/dashboard")}
                      className="flex items-center gap-1.5"
                    >
                      <span>Open ERP</span>
                      <ArrowRight size={14} />
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleSwitchShop(shop._id)}
                    >
                      <span>Switch Context</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
