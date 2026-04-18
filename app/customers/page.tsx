"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"

const customersData = [
  { id: "CST-001", name: "Kamran Malik", phone: "0300-1234567", city: "Lahore", creditLimit: 500000, balance: 120000 },
  { id: "CST-002", name: "Rana Traders", phone: "0321-7654321", city: "Karachi", creditLimit: 1000000, balance: 850000 },
  { id: "CST-003", name: "Al-Madina Stores", phone: "0333-9876543", city: "Islamabad", creditLimit: 200000, balance: 0 },
  { id: "CST-004", name: "Zafar Wholesale", phone: "0301-1122334", city: "Faisalabad", creditLimit: 300000, balance: 350000 },
]

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

  const ToolbarActions = (
    <>
      <Button variant="outline" icon={<Download className="h-4 w-4" />}>Export</Button>
      <Button variant="default" icon={<Plus className="h-4 w-4" />}>Register Party</Button>
    </>
  )

  return (
    <PageWrapper title="Customer & Party Ledger" description="Track all active accounts, credit limits, and balances." actions={ToolbarActions}>
       <DataTable 
          columns={columns} 
          data={customersData} 
          searchKey="name"
          searchPlaceholder="Search customer or party name..."
       />
    </PageWrapper>
  )
}
