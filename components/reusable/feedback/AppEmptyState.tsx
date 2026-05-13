import React from 'react';
import { FileQuestion } from 'lucide-react';
import { AppButton } from '../form/AppButton';
import { cn } from '@/lib/utils';

export interface AppEmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function AppEmptyState({
  title = "No data found",
  message = "There is currently no data to display in this section.",
  icon,
  actionLabel,
  onAction,
  className
}: AppEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
        {icon || <FileQuestion className="h-10 w-10" />}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{message}</p>
      
      {actionLabel && onAction && (
        <AppButton onClick={onAction}>
          {actionLabel}
        </AppButton>
      )}
    </div>
  );
}
