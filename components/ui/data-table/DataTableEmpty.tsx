"use client"

import * as React from "react"
import { Database } from "lucide-react"
import { TableCell, TableRow } from "@/components/ui/table"

interface DataTableEmptyProps {
  colSpan: number
  message?: string
  description?: string
}

export function DataTableEmpty({
  colSpan,
  message = "No results found.",
  description = "There is no data to display at this moment.",
}: DataTableEmptyProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-72 text-center">
        <div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in zoom-in duration-500">
          <div className="rounded-full bg-muted/50 p-4">
            <Database className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {message}
            </h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
              {description}
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}
