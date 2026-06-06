"use client";

import React from "react";
import { Settings, Shield, Globe, Mail, Key } from "lucide-react";
import { SystemControlsPanel } from "@/features/super-admin/components/overview/SystemControlsPanel";

export default function SuperAdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
          <Settings className="text-primary w-6 h-6" />
          System Settings
        </h1>
        <p className="text-sm text-[var(--text-soft)] mt-1">
          Global platform configuration, API keys, and maintenance controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { id: "general", label: "General", icon: Globe, active: true },
            { id: "controls", label: "System Controls", icon: Shield, active: false },
            { id: "email", label: "Email SMTP", icon: Mail, active: false },
            { id: "api", label: "API Keys", icon: Key, active: false },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                tab.active
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-[var(--text-soft)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Controls Section */}
          <section className="glass-card overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)]">
              <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2">
                <Shield size={16} className="text-warning" />
                Global Controls
              </h2>
              <p className="text-xs text-[var(--text-soft)] mt-0.5">Toggle maintenance mode and block signups.</p>
            </div>
            <SystemControlsPanel />
          </section>

          {/* Placeholders for other settings */}
          <section className="glass-card overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)]">
              <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2">
                <Globe size={16} className="text-blue-500" />
                Platform Branding
              </h2>
              <p className="text-xs text-[var(--text-soft)] mt-0.5">Manage default logos and terms of service URLs.</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-[var(--text-soft)]">Platform branding settings go here.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
