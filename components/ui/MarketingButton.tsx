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
};

export default function MarketingButton({ 
  children, 
  variant = "primary", 
  fullWidth = false, 
  className = "", 
  type = "button", 
  href,
  onClick
}: MarketingButtonProps) {
  const base = "px-8 py-4 rounded-xl font-button text-button transition-all flex items-center justify-center gap-2";

  let styles = "";
  if (variant === "primary") {
    styles = "bg-[#0077B6] text-white shadow-lg hover:opacity-90";
  } else if (variant === "outline") {
    styles = "bg-transparent border-2 border-[#003049] text-[#003049] hover:bg-[#003049]/5";
  } else if (variant === "white") {
    styles = "bg-white text-[#0077B6] shadow-2xl hover:bg-gray-50";
  } else if (variant === "white-outline") {
    styles = "bg-transparent border-2 border-white text-white hover:bg-white/10";
  }

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClasses = `${base} ${styles} ${widthStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
}
