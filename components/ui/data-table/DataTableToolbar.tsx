"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey: string
  searchPlaceholder?: string
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-9 w-full pl-9 pr-4 rounded-full bg-muted/50 border-transparent focus-visible:bg-transparent transition-all focus-within:ring-primary shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
