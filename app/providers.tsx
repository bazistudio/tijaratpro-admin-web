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

import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={4000}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
