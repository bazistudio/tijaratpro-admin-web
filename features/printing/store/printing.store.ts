import { create } from "zustand";
import { PrintJob, Printer } from "../types/printing.types";

interface PrintingStore {
  queue: PrintJob[];
  printers: Printer[];
  selectedPrinter: Printer | null;
  isLoading: boolean;
  
  // Mandatory Methods
  addPrintJob: (job: PrintJob) => void;
  updatePrintStatus: (id: string, status: PrintJob["status"]) => void;
  removePrintJob: (id: string) => void;
  retryPrintJob: (id: string) => void;
  setSelectedPrinter: (printer: Printer | null) => void;
  setPrinters: (printers: Printer[]) => void;
  clearQueue: () => void;
}

export const usePrintingStore = create<PrintingStore>((set) => ({
  queue: [],
  printers: [],
  selectedPrinter: null,
  isLoading: false,

  addPrintJob: (job) =>
    set((state) => ({
      queue: [job, ...state.queue],
    })),

  updatePrintStatus: (id, status) =>
    set((state) => ({
      queue: state.queue.map((job) =>
        job.id === id ? { ...job, status, updatedAt: new Date().toISOString() } : job
      ),
    })),

  removePrintJob: (id) =>
    set((state) => ({
      queue: state.queue.filter((job) => job.id !== id),
    })),

  retryPrintJob: (id) =>
    set((state) => ({
      queue: state.queue.map((job) =>
        job.id === id
          ? {
              ...job,
              status: "PROCESSING",
              retryCount: job.retryCount + 1,
              updatedAt: new Date().toISOString(),
            }
          : job
      ),
    })),

  setSelectedPrinter: (printer) =>
    set({ selectedPrinter: printer }),

  setPrinters: (printers) =>
    set({ printers }),

  clearQueue: () =>
    set({ queue: [] }),
}));
