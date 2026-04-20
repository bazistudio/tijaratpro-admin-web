import React from "react";

export const ReportSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Filters Skeleton */}
      <div className="h-16 bg-muted rounded-xl w-full" />

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-muted rounded-2xl" />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded-lg w-full" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-muted/60 rounded-lg w-full" />
        ))}
      </div>
    </div>
  );
};
