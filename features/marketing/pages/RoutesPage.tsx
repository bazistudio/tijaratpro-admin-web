import React from 'react';
import { RouteMap } from '../components/RouteMap';
import { Map, List, Navigation, Calendar } from 'lucide-react';

const RoutesPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="text-primary" /> Route Tracking
          </h1>
          <p className="text-muted-foreground text-sm">Plan and monitor geographical sales routes.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <button className="px-3 py-1.5 bg-background shadow-sm rounded-md text-xs font-semibold flex items-center gap-1">
            <Map size={14} /> Map View
          </button>
          <button className="px-3 py-1.5 text-muted-foreground rounded-md text-xs font-semibold flex items-center gap-1">
            <List size={14} /> List View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RouteMap />
          
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4">Route Optimization</h3>
            <p className="text-xs text-muted-foreground mb-4">
              AI-powered route optimization is available for selected salesmen to minimize travel distance.
            </p>
            <button className="text-xs font-bold text-primary hover:underline">Configure Optimization Settings →</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Navigation size={18} className="text-primary" /> Active Routes
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    R{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Downtown Route B</p>
                    <p className="text-[10px] text-muted-foreground">Assigned to: Salesman {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" /> Weekly Schedule
            </h3>
            <p className="text-xs text-muted-foreground italic">No schedules defined for the current week.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
