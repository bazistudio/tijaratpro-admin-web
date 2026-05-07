import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '2,999',
      description: 'Ideal for small shops and single counters.',
      features: [
        'Up to 1,000 Products',
        'Basic POS Billing',
        'Inventory Tracking',
        'Daily Reports',
        'WhatsApp Receipts',
        'Single Shop Support'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Business',
      price: '5,999',
      description: 'Perfect for growing businesses with high volume.',
      features: [
        'Unlimited Products',
        'Advanced POS & Barcode',
        'Detailed Profit Analytics',
        'Multi-Shop Syncing',
        'Employee Roles (3)',
        'Priority WhatsApp Support',
        'Custom Invoice Branding'
      ],
      cta: 'Get Started Now',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For retail chains and large scale operations.',
      features: [
        'Everything in Business',
        'Unlimited Multi-Shop Support',
        'Dedicated Account Manager',
        'Custom Feature Requests',
        'Bulk Import Services',
        'Offline Desktop Sync',
        'Unlimited Employee Roles'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden" id="pricing">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-black">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-text-soft">
            Choose the plan that fits your business. No hidden fees, no complex contracts.
            All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative glass-card p-10 flex flex-col ${
                plan.highlighted ? 'border-primary/50 shadow-primary/10 scale-105 z-10' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                <p className="text-sm text-text-soft leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-sm font-bold text-text-soft uppercase">PKR</span>
                <span className="text-5xl font-black text-text">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-text-soft">/mo</span>}
              </div>

              <div className="flex flex-col gap-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-success" />
                    </div>
                    <span className="text-sm text-text-soft leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={plan.name === 'Enterprise' ? '/contact' : '/signup'} 
                className={`w-full py-4 rounded-sm font-bold text-center transition-all flex items-center justify-center gap-2 group ${
                  plan.highlighted 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-text-soft text-sm">
            Need a custom solution for your chain? <Link href="/contact" className="text-primary font-bold hover:underline">Chat with our team</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
