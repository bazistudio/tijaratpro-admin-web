import React from "react";
import { WidgetCard } from "./WidgetCard";
import { Server, Database, Globe, Cpu } from "lucide-react";

export const SystemHealthWidget: React.FC = () => {
  const healthStats = [
    { label: "API Runtime", status: "Healthy", icon: Server, color: "text-green-500" },
    { label: "Database", status: "Connected", icon: Database, color: "text-green-500" },
    { label: "CDN / Edge", status: "Active", icon: Globe, color: "text-green-500" },
    { label: "Memory Load", status: "14%", icon: Cpu, color: "text-blue-500" },
  ];

  return (
    <WidgetCard title="System Framework Health" subtitle="Global Node Status">
      <div className="space-y-4 pt-4">
        {healthStats.map((stat, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border group hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border border-border">
                <stat.icon size={16} className={stat.color} />
              </div>
              <span className="text-xs font-bold">{stat.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.status}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
