"use client";

import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { ShopStatus, BusinessType } from "../../types/superAdmin.types";

const STATUS_OPTIONS: { value: ShopStatus | "all"; label: string }[] = [
  { value: "all",       label: "All Statuses"  },
  { value: "active",    label: "Active"        },
  { value: "suspended", label: "Suspended"     },
  { value: "inactive",  label: "Inactive"      },
];

const BUSINESS_TYPES: { value: BusinessType | "all"; label: string }[] = [
  { value: "all",       label: "All Types"   },
  { value: "RETAIL",    label: "Retail"      },
  { value: "MEDICAL",   label: "Medical"     },
  { value: "AUTO",      label: "Auto"        },
  { value: "WHOLESALE", label: "Wholesale"   },
  { value: "SYSTEM",    label: "System"      },
];

function FilterSelect({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-semibold",
          "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
          "focus:outline-none focus:border-primary/40 transition-all cursor-pointer"
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)] pointer-events-none" />
    </div>
  );
}

export function TenantFilters() {
  const { tenantFilters, setTenantFilters, resetTenantFilters } = useSuperAdminStore();

  // Debounce the search so we don't fire on every keystroke
  const [searchInput, setSearchInput] = React.useState(tenantFilters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  React.useEffect(() => {
    setTenantFilters({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const hasActive =
    tenantFilters.status !== "all" ||
    tenantFilters.businessType !== "all" ||
    tenantFilters.search !== "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
        <input
          type="text"
          placeholder="Search tenants…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={cn(
            "w-full pl-9 pr-4 py-2 rounded-xl text-sm",
            "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]",
            "placeholder:text-[var(--text-soft)] focus:outline-none focus:border-primary/40 transition-all"
          )}
        />
      </div>

      {/* Status */}
      <FilterSelect
        label="Status"
        value={tenantFilters.status}
        options={STATUS_OPTIONS}
        onChange={(v) => setTenantFilters({ status: v as any, page: 1 })}
      />

      {/* Business Type */}
      <FilterSelect
        label="Type"
        value={tenantFilters.businessType}
        options={BUSINESS_TYPES}
        onChange={(v) => setTenantFilters({ businessType: v as any, page: 1 })}
      />

      {/* Clear */}
      {hasActive && (
        <button
          onClick={() => { resetTenantFilters(); setSearchInput(""); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-soft)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] border border-[var(--border)] transition-all"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
}
