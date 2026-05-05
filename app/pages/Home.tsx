import React from 'react';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
import Features from '../../components/layout/Features';
import Pricing from '../../components/layout/Pricing';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <div className="font-body-md text-on-surface antialiased bg-[#EDEDE9] min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
