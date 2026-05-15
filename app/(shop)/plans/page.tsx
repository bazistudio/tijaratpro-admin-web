"use client";

import React from "react";
import { 
  Plus, Search, Filter, MoreHorizontal, 
  Layers, CheckCircle2, AlertCircle, TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "plan_1",
    name: "Basic",
    price: "$29/mo",
    shops: 1,
    products: "1,000",
    status: "Active",
    users: 450,
    color: "blue"
  },
  {
    id: "plan_2",
    name: "Business",
    price: "$79/mo",
    shops: 5,
    products: "10,000",
    status: "Active",
    users: 1200,
    color: "purple"
  },
  {
    id: "plan_3",
    name: "Enterprise",
    price: "Custom",
    shops: "Unlimited",
    products: "Unlimited",
    status: "Active",
    users: 85,
    color: "indigo"
  },
  {
    id: "plan_4",
    name: "Legacy Starter",
    price: "$19/mo",
    shops: 1,
    products: "500",
    status: "Deprecated",
    users: 12,
    color: "orange"
  }
];

export default function PlansPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black gradient-text tracking-tight">Subscription Plans</h1>
          <p className="text-sm text-[var(--text-soft)] font-medium">Manage SaaS billing tiers and features.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 border-[var(--border)] font-bold">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl h-11 bg-primary hover:bg-primary-dark text-white font-black shadow-lg shadow-primary/20 px-6">
            <Plus size={18} className="mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 bg-[var(--card)] border-[var(--border)] rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Top Plan</p>
              <p className="text-xl font-black text-[var(--text)]">Business (48%)</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 bg-[var(--card)] border-[var(--border)] rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Active Tiers</p>
              <p className="text-xl font-black text-[var(--text)]">3 Public / 1 Private</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 bg-[var(--card)] border-[var(--border)] rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Avg. Rev/User</p>
              <p className="text-xl font-black text-[var(--text)]">$64.20</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
        <div className="p-4 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
            <Input 
              placeholder="Search plans..." 
              className="pl-10 h-11 bg-[var(--bg-secondary)] border-transparent rounded-xl font-medium focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Plan Name</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Pricing</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Limit (Shops)</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Active Subscriptions</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center text-white font-black shadow-sm",
                        plan.color === 'blue' && "bg-blue-500",
                        plan.color === 'purple' && "bg-purple-500",
                        plan.color === 'indigo' && "bg-indigo-500",
                        plan.color === 'orange' && "bg-orange-500",
                      )}>
                        {plan.name[0]}
                      </div>
                      <span className="font-bold text-[var(--text)]">{plan.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-primary">{plan.price}</span>
                  </td>
                  <td className="px-6 py-5 font-bold text-[var(--text-soft)]">
                    {plan.shops}
                  </td>
                  <td className="px-6 py-5 font-bold text-[var(--text)]">
                    {plan.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <Badge className={cn(
                      "rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider border-none shadow-none",
                      plan.status === 'Active' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                    )}>
                      {plan.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-[var(--bg-secondary)]">
                      <MoreHorizontal size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
