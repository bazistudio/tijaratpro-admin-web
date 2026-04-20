import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { printingService } from "../services/printing.service";
import { usePrintingStore } from "../store/printing.store";
import { useEffect } from "react";
import { toast } from "sonner";
import { PrintJob } from "../types/printing.types";

export const usePrinting = () => {
  const queryClient = useQueryClient();
  const { setPrinters, setNotifications } = usePrintingStore(); // typo: setNotifications? wait, store has setPrinters.

  const usePrintQueue = () =>
    useQuery({
      queryKey: ["printing", "queue"],
      queryFn: printingService.fetchPrintQueue,
      refetchInterval: 10000, // Poll every 10s for queue updates
    });

  const usePrinters = () =>
    useQuery({
      queryKey: ["printing", "printers"],
      queryFn: printingService.fetchPrinters,
      onSuccess: (res) => {
        if (res.data) setPrinters(res.data);
      },
    });

  const useCreatePrintJob = () =>
    useMutation({
      mutationFn: printingService.createPrintJob,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["printing", "queue"] });
        toast.success("Print job created successfully");
      },
      onError: () => toast.error("Failed to create print job"),
    });

  const useRetryPrintJob = () =>
    useMutation({
      mutationFn: (id: string) => printingService.retryPrintJob(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["printing", "queue"] });
        toast.success("Retry triggered successfully");
      },
      onError: () => toast.error("Failed to retry print job"),
    });

  const useUpdatePrintStatus = () =>
    useMutation({
      mutationFn: ({ id, status }: { id: string; status: PrintJob["status"] }) =>
        printingService.updatePrintStatus(id, status),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["printing", "queue"] });
      },
    });

  return {
    usePrintQueue,
    usePrinters,
    useCreatePrintJob,
    useRetryPrintJob,
    useUpdatePrintStatus,
  };
};
