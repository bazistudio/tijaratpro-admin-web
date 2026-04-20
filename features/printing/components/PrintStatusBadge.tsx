import React from "react";
import { PrintStatus } from "../types/printing.types";
import { getStatusColor } from "../utils/print.utils";
import { clsx } from "clsx";

interface PrintStatusBadgeProps {
  status: PrintStatus;
  className?: string;
}

export const PrintStatusBadge: React.FC<PrintStatusBadgeProps> = ({ status, className }) => {
  const colorClasses = getStatusColor(status);
  
  return (
    <span className={clsx(
      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border tracking-wider",
      colorClasses,
      className
    )}>
      {status}
    </span>
  );
};
