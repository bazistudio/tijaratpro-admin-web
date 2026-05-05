import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/sections/Hero';
import Features from '../../components/sections/Features';
import Pricing from '../../components/sections/Pricing';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
