import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const RouteMap: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-muted rounded-xl border border-dashed border-border flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-primary" />
      <MapPin className="text-primary mb-4 animate-bounce" size={48} />
      <h3 className="font-bold text-lg">Interactive Route Map</h3>
      <p className="text-sm text-muted-foreground w-64 text-center">
        Map visualization for real-time salesman tracking will be integrated here (Leaflet/Mapbox).
      </p>
      <div className="mt-6 flex gap-2">
        <div className="px-3 py-1 bg-background border border-border rounded-full text-xs flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" /> Live
        </div>
        <div className="px-3 py-1 bg-background border border-border rounded-full text-xs flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500" /> Planned
        </div>
      </div>
    </div>
  );
};
