import React from "react";
import { WidgetCard } from "./WidgetCard";
import { StockAlert } from "../types/dashboard.types";
import { AlertCircle, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface StockAlertWidgetProps {
  alerts?: StockAlert[];
  isLoading: boolean;
  error?: string;
  lastUpdated: number;
}

export const StockAlertWidget: React.FC<StockAlertWidgetProps> = ({ alerts, isLoading, error, lastUpdated }) => {
  const CriticalItems = alerts?.filter(a => a.currentStock <= a.minimumStock / 2) || [];
  const WarningItems = alerts?.filter(a => a.currentStock > a.minimumStock / 2) || [];

  return (
    <WidgetCard title="Inventory Alerts" isLoading={isLoading} error={error}>
      <div className="space-y-4">
        {alerts && alerts.length > 0 ? (
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {[...CriticalItems, ...WarningItems].slice(0, 5).map((alert) => {
              const isCritical = alert.currentStock <= alert.minimumStock / 2;
              return (
                <div 
                  key={alert.productId}
                  className={clsx(
                    "flex items-center justify-between p-3 rounded-xl border transition-all",
                    isCritical 
                      ? "bg-red-500/10 border-red-500/20 text-red-600" 
                      : "bg-orange-500/10 border-orange-500/20 text-orange-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={16} />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase truncate max-w-[120px]">
                        {alert.productName}
                      </span>
                      <span className="text-[9px] opacity-70">
                        Min: {alert.minimumStock} | Current: {alert.currentStock}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="opacity-50" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground/30 flex flex-col items-center">
            <AlertCircle size={32} className="mb-2 opacity-10" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Inventory Healthy</p>
          </div>
        )}

        {alerts && alerts.length > 5 && (
          <p className="text-[10px] text-primary text-center font-bold uppercase hover:underline cursor-pointer">
            + {alerts.length - 5} More Alerts
          </p>
        )}

        <p className="text-[9px] text-muted-foreground pt-2 border-t border-border italic">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </WidgetCard>
  );
};
