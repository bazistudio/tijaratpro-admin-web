import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function Section({ children, className = "", id }: SectionProps) {
  // Standardizing section padding to py-24
  return (
    <section id={id} className={`py-24 ${className}`}>
      {children}
    </section>
  );
}
