import React from 'react';
import Link from 'next/link';
import MarketingButton from '../ui/MarketingButton';
import Container from '../ui/Container';
import { cookies } from 'next/headers';

const Navbar = async () => {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('tp_token');

  return (
    <Container className="flex justify-between items-center py-4">
      <div className="text-2xl font-bold text-[#0077B6]">TijaratPro</div>
      <div className="hidden md:flex items-center gap-x-8">
        <Link href="/" className="font-manrope text-sm font-semibold text-[#0077B6] border-b-2 border-[#0077B6] hover:text-[#003049] transition-colors">Home</Link>
        <Link href="/about" className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">About</Link>
        <Link href="/contact" className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">Contact</Link>
        <Link href="/products" className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">Products</Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <MarketingButton href="/dashboard" className="!px-5 !py-2 !text-sm">Dashboard</MarketingButton>
        ) : (
          <>
            <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">Log in</Link>
            <MarketingButton href="/signup" className="!px-5 !py-2 !text-sm">Sign up</MarketingButton>
          </>
        )}
      </div>
    </Container>
  );
};

export default Navbar;

