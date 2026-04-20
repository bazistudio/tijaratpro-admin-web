import React from "react";
import { useReportStore } from "../store/report.store";
import { useFinancialReport } from "../hooks/useFinancialReport";
import { ReportFilters } from "../components/ReportFilters";
import { ReportSummaryCards } from "../components/ReportSummaryCards";
import { ReportTable } from "../components/ReportTable";
import { ExportButtons } from "../components/ExportButtons";
import { ReportSkeleton } from "../components/ReportSkeleton";
import { formatCurrency } from "../utils/report.utils";
import { Landmark } from "lucide-react";
import { clsx } from "clsx";

const FinancialReportPage: React.FC = () => {
  const { dateRange, pagination, filters, setPagination } = useReportStore();
  
  const queryParams = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filters,
  };

  const { data: response, isLoading } = useFinancialReport(queryParams);

  const columns = [
    { 
      header: "Category", 
      accessor: (item: any) => (
        <span className={clsx(
          "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
          item.category === "revenue" ? "bg-green-100 text-green-700" :
          item.category === "expense" ? "bg-red-100 text-red-700" :
          "bg-gray-100 text-gray-700"
        )}>
          {item.category}
        </span>
      )
    },
    { header: "Description", accessor: "description" as const, className: "font-bold" },
    { 
      header: "Amount", 
      accessor: (item: any) => formatCurrency(item.amount),
      className: (item: any) => item.category === "revenue" ? "text-green-600 font-bold" : "text-red-600 font-bold"
    },
    { header: "Reference", accessor: "referenceId" as const, className: "text-xs font-mono text-muted-foreground" },
    { header: "Date", accessor: "date" as const, className: "text-xs text-muted-foreground" },
  ];

  if (isLoading) return <div className="p-8"><ReportSkeleton /></div>;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Landmark className="text-primary" size={32} />
            Profit & Loss
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Financial health snapshot with detailed revenue and expense tracking.
          </p>
        </div>
        <ExportButtons />
      </div>

      <ReportFilters />

      <ReportSummaryCards summary={response?.summary} type="FINANCIAL" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Financial Ledger</h3>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
            Enterprise Accounting Layer
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

export default FinancialReportPage;
