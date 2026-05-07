"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div className={cn(
      "w-full max-w-md p-8 md:p-10 glass-card relative overflow-hidden",
      "bg-[var(--card)] border-[var(--border)]",
      "shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
      className
    )}>
      {/* Subtle Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
