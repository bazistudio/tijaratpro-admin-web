import React from 'react';
import { Visit } from '../types/marketing.types';
import { Clock, Store, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface VisitTimelineProps {
  visits: Visit[];
}

export const VisitTimeline: React.FC<VisitTimelineProps> = ({ visits }) => {
  return (
    <div className="space-y-6">
      {visits.map((visit, index) => (
        <div key={visit.id} className="relative flex gap-4">
          {index !== visits.length - 1 && (
            <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-border" />
          )}
          
          <div className="mt-1 h-[24px] w-[24px] rounded-full bg-background border-2 border-border flex items-center justify-center z-10">
            {visit.status === 'completed' ? (
              <CheckCircle2 className="text-green-500" size={14} />
            ) : (
              <Clock className="text-blue-500" size={14} />
            )}
          </div>

          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{visit.shopName}</h4>
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {format(new Date(visit.checkInTime), 'HH:mm')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {visit.notes || 'No notes provided for this visit.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
