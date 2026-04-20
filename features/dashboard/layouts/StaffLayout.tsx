import React from "react";
import { Zap, Activity, Clock } from "lucide-react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const StaffLayout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Zap className="text-orange-500" size={32} />
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground font-medium text-sm">
            <span className="flex items-center gap-1.5"><Activity size={14} /> Operations: Active</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> Shift: Morning</span>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl">
          <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Operational Mode</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};
