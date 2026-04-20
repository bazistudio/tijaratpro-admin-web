import React from "react";
import { usePrinting } from "../hooks/usePrinting";
import { PrintQueueTable } from "../components/PrintQueueTable";
import { PrinterSelector } from "../components/PrinterSelector";
import { Printer, RefreshCw, Layers } from "lucide-react";

const PrintQueuePage: React.FC = () => {
  const { usePrintQueue, usePrinters } = usePrinting();
  const { data: queueResponse, isLoading: isQueueLoading, refetch: refetchQueue } = usePrintQueue();
  const { isLoading: isPrintersLoading } = usePrinters();

  const printJobs = queueResponse?.data || [];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header Section */}
      <div className="p-6 border-b border-border bg-card/30 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2 tracking-tight">
              <Printer className="text-primary" size={28} /> Print Command Center
            </h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Manage the real-time bridge between digital orders and physical bills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Printer</span>
              <PrinterSelector />
            </div>
            
            <button 
              onClick={() => refetchQueue()}
              className="p-3 border border-border rounded-xl hover:bg-muted transition-all active:scale-95 group"
              title="Refresh Queue"
            >
              <RefreshCw size={20} className={isQueueLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card border border-border rounded-2xl flex flex-col">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">In Queue</span>
              <span className="text-2xl font-black">{printJobs.length}</span>
            </div>
            <div className="p-4 bg-card border border-border rounded-2xl flex flex-col">
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Printed Today</span>
              <span className="text-2xl font-black">128</span>
            </div>
            <div className="p-4 bg-card border border-border rounded-2xl flex flex-col border-l-orange-500 border-l-4">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Processing</span>
              <span className="text-2xl font-black">
                {printJobs.filter(j => j.status === "PROCESSING").length}
              </span>
            </div>
            <div className="p-4 bg-card border border-border rounded-2xl flex flex-col border-l-red-500 border-l-4">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Failed Jobs</span>
              <span className="text-2xl font-black">
                {printJobs.filter(j => j.status === "FAILED").length}
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Layers size={16} className="text-primary" /> Active Print Queue
              </h2>
              <div className="h-1 flex-1 mx-4 bg-muted/30 rounded-full" />
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Live Polling Every 10s
              </span>
            </div>
            
            <PrintQueueTable 
              jobs={printJobs} 
              onCancel={(id) => console.log("Cancelling print job:", id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQueuePage;
