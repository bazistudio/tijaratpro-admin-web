import React from "react";
import { StaffLayout } from "../layouts/StaffLayout";
import { OrdersWidget } from "../widgets/OrdersWidget";
import { ActivityFeedWidget } from "../widgets/ActivityFeedWidget";
import { DASHBOARD_CONFIGS } from "../core/dashboard.config";
import { DashboardType } from "../core/dashboard.registry";

const StaffDashboard: React.FC = () => {
  const config = DASHBOARD_CONFIGS[DashboardType.STAFF];

  return (
    <StaffLayout title={config.title}>
      <OrdersWidget />
      <ActivityFeedWidget />
    </StaffLayout>
  );
};

export default StaffDashboard;
