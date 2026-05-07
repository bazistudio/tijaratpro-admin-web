"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavbarClientProps {
  isAuthenticated: boolean;
}

const NavbarClient = ({ isAuthenticated }: NavbarClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-2xl' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-width flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold gradient-text">TijaratPro</span>
            <span className="text-[10px] text-text-soft font-medium tracking-wider uppercase leading-none">Smart ERP System</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold text-text-soft hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link 
              href="/dashboard" 
              className="px-6 py-2.5 rounded-sm font-bold text-sm bg-primary hover:bg-primary-dark text-white transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-bold text-text-soft hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2.5 rounded-sm font-bold text-sm bg-primary hover:bg-primary-dark text-white transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Start Free Trial
                <ChevronRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text p-2 hover:bg-white/5 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 top-[70px] bg-background/95 backdrop-blur-xl z-[90] md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xl font-bold text-text hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-white/10" />
          <div className="flex flex-col gap-4">
            {isAuthenticated ? (
              <Link 
                href="/dashboard" 
                className="w-full py-4 rounded-sm font-bold text-center bg-primary text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="w-full py-4 rounded-sm font-bold text-center border border-white/10 text-text"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="w-full py-4 rounded-sm font-bold text-center bg-primary text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;
