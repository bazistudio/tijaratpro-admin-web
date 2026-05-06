import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = "primary" | "secondary" | "outline" | "white" | "white-outline" | "ghost" | "destructive" | "premium";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
};

export function Button({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  icon,
  ...props 
}: ButtonProps) {
  
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] whitespace-nowrap";

  const variants = {
    primary: "bg-[#0077B6] text-white shadow-lg hover:bg-[#0077B6]/90",
    secondary: "bg-muted text-muted-foreground hover:bg-muted/80",
    outline: "bg-transparent border-2 border-[#003049] text-[#003049] hover:bg-[#003049]/5",
    white: "bg-white text-[#0077B6] shadow-sm hover:bg-gray-50",
    "white-outline": "bg-transparent border-2 border-white text-white hover:bg-white/10",
    ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground border-transparent",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    premium: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:opacity-95",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-lg",
    md: "h-11 px-6 text-sm rounded-xl",
    lg: "h-14 px-8 text-base rounded-2xl",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button 
      className={cn(base, variants[variant], sizes[size], className)} 
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
