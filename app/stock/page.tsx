"use client"

import * as React from "react"
import { useEffect } from "react"
import { Package, AlertTriangle, XCircle, Wallet } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStockStore } from "@/store/stock.store"

export default function StockPage() {
  const { 
    stockItems, 
    isLoading, 
    totalProducts, 
    lowStockItems, 
    outOfStockItems, 
    totalInventoryValue,
    fetchStock 
  } = useStockStore()

  useEffect(() => {
    fetchStock()
  }, [fetchStock])

  const columns = [
    { accessorKey: "sku", header: "Code" },
    { accessorKey: "name", header: "Product Name" },
    { 
      accessorKey: "cost", 
      header: "Unit Cost",
      cell: ({ row }: any) => `Rs ${(row.getValue("cost") || 0).toLocaleString()}` 
    },
    { 
      accessorKey: "quantity", 
      header: "Current Stock",
      cell: ({ row }: any) => {
        const val = row.getValue("quantity") as number || 0
        return <span className="font-medium">{val} units</span>
      }
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string
        const qty = row.original.quantity || 0

        if (qty === 0) return <Badge variant="destructive">Out of Stock</Badge>
        if (status === "LOW") return <Badge variant="destructive" className="bg-destructive/90 hover:bg-destructive/100">⚠ Restock Needed</Badge>
        
        return <Badge className="bg-success text-white hover:bg-success/80">In Stock</Badge>
      }
    },
  ]

  return (
    <PageWrapper title="Stock Management" description="Monitor inventory levels and identify restock priorities.">
      
      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="glass-card stat-indigo">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card stat-rose">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{lowStockItems}</div>
          </CardContent>
        </Card>

        <Card className="glass-card stat-rose">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">{outOfStockItems}</div>
          </CardContent>
        </Card>

        <Card className="glass-card stat-emerald">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory Value</CardTitle>
            <Wallet className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading text-foreground">Rs {totalInventoryValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

       <DataTable 
          columns={columns} 
          data={stockItems} 
          searchKey="name"
          searchPlaceholder="Search inventory by item name..."
       />
    </PageWrapper>
  )
}
