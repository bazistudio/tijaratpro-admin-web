"use client"

import * as React from "react"
import { Package, TrendingUp, Users, Wallet } from "lucide-react"
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardStore } from "@/store/dashboard.store"
import { useEffect } from "react"

const dailyData = [
  { name: "Mon", sales: 45000 },
  { name: "Tue", sales: 38000 },
  { name: "Wed", sales: 52000 },
  { name: "Thu", sales: 47000 },
  { name: "Fri", sales: 61000 },
  { name: "Sat", sales: 72000 },
  { name: "Sun", sales: 39000 },
]

const topProductsData = [
  { name: "Samsung A12 LCD", qty: 45 },
  { name: "iPhone 11 Battery", qty: 32 },
  { name: "Oppo A5 Charging Jack", qty: 28 },
  { name: "Redmi Note 10 Back Panel", qty: 21 },
  { name: "Vivo Y20 Touch Glass", qty: 15 },
]

const monthlyData = [
  { name: "W1", rev: 150000 },
  { name: "W2", rev: 230000 },
  { name: "W3", rev: 180000 },
  { name: "W4", rev: 290000 },
]

export default function DashboardPage() {
  const { stats, fetchStats } = useDashboardStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <PageWrapper title="Business Overview" description="Welcome back, here's what's happening today.">
      
      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card stat-indigo">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales (Today)</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              Rs {stats ? stats.totalSalesToday.toLocaleString() : "..."}
            </div>
            <p className="text-xs text-primary mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" /> +12.5% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card stat-emerald">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              Rs {stats ? stats.monthlyProfit.toLocaleString() : "..."}
            </div>
            <p className="text-xs text-success mt-1 flex items-center gap-1 font-medium">
               +4.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card stat-rose">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            <Package className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              {stats ? stats.lowStockItems : "..."} Items
            </div>
            <p className="text-xs text-destructive mt-1 flex items-center gap-1 font-medium">
              Requires immediate restock!
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card stat-cyan">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">
              {stats ? stats.activeCustomers.toLocaleString() : "..."}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium">
              Across all service & retail customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Daily Sales Trend */}
        <Card className="col-span-1 lg:col-span-4 glass-card bg-muted/20">
          <CardHeader>
            <CardTitle className="font-heading">Daily Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          </CardContent>
        </Card>

        {/* Monthly Revenue Summary */}
        <Card className="col-span-1 lg:col-span-3 glass-card bg-muted/20">
          <CardHeader>
            <CardTitle className="font-heading">Monthly Revenue summary</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs${value/1000}k`} />
                <Tooltip cursor={{fill: 'hsl(var(--accent))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                <Bar dataKey="rev" fill="#16A34A" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-1 lg:col-span-7 glass-card bg-muted/20">
          <CardHeader>
            <CardTitle className="font-heading">Top 5 Selling Products (Inventory Movement)</CardTitle>
          </CardHeader>
          <CardContent className="h-62.5">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} width={150} />
                <Tooltip cursor={{fill: 'hsl(var(--accent))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                <Bar dataKey="qty" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </PageWrapper>
  )
}
