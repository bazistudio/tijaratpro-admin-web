import React from "react";
import { WidgetCard } from "./WidgetCard";
import { RevenueStats } from "../types/dashboard.types";
import { formatCurrency } from "../utils/dashboard.utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface RevenueWidgetProps {
  data?: RevenueStats;
  isLoading: boolean;
  error?: string;
  lastUpdated: number;
}

export const RevenueWidget: React.FC<RevenueWidgetProps> = ({ data, isLoading, error, lastUpdated }) => {
  return (
    <WidgetCard title="Revenue Insights" isLoading={isLoading} error={error}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <DollarSign size={24} strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Today's Revenue</p>
            <p className="text-2xl font-black">{data ? formatCurrency(data.today) : "---"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter mb-1">This Week</p>
            <p className="text-sm font-bold">{data ? formatCurrency(data.thisWeek) : "---"}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter mb-1">This Month</p>
            <p className="text-sm font-bold">{data ? formatCurrency(data.thisMonth) : "---"}</p>
          </div>
        </div>
        
        <p className="text-[9px] text-muted-foreground mt-4 italic">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </WidgetCard>
  );
};
