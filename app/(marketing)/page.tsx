import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import CTASection from '@/components/sections/CTASection';

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <CTASection />
    </>
  );
}
