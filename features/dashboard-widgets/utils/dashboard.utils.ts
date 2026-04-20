// ─── Dashboard Utilities ──────────────────────────────────────────────────────

/**
 * Formats a number as currency (PKR).
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a large number with abbreviated suffixes (K, M).
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

/**
 * Calculates the percentage growth between two periods.
 */
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Enhancement #2: Determines if a widget should trigger a refresh based on last update.
 */
export function shouldRefresh(lastUpdated: number, interval: number): boolean {
  const now = Date.now();
  return now - lastUpdated >= interval;
}
