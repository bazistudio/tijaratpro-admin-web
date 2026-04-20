import React from 'react';
import { useMarketing } from '../hooks/useMarketing';
import { FieldOrderTable } from '../components/FieldOrderTable';
import { ShoppingBag, RefreshCw, Filter, Search } from 'lucide-react';

const OrdersFromFieldPage: React.FC = () => {
  const { useFieldOrders } = useMarketing();
  const { data: orders, isLoading, refetch } = useFieldOrders();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-primary" /> Field Orders
          </h1>
          <p className="text-muted-foreground text-sm">Real-time orders received from salesmen in the field.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => refetch()}
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
            title="Refresh Orders"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
            <Filter size={18} /> Filter Results
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Shop Name..."
            className="w-full bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select className="bg-card border border-border rounded-xl px-4 py-2 text-sm focus:outline-none">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Delivered</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <FieldOrderTable orders={orders} />
        ) : (
          <div className="py-20 text-center">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground/20 mb-4" />
            <h3 className="font-semibold text-lg text-muted-foreground">No field orders found</h3>
            <p className="text-sm text-muted-foreground">Orders taken by salesmen will appear here in real-time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersFromFieldPage;
