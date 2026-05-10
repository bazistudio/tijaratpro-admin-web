"use client";

import React from "react";
import Link from "next/link";
import { 
  Bell, 
  Package, 
  CreditCard, 
  RefreshCw, 
  AlertTriangle, 
  Info,
  CheckCheck,
  ExternalLink
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/store/notification.store";
import { cn, formatRelative } from "@/lib/utils";
import { NotificationType } from "@/types/notification.types";

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "order":
      return <Package size={16} className="text-primary" />;
    case "payment":
      return <CreditCard size={16} className="text-success" />;
    case "subscription":
      return <RefreshCw size={16} className="text-indigo-500" />;
    case "low_stock":
      return <AlertTriangle size={16} className="text-danger" />;
    case "system":
      return <Info size={16} className="text-info" />;
    default:
      return <Bell size={16} className="text-[var(--text-soft)]" />;
  }
};

export function NotificationDropdown() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotificationStore();

  const recentNotifications = notifications.slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-soft)] hover:text-primary transition-all relative group">
          <Bell size={18} className="group-hover:animate-ring" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-danger border-2 border-[var(--card)] text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-[380px] p-0 overflow-hidden bg-[var(--card)]/95 backdrop-blur-xl border-[var(--border)] shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 flex items-center justify-between bg-[var(--bg-secondary)]/50 border-b border-[var(--border)]">
          <div>
            <DropdownMenuLabel className="p-0 text-sm font-bold">Notifications</DropdownMenuLabel>
            <p className="text-[10px] text-[var(--text-soft)] uppercase tracking-wider font-semibold">
              You have {unreadCount} unread messages
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead();
              }}
              className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors group"
              title="Mark all as read"
            >
              <CheckCheck size={16} className="group-active:scale-90 transition-transform" />
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-3">
                <Bell size={20} className="text-[var(--text-soft)] opacity-20" />
              </div>
              <p className="text-sm text-[var(--text-soft)]">No notifications yet</p>
            </div>
          ) : (
            <div className="py-2">
              {recentNotifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification._id}
                  onClick={() => markAsRead(notification._id)}
                  className={cn(
                    "flex gap-4 p-4 cursor-pointer transition-colors border-l-2 border-transparent",
                    !notification.isRead && "bg-primary/5 border-l-primary",
                    "hover:bg-[var(--bg-secondary)] focus:bg-[var(--bg-secondary)]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center",
                    !notification.isRead ? "bg-white dark:bg-slate-800 shadow-sm" : "bg-[var(--bg-secondary)]"
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn(
                        "text-sm truncate",
                        !notification.isRead ? "font-bold text-[var(--text-main)]" : "font-medium text-[var(--text-soft)]"
                      )}>
                        {notification.title}
                      </p>
                      <span className="text-[10px] text-[var(--text-soft)] whitespace-nowrap">
                        {formatRelative(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-soft)] line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />
        
        <Link href="/notifications" className="block p-3 text-center text-xs font-bold text-primary hover:bg-primary/5 transition-colors group">
          <span className="flex items-center justify-center gap-2">
            View All Intelligence Logs
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
