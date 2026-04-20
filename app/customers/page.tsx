"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageLayout } from "@/components/layout/PageLayout"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionCard } from "@/components/ui/SectionCard"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Plus, Download } from "lucide-react"
import { useCustomersStore } from "@/store/customers.store"
import { useEffect } from "react"

export default function CustomersPage() {
  const columns = [
    { accessorKey: "id", header: "Customer ID" },
    { accessorKey: "name", header: "Party Name" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "city", header: "City" },
    { 
      accessorKey: "creditLimit", 
      header: "Credit Limit",
      cell: ({ row }: any) => `Rs ${row.getValue("creditLimit").toLocaleString()}`
    },
    { 
      accessorKey: "balance", 
      header: "Current Balance",
      cell: ({ row }: any) => {
        const bal = row.getValue("balance") as number
        const limit = row.getValue("creditLimit") as number
        const isOver = bal > limit
        return <span className={isOver ? "font-bold text-destructive" : "font-medium text-warning"}>Rs {bal.toLocaleString()}</span>
      }
    },
  ]

  const { customers, isLoading, fetchCustomers, addCustomer } = useCustomersStore()

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const handleAddDemoCustomer = async () => {
    await addCustomer({
      name: `New Demo Client ${Math.floor(Math.random() * 1000)}`,
      phone: "0300-9998887",
      city: "Gujranwala",
      creditLimit: 50000,
      balance: 0,
    })
  }



  return (
    <PageLayout 
      breadcrumbs={<span className="flex items-center gap-2">Dashboard <span className="text-muted-foreground/50">/</span> Customers</span>}
      isLoading={isLoading}
    >
       <PageHeader 
          title="Customer & Party Ledger"
          subtitle="Track all active accounts, credit limits, and balances."
          primaryAction={{
            label: "Register Demo Party",
            onClick: handleAddDemoCustomer,
            icon: <Plus className="h-4 w-4" />
          }}
          secondaryActions={[
            {
              label: "Export",
              onClick: () => console.log("Exporting..."),
              icon: <Download className="h-4 w-4" />
            }
          ]}
       />
       <SectionCard>
         <DataTable 
            columns={columns} 
            data={customers} 
            searchKey="name"
            searchPlaceholder="Search customer or party name..."
            onDelete={(row) => deleteCustomer(row.id)}
            onEdit={(row) => console.log("Edit customer:", row.id)}
            onView={(row) => console.log("View customer:", row.id)}
            totalRecords={customers.length}
            pageSize={10}
         />
       </SectionCard>
    </PageLayout>
  )
}
