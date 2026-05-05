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
      className={`bg-white p-6 rounded-2xl flex flex-col transition-all ${
        isPopular 
          ? 'border-2 border-[#0077B6] shadow-xl relative transform lg:scale-105 z-10' 
          : 'border border-gray-200 hover:border-[#0077B6]'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0077B6] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}
      
      <h4 className="text-xl font-bold text-[#003049] mb-2">{name}</h4>
      <div className="mb-6">
        <span className="text-3xl font-bold text-[#003049]">
          PKR {isYearly ? yearly : monthly}
        </span>
        <span className="text-gray-500 text-sm">{isYearly ? '/yr' : '/mo'}</span>
      </div>
      
      <ul className="space-y-3 mb-8 grow">
        {features.map((feature, idx) => {
          const isHighlight = typeof feature === 'object' && feature.isHighlight;
          const text = typeof feature === 'object' ? feature.text : feature;
          
          return (
            <li key={idx} className={`flex items-start gap-2 text-sm ${isHighlight ? 'font-semibold text-[#003049]' : ''}`}>
              <span className={`material-symbols-outlined text-lg ${isHighlight ? 'text-[#6A994E]' : 'text-[#6A994E]'}`}>
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
