"use client";
import React, { useState } from 'react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <section className="py-xl px-6 bg-white/50" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-h2 text-h2 text-[#003049] mb-4">Simple, transparent pricing</h2>
            <p className="font-body-md text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your business scale. No hidden fees.</p>
          </div>
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
            {/* Starter */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col hover:border-[#0077B6] transition-all">
              <h4 className="text-xl font-bold text-[#003049] mb-2">Starter</h4>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#003049] plan-price">
                  PKR {isYearly ? '10000' : '1000'}
                </span>
                <span className="text-gray-500 text-sm plan-period">{isYearly ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Inventory Management</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Customer Records (CRM)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Low Stock Alerts</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Cloud Backup</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Mobile App Access</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 border-2 border-[#0077B6] text-[#0077B6] rounded-lg font-bold hover:bg-[#0077B6]/5 transition-all">Get Started</button>
            </div>
            {/* Growth */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#0077B6] shadow-xl flex flex-col relative transform lg:scale-105 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0077B6] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Most Popular</div>
              <h4 className="text-xl font-bold text-[#003049] mb-2">Growth</h4>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#003049] plan-price">
                  PKR {isYearly ? '15000' : '1500'}
                </span>
                <span className="text-gray-500 text-sm plan-period">{isYearly ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-2 text-sm font-semibold text-[#003049]">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">add_circle</span>
                  <span>Starter Features +</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Public Product Page</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Basic Online Presence</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-[#0077B6] text-white rounded-lg font-bold shadow-lg hover:opacity-90 transition-all">Get Started</button>
            </div>
            {/* Business */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col hover:border-[#0077B6] transition-all">
              <h4 className="text-xl font-bold text-[#003049] mb-2">Business</h4>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#003049] plan-price">
                  PKR {isYearly ? '20000' : '2000'}
                </span>
                <span className="text-gray-500 text-sm plan-period">{isYearly ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-2 text-sm font-semibold text-[#003049]">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">add_circle</span>
                  <span>Growth Features +</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Multi-Shop Management</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Central Dashboard</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Stock Synchronization</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 border-2 border-[#0077B6] text-[#0077B6] rounded-lg font-bold hover:bg-[#0077B6]/5 transition-all">Get Started</button>
            </div>
            {/* Pro */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col hover:border-[#0077B6] transition-all">
              <h4 className="text-xl font-bold text-[#003049] mb-2">Pro</h4>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#003049] plan-price">
                  PKR {isYearly ? '25000' : '2500'}
                </span>
                <span className="text-gray-500 text-sm plan-period">{isYearly ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-2 text-sm font-semibold text-[#003049]">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">add_circle</span>
                  <span>Business Features +</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Full Online Selling System</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Order Management</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6A994E] text-lg">check_circle</span>
                  <span>Customer Online Orders</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 border-2 border-[#0077B6] text-[#0077B6] rounded-lg font-bold hover:bg-[#0077B6]/5 transition-all">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#0077B6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-h1 text-h1 text-white mb-6">Start Managing Your Shop Today</h2>
          <p className="font-body-lg text-white/90 mb-10">Join thousands of retailers who have simplified their operations and increased their profits with TijaratPro.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-5 bg-white text-[#0077B6] rounded-xl font-button text-lg shadow-2xl hover:bg-gray-50 transition-all">Get Started for Free</button>
            <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-button text-lg hover:bg-white/10 transition-all">Schedule a Demo</button>
          </div>
          <p className="mt-8 text-white/70 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </section>
    </>
  );
};

export default Pricing;
