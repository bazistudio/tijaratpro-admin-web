import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppLoaderProps {
  fullScreen?: boolean;
  fullHeight?: boolean;
  text?: string;
  className?: string;
  size?: number;
}

export function AppLoader({ 
  fullScreen = false, 
  fullHeight = false,
  text = "Loading...", 
  className,
  size = 24 
}: AppLoaderProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
      {text && <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  if (fullHeight) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[400px]">
        {content}
      </div>
    );
  }

  return content;
}
