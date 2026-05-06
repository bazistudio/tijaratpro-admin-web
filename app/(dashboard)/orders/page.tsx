"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Calendar, 
  User, 
  DollarSign, 
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const fetchOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await api(`/orders?page=${page}&limit=${pagination.limit}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
        setPagination(prev => ({
          ...prev,
          page: data.pagination?.page || page,
          total: data.pagination?.total || 0
        }));
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case "pending":
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns = [
    {
      accessorKey: "orderNumber",
      header: "Order ID",
      cell: ({ row }: any) => (
        <span className="font-bold text-[#003049]">{row.getValue("orderNumber")}</span>
      )
    },
    {
      accessorKey: "customerId",
      header: "Customer",
      cell: ({ row }: any) => {
        const customer = row.original.customerId;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-sm">{customer?.name || "Guest Customer"}</span>
            <span className="text-xs text-muted-foreground">{customer?.phone || "No Phone"}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: any) => (
        <span className="text-sm">{format(new Date(row.getValue("createdAt")), "MMM dd, yyyy HH:mm")}</span>
      )
    },
    {
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }: any) => (
        <span className="font-bold">Rs {row.getValue("totalAmount").toLocaleString()}</span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => getStatusBadge(row.getValue("status"))
    }
  ];

  return (
    <Container className="py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Orders & Sales" 
          subtitle="Manage your transactions and monitor order fulfillment."
        />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white py-1.5 px-3 border-border shadow-sm">
            Total Orders: {pagination.total}
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-soft overflow-hidden">
        <DataTable 
          columns={columns} 
          data={orders} 
          isLoading={isLoading}
          totalRecords={pagination.total}
          pageSize={pagination.limit}
          pageIndex={pagination.page - 1}
          onPageChange={(page) => fetchOrders(page + 1)}
          onRowClick={(order) => setSelectedOrder(order)}
          searchKey="orderNumber"
          searchPlaceholder="Search by Order ID..."
        />
      </div>

      {/* Order Detail View (Simple implementation using a modal-like state) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="w-full max-w-lg h-full bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order Reference</p>
                  <p className="font-bold text-[#003049]">{selectedOrder.orderNumber}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#003049]">Order Details</h2>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {format(new Date(selectedOrder.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
                </p>
              </div>

              <hr className="border-border" />

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Customer</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{selectedOrder.customerId?.name || "Guest"}</p>
                      <p className="text-xs text-muted-foreground">{selectedOrder.customerId?.phone}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Payment</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase">{selectedOrder.paymentMethod || "Cash"}</p>
                      <p className="text-xs text-muted-foreground">Status: Paid</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Line Items</p>
                <div className="border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left p-3 font-bold">Item</th>
                        <th className="text-center p-3 font-bold">Qty</th>
                        <th className="text-right p-3 font-bold">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedOrder.items.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">x{item.quantity}</td>
                          <td className="p-3 text-right">Rs {item.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-muted/10 font-bold text-[#003049]">
                      <tr>
                        <td colSpan={2} className="p-3 text-right">Total Amount</td>
                        <td className="p-3 text-right text-lg">Rs {selectedOrder.totalAmount.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                {selectedOrder.status === 'pending' && (
                  <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
                    Mark as Completed
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 bg-muted rounded-xl font-bold text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full" onClick={() => setSelectedOrder(null)}></div>
        </div>
      )}
    </Container>
  );
}

