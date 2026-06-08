import React from 'react';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import Pricing from '@/components/sections/pricing';
import CTASection from '@/components/sections/cta-section';

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
