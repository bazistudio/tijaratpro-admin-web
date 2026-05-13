import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  contentClassName?: string;
  noPadding?: boolean;
}

export function AppCard({
  title,
  description,
  footer,
  headerAction,
  children,
  className,
  contentClassName,
  noPadding = false,
  ...props
}: AppCardProps) {
  return (
    <Card className={cn("overflow-hidden flex flex-col bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow transition-all", className)} {...props}>
      {(title || description || headerAction) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1.5 flex-1">
            {title && <CardTitle className="text-lg font-bold">{title}</CardTitle>}
            {description && <CardDescription className="text-sm font-medium text-muted-foreground">{description}</CardDescription>}
          </div>
          {headerAction && <div className="ml-4">{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(
        "flex-1", 
        !title && !description && !headerAction && "pt-6",
        noPadding && "p-0",
        contentClassName
      )}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="bg-muted/30 py-3 border-t">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
