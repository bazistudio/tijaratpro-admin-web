"use client";

import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  Mail, 
  Shield, 
  MapPin, 
  Check, 
  X,
  UserCheck
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";

export default function EmployeesRosterPage() {
  const { user, shops } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mock employees list showing rich visual elements
  const [employees, setEmployees] = useState([
    { id: "e1", name: "Haris Jamil", email: "haris@tijarat.pro", role: "MANAGER", shopId: shops[0]?._id || "shop1", status: "active" },
    { id: "e2", name: "Ayesha Khan", email: "ayesha@tijarat.pro", role: "CASHIER", shopId: shops[0]?._id || "shop1", status: "active" },
    { id: "e3", name: "Zainab Malik", email: "zainab@tijarat.pro", role: "STAFF", shopId: shops[1]?._id || "shop2", status: "active" },
    { id: "e4", name: "Umer Bilal", email: "umer@tijarat.pro", role: "CASHIER", shopId: shops[1]?._id || "shop2", status: "pending" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STAFF",
    shopId: shops[0]?._id || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newEmp = {
        id: "e" + (employees.length + 1),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        shopId: formData.shopId,
        status: "pending"
      };
      setEmployees([...employees, newEmp]);
      setLoading(false);
      setModalOpen(false);
      setFormData({
        name: "",
        email: "",
        role: "STAFF",
        shopId: shops[0]?._id || ""
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black gradient-text tracking-tighter">
            Employee Roster
          </h1>
          <p className="text-[var(--text-soft)] text-sm font-medium mt-1">
            Enforce RBAC policies, assign branches, and manage employee onboarding under one command interface.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Invite Employee</span>
        </Button>
      </div>

      {/* Table of Employees */}
      <div className="bg-[var(--card)]/60 border border-[var(--border)] rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider bg-[var(--bg-secondary)]/30">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Assigned Branch</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/40 text-sm">
              {employees.map((emp) => {
                const assignedShop = (shops || []).find((s) => s._id === emp.shopId);
                return (
                  <tr key={emp.id} className="hover:bg-[var(--bg-secondary)]/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          {emp.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--text)]">{emp.name}</p>
                          <p className="text-xs text-[var(--text-soft)]">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        emp.role === "MANAGER"
                          ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                          : emp.role === "CASHIER"
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-gray-500/10 text-[var(--text-soft)] border border-gray-500/20"
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[var(--text)]">
                      {assignedShop?.name || "Global / Unassigned"}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        emp.status === "active"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="secondary" size="sm" className="mr-2">
                        Adjust Permissions
                      </Button>
                      <Button variant="danger" size="sm">
                        Revoke Access
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setModalOpen(false)}
          />
          
          <div className="bg-[var(--card)] border border-[var(--border)] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl z-50 relative animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
              <h2 className="text-lg font-black text-[var(--text)] tracking-tight">
                Invite Workspace Employee
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-[var(--text-soft)] hover:text-[var(--text)]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Asad Ahmed"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. asad@tijarat.pro"
                  className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    Role Priority
                  </label>
                  <select 
                    name="role" 
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="MANAGER">MANAGER</option>
                    <option value="CASHIER">CASHIER</option>
                    <option value="STAFF">STAFF</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wider">
                    Branch Assignment
                  </label>
                  <select 
                    name="shopId" 
                    value={formData.shopId}
                    onChange={handleInputChange}
                    className="w-full h-11 px-4 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    {(shops || []).map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
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
                  {loading ? "Sending..." : "Send Invitation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
