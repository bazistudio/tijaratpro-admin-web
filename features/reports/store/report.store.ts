import { create } from "zustand";
import { ReportQueryParams, ExportFormat } from "../types/report.types";
import { DEFAULT_DATE_RANGE, DEFAULT_PAGE_SIZE, REPORT_TYPES } from "../constants/report.constants";

interface ReportState {
  selectedReportType: string;
  dateRange: { startDate: string; endDate: string };
  pagination: { page: number; pageSize: number };
  filters: Record<string, any>;
  exportFormat: ExportFormat;
  isLoading: boolean;

  // Actions
  setReportType: (type: string) => void;
  setDateRange: (start: string, end: string) => void;
  setFilters: (filters: Record<string, any>) => void;
  setPagination: (page: number, pageSize?: number) => void;
  setExportFormat: (format: ExportFormat) => void;
  setLoading: (loading: boolean) => void;
  resetFilters: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  selectedReportType: REPORT_TYPES.SALES,
  dateRange: DEFAULT_DATE_RANGE,
  pagination: { page: 1, pageSize: DEFAULT_PAGE_SIZE },
  filters: {},
  exportFormat: ExportFormat.CSV,
  isLoading: false,

  setReportType: (selectedReportType) => 
    set({ selectedReportType, pagination: { page: 1, pageSize: DEFAULT_PAGE_SIZE } }),

  setDateRange: (startDate, endDate) => 
    set({ dateRange: { startDate, endDate }, pagination: { page: 1, pageSize: DEFAULT_PAGE_SIZE } }),

  setFilters: (filters) => 
    set((state) => ({ filters: { ...state.filters, ...filters }, pagination: { page: 1, pageSize: DEFAULT_PAGE_SIZE } })),

  setPagination: (page, pageSize) => 
    set((state) => ({ 
      pagination: { 
        page, 
        pageSize: pageSize || state.pagination.pageSize 
      } 
    })),

  setExportFormat: (exportFormat) => set({ exportFormat }),

  setLoading: (isLoading) => set({ isLoading }),

  resetFilters: () => set({
    dateRange: DEFAULT_DATE_RANGE,
    pagination: { page: 1, pageSize: DEFAULT_PAGE_SIZE },
    filters: {},
  }),
}));
