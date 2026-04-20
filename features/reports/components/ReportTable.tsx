import React from "react";
import { Pagination as PaginationType } from "../types/report.types";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileWarning } from "lucide-react";
import { clsx } from "clsx";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface ReportTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationType;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export const ReportTable = <T extends { id: string | number }>({ 
  data, 
  columns, 
  pagination, 
  onPageChange,
  isLoading 
}: ReportTableProps<T>) => {
  return (
    <div className="w-full space-y-4">
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-black tracking-widest border-b border-border">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={clsx("px-6 py-4 font-black", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                /* Loading State handeled by ReportSkeleton usually, but as fallback: */
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-4"><div className="h-4 bg-muted rounded w-3/4" /></td>
                    ))}
                  </tr>
                ))
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                    {columns.map((col, idx) => (
                      <td key={idx} className={clsx("px-6 py-4 font-medium", col.className)}>
                        {typeof col.accessor === "function" 
                          ? col.accessor(item) 
                          : (item[col.accessor] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground/30">
                      <FileWarning size={48} strokeWidth={1} className="mb-4" />
                      <p className="text-sm font-bold">No report data found</p>
                      <p className="text-xs">Adjust your filters or date range and try again.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Integration */}
      {pagination && onPageChange && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs text-muted-foreground font-medium">
            Showing Page <span className="text-foreground font-black">{pagination.page}</span> of <span className="text-foreground font-black">{pagination.totalPages}</span>
          </p>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onPageChange(1)} 
              disabled={pagination.page <= 1}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronsLeft size={16} />
            </button>
            <button 
              onClick={() => onPageChange(pagination.page - 1)} 
              disabled={pagination.page <= 1}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1 mx-2">
              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const pageNum = i + 1; // Simplified for now
                return (
                  <button 
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={clsx(
                      "h-8 w-8 text-xs font-black rounded-lg transition-all",
                      pagination.page === pageNum ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => onPageChange(pagination.page + 1)} 
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => onPageChange(pagination.totalPages)} 
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
