import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { useReportStore } from "../store/report.store";
import { DateRangePicker } from "./DateRangePicker";

export const ReportFilters: React.FC = () => {
  const { filters, setFilters, resetFilters } = useReportStore();

  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search items, invoices, or customers..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <DateRangePicker />
        
        <div className="h-8 w-[1px] bg-border hidden md:block" />

        <button 
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw size={14} /> Reset
        </button>

        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20">
          <Filter size={14} /> Apply Filters
        </button>
      </div>
    </div>
  );
};
