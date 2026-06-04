import React from 'react';
import Link from 'next/link';
import MarketingButton from '../ui/MarketingButton';
import Container from '../ui/container';
import { cookies } from 'next/headers';

const Navbar = async () => {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('tp_token');

  return (
    <Container className="flex justify-between items-center py-4">
      <div className="text-2xl font-bold text-primary">TijaratPro</div>
      <div className="hidden md:flex items-center gap-x-8">
        <Link href="/" className="font-manrope text-sm font-semibold text-primary border-b-2 border-primary hover:text-primary-dark transition-colors">Home</Link>
        <Link href="/about" className="font-manrope text-sm font-semibold text-[var(--text-soft)] hover:text-primary transition-colors">About</Link>
        <Link href="/contact" className="font-manrope text-sm font-semibold text-[var(--text-soft)] hover:text-primary transition-colors">Contact</Link>
        <Link href="/products" className="font-manrope text-sm font-semibold text-[var(--text-soft)] hover:text-primary transition-colors">Products</Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <MarketingButton href="/dashboard" className="!px-5 !py-2 !text-sm">Dashboard</MarketingButton>
        ) : (
          <>
            <Link href="/login" className="px-5 py-2 text-sm font-semibold text-[var(--text-soft)] hover:text-primary transition-colors">Log in</Link>
            <MarketingButton href="/signup" className="!px-5 !py-2 !text-sm">Sign up</MarketingButton>
          </>
        )}
      </div>
    </Container>
  );
};

export default Navbar;

