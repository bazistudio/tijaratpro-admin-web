npimport React from "react";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "../hooks/useNotifications";
import { CheckCircle2, ListFilter, X, ArrowRight } from "lucide-react";

export const NotificationDropdown: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { notifications, isLoading, markAllRead, markRead } = useNotifications();
  const recentItems = notifications.slice(0, 5);

  return (
    <div className="w-[380px] bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">Notifications</span>
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
            Recent
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => markAllRead()}
            className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-1 font-medium"
            title="Mark all as read"
          >
            <CheckCircle2 size={14} />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-muted rounded text-muted-foreground">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-muted rounded" />
                  <div className="h-2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : recentItems.length > 0 ? (
          recentItems.map((n) => (
            <NotificationItem 
              key={n.id} 
              notification={n} 
              onClick={() => !n.isRead && markRead(n.id)}
            />
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-muted-foreground">
              <ListFilter size={24} />
            </div>
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">No new notifications to show.</p>
          </div>
        )}
      </div>

      <a 
        href="/notifications" 
        className="block p-3 text-center text-xs font-bold bg-muted/50 hover:bg-primary/5 text-primary transition-colors border-t border-border flex items-center justify-center gap-2"
        onClick={onClose}
      >
        View Notification Center <ArrowRight size={14} />
      </a>
    </div>
  );
};
