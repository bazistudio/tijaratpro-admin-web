import React from 'react';
import MarketingButton from './MarketingButton';

export type PricingFeature = string | { text: string; isHighlight?: boolean };

export type PricingPlan = {
  name: string;
  monthly: number;
  yearly: number;
  isPopular: boolean;
  features: PricingFeature[];
};

type PricingCardProps = PricingPlan & {
  isYearly: boolean;
};

export default function PricingCard({ name, monthly, yearly, isPopular, features, isYearly }: PricingCardProps) {
  return (
    <div
      className={`bg-[var(--card)] p-6 rounded-2xl flex flex-col transition-all ${
        isPopular
          ? 'border-2 border-primary shadow-xl relative transform lg:scale-105 z-10'
          : 'border border-[var(--border)] hover:border-primary/50'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}

      <h4 className="text-xl font-bold text-[var(--text)] mb-2">{name}</h4>
      <div className="mb-6">
        <span className="text-3xl font-bold text-[var(--text)]">
          PKR {isYearly ? yearly : monthly}
        </span>
        <span className="text-[var(--text-soft)] text-sm">{isYearly ? '/yr' : '/mo'}</span>
      </div>

      <ul className="space-y-3 mb-8 grow">
        {features.map((feature, idx) => {
          const isHighlight = typeof feature === 'object' && feature.isHighlight;
          const text = typeof feature === 'object' ? feature.text : feature;

          return (
            <li key={idx} className={`flex items-start gap-2 text-sm ${isHighlight ? 'font-semibold text-[var(--text)]' : 'text-[var(--text-soft)]'}`}>
              <span className="material-symbols-outlined text-lg text-success">
                {isHighlight ? 'add_circle' : 'check_circle'}
              </span>
              <span>{text}</span>
            </li>
          );
        })}
      </ul>

      <MarketingButton className="w-full" variant={isPopular ? "primary" : "outline"}>
        Get Started
      </MarketingButton>
    </div>
  );
}
