import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative pt-xl pb-20 px-6 overflow-hidden bg-[#EDEDE9]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] font-label-caps mb-6 uppercase">
            #1 Retail ERP Solution
          </span>
          <h1 className="font-h1 text-h1 text-[#003049] mb-6 leading-tight">
            Manage Your Shop, Stock & Sales — All in One System
          </h1>
          <p className="font-body-lg text-body-lg text-gray-600 mb-10 max-w-lg">
            The most reliable management platform for retailers across Pakistan. Scale your business from Lahore to Karachi with ease and precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-[#0077B6] text-white rounded-xl font-button text-button shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
              Start Free Trial
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-[#003049] text-[#003049] rounded-xl font-button text-button hover:bg-[#003049]/5 transition-all">
              See Demo
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
            </div>
            <span>Built for real shop owners</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0077B6]/10 rounded-full blur-3xl"></div>
          <div className="relative bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden aspect-[4/3] lg:aspect-auto h-[400px] lg:h-[500px]">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUaCWDYUSWMcI3a2dCuQ_P3xZtq5DKC5V4n2H9Da4w8QTh0wAm_ObucLWEEdB78bXEa5ccjyoDgDrfMIbVTU1hEuBX4yQlPBzqZHl5vtkdZRum7G-30aXGgRlKNMT53llRLlxK76xAhbzNlq-TNjr8X3OnfMWm5puGIP6OWvawEeUW7O3cY53uSEZhAkgEpqiA0BjLyd3CG5_uiQc9PTSWG0qcbTq2Ao_bq_BZ7fua7Wdq1d2nG3yOi-3gDIILlLTBQAWDfHVl3ctP"
              alt="Software Dashboard interface" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
