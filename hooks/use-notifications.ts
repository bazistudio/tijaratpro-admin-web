import { create } from 'zustand'
import { toast } from 'sonner'

interface Notification {
  id: string
  title: string
  description?: string
  type: 'info' | 'success' | 'warning' | 'error' | 'sale' | 'inventory'
  timestamp: Date
  read: boolean
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notif) => {
    const id = Math.random().toString(36).substring(7)
    const timestamp = new Date()
    const newNotification: Notification = { ...notif, id, timestamp, read: false }

    set((state) => ({
      notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
      unreadCount: state.unreadCount + 1,
    }))

    // Trigger visual toast
    switch (notif.type) {
      case 'success':
        toast.success(notif.title, { description: notif.description })
        break
      case 'error':
        toast.error(notif.title, { description: notif.description })
        break
      case 'warning':
        toast.warning(notif.title, { description: notif.description })
        break
      case 'sale':
        toast(notif.title, { 
          description: notif.description,
          icon: '💰'
        })
        break
      case 'inventory':
        toast(notif.title, { 
          description: notif.description,
          icon: '📦'
        })
        break
      default:
        toast(notif.title, { description: notif.description })
    }
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  },
}))
