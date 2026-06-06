import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTickets, getTicketById,
  replyToTicket, updateTicketStatus, assignTicket,
} from "../api/superAdmin.api";
import { useSuperAdminStore } from "../store/superAdmin.store";
import { toast } from "sonner";

export const SA_TICKETS_KEY = ["sa-tickets"] as const;
export const SA_TICKET_KEY  = (id: string) => ["sa-ticket", id] as const;

export function useTickets() {
  const filters = useSuperAdminStore((s) => s.ticketFilters);
  return useQuery({
    queryKey: [...SA_TICKETS_KEY, filters],
    queryFn:  () => getTickets(filters),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useTicketDetail(id: string) {
  const drawerOpen = useSuperAdminStore((s) => s.drawerOpen);
  return useQuery({
    queryKey: SA_TICKET_KEY(id),
    queryFn:  () => getTicketById(id),
    enabled:  drawerOpen && !!id,
    staleTime: 1000 * 30,
  });
}

export function useReplyToTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      replyToTicket(id, message),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: SA_TICKET_KEY(id) });
      toast.success("Reply sent");
    },
    onError: () => toast.error("Failed to send reply"),
  });
}

export function useUpdateTicketStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTicketStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TICKETS_KEY });
      toast.success("Ticket status updated");
    },
    onError: () => toast.error("Failed to update ticket"),
  });
}

export function useAssignTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, assignedTo }: { id: string; assignedTo: string }) =>
      assignTicket(id, assignedTo),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SA_TICKETS_KEY });
      toast.success("Ticket assigned");
    },
    onError: () => toast.error("Failed to assign ticket"),
  });
}
