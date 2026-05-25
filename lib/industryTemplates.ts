export interface IndustryTemplate {
  name: string;
  sidebar: { label: string; href: string }[];
  dashboardWidgets: string[];
  features: string[];
}

export const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  AUTO_PARTS: {
    name: "Auto Parts Shop",
    sidebar: [
      { label: "Parts Compatibility", href: "/industry/compatibility" }
    ],
    dashboardWidgets: ["compatibilityTracker", "lowStock", "recentOrders"],
    features: ["compatibility", "suppliers", "inventory"]
  },
  MEDICINES: {
    name: "Medicines & Pharmacy",
    sidebar: [
      { label: "Expiry Tracker", href: "/industry/expiry" },
      { label: "Batch Inventory", href: "/industry/batches" }
    ],
    dashboardWidgets: ["expiryAlerts", "lowStock", "recentOrders"],
    features: ["expiryTracking", "batches", "inventory"]
  },
  GENERAL_STORE: {
    name: "General Retailer",
    sidebar: [],
    dashboardWidgets: ["dailyRevenue", "lowStock", "recentOrders"],
    features: ["inventory", "sales", "ledger"]
  }
};

/**
 * Validates if an industry template supports a specific platform capability.
 */
export const hasFeature = (industryType: string | undefined, feature: string): boolean => {
  if (!industryType) return false;
  const template = INDUSTRY_TEMPLATES[industryType] || INDUSTRY_TEMPLATES.GENERAL_STORE;
  return template.features.includes(feature);
};
