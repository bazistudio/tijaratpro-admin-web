/**
 * Plan & Subscription Rules Configuration
 * Single source of pricing logic for Frontend
 */

export const PLAN_RULES: Record<string, any> = {
  DEMO: {
    durationDays: 14,
    modules: {
      analytics: false,
      advancedReports: false,
    },
    limits: {
      products: 50,
      orders: 100,
      staff: 2,
    },
  },

  PREMIUM: {
    durationDays: null,
    modules: {
      analytics: true,
      advancedReports: true,
    },
    limits: {
      products: Infinity,
      orders: Infinity,
      staff: Infinity,
    },
  },
};

/**
 * Helper to check if a tenant has exceeded a specific limit based on their usage snapshot.
 */
export const isLimitExceeded = (
  plan: string, 
  limitKey: string, 
  usedAmount: number
): boolean => {
  const limit = PLAN_RULES[plan]?.limits[limitKey] || Infinity;
  return usedAmount >= limit;
};

/**
 * Helper to check if a tenant has access to a specific module.
 */
export const hasModuleAccess = (
  plan: string,
  moduleKey: string
): boolean => {
  return PLAN_RULES[plan]?.modules[moduleKey] || false;
};
