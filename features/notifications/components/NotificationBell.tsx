import React from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../store/notification.store";
import { clsx } from "clsx";

interface NotificationBellProps {
  onClick?: () => void;
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ onClick, className }) => {
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <button 
      onClick={onClick}
      className={clsx(
        "relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground group",
        className
      )}
    >
      <Bell size={20} className="group-hover:rotate-12 transition-transform" />
      
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-background">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 h-4 min-w-[16px] rounded-full bg-red-600 animate-ping opacity-25" />
      )}
    </button>
  );
};
