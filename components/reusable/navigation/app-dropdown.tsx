import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AppDropdownAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export interface AppDropdownProps {
  trigger: React.ReactNode;
  label?: string;
  actions: AppDropdownAction[];
  align?: "center" | "end" | "start";
}

export function AppDropdown({ trigger, label, actions, align = "end" }: AppDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48 rounded-xl shadow-lg border-border/50 p-1">
        {label && (
          <>
            <DropdownMenuLabel className="font-bold px-2 py-1.5 text-xs text-muted-foreground uppercase tracking-wider">{label}</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
          </>
        )}
        {actions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onClick={action.onClick}
            className={action.destructive 
              ? "text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors" 
              : "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors"}
          >
            {action.icon && <span className="mr-2.5 flex items-center justify-center h-4 w-4">{action.icon}</span>}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
