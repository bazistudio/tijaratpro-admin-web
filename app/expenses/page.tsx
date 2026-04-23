"use client";

import * as React from "react";
import { Plus, Download, Wallet } from "lucide-react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { useExpensesStore } from "@/store/expenses.store";
import { useRouter } from "next/navigation";

export default function ExpensesPage() {
  const router = useRouter();
  const { expenses, isLoading, fetchExpenses, deleteExpense } = useExpensesStore();

  React.useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const columns = [
    { 
      accessorKey: "date", 
      header: "Date",
      cell: ({ row }: any) => new Date(row.getValue("date")).toLocaleDateString()
    },
    { accessorKey: "title", header: "Expense Title" },
    { accessorKey: "category", header: "Category" },
    { 
      accessorKey: "amount", 
      header: "Amount",
      cell: ({ row }: any) => <span className="font-bold text-destructive">Rs {(row.getValue("amount") || 0).toLocaleString()}</span> 
    },
  ];

  return (
    <PageLayout 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Expenses</span>}
      isLoading={isLoading}
    >
       <PageHeader 
          title="Expense Tracker"
          subtitle="Monitor and record all business-related expenditures."
          primaryAction={{
            label: "Record Expense",
            onClick: () => router.push("/expenses/create"),
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
            data={expenses} 
            searchKey="title"
            searchPlaceholder="Search expense title..."
            onDelete={(row) => deleteExpense(row._id)}
            totalRecords={expenses.length}
            pageSize={10}
         />
       </SectionCard>
    </PageLayout>
  );
}
