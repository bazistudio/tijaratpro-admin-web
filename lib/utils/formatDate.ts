// ─── Date formatting ──────────────────────────────────────────────────────────

/** "15 Apr 2026" */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-PK", options).format(new Date(date));
}

/** "15 Apr 2026, 09:45 AM" */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "just now" / "5m ago" / "3h ago" / "2d ago" / falls back to formatDate */
export function formatRelative(date: string | Date): string {
  const d = new Date(date);
  const diffMs = Date.now() - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

/** "Apr 2026" — useful for chart x-axis labels */
export function formatMonthYear(date: string | Date): string {
  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/** ISO date string "2026-04-15" from any date — safe for API query params */
export function toISODate(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}
