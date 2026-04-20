import axios from "@/lib/api/axios";
import { 
  RevenueStats, 
  SalesStats, 
  StockAlert, 
  ActivityItem, 
  DashboardSummary 
} from "../types/dashboard.types";
import { ApiResponse } from "@/types";

const BASE_PATH = "/dashboard";

export const dashboardService = {
  /**
   * Performance Enhancement: Fetches everything in one optimized response.
   */
  fetchDashboardSummary: () =>
    axios.get<ApiResponse<DashboardSummary>>(`${BASE_PATH}/summary`).then(res => res.data),

  fetchRevenueStats: () =>
    axios.get<ApiResponse<RevenueStats>>(`${BASE_PATH}/revenue`).then(res => res.data),

  fetchSalesStats: () =>
    axios.get<ApiResponse<SalesStats>>(`${BASE_PATH}/sales`).then(res => res.data),

  fetchOrdersStats: () =>
    axios.get<ApiResponse<any>>(`${BASE_PATH}/orders`).then(res => res.data),

  fetchStockAlerts: () =>
    axios.get<ApiResponse<StockAlert[]>>(`${BASE_PATH}/stock-alerts`).then(res => res.data),

  fetchActivityFeed: () =>
    axios.get<ApiResponse<ActivityItem[]>>(`${BASE_PATH}/activity-feed`).then(res => res.data),
};
