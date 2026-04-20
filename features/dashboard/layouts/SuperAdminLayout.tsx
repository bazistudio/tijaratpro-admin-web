import React from "react";
import { ShieldAlert, Globe, Server } from "lucide-react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const SuperAdminLayout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={32} />
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-slate-400 font-medium text-sm">
            <span className="flex items-center gap-1.5"><Globe size={14} /> Global Instance: PRD-01</span>
            <span className="flex items-center gap-1.5"><Server size={14} /> Health: 99.9%</span>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
          <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">Global Root Mode</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </main>
    </div>
  );
};
