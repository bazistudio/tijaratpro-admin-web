import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Tailwind class merging ───────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency formatting ──────────────────────────────────────────────────────

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

// ─── Date formatting ──────────────────────────────────────────────────────────

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

export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelative(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

// ─── Truncate ─────────────────────────────────────────────────────────────────

export function truncate(str: string, maxLength = 50): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function getPageRange(
  page: number,
  total: number,
  limit: number
): string {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  return `${start}–${end} of ${total}`;
}

// ─── Debounce ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── Status color helpers ──────────────────────────────────────────────────────

export function getStatusColor(
  status: string
): "emerald" | "amber" | "rose" | "cyan" | "indigo" | "slate" {
  switch (status.toLowerCase()) {
    case "active":
    case "paid":
      return "emerald";
    case "pending":
    case "inactive":
      return "amber";
    case "suspended":
    case "overdue":
    case "expired":
      return "rose";
    case "cancelled":
      return "slate";
    case "monthly":
      return "cyan";
    case "yearly":
      return "indigo";
    default:
      return "slate";
  }
}
