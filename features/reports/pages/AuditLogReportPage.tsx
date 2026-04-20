import React from "react";
import { useReportStore } from "../store/report.store";
import { useAuditLogReport } from "../hooks/useAuditLogReport";
import { ReportFilters } from "../components/ReportFilters";
import { ReportTable } from "../components/ReportTable";
import { ExportButtons } from "../components/ExportButtons";
import { ReportSkeleton } from "../components/ReportSkeleton";
import { ShieldCheck, User, Globe, Monitor } from "lucide-react";

const AuditLogReportPage: React.FC = () => {
  const { dateRange, pagination, filters, setPagination } = useReportStore();
  
  const queryParams = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filters,
  };

  const { data: response, isLoading } = useAuditLogReport(queryParams);

  const columns = [
    { 
      header: "Action", 
      accessor: (item: any) => (
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
          {item.action}
        </span>
      ),
      className: "font-bold"
    },
    { header: "Module", accessor: "module" as const, className: "uppercase text-[10px] font-black text-muted-foreground" },
    { 
      header: "User", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <User size={14} className="text-muted-foreground" />
          <span>{item.userName}</span>
        </div>
      )
    },
    { 
      header: "IP Address", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <Globe size={12} className="text-muted-foreground" />
          {item.ipAddress}
        </div>
      )
    },
    { 
      header: "Device", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2 text-xs">
          <Monitor size={12} className="text-muted-foreground" />
          {item.device}
        </div>
      )
    },
    { header: "Timestamp", accessor: "createdAt" as const, className: "text-xs text-muted-foreground" },
  ];

  if (isLoading) return <div className="p-8"><ReportSkeleton /></div>;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-primary" size={32} />
            Security & Compliance
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Audit logs for tracking system changes, access attempts, and administrative actions.
          </p>
        </div>
        <ExportButtons />
      </div>

      <ReportFilters />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Security Event Ledger</h3>
          <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
            Restricted Access Log
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

export default AuditLogReportPage;
