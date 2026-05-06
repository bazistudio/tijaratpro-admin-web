"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { LayoutDashboard, ShoppingBag, Users, TrendingUp, DollarSign } from "lucide-react";

interface Stats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  activeShops: number;
}

export default function DefaultDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api("/dashboard/summary");
        if (res.ok) {
          const data = await res.json();
          setStats(data.data || data); // Handle both wrapped and unwrapped data
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container className="py-8">
      <PageHeader 
        title="Dashboard Overview" 
        subtitle="Real-time performance metrics for your retail ecosystem."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
          <h3 className="text-2xl font-bold mt-1">
            {isLoading ? "..." : `Rs ${(stats?.totalSales || 0).toLocaleString()}`}
          </h3>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
          <h3 className="text-2xl font-bold mt-1">
            {isLoading ? "..." : (stats?.totalOrders || 0)}
          </h3>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Total Customers</p>
          <h3 className="text-2xl font-bold mt-1">
            {isLoading ? "..." : (stats?.totalCustomers || 0)}
          </h3>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">Live</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Active Shops</p>
          <h3 className="text-2xl font-bold mt-1">
            {isLoading ? "..." : (stats?.activeShops || 0)}
          </h3>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="mt-8 h-[400px] border-2 border-dashed border-border rounded-2xl bg-muted/5 flex items-center justify-center text-muted-foreground">
        Sales Analytics Chart Coming Soon
      </div>
    </Container>
  );
}

