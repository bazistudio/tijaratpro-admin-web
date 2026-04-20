import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { RevenueWidget } from "../components/RevenueWidget";
import { SalesWidget } from "../components/SalesWidget";
import { OrdersWidget } from "../components/OrdersWidget";
import { StockAlertWidget } from "../components/StockAlertWidget";
import { ActivityFeedWidget } from "../components/ActivityFeedWidget";
import { LayoutDashboard, Calendar, RefreshCcw } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { 
    useRevenueStats, 
    useSalesStats, 
    useStockAlerts, 
    useActivityFeed 
  } = useDashboard();

  const revenueQuery = useRevenueStats();
  const salesQuery = useSalesStats();
  const stockQuery = useStockAlerts();
  const activityQuery = useActivityFeed();

  // Simulated lastUpdated for each query
  const lastUpdated = Date.now();

  return (
    <div className="p-6 md:p-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <LayoutDashboard className="text-primary" size={32} />
            Command Center
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Real-time business performance and operational signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Date Range</span>
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-xs font-bold">
              <Calendar size={14} />
              Today: {new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </div>
          </div>
          <button 
            onClick={() => {
              revenueQuery.refetch();
              salesQuery.refetch();
              stockQuery.refetch();
              activityQuery.refetch();
            }}
            className="p-3 border border-border rounded-xl hover:bg-muted transition-all active:scale-95 group"
            title="Refresh All Widgets"
          >
            <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Responsive Grid Layout - Enhancement: 24px gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {/* Row 1 */}
        <RevenueWidget 
          data={revenueQuery.data?.data} 
          isLoading={revenueQuery.isLoading} 
          error={revenueQuery.error?.message}
          lastUpdated={lastUpdated}
        />
        
        <SalesWidget 
          data={salesQuery.data?.data} 
          isLoading={salesQuery.isLoading} 
          error={salesQuery.error?.message}
          lastUpdated={lastUpdated}
        />

        <OrdersWidget 
          data={{ total: 42, pending: 8 }} // Simulated for now
          isLoading={false}
          lastUpdated={lastUpdated}
        />

        {/* Row 2 */}
        <StockAlertWidget 
          alerts={stockQuery.data?.data} 
          isLoading={stockQuery.isLoading} 
          error={stockQuery.error?.message}
          lastUpdated={lastUpdated}
        />

        <ActivityFeedWidget 
          activity={activityQuery.data?.data} 
          isLoading={activityQuery.isLoading} 
          error={activityQuery.error?.message}
          lastUpdated={lastUpdated}
        />

        {/* Empty Widget for Future Grid Expansion */}
        <div className="hidden lg:block p-8 border border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground/20 italic font-medium">
          Expansion Slot
        </div>
      </div>
    </div>
  );
};
