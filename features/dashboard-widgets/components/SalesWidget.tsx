import React from "react";
import { WidgetCard } from "./WidgetCard";
import { SalesStats } from "../types/dashboard.types";
import { formatNumber } from "../utils/dashboard.utils";
import { ShoppingCart, TrendingUp } from "lucide-react";

interface SalesWidgetProps {
  data?: SalesStats;
  isLoading: boolean;
  error?: string;
  lastUpdated: number;
}

export const SalesWidget: React.FC<SalesWidgetProps> = ({ data, isLoading, error, lastUpdated }) => {
  return (
    <WidgetCard title="Sales Volume" isLoading={isLoading} error={error}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <ShoppingCart size={24} strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Gross Sales</p>
            <p className="text-2xl font-black">{data ? formatNumber(data.totalSales) : "---"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter mb-1">Total Orders</p>
            <p className="text-lg font-bold">{data ? data.totalOrders : "---"}</p>
          </div>
          {data?.growth !== undefined && (
            <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-lg text-xs font-black">
              <TrendingUp size={14} />
              {data.growth}%
            </div>
          )}
        </div>

        <p className="text-[9px] text-muted-foreground mt-2 italic">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </WidgetCard>
  );
};
