import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FeatureComingSoonProps {
  title: string;
  description?: string;
}

const FeatureComingSoon: React.FC<FeatureComingSoonProps> = ({ 
  title, 
  description = "We are currently building this feature to help you manage your business better. Stay tuned!" 
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 float-animation">
        <Construction size={40} className="text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black mb-6">
        <span className="gradient-text">{title}</span> Is Coming Soon
      </h1>
      
      <p className="text-lg text-text-soft max-w-lg mb-10 leading-relaxed">
        {description}
      </p>
      
      <Link 
        href="/dashboard" 
        className="px-8 py-4 rounded-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center gap-2 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default FeatureComingSoon;
