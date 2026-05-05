import React from 'react';

type TextProps = {
  children: React.ReactNode;
  variant?: "body-lg" | "body-md" | "body-sm" | "label";
  className?: string;
  as?: React.ElementType;
};

export default function Text({ children, variant = "body-md", className = "", as: Tag = "p" }: TextProps) {
  let baseStyles = "";
  
  if (variant === "body-lg") {
    baseStyles = "font-body-lg text-body-lg text-gray-600";
  } else if (variant === "body-md") {
    baseStyles = "font-body-md text-gray-600";
  } else if (variant === "body-sm") {
    baseStyles = "font-body-sm text-sm text-gray-500";
  } else if (variant === "label") {
    baseStyles = "font-label-caps text-xs uppercase tracking-wider font-semibold text-gray-500";
  }

  return (
    <Tag className={`${baseStyles} ${className}`}>
      {children}
    </Tag>
  );
}
