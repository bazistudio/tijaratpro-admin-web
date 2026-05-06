"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Download, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  History,
  ExternalLink,
  ChevronRight,
  Mail,
  MoreVertical
} from "lucide-react";
import { format } from "date-fns";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { useCustomersStore } from "@/store/customers.store";
import { api } from "@/lib/api";

export default function CustomersPage() {
  const { customers, isLoading, fetchCustomers, deleteCustomer } = useCustomersStore();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Fetch orders when a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      const fetchOrders = async () => {
        setIsOrdersLoading(true);
        try {
          const res = await api(`/orders?customerId=${selectedCustomer._id || selectedCustomer.id}`);
          if (res.ok) {
            const data = await res.json();
            setCustomerOrders(data.data || []);
          }
        } catch (err) {
          console.error("Failed to fetch customer orders", err);
        } finally {
          setIsOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [selectedCustomer]);

  const columns = [
    { 
      accessorKey: "name", 
      header: "Customer Name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
            {row.getValue("name").charAt(0)}
          </div>
          <span className="font-bold text-[#003049]">{row.getValue("name")}</span>
        </div>
      )
    },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "city", header: "City" },
    { 
      accessorKey: "creditLimit", 
      header: "Credit Limit",
      cell: ({ row }: any) => {
        const val = row.getValue("creditLimit");
        return <span className="font-medium">Rs {val ? val.toLocaleString() : '0'}</span>;
      }
    },
    { 
      accessorKey: "balance", 
      header: "Balance",
      cell: ({ row }: any) => {
        const bal = (row.getValue("balance") as number) || 0;
        const limit = (row.getValue("creditLimit") as number) || 0;
        const isOver = bal > limit;
        return (
          <Badge variant={isOver ? "destructive" : "warning"} className="font-bold">
            Rs {bal.toLocaleString()}
          </Badge>
        );
      }
    },
  ];

  return (
    <PageLayout 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> CRM</span>}
      isLoading={isLoading}
    >
      <PageHeader 
        title="Customer CRM"
        subtitle="Manage relationships, track party ledgers, and view transaction history."
        primaryAction={{
          label: "Add Customer",
          onClick: () => console.log("Add Customer"),
          icon: <Plus className="h-4 w-4" />
        }}
        secondaryActions={[
          {
            label: "Export CSV",
            onClick: () => console.log("Exporting..."),
            icon: <Download className="h-4 w-4" />
          }
        ]}
      />

      <SectionCard>
        <DataTable 
          columns={columns} 
          data={customers} 
          searchKey="name"
          searchPlaceholder="Search customers by name or phone..."
          onDelete={(row) => deleteCustomer(row._id || row.id)}
          onEdit={(row) => setSelectedCustomer(row)}
          onView={(row) => setSelectedCustomer(row)}
          onRowClick={(row) => setSelectedCustomer(row)}
          totalRecords={customers.length}
          pageSize={10}
        />
      </SectionCard>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="w-full max-w-xl h-full bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Customer ID: {(selectedCustomer._id || selectedCustomer.id).slice(-6).toUpperCase()}</Badge>
                  <button className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-3xl bg-[#003049] flex items-center justify-center text-white text-3xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#003049]">{selectedCustomer.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {selectedCustomer.city || "Unknown City"}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-emerald-600 font-bold">
                      <History className="h-3 w-3" /> Active Client
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2">WhatsApp / Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-bold">{selectedCustomer.phone}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm text-muted-foreground truncate">{selectedCustomer.email || "No Email"}</span>
                  </div>
                </div>
              </div>

              {/* Ledger Summary */}
              <div className="p-6 rounded-3xl bg-[#003049] text-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Party Ledger
                  </h3>
                  <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">
                    View Full Statement
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Credit Limit</p>
                    <p className="text-xl font-bold">Rs {(selectedCustomer.creditLimit || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Current Balance</p>
                    <p className="text-xl font-bold text-amber-400">Rs {(selectedCustomer.balance || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#003049]">Recent Orders</h3>
                  <Badge variant="secondary">{customerOrders.length} Orders</Badge>
                </div>
                
                <div className="space-y-3">
                  {isOrdersLoading ? (
                    <div className="py-8 text-center text-muted-foreground">Loading history...</div>
                  ) : customerOrders.length > 0 ? (
                    customerOrders.map((order: any, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-border hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <ShoppingBag className="h-5 w-5 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#003049]">{order.orderNumber}</p>
                              <p className="text-xs text-muted-foreground">{format(new Date(order.createdAt), "MMM dd, yyyy")}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">Rs {order.totalAmount.toLocaleString()}</p>
                            <Badge variant={order.status === 'completed' ? 'success' : 'warning'} className="text-[10px] h-4">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center border-2 border-dashed border-border rounded-3xl text-muted-foreground">
                      <p>No transactions found for this customer.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
                  <Plus className="h-5 w-5" /> New Sale
                </button>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="px-6 py-4 bg-muted rounded-2xl font-bold text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full" onClick={() => setSelectedCustomer(null)}></div>
        </div>
      )}
    </PageLayout>
  );
}

