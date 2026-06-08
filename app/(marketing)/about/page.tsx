import React from 'react';
import { Target, Eye, Shield, Rocket } from 'lucide-react';
import CTASection from '@/components/sections/cta-section';

export const metadata = {
  title: 'About Us | TijaratPro',
  description: 'Building smart business tools to modernize local Pakistani businesses.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Innovation',
      description: 'Bringing modern cloud technology to traditional retail shops.',
      icon: <Rocket className="text-primary" />
    },
    {
      title: 'Reliability',
      description: 'Built to handle the unique challenges of the Pakistani market.',
      icon: <Shield className="text-success" />
    },
    {
      title: 'Growth',
      description: 'Empowering small businesses to scale and compete globally.',
      icon: <Target className="text-blue-500" />
    },
    {
      title: 'Simplicity',
      description: 'Powerful tools that are easy for anyone to use, anywhere.',
      icon: <Eye className="text-indigo-500" />
    }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-width text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Building Smart Business <span className="gradient-text">Tools For Pakistan</span>
          </h1>
          <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
            TijaratPro was created to help small and medium businesses manage inventory, 
            billing, analytics, and operations with modern cloud technology.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-bg-secondary/30">
        <div className="container-width grid md:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-black">Our Mission</h2>
            <p className="text-lg text-text-soft leading-relaxed">
              We are on a mission to empower Pakistani businesses with affordable, 
              modern, and scalable ERP technology. Most local shop owners still rely 
              on manual registers or outdated offline software.
            </p>
            <p className="text-lg text-text-soft leading-relaxed">
              TijaratPro bridges this gap by providing a system that is fast, secure, 
              mobile-friendly, and designed specifically for our local market.
            </p>
          </div>
          <div className="glass-card p-12 flex flex-col gap-10">
            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-lg text-text-soft italic leading-relaxed">
              "To become Pakistan's leading smart ERP platform for small and medium businesses, 
              helping them digitize and grow in the modern economy."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="text-primary" size={24} />
              </div>
              <span className="font-bold text-text">Targeting 10,000+ Shops by 2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-width text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Our Values</h2>
          <p className="text-text-soft max-w-2xl mx-auto">
            The core principles that guide us in building the future of retail management.
          </p>
        </div>
        <div className="container-width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="glass-card p-8 group text-center">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(value.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <h4 className="text-xl font-bold text-text mb-4">{value.title}</h4>
              <p className="text-sm text-text-soft leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
