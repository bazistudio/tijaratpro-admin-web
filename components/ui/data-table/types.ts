import { ColumnDef } from "@tanstack/react-table";

export interface RowAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TData) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
  className?: string;
  isDisabled?: (row: TData) => boolean;
  isHidden?: (row: TData) => boolean;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  
  // Search Configuration
  searchKey?: string;
  searchPlaceholder?: string;
  
  // Row Actions (Standard CRUD)
  onView?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  
  // Custom Actions
  actions?: RowAction<TData>[];
  
  // Row Interactions
  onRowClick?: (row: TData) => void;
  
  // Pagination State
  totalRecords?: number;
  pageSize?: number;
  
  // Utilities
  isLoading?: boolean;
  className?: string;
}
