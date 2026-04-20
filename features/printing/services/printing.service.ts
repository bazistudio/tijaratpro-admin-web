import axios from "@/lib/api/axios";
import { PrintJob, Printer } from "../types/printing.types";
import { ApiResponse, PaginatedResponse } from "@/types";

const BASE_PATH = "/printing"; // Assuming /api is already prefixed in axios base URL

export const printingService = {
  /**
   * Fetches the current print queue from the backend.
   */
  fetchPrintQueue: () => 
    axios.get<PaginatedResponse<PrintJob>>(BASE_PATH).then(res => res.data),

  /**
   * Creates a new print job.
   */
  createPrintJob: (data: Partial<PrintJob>) => 
    axios.post<ApiResponse<PrintJob>>(BASE_PATH, data).then(res => res.data),

  /**
   * Updates the status of an existing print job.
   */
  updatePrintStatus: (id: string, status: PrintJob["status"]) => 
    axios.patch<ApiResponse<PrintJob>>(`${BASE_PATH}/${id}/status`, { status }).then(res => res.data),

  /**
   * Triggers a retry for a failed print job.
   */
  retryPrintJob: (id: string) => 
    axios.post<ApiResponse<PrintJob>>(`${BASE_PATH}/${id}/retry`).then(res => res.data),

  /**
   * Fetches available printers.
   */
  fetchPrinters: () => 
    axios.get<ApiResponse<Printer[]>>(`${BASE_PATH}/printers`).then(res => res.data),
};
