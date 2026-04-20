import React from "react";
import { RefreshCw } from "lucide-react";
import { PrintStatus } from "../types/printing.types";
import { usePrinting } from "../hooks/usePrinting";
import { clsx } from "clsx";

interface RetryPrintButtonProps {
  jobId: string;
  status: PrintStatus;
  className?: string;
}

export const RetryPrintButton: React.FC<RetryPrintButtonProps> = ({ jobId, status, className }) => {
  const { useRetryPrintJob } = usePrinting();
  const retryMutation = useRetryPrintJob();

  // Mandatory: Only visible when status === "FAILED"
  if (status !== "FAILED") return null;

  return (
    <button
      onClick={() => retryMutation.mutate(jobId)}
      disabled={retryMutation.isPending}
      className={clsx(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-colors disabled:opacity-50",
        className
      )}
    >
      <RefreshCw size={14} className={retryMutation.isPending ? "animate-spin" : ""} />
      Retry Print
    </button>
  );
};
