"use client";
"use no memo";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DataTableProps, RowAction } from "./types";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableSkeleton } from "./DataTableSkeleton";
import { DataTableEmpty } from "./DataTableEmpty";

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  onView,
  onEdit,
  onDelete,
  actions,
  onRowClick,
  totalRecords = 0,
  pageSize = 10,
  isLoading = false,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // 1. Process Columns: Inject Actions if handlers exist
  const finalColumns = React.useMemo(() => {
    const processedColumns = [...columns];
    const hasActions = onView || onEdit || onDelete || (actions && actions.length > 0);

    if (hasActions) {
      processedColumns.push({
        id: "actions",
        header: () => <div className="text-right px-2">Actions</div>,
        cell: ({ row }) => {
          const item = row.original;
          
          // Row Action Handlers
          const standardActions: RowAction<TData>[] = [];
          if (onView) standardActions.push({ label: "View", icon: <Eye />, onClick: onView, variant: "ghost" });
          if (onEdit) standardActions.push({ label: "Edit", icon: <Pencil />, onClick: onEdit, variant: "ghost" });
          if (onDelete) standardActions.push({ label: "Delete", icon: <Trash2 />, onClick: onDelete, variant: "ghost", className: "text-destructive hover:text-destructive" });

          const allActions = [...standardActions, ...(actions || [])];

          return (
            <div className="flex items-center justify-end gap-1 px-2" onClick={(e) => e.stopPropagation()}>
              {/* Desktop View: Inline Buttons (lg and above) */}
              <div className="hidden lg:flex items-center gap-1">
                {allActions.slice(0, 3).map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || "ghost"}
                    size="icon"
                    className={cn("h-8 w-8", action.className)}
                    onClick={() => action.onClick(item)}
                    disabled={action.isDisabled?.(item)}
                  >
                    {action.icon}
                  </Button>
                ))}
              </div>

              {/* Mobile/Crowded View: Dropdown Menu */}
              <div className={cn("flex", allActions.length > 3 ? "flex" : "lg:hidden")}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    {allActions.map((action, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        onClick={() => action.onClick(item)}
                        disabled={action.isDisabled?.(item)}
                        className={action.className}
                      >
                        {action.icon && <span className="mr-2 opacity-70">{action.icon}</span>}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        },
        // Fixed width for actions column
        size: 120,
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData, TValue>);
    }

    return processedColumns;
  }, [columns, onView, onEdit, onDelete, actions]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return <DataTableSkeleton columnsCount={columns.length + (onView || onEdit || onDelete ? 1 : 0)} />;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar (Always visible if searchKey exists) */}
      {searchKey && (
        <DataTableToolbar 
          table={table} 
          searchKey={searchKey} 
          searchPlaceholder={searchPlaceholder} 
        />
      )}

      {/* Table Shell */}
      <div className="relative rounded-md border bg-card/50 overflow-hidden">
        <Table className="relative border-collapse">
          <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="font-bold text-foreground py-3"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-accent/50 group/row",
                    "odd:bg-muted/20" // Striped rows
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <DataTableEmpty colSpan={finalColumns.length} />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (Conditional) */}
      <DataTablePagination table={table} totalRecords={totalRecords || data.length} pageSize={pageSize} />
    </div>
  );
}
