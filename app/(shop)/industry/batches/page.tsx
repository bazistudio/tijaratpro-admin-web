"use client";

import React, { useState } from "react";
import { 
  PackageOpen, 
  Plus, 
  Trash2, 
  Search, 
  QrCode, 
  Tag, 
  TrendingUp, 
  Building,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BatchInventoryPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [batches, setBatches] = useState([
    { id: "b1", productName: "Panadol CF 500mg", batchNumber: "BCH-8902", mfgDate: "2024-06-15", expDate: "2026-06-15", initialQty: 1000, currentQty: 480, retailPrice: "180", tradePrice: "140", supplier: "GSK Pharmaceuticals" },
    { id: "b2", productName: "Amoxil Suspension 250mg", batchNumber: "BCH-1092", mfgDate: "2024-07-22", expDate: "2026-07-22", initialQty: 500, currentQty: 120, retailPrice: "340", tradePrice: "290", supplier: "Abbott Laboratories" },
    { id: "b3", productName: "Augmentin Tablet 625mg", batchNumber: "BCH-5690", mfgDate: "2024-11-30", expDate: "2026-11-30", initialQty: 1500, currentQty: 850, retailPrice: "520", tradePrice: "460", supplier: "GSK Pharmaceuticals" }
  ]);

  const [formData, setFormData] = useState({
    productName: "",
    batchNumber: "",
    mfgDate: "2025-01-01",
    expDate: "2027-01-01",
    initialQty: 1000,
    retailPrice: "",
    tradePrice: "",
    supplier: "GSK Pharmaceuticals"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    setTimeout(() => {
      const newBatch = {
        id: "b" + (batches.length + 1),
        productName: formData.productName,
        batchNumber: formData.batchNumber,
        mfgDate: formData.mfgDate,
        expDate: formData.expDate,
        initialQty: Number(formData.initialQty),
        currentQty: Number(formData.initialQty),
        retailPrice: formData.retailPrice,
        tradePrice: formData.tradePrice,
        supplier: formData.supplier
      };

      setBatches([newBatch, ...batches]);
      setLoading(false);
      setSuccess("New medical batch registered successfully!");
      setFormData({
        productName: "",
        batchNumber: "",
        mfgDate: "2025-01-01",
        expDate: "2027-01-01",
        initialQty: 1000,
        retailPrice: "",
        tradePrice: "",
        supplier: "GSK Pharmaceuticals"
      });
      setTimeout(() => setSuccess(""), 2000);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter flex items-center gap-2">
            <PackageOpen className="text-primary" />
            <span>Pharmacy Batch Registry</span>
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Enforce batch-level pricing controls, manufacturing intervals, and remaining metrics for strict auditing.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wider">
          <Tag size={14} />
          <span>Pharmacy Layer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Create/Add Batch form */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 h-fit space-y-4">
          <div className="border-b border-[var(--border)] pb-3">
            <h3 className="text-lg font-bold text-[var(--text)]">
              Register New Batch
            </h3>
            <p className="text-xs text-[var(--text-soft)] font-medium">
              Create an isolated batch inventory with manufacturing details.
            </p>
          </div>

          <form onSubmit={handleAddBatch} className="space-y-4">
            {success && (
              <div className="p-3 bg-success/10 border border-success/20 text-success rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Medicine Name
              </label>
              <input 
                type="text" 
                name="productName" 
                required
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g. Panadol CF 500mg"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Batch Number / ID
                </label>
                <input 
                  type="text" 
                  name="batchNumber" 
                  required
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. BCH-8902"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Initial Quantity
                </label>
                <input 
                  type="number" 
                  name="initialQty" 
                  required
                  value={formData.initialQty}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  MFG Date
                </label>
                <input 
                  type="date" 
                  name="mfgDate" 
                  required
                  value={formData.mfgDate}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  EXP Date
                </label>
                <input 
                  type="date" 
                  name="expDate" 
                  required
                  value={formData.expDate}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Retail Price (PKR)
                </label>
                <input 
                  type="text" 
                  name="retailPrice" 
                  required
                  value={formData.retailPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 180"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Trade Price (PKR)
                </label>
                <input 
                  type="text" 
                  name="tradePrice" 
                  required
                  value={formData.tradePrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 140"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Supplier Corporation
              </label>
              <select 
                name="supplier" 
                value={formData.supplier}
                onChange={handleInputChange}
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="GSK Pharmaceuticals">GSK Pharmaceuticals</option>
                <option value="Abbott Laboratories">Abbott Laboratories</option>
                <option value="Pfizer Pakistan">Pfizer Pakistan</option>
              </select>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>{loading ? "Registering..." : "Register Batch"}</span>
            </Button>
          </form>
        </div>

        {/* Right Side: Batches Lists & Action Logs */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Quick Query Search */}
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Query active pharmaceutical batches..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--card)]/80 border border-[var(--border)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Grid list of batch items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.map((b) => (
              <div 
                key={b.id}
                className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[var(--text)] text-base truncate">{b.productName}</h4>
                      <p className="text-xs text-[var(--text-soft)] mt-0.5 flex items-center gap-1">
                        <Building size={12} />
                        <span>{b.supplier}</span>
                      </p>
                    </div>
                    <span className="font-mono text-xs font-black bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full shrink-0">
                      {b.batchNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 border-t border-[var(--border)]/40 pt-3 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">MFG Interval</p>
                      <p className="font-semibold text-[var(--text)] mt-0.5">{b.mfgDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">EXP Interval</p>
                      <p className="font-semibold text-danger mt-0.5">{b.expDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Trade Cost</p>
                      <p className="font-semibold text-[var(--text)] mt-0.5">PKR {b.tradePrice}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Retail Cost</p>
                      <p className="font-semibold text-primary mt-0.5">PKR {b.retailPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-[var(--border)]/40 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[var(--text)]">{b.currentQty} Packs</span>
                    <span className="text-[var(--text-soft)] font-medium"> remaining of {b.initialQty}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary hover:underline cursor-pointer">
                    <QrCode size={14} />
                    <span>Print QR Label</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
