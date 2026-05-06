import React from 'react';
import { PageHeader } from './PageHeader';
import Container from './Container';
import { LucideIcon, Hammer } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

/**
 * A standardized placeholder component for features under development.
 * Reduces technical debt by providing a unified UI for empty pages.
 */
export function ComingSoon({ title, subtitle, icon: Icon = Hammer }: ComingSoonProps) {
  return (
    <Container className="py-8">
      <PageHeader 
        title={title} 
        subtitle={subtitle || `Manage your ${title.toLowerCase()} settings and data.`}
      />
      
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-20 bg-muted/5 transition-colors hover:bg-muted/10">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Icon className="h-8 w-8 text-primary animate-pulse" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Feature Under Construction</h2>
        <p className="text-muted-foreground text-center max-w-sm mb-8">
          The <span className="font-medium text-foreground">{title}</span> module is currently being developed to provide you with the best ERP experience.
        </p>
        
        <div className="flex gap-4">
          <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" />
          <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]" />
          <div className="h-2 w-2 rounded-full bg-primary/80 animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </Container>
  );
}
