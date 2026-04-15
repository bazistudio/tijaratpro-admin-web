"use client";

// ─── Socket.io client singleton ───────────────────────────────────────────────
// This file is client-only. Import only inside 'use client' components.
// Future chat module will use this.

import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000";

let socket: Socket | null = null;

/**
 * Initialize and connect the socket with the user's auth token.
 * Call on login/mount.
 */
export function connectSocket(token: string): Socket {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.debug("[Socket] Connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.debug("[Socket] Disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.warn("[Socket] Connection error:", err.message);
  });

  return socket;
}

/**
 * Get the active socket instance (null if not connected).
 */
export function getSocket(): Socket | null {
  return socket;
}

/**
 * Disconnect and clean up the socket.
 * Call on logout.
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
