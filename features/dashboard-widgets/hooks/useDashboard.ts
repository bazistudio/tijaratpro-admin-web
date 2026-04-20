import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { 
  WIDGET_REFRESH_INTERVAL, 
  ACTIVITY_REFRESH_INTERVAL 
} from "../constants/widget.constants";

export const useDashboard = () => {
  const useDashboardSummary = () =>
    useQuery({
      queryKey: ["dashboard", "summary"],
      queryFn: dashboardService.fetchDashboardSummary,
      refetchInterval: WIDGET_REFRESH_INTERVAL,
    });

  const useRevenueStats = () =>
    useQuery({
      queryKey: ["dashboard", "revenue"],
      queryFn: dashboardService.fetchRevenueStats,
      refetchInterval: WIDGET_REFRESH_INTERVAL,
    });

  const useSalesStats = () =>
    useQuery({
      queryKey: ["dashboard", "sales"],
      queryFn: dashboardService.fetchSalesStats,
      refetchInterval: WIDGET_REFRESH_INTERVAL,
    });

  const useStockAlerts = () =>
    useQuery({
      queryKey: ["dashboard", "stock-alerts"],
      queryFn: dashboardService.fetchStockAlerts,
      refetchInterval: WIDGET_REFRESH_INTERVAL,
    });

  const useActivityFeed = () =>
    useQuery({
      queryKey: ["dashboard", "activity-feed"],
      queryFn: dashboardService.fetchActivityFeed,
      refetchInterval: ACTIVITY_REFRESH_INTERVAL, // Strict Enhancement: 15s for activity
    });

  return {
    useDashboardSummary,
    useRevenueStats,
    useSalesStats,
    useStockAlerts,
    useActivityFeed,
  };
};
