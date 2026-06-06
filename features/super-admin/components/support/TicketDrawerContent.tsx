"use client";

import React, { useState } from "react";
import { Ticket, Send, Clock, User, CheckCircle2, Building2 } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useTicketDetail, useReplyToTicket, useUpdateTicketStatus } from "../../hooks/useSupportTickets";
import { useSuperAdminStore } from "../../store/superAdmin.store";
import { StatusBadge } from "../shared/StatusBadge";
import { SLABadge } from "../shared/SLABadge";
import { cn } from "@/lib/utils";

interface Props { id: string }

export default function TicketDrawerContent({ id }: Props) {
  const { data: ticket, isLoading } = useTicketDetail(id);
  const { openConfirm } = useSuperAdminStore();
  const replyMut = useReplyToTicket();
  const statusMut = useUpdateTicketStatus();

  const [replyText, setReplyText] = useState("");

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-[var(--bg-secondary)] rounded animate-pulse w-1/4" />
              <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!ticket) return null;

  const handleResolve = () => {
    openConfirm({
      title: "Resolve Ticket?",
      message: "Are you sure this issue is fully resolved?",
      variant: "warning",
      confirmLabel: "Resolve",
      onConfirm: () => statusMut.mutate({ id, status: "resolved" }),
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    replyMut.mutate({ id, message: replyText }, {
      onSuccess: () => setReplyText("")
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--card)]">
      {/* Hero */}
      <div className="p-6 border-b border-[var(--border)] shrink-0 bg-[var(--bg-secondary)]/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge value={ticket.status} variant="ticket" dot />
            <StatusBadge value={ticket.priority} variant="priority" />
            <SLABadge createdAt={ticket.createdAt} slaHours={ticket.slaHours} status={ticket.status} />
          </div>
          <p className="text-[10px] font-bold text-[var(--text-soft)] uppercase tracking-wider">#{ticket._id.slice(-6).toUpperCase()}</p>
        </div>
        <h3 className="text-xl font-black text-[var(--text)] leading-tight">{ticket.title}</h3>
        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-soft)]">
          <span className="flex items-center gap-1.5"><Building2 size={13} /> {ticket.shopName}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Original message */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <User size={14} className="text-blue-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[var(--text)]">Tenant</p>
              <p className="text-[10px] text-[var(--text-soft)]">{format(new Date(ticket.createdAt), "MMM d, h:mm a")}</p>
            </div>
            <div className="p-4 rounded-xl rounded-tl-none bg-[var(--bg-secondary)] text-sm text-[var(--text)] leading-relaxed border border-[var(--border)] whitespace-pre-wrap">
              {ticket.description}
            </div>
          </div>
        </div>

        {/* Replies */}
        {ticket.replies?.map((reply) => (
          <div key={reply._id} className={cn("flex gap-4", reply.isAdmin && "flex-row-reverse")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", reply.isAdmin ? "bg-primary/10" : "bg-blue-500/10")}>
              {reply.isAdmin ? <Ticket size={14} className="text-primary" /> : <User size={14} className="text-blue-500" />}
            </div>
            <div className={cn("flex-1 space-y-1", reply.isAdmin && "text-right")}>
              <div className={cn("flex items-center gap-2", reply.isAdmin && "justify-end")}>
                <p className="text-sm font-bold text-[var(--text)]">{reply.authorName}</p>
                <p className="text-[10px] text-[var(--text-soft)]">{format(new Date(reply.createdAt), "MMM d, h:mm a")}</p>
              </div>
              <div className={cn(
                "p-4 rounded-xl text-sm leading-relaxed border whitespace-pre-wrap text-left",
                reply.isAdmin
                  ? "rounded-tr-none bg-primary/10 border-primary/20 text-[var(--text)]"
                  : "rounded-tl-none bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text)]"
              )}>
                {reply.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      {ticket.status !== "closed" && ticket.status !== "resolved" && (
        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 shrink-0">
          <div className="relative">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply to the tenant…"
              rows={3}
              className="w-full px-4 py-3 pb-12 rounded-xl text-sm bg-[var(--card)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-soft)] focus:outline-none focus:border-primary/40 transition-all resize-none shadow-sm"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <button
                onClick={handleResolve}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-success hover:bg-success/10 transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} /> Mark Resolved
              </button>
              <button
                onClick={handleSendReply}
                disabled={replyMut.isPending || !replyText.trim()}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send size={13} /> Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
