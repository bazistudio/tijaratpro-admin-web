import React from 'react';

type MarketingButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white" | "white-outline";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function MarketingButton({ children, variant = "primary", fullWidth = false, className = "", type = "button" }: MarketingButtonProps) {
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

  return (
    <button type={type} className={`${base} ${styles} ${widthStyle} ${className}`}>
      {children}
    </button>
  );
}
