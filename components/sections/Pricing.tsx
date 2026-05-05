"use client";
import React, { useState } from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import PricingCard, { PricingPlan } from '../ui/PricingCard';
import MarketingButton from '../ui/MarketingButton';

const plans: PricingPlan[] = [
  {
    name: "Starter",
    monthly: 1000,
    yearly: 10000,
    isPopular: false,
    features: [
      "Inventory Management",
      "Customer Records (CRM)",
      "Low Stock Alerts",
      "Cloud Backup",
      "Mobile App Access"
    ]
  },
  {
    name: "Growth",
    monthly: 1500,
    yearly: 15000,
    isPopular: true,
    features: [
      { text: "Starter Features +", isHighlight: true },
      "Public Product Page",
      "Basic Online Presence"
    ]
  },
  {
    name: "Business",
    monthly: 2000,
    yearly: 20000,
    isPopular: false,
    features: [
      { text: "Growth Features +", isHighlight: true },
      "Multi-Shop Management",
      "Central Dashboard",
      "Stock Synchronization"
    ]
  },
  {
    name: "Pro",
    monthly: 2500,
    yearly: 25000,
    isPopular: false,
    features: [
      { text: "Business Features +", isHighlight: true },
      "Full Online Selling System",
      "Order Management",
      "Customer Online Orders"
    ]
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <section className="py-xl bg-[#EDEDE9]" id="pricing">
        <Container>
          <SectionHeading 
            title="Simple, transparent pricing" 
            subtitle="Choose the plan that fits your business scale. No hidden fees." 
          />
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center mb-12 gap-4">
            <span className="text-sm font-semibold text-gray-600">Monthly</span>
            <label className="pricing-toggle relative inline-flex items-center cursor-pointer">
              <input 
                className="sr-only peer" 
                id="billing-toggle" 
                type="checkbox" 
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#0077B6] transition-colors"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isYearly ? 'translate-x-full' : ''}`}></div>
            </label>
            <span className="text-sm font-semibold text-gray-600">Yearly <span className="text-[#6A994E] ml-1">(Save 17%)</span></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} isYearly={isYearly} />
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0077B6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <Container className="text-center relative z-10 max-w-4xl">
          <SectionHeading 
            title="Start Managing Your Shop Today" 
            subtitle="Join thousands of retailers who have simplified their operations and increased their profits with TijaratPro."
            isLight
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <MarketingButton variant="white">
              Get Started for Free
            </MarketingButton>
            <MarketingButton variant="white-outline">
              Schedule a Demo
            </MarketingButton>
          </div>
          <p className="mt-8 text-white/70 text-sm">No credit card required. 14-day free trial.</p>
        </Container>
      </section>
    </>
  );
}
