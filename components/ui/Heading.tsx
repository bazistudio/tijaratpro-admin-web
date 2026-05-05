import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export default function Heading({ children, level = 2, className = "" }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  
  let baseStyles = "";
  if (level === 1) {
    baseStyles = "font-h1 text-h1 text-[#003049] mb-6 leading-tight";
  } else if (level === 2) {
    baseStyles = "font-h2 text-h2 text-[#003049] mb-4";
  } else if (level === 3) {
    baseStyles = "font-h3 text-h3 text-[#003049] mb-3";
  } else {
    baseStyles = "font-bold text-[#003049] mb-2";
  }

  return (
    <Tag className={`${baseStyles} ${className}`}>
      {children}
    </Tag>
  );
}
