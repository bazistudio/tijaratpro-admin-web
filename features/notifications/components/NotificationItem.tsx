import React from "react";
import { Notification, NotificationType } from "../types/notification.types";
import { 
  ShoppingBag, 
  Printer, 
  AlertTriangle, 
  CreditCard, 
  Truck, 
  Settings, 
  MessageCircle, 
  FileText,
  Clock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const typeConfig: Record<NotificationType, { icon: any; color: string; bgColor: string }> = {
  SALE: { icon: ShoppingBag, color: "text-green-600", bgColor: "bg-green-50" },
  PRINT_REQUEST: { icon: Printer, color: "text-blue-600", bgColor: "bg-blue-50" },
  STOCK_ALERT: { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
  PAYMENT: { icon: CreditCard, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  FIELD_ORDER: { icon: Truck, color: "text-orange-600", bgColor: "bg-orange-50" },
  SYSTEM: { icon: Settings, color: "text-gray-600", bgColor: "bg-gray-50" },
  WHATSAPP: { icon: MessageCircle, color: "text-green-500", bgColor: "bg-green-50" },
  SUMMARY: { icon: FileText, color: "text-purple-600", bgColor: "bg-purple-50" },
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const config = typeConfig[notification.type] || typeConfig.SYSTEM;
  const Icon = config.icon;

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "flex gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-l-4",
        notification.isRead ? "border-transparent opacity-75" : "border-primary bg-primary/5",
        "relative group"
      )}
    >
      <div className={clsx("h-10 w-10 shrink-0 rounded-full flex items-center justify-center", config.bgColor, config.color)}>
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className={clsx("text-sm font-semibold truncate", !notification.isRead && "text-foreground")}>
            {notification.title}
          </p>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2 flex items-center gap-1">
            <Clock size={10} />
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {!notification.isRead && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
};
