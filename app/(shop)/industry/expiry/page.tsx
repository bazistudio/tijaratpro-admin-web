"use client";

import React, { useState } from "react";
import { 
  CalendarClock, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  TrendingDown, 
  Bell,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExpiryTrackerPage() {
  
  // Expiry monitoring list
  const [expiryList, setExpiryList] = useState([
    { id: "x1", medicineName: "Panadol CF 500mg", batchNumber: "BCH-8902", expiryDate: "2026-06-15", daysLeft: 28, status: "critical", quantity: 480 },
    { id: "x2", medicineName: "Amoxil Suspension 250mg", batchNumber: "BCH-1092", expiryDate: "2026-07-22", daysLeft: 65, status: "warning", quantity: 120 },
    { id: "x3", medicineName: "Augmentin Tablet 625mg", batchNumber: "BCH-5690", expiryDate: "2026-11-30", daysLeft: 196, status: "safe", quantity: 850 },
    { id: "x4", medicineName: "Disprin Extra", batchNumber: "BCH-2319", expiryDate: "2026-05-28", daysLeft: 10, status: "critical", quantity: 90 },
  ]);

  const handleDisposeBatch = (id: string) => {
    // Simulated batch removal/disposal action
    setExpiryList(expiryList.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter flex items-center gap-2">
            <CalendarClock className="text-primary" />
            <span>Medicines Expiry Control</span>
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Realtime monitoring of shelf-life indices, active countdowns, and toxic biological disposal protocols.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wider">
          <Sparkles size={14} />
          <span>Pharmacy Layer</span>
        </div>
      </div>

      {/* Critical alerts bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Critical alert quota */}
        <div className="bg-danger/5 border border-danger/15 rounded-2xl p-6 relative overflow-hidden group hover:border-danger/30 transition-all duration-300">
          <p className="text-xs font-black text-danger uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle size={14} />
            <span>Critical Batches</span>
          </p>
          <h3 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">
            {expiryList.filter(i => i.status === "critical").length} Batches
          </h3>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Requires immediate markdown or disposal within 30 days
          </p>
        </div>

        {/* Warning alert quota */}
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
          <p className="text-xs font-black text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle size={14} />
            <span>Nearing Shelf Limit</span>
          </p>
          <h3 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">
            {expiryList.filter(i => i.status === "warning").length} Batches
          </h3>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Expires in 30 - 90 days. Keep in priority sales racks.
          </p>
        </div>

        {/* Healthy stock quota */}
        <div className="bg-success/5 border border-success/15 rounded-2xl p-6 relative overflow-hidden group hover:border-success/30 transition-all duration-300">
          <p className="text-xs font-black text-success uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle size={14} />
            <span>Healthy Inventory</span>
          </p>
          <h3 className="text-3xl font-black text-[var(--text)] tracking-tight mt-3">
            {expiryList.filter(i => i.status === "safe").length} Batches
          </h3>
          <p className="text-[10px] text-[var(--text-soft)] mt-2 font-medium">
            Stable shelf-life. No immediate actions required.
          </p>
        </div>

      </div>

      {/* Main interactive table & filters */}
      <div className="space-y-4">
        
        {/* Quick query bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Query batch numbers or chemical compositions..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--card)]/80 border border-[var(--border)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="flex items-center gap-1.5 text-xs font-bold h-11 px-4">
              <RefreshCw size={14} />
              <span>Force Expiry Scan</span>
            </Button>
          </div>
        </div>

        {/* Monitoring grid */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl overflow-hidden backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider bg-[var(--bg-secondary)]/30">
                <th className="py-4 px-6">Medicine / Chemical Specification</th>
                <th className="py-4 px-6">Batch ID</th>
                <th className="py-4 px-6">Remaining Packets</th>
                <th className="py-4 px-6">Expiry Timeline</th>
                <th className="py-4 px-6 text-right">Emergency Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/40 text-sm">
              {expiryList.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--bg-secondary)]/10 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-bold text-[var(--text)]">{item.medicineName}</p>
                      <p className="text-xs text-[var(--text-soft)] mt-0.5">Assigned to: General Medicine Rack</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-primary">
                    {item.batchNumber}
                  </td>
                  <td className="py-4 px-6 font-bold text-[var(--text)]">
                    {item.quantity} Units
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className={`${
                          item.status === "critical"
                            ? "text-danger"
                            : item.status === "warning"
                            ? "text-amber-500"
                            : "text-success"
                        }`}>
                          {item.daysLeft} Days Remaining
                        </span>
                        <span className="text-[var(--text-soft)]">{item.expiryDate}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.status === "critical"
                              ? "bg-danger animate-pulse"
                              : item.status === "warning"
                              ? "bg-amber-500"
                              : "bg-success"
                          }`}
                          style={{ width: `${Math.min(100, (item.daysLeft / 200) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.status === "critical" ? (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDisposeBatch(item.id)}
                      >
                        Write-off & Dispose
                      </Button>
                    ) : (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleDisposeBatch(item.id)}
                      >
                        Discard
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
