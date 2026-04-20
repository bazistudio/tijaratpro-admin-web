import React from "react";
import { WidgetCard } from "./WidgetCard";
import { Package, Clock } from "lucide-react";

interface OrdersWidgetProps {
  data?: { total: number; pending: number };
  isLoading: boolean;
  error?: string;
  lastUpdated: number;
}

export const OrdersWidget: React.FC<OrdersWidgetProps> = ({ data, isLoading, error, lastUpdated }) => {
  return (
    <WidgetCard title="Order Lifecycle" isLoading={isLoading} error={error}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
            <Package size={24} strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Current Queue</p>
            <p className="text-2xl font-black">{data ? data.total : "---"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
            <Clock size={14} />
            {data ? data.pending : "0"} Pending
          </div>
          <a href="/orders" className="text-[10px] text-primary font-black uppercase hover:underline">View All</a>
        </div>

        <p className="text-[9px] text-muted-foreground mt-2 italic">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </WidgetCard>
  );
};
