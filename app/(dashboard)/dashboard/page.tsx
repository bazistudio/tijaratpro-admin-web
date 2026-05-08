"use client"

import * as React from "react"
import { Package, TrendingUp, Users, Wallet, AlertCircle, ShoppingCart } from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

import { PageLayout } from "@/components/layout/PageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionCard } from "@/components/ui/SectionCard"
import { useDashboardStore } from "@/store/dashboard.store"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const { stats, salesChart, topProducts, fetchDashboardData, isLoading } = useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Empty State Logic
  const isNewBusiness = !isLoading && stats?.totalOrders === 0

  return (
    <PageLayout 
      title="Executive Control Center" 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Overview</span>}
      isLoading={isLoading}
    >
      
      {isNewBusiness ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-muted/10 rounded-2xl border-2 border-dashed border-muted">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <ShoppingCart className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-heading">Welcome to TijaratPro!</h2>
          <p className="text-muted-foreground max-w-md mt-2">
            Your dashboard is ready, but we don't have any sales data yet. 
            Start by creating your first order or importing your legacy data.
          </p>
          <div className="flex gap-4 mt-8">
            <Button asChild size="lg">
              <Link href="/orders/new">Create First Order</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/settings/import">Migrate Data (Excel)</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* KPI Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card stat-indigo">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">
                  Rs {stats?.todayRevenue?.toLocaleString() || "0"}
                </div>
                <div className={`text-xs mt-1 flex items-center gap-1 font-medium ${stats?.revenueGrowth && stats.revenueGrowth >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  <TrendingUp className="h-3 w-3" /> 
                  {stats?.revenueGrowth !== undefined ? `${stats.revenueGrowth.toFixed(1)}% MoM Growth` : 'Stable Performance'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card stat-emerald">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Net Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">
                  Rs {stats?.monthlyProfit?.toLocaleString() || "0"}
                </div>
                <p className="text-xs text-success mt-1 flex items-center gap-1 font-medium">
                   Current Month Surplus
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card stat-rose">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Stock Alerts</CardTitle>
                <Package className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">
                  {stats?.lowStockCount || "0"} Items
                </div>
                <div className={`text-xs mt-1 flex items-center gap-1 font-medium ${stats?.lowStockCount && stats.lowStockCount > 0 ? 'text-destructive' : 'text-success'}`}>
                  {stats?.lowStockCount && stats.lowStockCount > 0 ? (
                    <><AlertCircle className="h-3 w-3" /> Immediate restock required</>
                  ) : (
                    "Inventory is healthy"
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card stat-cyan">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Customer Base</CardTitle>
                <Users className="h-4 w-4 text-info" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">
                  {stats?.totalCustomers?.toLocaleString() || "0"}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium">
                  Total Business Reach
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            
            {/* Daily Sales Trend */}
            <SectionCard 
              title="Sales Velocity (Last 7 Days)" 
              className="col-span-1 lg:col-span-4 bg-muted/20"
              contentClassName="h-[300px]"
              headerClassName="pb-2"
            >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs${value/1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
            </SectionCard>

            {/* Top Profitable Products */}
            <SectionCard 
              title="Top Profitable Products (ROI Analysis)" 
              className="col-span-1 lg:col-span-3 bg-muted/20"
              contentClassName="h-[300px]"
              headerClassName="pb-2"
            >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip cursor={{fill: 'hsl(var(--accent))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                    <Bar dataKey="profit" name="Net Profit" fill="#16A34A" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
            </SectionCard>
          </div>
        </>
      )}
    </PageLayout>
  )
}
