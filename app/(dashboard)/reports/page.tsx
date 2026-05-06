"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Download } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSummaryStore } from "@/store/summary.store";

export default function ReportsPage() {
  const { summary, fetchSummary, isLoading } = useSummaryStore();

  React.useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <PageLayout 
      title="Financial Performance"
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Reports</span>}
      isLoading={isLoading}
    >
      <PageHeader 
        title="Profit & Loss Summary"
        subtitle="Detailed analysis of your business's financial health."
        secondaryActions={[
          {
            label: "Download Full Report",
            onClick: () => console.log("Downloading..."),
            icon: <Download className="h-4 w-4" />
          }
        ]}
      />

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Revenue Card */}
        <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">
              Rs {summary?.totalRevenue.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-emerald-600/80 mt-1">Total sales from completed orders</p>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="glass-card bg-rose-500/5 border-rose-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-rose-600">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">
              Rs {summary?.totalExpenses.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-rose-600/80 mt-1">All recorded business expenditures</p>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card className="glass-card bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold font-heading ${(summary?.profit || 0) >= 0 ? 'text-primary' : 'text-destructive'}`}>
              Rs {summary?.profit.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-primary/80 mt-1">Calculated as: Revenue - Expenses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Revenue Breakdown" className="bg-muted/20">
           <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">
              <PieChart className="h-8 w-8 mr-2 opacity-20" />
              Chart visualization coming soon...
           </div>
        </SectionCard>
        
        <SectionCard title="Expense Trends" className="bg-muted/20">
           <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">
              <BarChart3 className="h-8 w-8 mr-2 opacity-20" />
              Chart visualization coming soon...
           </div>
        </SectionCard>
      </div>
    </PageLayout>
  );
}
