"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageLayout } from "@/components/layout/PageLayout"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionCard } from "@/components/ui/SectionCard"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Download, Plus } from "lucide-react"
import { useEffect } from "react"

export default function ProductsPage() {
  const columns = [
    { accessorKey: "sku", header: "Code" },
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "categoryId", header: "Category" },
    { 
      accessorKey: "cost", 
      header: "Cost Price",
      cell: ({ row }: any) => `Rs ${(row.getValue("cost") || 0).toLocaleString()}` 
    },
    { 
      accessorKey: "price", 
      header: "Sale Price",
      cell: ({ row }: any) => <span className="font-semibold text-primary">Rs ${(row.getValue("price") || 0).toLocaleString()}</span> 
    },
    { 
      accessorKey: "currentStock", 
      header: "Stock",
      cell: ({ row }: any) => {
        const val = row.getValue("currentStock") as number || 0
        return <span className={val < 10 ? "font-bold text-destructive" : ""}>{val} units</span>
      }
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status") as string
        if (status === "active") return <Badge className="bg-success hover:bg-success/80 text-white">{status}</Badge>
        if (status === "low_stock") return <Badge variant="destructive">{status}</Badge>
        return <Badge variant="outline">{status}</Badge>
      }
    },
  ]

  const { products, isLoading, fetchProducts, addProduct, deleteProduct } = useProductsStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddDemoProduct = async () => {
    await addProduct({
      name: `New Demo Product ${Math.floor(Math.random() * 1000)}`,
      sku: `DEMO-${Math.floor(Math.random() * 1000)}`,
      price: 1500,
      cost: 1000,
      categoryId: "cat_demo",
    } as any)
  }

  const columnsWithActions = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => deleteProduct(row.original.id)}
        >
          Delete
        </Button>
      )
    }
  ]

  const ToolbarActions = (
    <>
      <Button variant="outline" icon={<Download className="h-4 w-4" />}>Export Data</Button>
      <Button variant="premium" icon={<Plus className="h-4 w-4" />} onClick={handleAddDemoProduct}>
        Add Demo Product
      </Button>
    </>
  )

  return (
    <PageLayout 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Products</span>}
      isLoading={isLoading}
    >
       <PageHeader 
          title="Products Registry"
          subtitle="Manage your entire retail and wholesale catalog."
          primaryAction={{
            label: "Add Demo Product",
            onClick: handleAddDemoProduct,
            icon: <Plus className="h-4 w-4" />
          }}
          secondaryActions={[
            {
              label: "Export Data",
              onClick: () => console.log("Exporting..."),
              icon: <Download className="h-4 w-4" />
            }
          ]}
       />
       <SectionCard>
         <DataTable 
            columns={columnsWithActions} 
            data={products} 
            searchKey="name"
            searchPlaceholder="Search products by name..."
         />
       </SectionCard>
    </PageLayout>
  )
}
