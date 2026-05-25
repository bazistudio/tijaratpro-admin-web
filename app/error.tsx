"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Visual Cue */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-destructive/10 rounded-full animate-pulse" />
          <div className="relative flex items-center justify-center h-full">
            <AlertCircle className="text-destructive" size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground font-medium">
            TijaratPro encountered an unexpected error. This might be a temporary connection issue.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
          >
            <RefreshCcw size={18} />
            Try again
          </button>
          
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3 bg-muted text-muted-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        {/* Footer Info */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
            Error Digest: {error.digest || 'Internal System Failure'}
          </p>
        </div>
      </div>
    </div>
  );
}
