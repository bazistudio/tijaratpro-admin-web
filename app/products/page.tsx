"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const productsData = [
  { id: "PRD-1001", name: "Sikander Rice 50kg", category: "Grains", cost: 4200, price: 4500, stock: 450, status: "Active" },
  { id: "PRD-1002", name: "Mughal Sugar 50kg", category: "Essentials", cost: 6800, price: 7100, stock: 320, status: "Active" },
  { id: "PRD-1003", name: "Golden Atta 20kg", category: "Grains", cost: 2100, price: 2300, stock: 8, status: "Low Stock" },
  { id: "PRD-1004", name: "Mezan Oil 5L", category: "Cooking Essentials", cost: 2450, price: 2600, stock: 210, status: "Active" },
  { id: "PRD-1005", name: "Lipton Tea 1kg", category: "Beverages", cost: 1100, price: 1250, stock: 0, status: "Out of Stock" },
]

export default function ProductsPage() {
  const columns = [
    { accessorKey: "id", header: "Code" },
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "category", header: "Category" },
    { 
      accessorKey: "cost", 
      header: "Cost Price",
      cell: ({ row }: any) => `Rs ${row.getValue("cost").toLocaleString()}` 
    },
    { 
      accessorKey: "price", 
      header: "Sale Price",
      cell: ({ row }: any) => <span className="font-semibold text-primary">Rs {row.getValue("price").toLocaleString()}</span> 
    },
    { 
      accessorKey: "stock", 
      header: "Stock",
      cell: ({ row }: any) => {
        const val = row.getValue("stock") as number
        return <span className={val < 10 ? "font-bold text-destructive" : ""}>{val} units</span>
      }
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string
        if (status === "Active") return <Badge className="bg-success hover:bg-success/80 text-white">{status}</Badge>
        if (status === "Low Stock") return <Badge variant="destructive">{status}</Badge>
        return <Badge variant="outline">{status}</Badge>
      }
    },
  ]

  const ToolbarActions = (
    <>
      <Button variant="outline" icon={<Download className="h-4 w-4" />}>Export Data</Button>
      <Button variant="premium" icon={<Plus className="h-4 w-4" />}>Add New Product</Button>
    </>
  )

  return (
    <PageWrapper title="Products Registry" description="Manage your entire retail and wholesale catalog." actions={ToolbarActions}>
       <DataTable 
          columns={columns} 
          data={productsData} 
          searchKey="name"
          searchPlaceholder="Search products by name..."
       />
    </PageWrapper>
  )
}
