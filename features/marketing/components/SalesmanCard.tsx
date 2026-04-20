import React from 'react';
import { Salesman } from '../types/marketing.types';
import { User, TrendingUp, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SalesmanCardProps {
  salesman: Salesman;
  onClick?: () => void;
  className?: string;
}

export const SalesmanCard: React.FC<SalesmanCardProps> = ({ salesman, onClick, className }) => {
  return (
    <div 
      className={twMerge(
        "p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{salesman.name}</h3>
          <p className="text-xs text-muted-foreground">{salesman.phone}</p>
        </div>
        <div className={clsx(
          "ml-auto h-2 w-2 rounded-full",
          salesman.status === 'on-field' ? "bg-green-500 animate-pulse" : "bg-gray-400"
        )} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-muted p-2 rounded-lg text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Visited</p>
          <p className="font-semibold">{salesman.metrics.shopsVisitedToday}</p>
        </div>
        <div className="bg-muted p-2 rounded-lg text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Orders</p>
          <p className="font-semibold">{salesman.metrics.totalOrders}</p>
        </div>
        <div className="bg-muted p-2 rounded-lg text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Revenue</p>
          <p className="font-semibold text-xs">${salesman.metrics.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};
