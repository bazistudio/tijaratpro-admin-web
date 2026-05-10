"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Search, 
  Filter, 
  Trash2, 
  CheckCheck, 
  Package, 
  CreditCard, 
  RefreshCw, 
  AlertTriangle, 
  Info,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store/notification.store";
import { cn, formatRelative, formatDateTime } from "@/lib/utils";
import { NotificationType } from "@/types/notification.types";

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "order":
      return <Package size={18} className="text-primary" />;
    case "payment":
      return <CreditCard size={18} className="text-success" />;
    case "subscription":
      return <RefreshCw size={18} className="text-indigo-500" />;
    case "low_stock":
      return <AlertTriangle size={18} className="text-danger" />;
    case "system":
      return <Info size={18} className="text-info" />;
    default:
      return <Bell size={18} className="text-[var(--text-soft)]" />;
  }
};

const getNotificationBadge = (type: NotificationType) => {
  switch (type) {
    case "order":
      return <Badge variant="default" className="text-[10px] uppercase">Order</Badge>;
    case "payment":
      return <Badge variant="success" className="text-[10px] uppercase">Payment</Badge>;
    case "low_stock":
      return <Badge variant="destructive" className="text-[10px] uppercase">Stock</Badge>;
    default:
      return <Badge variant="secondary" className="text-[10px] uppercase">{type}</Badge>;
  }
};

export default function NotificationsPage() {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification 
  } = useNotificationStore();
  
  const [filter, setFilter] = useState<"all" | "unread" | "system" | "orders">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread" && n.isRead) return false;
    if (filter === "system" && n.type !== "system") return false;
    if (filter === "orders" && n.type !== "order") return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(query) || n.message.toLowerCase().includes(query);
    }
    
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader 
        title="Intelligence Logs" 
        subtitle="Track system events, business alerts, and operational updates in real-time."
        primaryAction={{
          label: "Mark All as Read",
          onClick: markAllAsRead,
          icon: <CheckCheck size={16} />,
          variant: "outline"
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4 bg-[var(--card)]/50 backdrop-blur-md border-[var(--border)]">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-[var(--text-soft)]">Filter By</h3>
            <div className="space-y-1">
              {[
                { id: "all", label: "All Logs", count: notifications.length },
                { id: "unread", label: "Unread", count: notifications.filter(n => !n.isRead).length },
                { id: "orders", label: "Orders", count: notifications.filter(n => n.type === "order").length },
                { id: "system", label: "System", count: notifications.filter(n => n.type === "system").length },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id as any)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    filter === item.id 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-[var(--text-soft)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]"
                  )}
                >
                  <span>{item.label}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold",
                    filter === item.id ? "bg-primary text-white" : "bg-[var(--bg-secondary)] text-[var(--text-soft)]"
                  )}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-primary mb-2">Pro Tip</h4>
              <p className="text-xs text-[var(--text-soft)] leading-relaxed">
                Connect your Telegram or Slack to receive real-time intelligence alerts directly on your devices.
              </p>
              <Button variant="link" className="p-0 h-auto text-xs font-bold mt-4 text-primary group-hover:gap-2 transition-all">
                Configure Webhooks →
              </Button>
            </div>
            <Bell className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </Card>
        </div>

        {/* Notification List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-soft)] group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <Button variant="outline" className="h-11 px-4">
              <Filter size={16} className="mr-2" />
              Advanced
            </Button>
          </div>

          <Card className="overflow-hidden border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
            {filteredNotifications.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                  <Bell size={24} className="text-[var(--text-soft)] opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">No logs found</h3>
                <p className="text-sm text-[var(--text-soft)] max-w-xs mx-auto">
                  We couldn't find any intelligence logs matching your current filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {setFilter("all"); setSearchQuery("");}}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {filteredNotifications.map((n) => (
                  <div 
                    key={n._id}
                    className={cn(
                      "group flex flex-col sm:flex-row items-start gap-4 p-6 transition-all hover:bg-[var(--bg-secondary)]/50",
                      !n.isRead && "bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105",
                      !n.isRead ? "bg-white dark:bg-slate-800" : "bg-[var(--bg-secondary)]"
                    )}>
                      {getNotificationIcon(n.type)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-3 mb-1">
                        {getNotificationBadge(n.type)}
                        <span className="text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-widest">
                          {formatDateTime(n.createdAt)}
                        </span>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <h4 className={cn(
                        "text-base transition-colors",
                        !n.isRead ? "font-bold text-[var(--text-main)]" : "font-semibold text-[var(--text-main)]/80"
                      )}>
                        {n.title}
                      </h4>
                      <p className="text-sm text-[var(--text-soft)] leading-relaxed max-w-3xl">
                        {n.message}
                      </p>
                      
                      {n.data?.orderId && (
                        <div className="pt-3">
                          <Button variant="secondary" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider">
                            View Order Details
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-center sm:self-start opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                          onClick={() => markAsRead(n._id)}
                          title="Mark as read"
                        >
                          <CheckCheck size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-danger hover:bg-danger/10"
                        onClick={() => removeNotification(n._id)}
                        title="Delete log"
                      >
                        <Trash2 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredNotifications.length > 0 && (
              <div className="p-4 bg-[var(--bg-secondary)]/30 border-t border-[var(--border)] flex items-center justify-between">
                <p className="text-xs text-[var(--text-soft)] font-medium">
                  Showing <span className="font-bold text-[var(--text-main)]">{filteredNotifications.length}</span> of <span className="font-bold text-[var(--text-main)]">{notifications.length}</span> logs
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
