"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageLayout } from "@/components/layout/PageLayout"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionCard } from "@/components/ui/SectionCard"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { api } from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"



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

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [search, setSearch] = React.useState("")

  // 1. Fetcher Function
  const fetchProductsData = async (p: number, ps: number, q: string) => {
    const query = new URLSearchParams({
      page: (p + 1).toString(),
      limit: ps.toString(),
      keyword: q
    }).toString()

    const res = await api(`/products?${query}`)
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || "Failed to fetch products")
    }
    return res.json()
  }

  // 2. Query Hook (Smart Caching)
  const { 
    data, 
    isLoading, 
    error: queryError, 
    refetch 
  } = useQuery({
    queryKey: ["products", page, pageSize, search],
    queryFn: () => fetchProductsData(page, pageSize, search),
    // Keep previous data while fetching new (prevents UI jump)
    placeholderData: (previousData) => previousData,
  })

  // Normalize Data
  const products = data?.products || data?.data || []
  const totalRecords = data?.pagination?.total || 0
  const pageCount = data?.pagination?.pages || 0
  const error = queryError ? (queryError as Error).message : null

  // 3. Delete Mutation (Optimistic UI)
  const queryClient = useQueryClient()
  
  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: async (id: string) => {
      const res = await api(`/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      return id
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["products"] })

      // Snapshot previous value
      const previousData = queryClient.getQueryData(["products", page, pageSize, search])

      // Optimistically update cache
      queryClient.setQueryData(["products", page, pageSize, search], (old: any) => {
        if (!old) return old
        return {
          ...old,
          products: old.products?.filter((p: any) => p.id !== id) || [],
          pagination: {
            ...old.pagination,
            total: (old.pagination?.total || 0) - 1
          }
        }
      })

      return { previousData }
    },
    onError: (err, id, context: any) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(["products", page, pageSize, search], context.previousData)
      }
      toast.error("Failed to delete product")
    },
    onSuccess: () => {
      toast.success("Product deleted successfully")
    },
    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

  const handleAddDemoProduct = async () => {
    try {
      const res = await api("/products", {
        method: "POST",
        body: JSON.stringify({
          name: `New Demo Product ${Math.floor(Math.random() * 1000)}`,
          sku: `DEMO-${Math.floor(Math.random() * 1000)}`,
          price: 1500,
          cost: 1000,
          categoryId: "cat_demo",
          status: "active"
        })
      })
      if (res.ok) {
        toast.success("Demo product added")
        queryClient.invalidateQueries({ queryKey: ["products"] })
      }
    } catch (err) {
      toast.error("Failed to add product")
    }
  }


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
        {error && (
         <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
           <span className="material-symbols-outlined">error</span>
           {error}
           <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-auto h-7 border-destructive/20 hover:bg-destructive/10 text-destructive">
             Retry
           </Button>
         </div>
       )}

       <SectionCard>
         <DataTable 
            columns={columns} 
            data={products} 
            searchKey="name"
            searchPlaceholder="Search products by name..."
            onDelete={(row: any) => {
              if (confirm("Are you sure?")) deleteProductMutation(row.id)
            }}
            onEdit={(row) => console.log("Edit product:", row.id)}
            onView={(row) => console.log("View product:", row.id)}
            totalRecords={totalRecords}
            pageSize={pageSize}
            pageIndex={page}
            pageCount={pageCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            isLoading={isLoading}
         />
       </SectionCard>


    </PageLayout>
  )
}

