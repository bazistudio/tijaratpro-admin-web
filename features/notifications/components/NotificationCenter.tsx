import React, { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";
import { 
  Bell, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Filter, 
  Settings,
  AlertCircle
} from "lucide-react";
import { clsx } from "clsx";

export const NotificationCenter: React.FC = () => {
  const { notifications, isLoading, markAllRead, markRead } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'unread' ? !n.isRead : true;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="text-primary" /> Notifications
          </h1>
          <p className="text-muted-foreground text-sm">Manage your system alerts and messages.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllRead}
            className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
          >
            <CheckCircle2 size={18} /> Mark all as read
          </button>
          <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-border bg-muted/20 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        
        <div className="flex bg-muted p-1 rounded-lg w-full sm:w-auto">
          <button 
            onClick={() => setFilter('all')}
            className={clsx(
              "flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all",
              filter === 'all' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={clsx(
              "flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all",
              filter === 'unread' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-6 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/4 bg-muted rounded" />
                  <div className="h-3 w-3/4 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications.map(n => (
              <NotificationItem 
                key={n.id} 
                notification={n} 
                onClick={() => !n.isRead && markRead(n.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground/30 mb-6">
              <AlertCircle size={48} />
            </div>
            <h3 className="text-lg font-bold">No notifications found</h3>
            <p className="text-muted-foreground text-sm max-w-[300px] mt-2">
              We couldn't find any notifications matching your current filters.
            </p>
            <button 
              onClick={() => {setFilter('all'); setSearch('');}}
              className="mt-6 text-primary text-sm font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
