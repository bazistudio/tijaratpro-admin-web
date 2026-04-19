"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
    loading?: boolean;
    disabled?: boolean;
  }>;
  className?: string;
}

/**
 * Standardized PageHeader component for admin screens.
 * Aligns Title/Subtitle to the left and Action buttons to the right.
 */
export function PageHeader({
  title,
  subtitle,
  primaryAction,
  secondaryActions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", className)}>
      {/* Left Area: Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Area: Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {secondaryActions?.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "outline"}
            onClick={action.onClick}
            icon={action.icon}
            loading={action.loading}
            disabled={action.disabled}
            size="sm"
          >
            {action.label}
          </Button>
        ))}
        
        {primaryAction && (
          <Button
            variant={primaryAction.variant || "premium"}
            onClick={primaryAction.onClick}
            icon={primaryAction.icon}
            loading={primaryAction.loading}
            disabled={primaryAction.disabled}
            size="sm"
          >
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
