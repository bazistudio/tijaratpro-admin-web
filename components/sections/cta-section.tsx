import React from 'react';
import Link from 'next/link';
import { ChevronRight, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-width">
        <div className="glass-card p-12 md:p-20 relative overflow-hidden text-center flex flex-col items-center gap-10 border-primary/20 bg-primary/5">
          {/* Animated Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-black max-w-4xl leading-tight relative z-10">
            Ready To Digitize Your <span className="gradient-text">Business?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-text-soft max-w-2xl relative z-10">
            Join hundreds of Pakistani shop owners who are already managing their inventory, 
            billing, and growth with TijaratPro.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <Link 
              href="/signup" 
              className="px-10 py-5 rounded-sm font-bold text-xl bg-primary hover:bg-primary-dark text-white transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              Start Your Free Trial
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="https://wa.me/923000000000" 
              className="px-10 py-5 rounded-sm font-bold text-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center gap-2 group"
            >
              <MessageCircle size={24} className="text-success" />
              Book Free Demo
            </Link>
          </div>
          
          <p className="text-sm text-text-soft font-medium relative z-10">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
