import React from "react";
import { useReportStore } from "../store/report.store";
import { useInventoryReport } from "../hooks/useInventoryReport";
import { ReportFilters } from "../components/ReportFilters";
import { ReportSummaryCards } from "../components/ReportSummaryCards";
import { ReportTable } from "../components/ReportTable";
import { ExportButtons } from "../components/ExportButtons";
import { ReportSkeleton } from "../components/ReportSkeleton";
import { formatCurrency, formatNumber } from "../utils/report.utils";
import { Package } from "lucide-react";

const InventoryReportPage: React.FC = () => {
  const { dateRange, pagination, filters, setPagination } = useReportStore();
  
  const queryParams = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filters,
  };

  const { data: response, isLoading } = useInventoryReport(queryParams);

  const columns = [
    { header: "SKU", accessor: "sku" as const, className: "font-mono text-primary font-black" },
    { header: "Product", accessor: "productName" as const, className: "font-bold" },
    { header: "Category", accessor: "category" as const },
    { 
      header: "Stock", 
      accessor: (item: any) => formatNumber(item.currentStock),
      className: "font-bold" 
    },
    { 
      header: "Value", 
      accessor: (item: any) => formatCurrency(item.stockValue),
      className: "text-green-600 font-bold" 
    },
    { header: "Last Restocked", accessor: "lastRestocked" as const, className: "text-xs text-muted-foreground" },
  ];

  if (isLoading) return <div className="p-8"><ReportSkeleton /></div>;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Package className="text-primary" size={32} />
            Inventory Audit
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Track stock movement, valuation, and optimization levels.
          </p>
        </div>
        <ExportButtons />
      </div>

      <ReportFilters />

      <ReportSummaryCards summary={response?.summary} type="INVENTORY" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product Inventory Ledger</h3>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            Live Inventory Data
          </span>
        </div>
        
        <ReportTable 
          data={response?.data || []} 
          columns={columns} 
          pagination={response?.pagination}
          onPageChange={setPagination}
        />
      </div>
    </div>
  );
};

export default InventoryReportPage;
