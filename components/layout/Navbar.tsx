import React from 'react';
import Link from 'next/link';
import MarketingButton from '../ui/MarketingButton';
import Container from '../ui/Container';

const Navbar = () => {
  return (
    <Container className="flex justify-between items-center py-4">
      <div className="text-2xl font-bold text-[#0077B6]">TijaratPro</div>
      <div className="hidden md:flex items-center gap-x-8">
        <a className="font-manrope text-sm font-semibold text-[#0077B6] border-b-2 border-[#0077B6] hover:text-[#003049] transition-colors" href="#">Home</a>
        <a className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors" href="#about">About</a>
        <a className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors" href="#contact">Contact</a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">Log in</Link>
        <MarketingButton href="/signup" className="!px-5 !py-2 !text-sm">Sign up</MarketingButton>
      </div>
    </Container>
  );
};

export default Navbar;
