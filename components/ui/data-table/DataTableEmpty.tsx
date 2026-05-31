"use client"

import * as React from "react"
import { Inbox, Plus } from "lucide-react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface DataTableEmptyProps {
  colSpan: number
  message?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function DataTableEmpty({
  colSpan,
  message = "No records found",
  description = "It looks like there is no data to display here yet.",
  actionLabel,
  onAction,
}: DataTableEmptyProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-[450px] text-center border-none">
        <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-150"></div>
            <div className="relative h-20 w-20 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-center text-muted-foreground/40">
              <Inbox className="h-10 w-10" />
            </div>
          </div>
          
          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
              {message}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {actionLabel && (
            <Button
              onClick={onAction}
              variant="primary"
              size="sm"
              className="rounded-xl px-8 h-12 font-bold gap-2"
            >
              <Plus className="h-4 w-4" />
              {actionLabel}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

