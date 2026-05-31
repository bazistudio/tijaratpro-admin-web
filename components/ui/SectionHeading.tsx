import React from 'react';

export default function SectionHeading({ title, subtitle, isLight = false }: { title: string; subtitle?: string; isLight?: boolean }) {
  return (
    <div className="text-center mb-16">
      <h2 className={`font-h2 text-h2 mb-4 ${isLight ? 'text-white' : 'text-[var(--text)]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-body-md max-w-2xl mx-auto ${isLight ? 'text-white/90' : 'text-[var(--text-soft)]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
