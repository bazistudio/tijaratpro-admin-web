"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface SectionCardProps {
  title?: string;
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
            <CardTitle className="text-lg font-semibold font-heading text-foreground">
              {title}
            </CardTitle>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </CardHeader>
      )}
      <CardContent className={cn("p-6 pt-0 overflow-x-auto", contentClassName)}>
        <div className="min-w-0 h-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
