import React from "react";
import { useReportStore } from "../store/report.store";
import { useSalesReport } from "../hooks/useSalesReport";
import { ReportFilters } from "../components/ReportFilters";
import { ReportSummaryCards } from "../components/ReportSummaryCards";
import { ReportTable } from "../components/ReportTable";
import { ExportButtons } from "../components/ExportButtons";
import { ReportSkeleton } from "../components/ReportSkeleton";
import { formatCurrency } from "../utils/report.utils";
import { BarChart3 } from "lucide-react";

const SalesReportPage: React.FC = () => {
  const { dateRange, pagination, filters, setPagination } = useReportStore();
  
  const queryParams = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filters,
  };

  const { data: response, isLoading } = useSalesReport(queryParams);

  const columns = [
    { header: "Invoice #", accessor: "invoiceNumber" as const, className: "text-primary font-black" },
    { header: "Customer", accessor: "customerName" as const },
    { 
      header: "Amount", 
      accessor: (item: any) => formatCurrency(item.totalAmount),
      className: "font-mono font-bold" 
    },
    { 
      header: "Tax", 
      accessor: (item: any) => formatCurrency(item.taxAmount),
      className: "text-muted-foreground" 
    },
    { 
      header: "Status", 
      accessor: (item: any) => (
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
          {item.paymentStatus}
        </span>
      )
    },
    { header: "Date", accessor: "createdAt" as const, className: "text-xs text-muted-foreground" },
  ];

  if (isLoading) return <div className="p-8"><ReportSkeleton /></div>;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <BarChart3 className="text-primary" size={32} />
            Sales Analytics
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Deep-dive into revenue streams and transactional performance.
          </p>
        </div>
        <ExportButtons />
      </div>

      <ReportFilters />

      <ReportSummaryCards summary={response?.summary} type="SALES" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Detailed Transaction Log</h3>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            Server-side Filtered
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

export default SalesReportPage;
