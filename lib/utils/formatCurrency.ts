// ─── Currency formatting ──────────────────────────────────────────────────────
// Default locale/currency match backend: PKR, en-PK

export function formatCurrency(
  amount: number,
  currency = "PKR",
  locale = "en-PK"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compact format for large numbers in chart labels/cards:
 * 1500000 → "₨ 1.5M"
 */
export function formatCurrencyCompact(amount: number, currency = "PKR"): string {
  if (amount >= 1_000_000)
    return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${currency} ${(amount / 1_000).toFixed(1)}K`;
  return formatCurrency(amount, currency);
}
