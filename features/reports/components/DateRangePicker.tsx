import React from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useReportStore } from "../store/report.store";
import { format, subDays, startOfMonth, endOfMonth, startOfToday } from "date-fns";
import { clsx } from "clsx";

export const DateRangePicker: React.FC = () => {
  const { dateRange, setDateRange } = useReportStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const presets = [
    { label: "Today", getRange: () => ({ start: startOfToday(), end: new Date() }) },
    { label: "Last 7 Days", getRange: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
    { label: "Last 30 Days", getRange: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
    { label: "This Month", getRange: () => ({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) }) },
  ];

  const handlePresetClick = (start: Date, end: Date) => {
    setDateRange(start.toISOString(), end.toISOString());
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-background border border-border rounded-xl text-sm font-bold hover:bg-muted transition-all active:scale-95"
      >
        <CalendarIcon size={16} className="text-primary" />
        <span>{format(new Date(dateRange.startDate), "MMM d")} - {format(new Date(dateRange.endDate), "MMM d, yyyy")}</span>
        <ChevronDown size={14} className={clsx("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-1">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  const { start, end } = preset.getRange();
                  handlePresetClick(start, end);
                }}
                className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-muted rounded-lg transition-colors flex items-center justify-between group"
              >
                {preset.label}
                <div className="h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border px-3 pb-1">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Custom Range</span>
            <p className="text-[10px] text-muted-foreground mt-1">Advanced picker integration coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};
