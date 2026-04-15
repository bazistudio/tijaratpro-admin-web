"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState, type ReactNode } from "react";

// ─── Providers ────────────────────────────────────────────────────────────────
// Wrap the entire app. Placed in app/layout.tsx as <Providers>{children}</Providers>
//
// Included:
//   • ReactQueryProvider  — global cache, deduplication, background refetch
//   • Toaster (sonner)    — single toast outlet; components call toast() directly

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 30s before revalidation
        staleTime: 30 * 1000,
        // Keep data in cache for 5 min after last subscriber unmounts
        gcTime: 5 * 60 * 1000,
        // Show stale data while refetching (no jarring empty states)
        refetchOnWindowFocus: true,
        // Retry once on failure before surfacing error to UI
        retry: 1,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
      },
      mutations: {
        // Mutations do NOT retry automatically
        retry: false,
      },
    },
  });
}

export default function Providers({ children }: { children: ReactNode }) {
  // useState ensures a single QueryClient instance per browser tab.
  // Do NOT create it at module level — that would share cache across SSR requests.
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Toaster: bottom-right, dark theme to match dashboard aesthetic */}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        theme="dark"
      />
    </QueryClientProvider>
  );
}
