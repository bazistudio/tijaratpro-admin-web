import React from 'react';
import { useMarketing } from '../hooks/useMarketing';
import { VisitTimeline } from '../components/VisitTimeline';
import { Store, Calendar, Filter, Download } from 'lucide-react';

const VisitsPage: React.FC = () => {
  const { useVisits } = useMarketing();
  const { data: visits, isLoading } = useVisits();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Store className="text-primary" /> Shop Visits
          </h1>
          <p className="text-muted-foreground text-sm">Real-time logs of salesman shop visits and check-ins.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-muted/80">
            <Download size={18} /> Export Log
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Select Date
            </h3>
            <div className="p-4 bg-muted/30 rounded-lg text-center border border-border border-dashed">
              <p className="text-xs text-muted-foreground italic">Calendar Picker Placeholder</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Daily Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Visits</span>
                <span className="font-bold">{visits?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-green-500">
                  {visits?.filter(v => v.status === 'completed').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-bold text-blue-500">
                  {visits?.filter(v => v.status === 'pending').length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : visits && visits.length > 0 ? (
              <VisitTimeline visits={visits} />
            ) : (
              <div className="text-center py-20">
                <Store size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No visits logged for the selected period.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitsPage;
