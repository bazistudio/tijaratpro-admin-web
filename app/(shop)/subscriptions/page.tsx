"use client";

import React from "react";
import { 
  Search, Filter, MoreHorizontal, 
  Database, CheckCircle2, AlertCircle, 
  Clock, CreditCard, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const subscriptions = [
  {
    id: "sub_1",
    tenant: "Green Grocery Store",
    plan: "Business",
    status: "Active",
    nextBilling: "June 12, 2026",
    amount: "$79.00",
    health: "Healthy"
  },
  {
    id: "sub_2",
    tenant: "Tech Hub Electronics",
    plan: "Enterprise",
    status: "Active",
    nextBilling: "July 01, 2026",
    amount: "$299.00",
    health: "Healthy"
  },
  {
    id: "sub_3",
    tenant: "Zia's Pharmacy",
    plan: "Basic",
    status: "Past Due",
    nextBilling: "May 10, 2026",
    amount: "$29.00",
    health: "At Risk"
  },
  {
    id: "sub_4",
    tenant: "Fashion Point",
    plan: "Business",
    status: "Cancelled",
    nextBilling: "N/A",
    amount: "$0.00",
    health: "Churned"
  }
];

export default function SubscriptionsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black gradient-text tracking-tight">Active Subscriptions</h1>
          <p className="text-sm text-[var(--text-soft)] font-medium">Monitor tenant billing health and revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 border-[var(--border)] font-bold">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl h-11 bg-primary hover:bg-primary-dark text-white font-black shadow-lg shadow-primary/20 px-6">
            Export Report
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Monthly MRR", val: "$14.2k", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Active Subs", val: "158", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Churn Rate", val: "2.4%", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Past Due", val: "4", icon: Clock, color: "text-danger", bg: "bg-danger/10" },
        ].map((stat, i) => (
          <Card key={i} className="p-5 bg-[var(--card)] border-[var(--border)] rounded-2xl">
            <p className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-[var(--text)]">{stat.val}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" size={18} />
            <Input 
              placeholder="Search by tenant name..." 
              className="pl-10 h-11 bg-[var(--bg-secondary)] border-transparent rounded-xl font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/50 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Next Billing</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-[var(--text)]">{sub.tenant}</span>
                      <span className="text-[10px] text-[var(--text-soft)] font-medium uppercase tracking-wider">{sub.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant="outline" className="rounded-lg border-primary/20 text-primary bg-primary/5 font-bold">
                      {sub.plan}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[var(--text-soft)]">
                    {sub.nextBilling}
                  </td>
                  <td className="px-6 py-5 font-black text-[var(--text)]">
                    {sub.amount}
                  </td>
                  <td className="px-6 py-5">
                    <Badge className={cn(
                      "rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider border-none shadow-none",
                      sub.status === 'Active' ? "bg-green-500/10 text-green-500" : 
                      sub.status === 'Past Due' ? "bg-danger/10 text-danger" : "bg-muted text-muted-foreground"
                    )}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                        <ExternalLink size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-[var(--bg-secondary)]">
                        <MoreHorizontal size={18} />
                      </Button>
                    </div>
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

// Dummy Icon for stats mapping
const TrendingUp = ({ size, className }: any) => <Database size={size} className={className} />;
