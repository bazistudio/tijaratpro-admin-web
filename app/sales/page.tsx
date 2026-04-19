"use client"

import * as React from "react"
import { useEffect } from "react"
import { Plus, Download, ReceiptText } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSalesStore } from "@/store/sales.store"

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

  const ToolbarActions = (
    <>
      <Button variant="outline" icon={<Download className="h-4 w-4" />}>Export PDF</Button>
      <Button variant="premium" icon={<Plus className="h-4 w-4" />} onClick={handleAddDemoSale}>Create Demo Invoice</Button>
    </>
  )

  return (
    <PageWrapper title="Sales History" description="View and manage all retail invoices and service orders." actions={ToolbarActions}>
       <DataTable 
          columns={columns} 
          data={sales} 
          searchKey="id"
          searchPlaceholder="Search order ID..."
       />
    </PageWrapper>
  )
}
