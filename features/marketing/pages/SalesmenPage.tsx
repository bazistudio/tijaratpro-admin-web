import React from 'react';
import { useMarketing } from '../hooks/useMarketing';
import { SalesmanCard } from '../components/SalesmanCard';
import { Users, Plus, Search } from 'lucide-react';

const SalesmenPage: React.FC = () => {
  const { useSalesmen } = useMarketing();
  const { data: salesmen, isLoading } = useSalesmen();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-primary" /> Salesmen Management
          </h1>
          <p className="text-muted-foreground text-sm">Monitor field staff performance and status.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
          <Plus size={18} /> Add Salesman
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search by name, phone or email..."
          className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesmen?.map(salesman => (
            <SalesmanCard key={salesman.id} salesman={salesman} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesmenPage;
