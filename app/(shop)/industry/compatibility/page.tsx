"use client";

import React, { useState } from "react";
import { 
  Wrench, 
  Search, 
  Plus, 
  Trash2, 
  Car, 
  Cpu, 
  CheckCircle, 
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartsCompatibilityPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  // Seed sample compatibility registry entries
  const [registry, setRegistry] = useState([
    { id: "c1", partName: "Brake Pad Elite", sku: "BK-8902-XL", vehicle: "Toyota Corolla", years: "2018 - 2023", notes: "Fits front wheels only" },
    { id: "c2", partName: "Irridium Spark Plug", sku: "SP-1092-NG", vehicle: "Honda Civic", years: "2016 - 2021", notes: "1.5L Turbo engines" },
    { id: "c3", partName: "Premium Oil Filter", sku: "OF-5690-HD", vehicle: "Suzuki Swift", years: "2017 - 2024", notes: "Compatible with all 1.2L models" },
  ]);

  const [formData, setFormData] = useState({
    partName: "",
    sku: "",
    vehicle: "Toyota Corolla",
    years: "2020 - 2024",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    setTimeout(() => {
      const newEntry = {
        id: "c" + (registry.length + 1),
        ...formData
      };
      setRegistry([newEntry, ...registry]);
      setLoading(false);
      setSuccess("Part compatibility mapped successfully!");
      setFormData({
        partName: "",
        sku: "",
        vehicle: "Toyota Corolla",
        years: "2020 - 2024",
        notes: ""
      });
      setTimeout(() => setSuccess(""), 2000);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setRegistry(registry.filter(entry => entry.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter flex items-center gap-2">
            <Wrench className="text-primary" />
            <span>Parts Compatibility Engine</span>
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Link inventory SKUs directly to vehicle makes, models, and build periods to assure client fitment.
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-wider">
          <Car size={14} />
          <span>Auto Parts Layer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Creation Form */}
        <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 h-fit space-y-4">
          <div className="border-b border-[var(--border)] pb-3">
            <h3 className="text-lg font-bold text-[var(--text)]">
              Map New Fitment
            </h3>
            <p className="text-xs text-[var(--text-soft)] font-medium">
              Create a vehicle compatibility link for an inventory product.
            </p>
          </div>

          <form onSubmit={handleAddCompatibility} className="space-y-4">
            {success && (
              <div className="p-3 bg-success/10 border border-success/20 text-success rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle size={14} />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Part / Item Name
              </label>
              <input 
                type="text" 
                name="partName" 
                required
                value={formData.partName}
                onChange={handleInputChange}
                placeholder="e.g. Front Disc Brake Pad"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Inventory SKU
              </label>
              <input 
                type="text" 
                name="sku" 
                required
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="e.g. BK-8902-XL"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Target Vehicle
                </label>
                <select 
                  name="vehicle" 
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="Toyota Corolla">Toyota Corolla</option>
                  <option value="Honda Civic">Honda Civic</option>
                  <option value="Suzuki Swift">Suzuki Swift</option>
                  <option value="Kia Sportage">Kia Sportage</option>
                  <option value="Hyundai Tucson">Hyundai Tucson</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Model Years
                </label>
                <input 
                  type="text" 
                  name="years" 
                  required
                  value={formData.years}
                  onChange={handleInputChange}
                  placeholder="e.g. 2018 - 2022"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                Fitment Specifications
              </label>
              <input 
                type="text" 
                name="notes" 
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="e.g. Fits front wheels only, 1.5L Turbo"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>{loading ? "Adding Link..." : "Add Fitment Link"}</span>
            </Button>
          </form>
        </div>

        {/* Right Side: Registry Table & Search */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Quick Search */}
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Query vehicle compatibility database... (e.g. Corolla Brake)"
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--card)]/80 border border-[var(--border)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Table Box */}
          <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl overflow-hidden backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider bg-[var(--bg-secondary)]/30">
                  <th className="py-4 px-6">Part Specifications</th>
                  <th className="py-4 px-6">SKU Code</th>
                  <th className="py-4 px-6">Compatible Vehicle</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/40 text-sm">
                {registry.map((item) => (
                  <tr key={item.id} className="hover:bg-[var(--bg-secondary)]/10 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-[var(--text)]">{item.partName}</p>
                        <p className="text-xs text-[var(--text-soft)] mt-0.5">{item.notes}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">
                      {item.sku}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Car size={14} className="text-[var(--text-soft)]" />
                        <span className="font-semibold text-[var(--text)]">{item.vehicle} ({item.years})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-danger hover:bg-danger/10 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
