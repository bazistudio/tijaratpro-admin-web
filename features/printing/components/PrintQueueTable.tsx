import React, { useState } from "react";
import { PrintJob } from "../types/printing.types";
import { PrintStatusBadge } from "./PrintStatusBadge";
import { RetryPrintButton } from "./RetryPrintButton";
import { PrintPreviewModal } from "./PrintPreviewModal";
import { formatPrintTime } from "../utils/print.utils";
import { Eye, Trash2, MoreVertical, Printer } from "lucide-react";

interface PrintQueueTableProps {
  jobs: PrintJob[];
  onCancel?: (id: string) => void;
}

export const PrintQueueTable: React.FC<PrintQueueTableProps> = ({ jobs, onCancel }) => {
  const [previewJob, setPreviewJob] = useState<PrintJob | null>(null);

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-black tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Printer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created Time</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-primary">#{job.orderId}</td>
                  <td className="px-6 py-4 font-medium">{job.customerName}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Printer size={14} className="text-muted-foreground" />
                    <span>{job.printerName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <PrintStatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {formatPrintTime(job.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setPreviewJob(job)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-all"
                        title="Preview"
                      >
                        <Eye size={18} />
                      </button>
                      
                      <RetryPrintButton jobId={job.id} status={job.status} />

                      {onCancel && (
                        <button 
                          onClick={() => onCancel(job.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-muted-foreground hover:text-red-600 transition-all"
                          title="Cancel Job"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground/30">
                    <Printer size={48} strokeWidth={1} className="mb-4" />
                    <p className="text-sm font-bold">Print queue is empty</p>
                    <p className="text-xs">Incoming print requests will appear here.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {previewJob && (
        <PrintPreviewModal 
          job={previewJob} 
          onClose={() => setPreviewJob(null)}
          onPrint={() => {
            console.log("Triggering print for job:", previewJob.id);
            setPreviewJob(null);
          }}
        />
      )}
    </div>
  );
};
