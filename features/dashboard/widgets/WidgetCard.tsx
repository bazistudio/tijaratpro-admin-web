import React, { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

interface WidgetCardProps {
  title: string;
  isLoading: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ 
  title, 
  isLoading, 
  error, 
  children,
  className 
}) => {
  return (
    <div className={clsx(
      "bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-full ring-1 ring-white/5",
      className
    )}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
        {isLoading && <RefreshCw size={14} className="animate-spin text-primary" />}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {isLoading && !children ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-[2px] z-10">
            <div className="space-y-4 w-full px-6">
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center h-full">
            <AlertCircle className="text-red-500 mb-2" size={24} />
            <p className="text-sm font-bold text-red-600">Error loading data</p>
            <p className="text-[10px] text-muted-foreground mt-1 max-w-[200px]">{error}</p>
          </div>
        ) : !children ? (
          <div className="flex flex-col items-center justify-center p-8 text-center h-full text-muted-foreground/30">
            <p className="text-xs font-bold uppercase tracking-widest">No data available</p>
          </div>
        ) : (
          <div className="p-6 h-full animate-in fade-in duration-500">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
