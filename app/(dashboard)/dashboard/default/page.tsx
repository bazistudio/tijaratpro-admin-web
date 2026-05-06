"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  ArrowUpRight,
  Package,
  Calendar
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  lowStockProducts: any[];
  topProducts: any[];
  salesChart: any[];
}

export default function DefaultDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api("/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.data || data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-muted rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted rounded-2xl"></div>)}
          </div>
          <div className="h-[400px] bg-muted rounded-2xl"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Performance Dashboard" 
          subtitle="Real-time analytics and business health metrics."
        />
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-border shadow-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{new Date().toLocaleDateString('en-PK', { dateStyle: 'medium' })}</span>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-amber-900 font-bold">Inventory Attention Required</h4>
            <p className="text-amber-700 text-sm">
              {stats.lowStockProducts.length} items are running below their threshold. Restock soon to avoid lost sales.
            </p>
          </div>
          <button className="text-amber-600 text-sm font-bold hover:underline">View All</button>
        </div>
      )}

      {/* Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#003049] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-blue-200 text-sm font-medium">Today's Revenue</p>
            <h3 className="text-3xl font-bold mt-2">Rs {(stats?.todayRevenue || 0).toLocaleString()}</h3>
            <div className="flex items-center gap-1 mt-4 text-emerald-400 text-sm font-bold">
              <ArrowUpRight className="h-4 w-4" />
              <span>Live tracking</span>
            </div>
          </div>
          <DollarSign className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-soft">
          <p className="text-muted-foreground text-sm font-medium">Monthly Revenue</p>
          <h3 className="text-3xl font-bold mt-2 text-[#003049]">Rs {(stats?.monthRevenue || 0).toLocaleString()}</h3>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%] rounded-full"></div>
            </div>
            <span className="text-xs font-bold text-muted-foreground">65% of target</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-border shadow-soft">
          <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
          <h3 className="text-3xl font-bold mt-2 text-[#003049]">Rs {(stats?.totalRevenue || 0).toLocaleString()}</h3>
          <p className="text-xs text-muted-foreground mt-4 italic">Accumulated since shop launch</p>
        </div>
      </div>

      {/* Counter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border shadow-soft flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Orders</p>
            <h4 className="text-xl font-bold">{stats?.totalOrders}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-soft flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Customers</p>
            <h4 className="text-xl font-bold">{stats?.totalCustomers}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-soft flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Products</p>
            <h4 className="text-xl font-bold">{stats?.totalProducts}</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border shadow-soft flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Growth</p>
            <h4 className="text-xl font-bold">+ Pakistan</h4>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-border shadow-soft">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#003049]">Weekly Sales Growth</h3>
              <p className="text-sm text-muted-foreground">Daily revenue performance for the last 7 days</p>
            </div>
            <select className="bg-muted/50 border-none rounded-lg text-sm font-medium focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.salesChart || []}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d62828" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#d62828" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="_id" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `Rs ${value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`Rs ${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#d62828" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-3xl border border-border shadow-soft">
          <h3 className="text-xl font-bold text-[#003049] mb-6">Top Selling Items</h3>
          <div className="space-y-6">
            {stats?.topProducts && stats.topProducts.length > 0 ? (
              stats.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground text-sm">
                    #{idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#003049] line-clamp-1">{product.productDetails?.name || 'Unknown Product'}</p>
                    <p className="text-xs text-muted-foreground">{product.totalQuantity} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">Rs {product.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No sales data yet.</p>
            )}
          </div>
          <button className="w-full mt-8 py-3 bg-muted/50 rounded-xl text-sm font-bold text-[#003049] hover:bg-muted transition-colors">
            View Full Sales Report
          </button>
        </div>
      </div>
    </Container>
  );
}


