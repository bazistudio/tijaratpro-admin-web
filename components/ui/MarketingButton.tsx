import React from 'react';
import Link from 'next/link';

type MarketingButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white" | "white-outline";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function MarketingButton({ 
  children, 
  variant = "primary", 
  fullWidth = false, 
  className = "", 
  type = "button", 
  href,
  onClick,
  disabled = false
}: MarketingButtonProps) {
  const base = "px-8 py-4 rounded-xl font-button text-button transition-all flex items-center justify-center gap-2";

  let styles = "";
  if (variant === "primary") {
    styles = "bg-primary text-white shadow-lg hover:bg-primary-dark hover:shadow-primary/20";
  } else if (variant === "outline") {
    styles = "bg-transparent border-2 border-[var(--text)] text-[var(--text)] hover:bg-[var(--bg-secondary)]";
  } else if (variant === "white") {
    styles = "bg-white text-primary shadow-2xl hover:bg-gray-50";
  } else if (variant === "white-outline") {
    styles = "bg-transparent border-2 border-white text-white hover:bg-white/10";
  }

  const widthStyle = fullWidth ? "w-full" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = `${base} ${styles} ${widthStyle} ${disabledStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
