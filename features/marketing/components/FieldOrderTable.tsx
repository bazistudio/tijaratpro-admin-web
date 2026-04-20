import React from 'react';
import { FieldOrder } from '../types/marketing.types';
import { ShoppingBag, MoreHorizontal, CheckCircle } from 'lucide-react';

interface FieldOrderTableProps {
  orders: FieldOrder[];
}

export const FieldOrderTable: React.FC<FieldOrderTableProps> = ({ orders }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Shop</th>
            <th className="px-4 py-3">Salesman</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
              <td className="px-4 py-3">{order.shopName}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{order.salesmanId}</td>
              <td className="px-4 py-3 text-right font-semibold">${order.totalAmount.toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button className="p-1 hover:bg-muted rounded">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
