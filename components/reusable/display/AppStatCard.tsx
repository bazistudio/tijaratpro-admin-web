import React from 'react';
import { AppCard } from './AppCard';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

export interface AppStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function AppStatCard({ title, value, icon, trend, className }: AppStatCardProps) {
  return (
    <AppCard className={cn("flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-bold text-muted-foreground tracking-wide uppercase">{title}</h3>
        {icon && <div className="text-muted-foreground/50 h-5 w-5">{icon}</div>}
      </div>
      <div>
        <div className="text-3xl font-black">{value}</div>
        {trend && (
          <p className="text-xs flex items-center mt-2 font-medium">
            <span className={cn(
              "flex items-center mr-1.5 px-1.5 py-0.5 rounded-md",
              trend.isPositive ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400" : "text-red-700 bg-red-100 dark:bg-red-500/20 dark:text-red-400"
            )}>
              {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </div>
    </AppCard>
  );
}
