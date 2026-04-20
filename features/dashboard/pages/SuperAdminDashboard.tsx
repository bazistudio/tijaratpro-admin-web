import React from "react";
import { SuperAdminLayout } from "../layouts/SuperAdminLayout";
import { SystemHealthWidget } from "../widgets/SystemHealthWidget";
import { RevenueWidget } from "../widgets/RevenueWidget";
import { ActivityFeedWidget } from "../widgets/ActivityFeedWidget";
import { DASHBOARD_CONFIGS } from "../core/dashboard.config";
import { DashboardType } from "../core/dashboard.registry";

const SuperAdminDashboard: React.FC = () => {
  const config = DASHBOARD_CONFIGS[DashboardType.SUPER_ADMIN];

  return (
    <SuperAdminLayout title={config.title}>
      {/* Rendering Widgets defined in Registry */}
      <SystemHealthWidget />
      <RevenueWidget />
      <ActivityFeedWidget />
      {/* Audit Logs Widget would be here once implemented */}
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
