"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableSkeletonProps {
  columnsCount: number
  rowsCount?: number
}

export function DataTableSkeleton({
  columnsCount,
  rowsCount = 5,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar Skeleton */}
      <div className="flex items-center">
        <Skeleton className="h-9 w-full max-w-sm rounded-full" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border bg-card/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {Array.from({ length: columnsCount }).map((_, i) => (
                <TableHead key={i} className="py-3">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowsCount }).map((_, i) => (
              <TableRow key={i} className="odd:bg-muted/20">
                {Array.from({ length: columnsCount }).map((_, j) => (
                  <TableCell key={j} className="py-4">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2 py-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}
