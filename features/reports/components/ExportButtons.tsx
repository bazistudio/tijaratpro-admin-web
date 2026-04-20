import React from "react";
import { Download, FileText, Table as TableIcon, FileJson } from "lucide-react";
import { reportService } from "../services/report.service";
import { useReportStore } from "../store/report.store";
import { ExportFormat } from "../types/report.types";
import { toast } from "sonner";

export const ExportButtons: React.FC = () => {
  const { selectedReportType, filters, dateRange } = useReportStore();

  const handleExport = async (format: ExportFormat) => {
    try {
      toast.loading(`Preparing ${format.toUpperCase()} export...`);
      
      const queryParams = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        page: 1,
        pageSize: 10000, // Batch export
        ...filters
      };

      await reportService.exportReport(selectedReportType, format, queryParams);
      
      toast.dismiss();
      toast.success(`${format.toUpperCase()} export started successfully`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to trigger ${format.toUpperCase()} export`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black uppercase text-muted-foreground mr-2 tracking-widest hidden sm:block">Export As</span>
      
      <button 
        onClick={() => handleExport(ExportFormat.CSV)}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs font-bold transition-all border border-border"
      >
        <FileJson size={14} className="text-orange-600" /> CSV
      </button>

      <button 
        onClick={() => handleExport(ExportFormat.EXCEL)}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs font-bold transition-all border border-border"
      >
        <TableIcon size={14} className="text-green-600" /> Excel
      </button>

      <button 
        onClick={() => handleExport(ExportFormat.PDF)}
        className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs font-bold transition-all border border-border"
      >
        <FileText size={14} className="text-red-600" /> PDF
      </button>
    </div>
  );
};
