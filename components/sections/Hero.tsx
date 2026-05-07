"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Play, MessageCircle, BarChart3, Package, ShoppingCart, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container-width grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">#1 ERP System for Pakistan</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
            Modern ERP & POS System For <span className="gradient-text">Pakistani Businesses</span>
          </h1>

          <p className="text-lg md:text-xl text-text-soft leading-relaxed max-w-xl">
            Manage your billing, inventory, customers, and profits with one premium cloud-based 
            system built for shop owners who want to scale.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              href="/signup" 
              className="px-8 py-4 rounded-sm font-bold text-lg bg-primary hover:bg-primary-dark text-white transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              Start Free Trial
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="https://wa.me/923000000000" 
              className="px-8 py-4 rounded-sm font-bold text-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center gap-2 group"
            >
              <MessageCircle size={20} className="text-success" />
              WhatsApp Us
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-bg-secondary flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text">Trusted by 500+ Shops</span>
              <span className="text-xs text-text-soft">In Lahore, Karachi & Rawalpindi</span>
            </div>
          </div>
        </div>

        {/* Right Content - Dashboard Mockup */}
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full z-0 opacity-50" />
          
          <div className="relative glass-card p-6 md:p-8 aspect-[4/3] w-full max-w-[600px] mx-auto border-white/10 shadow-2xl overflow-hidden group float-animation">
            {/* Mockup Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col gap-1">
                <div className="h-4 w-32 bg-white/10 rounded-full" />
                <div className="h-3 w-20 bg-white/5 rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary" />
              </div>
            </div>

            {/* Mockup Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <TrendingUp size={16} className="text-success" />
                  </div>
                  <span className="text-[10px] font-bold text-success">+12%</span>
                </div>
                <div className="text-xl font-black text-text">₨ 45,280</div>
                <div className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Today's Sales</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package size={16} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-warning">Low Stock</span>
                </div>
                <div className="text-xl font-black text-text">1,240</div>
                <div className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Products</div>
              </div>
            </div>

            {/* Mockup Chart Area */}
            <div className="relative h-32 w-full bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-4 overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="h-3 w-24 bg-white/10 rounded-full" />
                <div className="h-3 w-12 bg-white/5 rounded-full" />
              </div>
              <div className="flex items-end gap-2 h-full">
                {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 rounded-t-sm transition-all duration-1000 group-hover:bg-primary/40" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
              </div>
            </div>

            {/* Floating Card UI */}
            <div className="absolute top-1/2 -right-4 translate-y-[-50%] p-4 glass-card border-primary/20 shadow-2xl max-w-[180px] hidden md:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                  <ShoppingCart size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text">New Order</span>
                  <span className="text-[8px] text-text-soft">Just now</span>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full mb-2" />
              <div className="h-2 w-2/3 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
