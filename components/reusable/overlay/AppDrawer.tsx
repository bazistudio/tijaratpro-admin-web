import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface AppDrawerProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function AppDrawer({
  title,
  description,
  trigger,
  footer,
  children,
  open,
  onOpenChange,
  side = "right",
  className,
}: AppDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={cn("flex flex-col", className)}>
        {(title || description) && (
          <SheetHeader className="mb-4 text-left">
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        <div className="flex-1 overflow-y-auto py-2 pr-2 custom-scrollbar">
          {children}
        </div>
        {footer && <SheetFooter className="mt-4 pt-4 border-t">{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
