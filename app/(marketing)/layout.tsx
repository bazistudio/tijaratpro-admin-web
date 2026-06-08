import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Orbs */}
      <div className="orb w-[400px] h-[400px] bg-primary/20 top-[-100px] left-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-blue-500/10 right-[-80px] top-[200px]" />
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 bottom-[-150px] left-[20%] opacity-10" />

      <Header />
      
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}
