"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

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

  const ToolbarActions = (
    <>
      <Button variant="outline" icon={<Download className="h-4 w-4" />}>Export</Button>
      <Button variant="default" icon={<Plus className="h-4 w-4" />} onClick={handleAddDemoCustomer}>Register Demo Party</Button>
    </>
  )

  return (
    <PageWrapper title="Customer & Party Ledger" description="Track all active accounts, credit limits, and balances." actions={ToolbarActions}>
       <DataTable 
          columns={columns} 
          data={customers} 
          searchKey="name"
          searchPlaceholder="Search customer or party name..."
       />
    </PageWrapper>
  )
}
