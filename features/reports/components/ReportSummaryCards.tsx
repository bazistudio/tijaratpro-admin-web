import React from "react";
import { ReportSummary } from "../types/report.types";
import { formatCurrency, formatNumber, calculateGrowthRate } from "../utils/report.utils";
import { TrendingUp, TrendingDown, DollarSign, Package, Activity, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface SummaryCardProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  previousValue?: number;
  icon: any;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, isCurrency, previousValue, icon: Icon, color }) => {
  const growth = previousValue !== undefined ? calculateGrowthRate(value, previousValue) : 0;
  const isPositive = growth >= 0;

  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group ring-1 ring-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className={clsx("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", color)}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {previousValue !== undefined && (
          <div className={clsx(
            "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
            isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(growth).toFixed(1)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black tracking-tight font-mono">
          {isCurrency ? formatCurrency(value) : formatNumber(value)}
        </p>
      </div>
    </div>
  );
};

interface ReportSummaryCardsProps {
  summary?: ReportSummary;
  type: string;
}

export const ReportSummaryCards: React.FC<ReportSummaryCardsProps> = ({ summary, type }) => {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard 
        label="Total Revenue" 
        value={summary.totalValue} 
        isCurrency={true}
        previousValue={summary.previousValue}
        icon={DollarSign}
        color="bg-green-500/10 text-green-500"
      />
      <SummaryCard 
        label="Total Volume" 
        value={summary.totalCount} 
        icon={Package}
        color="bg-blue-500/10 text-blue-500"
      />
      <SummaryCard 
        label="Activity Score" 
        value={Math.floor(summary.totalCount / 7)} 
        icon={Activity}
        color="bg-purple-500/10 text-purple-500"
      />
      <SummaryCard 
        label="Health Indicator" 
        value={100} 
        icon={AlertCircle}
        color="bg-orange-500/10 text-orange-500"
      />
    </div>
  );
};
