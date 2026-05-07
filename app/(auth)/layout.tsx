import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-primary selection:text-white">
      {/* Background Orbs for subtle depth */}
      <div className="orb w-[500px] h-[500px] bg-primary/5 top-[-250px] right-[-250px] opacity-20" />
      <div className="orb w-[400px] h-[400px] bg-indigo-500/5 bottom-[-200px] left-[-200px] opacity-20" />
      
      <main>
        {children}
      </main>
    </div>
  );
}
