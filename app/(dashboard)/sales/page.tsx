"use client"

import * as React from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionCard } from "@/components/ui/SectionCard"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Badge } from "@/components/ui/badge"
import { Plus, Download } from "lucide-react"
import { useSalesStore } from "@/store/sales.store"
import { useEffect } from "react"

export default function SalesHistoryPage() {
  const { sales, isLoading, fetchSales, addSale } = useSalesStore()

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  const handleAddDemoSale = async () => {
    await addSale({
      total: Math.floor(Math.random() * 5000) + 500,
      items: Math.floor(Math.random() * 5) + 1,
      status: "completed",
      customerName: "Walk-in Customer",
      paymentMethod: "Cash",
    })
  }

  const columns = [
    { accessorKey: "id", header: "Order ID" },
    { 
      accessorKey: "date", 
      header: "Date/Time",
      cell: ({ row }: any) => new Date().toLocaleDateString() // Mock current date
    },
    { accessorKey: "customerName", header: "Customer" },
    { 
        accessorKey: "items", 
        header: "Items",
        cell: ({ row }: any) => `${row.getValue("items")} items`
    },
    { 
      accessorKey: "total", 
      header: "Total Bill",
      cell: ({ row }: any) => <span className="font-bold text-primary">Rs {(row.getValue("total") || 0).toLocaleString()}</span> 
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string
        if (status === "completed") return <Badge className="bg-success text-white">Paid</Badge>
        return <Badge variant="outline">{status}</Badge>
      }
    },
  ]



  return (
    <PageLayout 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Sales</span>}
      isLoading={isLoading}
    >
       <PageHeader 
          title="Sales History"
          subtitle="View and manage all retail invoices and service orders."
          primaryAction={{
            label: "Create Demo Invoice",
            onClick: handleAddDemoSale,
            icon: <Plus className="h-4 w-4" />
          }}
          secondaryActions={[
            {
              label: "Export PDF",
              onClick: () => console.log("Exporting PDF..."),
              icon: <Download className="h-4 w-4" />
            }
          ]}
       />
       <SectionCard>
         <DataTable 
            columns={columns} 
            data={sales} 
            searchKey="id"
            searchPlaceholder="Search order ID..."
            onView={(row) => console.log("View sale:", row.id)}
            onEdit={(row) => console.log("Edit sale:", row.id)}
            onDelete={(row) => console.log("Delete sale:", row.id)}
            totalRecords={sales.length}
            pageSize={10}
         />
       </SectionCard>
    </PageLayout>
  )
}
