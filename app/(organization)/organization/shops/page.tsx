"use client";

import React, { useState } from "react";
import { 
  Store, 
  Plus, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Wrench, 
  Pill, 
  Building,
  ChevronRight,
  X
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function ShopsManagementPage() {
  const { user, shops, initialize } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    industryType: "GENERAL_STORE"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api("/shops", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create branch");
      }

      setSuccess("Shop branch created successfully! Initiating database context...");
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        industryType: "GENERAL_STORE"
      });
      
      // Reload the auth store to pull new branches
      await initialize();
      
      setTimeout(() => {
        setModalOpen(false);
        setSuccess("");
      }, 1500);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter">
            Branch Management
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Provision, monitor, and scale physical retail points and pharmacy branches.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Provision Branch</span>
        </Button>
      </div>

      {/* Grid of branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(shops || []).map((shop) => (
          <div 
            key={shop._id}
            className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
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
                <span className="bg-success/10 text-success border border-success/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
                  {shop.status || "active"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text)] truncate">
                {shop.name}
              </h3>
              
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
                  <Phone size={14} className="text-primary" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-soft)] truncate">
                  <Mail size={14} className="text-primary" />
                  <span>{shop.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
                  <MapPin size={14} className="text-primary" />
                  <span>{shop.address || "No Address Added"}, {shop.city || "No City"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]/50 flex justify-between items-center text-xs">
              <span className="text-[var(--text-soft)] font-medium">
                Created on: {new Date(shop.createdAt).toLocaleDateString()}
              </span>
              <span className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1">
                <span>Configure</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Provisioning Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setModalOpen(false)}
          />
          
          <div className="bg-[var(--card)] border border-[var(--border)] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl z-50 relative animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
              <h2 className="text-lg font-black text-[var(--text)] tracking-tight">
                Provision New Branch
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-[var(--text-soft)] hover:text-[var(--text)]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-danger/10 border border-danger/20 text-danger rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-success/10 border border-success/20 text-success rounded-xl text-xs font-semibold">
                  {success}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Branch Shop Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Tijarat Auto Parts Center"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    Phone Contact
                  </label>
                  <input 
                    type="text" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    Branch Email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. branch1@tijarat.pro"
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    Industry Type / Template
                  </label>
                  <select 
                    name="industryType" 
                    value={formData.industryType}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="GENERAL_STORE">General Retail & Store</option>
                    <option value="AUTO_PARTS">Auto Parts Compatibility</option>
                    <option value="MEDICINES">Medicines & Pharmacy</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    City
                  </label>
                  <input 
                    type="text" 
                    name="city" 
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Lahore"
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Physical Address
                </label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 45-B Commercial Sector"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3">
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Provisioning..." : "Provision Branch"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
