"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, LogIn, ChevronRight } from 'lucide-react';

interface NavbarClientProps {
  isAuthenticated: boolean;
}

const NavbarClient = ({ isAuthenticated }: NavbarClientProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  if (!mounted) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'h-[72px] bg-[var(--glass-navbar)] backdrop-blur-[18px] border-b border-[var(--border)] shadow-lg' 
          : 'h-[88px] bg-transparent'
      }`}
    >
      <div className="container-width h-full flex justify-between items-center">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-[10deg] transition-all duration-500">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-2xl font-black gradient-text tracking-tighter">TijaratPro</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-[var(--text-soft)] hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Theme + Login */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:border-primary/50 transition-all hover:scale-110 active:scale-95 group"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="group-hover:rotate-[45deg] transition-transform duration-500" />
            ) : (
              <Moon size={18} className="group-hover:rotate-[15deg] transition-transform duration-500" />
            )}
          </button>

          {/* Login Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Link 
                href="/dashboard" 
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-primary hover:bg-primary-dark text-white transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Dashboard
                <ChevronRight size={16} />
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-br from-primary to-primary-dark text-white transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              >
                <LogIn size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 top-0 h-screen bg-[var(--background)] z-[-1] lg:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col pt-32 p-8 gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-3xl font-black text-[var(--text)] hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-px bg-[var(--border)] my-4" />
          
          <div className="flex flex-col gap-4">
            <Link 
              href="/login" 
              className="w-full py-5 rounded-2xl font-black text-center bg-primary text-white shadow-xl shadow-primary/20 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login to Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarClient;
