import React from "react";
import { ShopOwnerLayout } from "../layouts/ShopOwnerLayout";
import { SalesWidget } from "../widgets/SalesWidget";
import { RevenueWidget } from "../widgets/RevenueWidget";
import { StockAlertWidget } from "../widgets/StockAlertWidget";
import { OrdersWidget } from "../widgets/OrdersWidget";
import { ActivityFeedWidget } from "../widgets/ActivityFeedWidget";
import { DASHBOARD_CONFIGS } from "../core/dashboard.config";
import { DashboardType } from "../core/dashboard.registry";

const ShopOwnerDashboard: React.FC = () => {
  const config = DASHBOARD_CONFIGS[DashboardType.SHOP_OWNER];

  return (
    <ShopOwnerLayout title={config.title}>
      <SalesWidget />
      <RevenueWidget />
      <StockAlertWidget />
      <OrdersWidget />
      <ActivityFeedWidget />
    </ShopOwnerLayout>
  );
};

export default ShopOwnerDashboard;
