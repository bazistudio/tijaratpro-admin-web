import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppEmptyState } from '../feedback/AppEmptyState';
import { AppLoader } from '../feedback/app-loader';
import { cn } from '@/lib/utils';

export interface AppTableColumn<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

export interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function AppTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No data found",
  onRowClick,
  className,
}: AppTableProps<T>) {
  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            {columns.map((col, i) => (
              <TableHead key={i} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <AppLoader text="Loading data..." />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 p-0 text-center">
                <AppEmptyState message={emptyMessage} className="py-12" />
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className={col.className}>
                    {col.cell 
                      ? col.cell(row) 
                      : col.accessorKey 
                        ? String(row[col.accessorKey]) 
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
