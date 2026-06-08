import React from 'react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface AppBadgeProps extends BadgeProps {
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export function AppBadge({ status = 'default', className, children, ...props }: AppBadgeProps) {
  
  const statusStyles = {
    success: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
    warning: "bg-amber-100 text-amber-800 hover:bg-amber-100/80 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
    danger: "bg-red-100 text-red-800 hover:bg-red-100/80 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30",
    info: "bg-blue-100 text-blue-800 hover:bg-blue-100/80 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
    default: "bg-slate-100 text-slate-800 hover:bg-slate-100/80 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };

  return (
    <Badge 
      className={cn("px-2.5 py-0.5 text-xs font-bold transition-colors", statusStyles[status], className)} 
      {...props}
    >
      {children}
    </Badge>
  );
}
