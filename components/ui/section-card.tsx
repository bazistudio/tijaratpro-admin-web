"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}

/**
 * SectionCard Component
 * 
 * A standardized container for Tables, Forms, and Charts.
 * Features a clean white background, consistent padding, and a subtle shadow.
 */
export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
  headerClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("border-none shadow-sm bg-card overflow-hidden", className)}>
      {(title || action) && (
        <CardHeader className={cn("flex flex-row items-center justify-between space-y-0 pb-4", headerClassName)}>
          {title && (
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold font-heading text-foreground">
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground font-medium">
                  {description}
                </p>
              )}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </CardHeader>
      )}
      <CardContent className={cn("p-6 pt-0 flex flex-col min-h-0", contentClassName)}>
        <div className="min-w-0 flex-1 h-full relative">
          {children}
        </div>
      </CardContent>

    </Card>
  );
}
