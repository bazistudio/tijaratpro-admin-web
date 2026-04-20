import React from "react";
import { LayoutDashboard, Store, TrendingUp } from "lucide-react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ShopOwnerLayout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <LayoutDashboard className="text-primary" size={32} />
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground font-medium text-sm">
            <span className="flex items-center gap-1.5"><Store size={14} /> Shop: Al-Abbas Mobile</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={14} /> Trend: +12.4%</span>
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
          <span className="text-[10px] font-black uppercase text-primary tracking-widest">Business Owner Mode</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </main>
    </div>
  );
};
