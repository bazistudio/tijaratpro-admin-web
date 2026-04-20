import React from "react";
import { WidgetCard } from "./WidgetCard";
import { ActivityItem, ActivityType } from "../types/dashboard.types";
import { 
  ShoppingBag, 
  Printer, 
  RefreshCw, 
  CreditCard, 
  User, 
  AlertTriangle,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";

interface ActivityFeedWidgetProps {
  activity?: ActivityItem[];
  isLoading: boolean;
  error?: string;
  lastUpdated: number;
}

const typeConfig: Record<ActivityType, { icon: any; color: string; bgColor: string }> = {
  SALE_CREATED: { icon: ShoppingBag, color: "text-green-600", bgColor: "bg-green-500/10" },
  PRINT_JOB_CREATED: { icon: Printer, color: "text-blue-600", bgColor: "bg-blue-500/10" },
  STOCK_UPDATED: { icon: RefreshCw, color: "text-orange-600", bgColor: "bg-orange-500/10" },
  PAYMENT_RECEIVED: { icon: CreditCard, color: "text-emerald-600", bgColor: "bg-emerald-500/10" },
  USER_LOGIN: { icon: User, color: "text-purple-600", bgColor: "bg-purple-500/10" },
  SYSTEM_ERROR: { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-500/10" },
};

export const ActivityFeedWidget: React.FC<ActivityFeedWidgetProps> = ({ 
  activity, 
  isLoading, 
  error,
  lastUpdated 
}) => {
  return (
    <WidgetCard title="Live Activity Feed" isLoading={isLoading} error={error} className="lg:col-span-1">
      <div className="space-y-4">
        {activity && activity.length > 0 ? (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {activity.map((item) => {
              const config = typeConfig[item.type] || typeConfig.SYSTEM_ERROR;
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex gap-4 relative group">
                  <div className={clsx(
                    "h-8 w-8 shrink-0 rounded-lg flex items-center justify-center",
                    config.bgColor, config.color
                  )}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold leading-tight">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground uppercase font-black">
                      <Clock size={10} />
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground/30 flex flex-col items-center">
            <RefreshCw size={32} className="mb-2 opacity-10 animate-spin-slow" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Events</p>
          </div>
        )}

        <p className="text-[9px] text-muted-foreground pt-4 border-t border-border italic">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()} (15s polling)
        </p>
      </div>
    </WidgetCard>
  );
};
