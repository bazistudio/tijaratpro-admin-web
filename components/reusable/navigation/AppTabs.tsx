import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export interface AppTabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AppTabsProps {
  tabs: AppTabItem[];
  defaultValue?: string;
  className?: string;
  listClassName?: string;
}

export function AppTabs({ tabs, defaultValue, className, listClassName }: AppTabsProps) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <Tabs defaultValue={defaultValue || tabs[0].value} className={cn("w-full", className)}>
      <TabsList className={cn("mb-6 bg-muted/50 p-1", listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className="flex items-center gap-2 px-4 font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="focus-visible:outline-none focus-visible:ring-0 mt-0">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
