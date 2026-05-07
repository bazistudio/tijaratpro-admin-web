import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Youtube, MessageCircle, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Inventory Management', href: '/#features' },
        { name: 'POS Billing', href: '/#features' },
        { name: 'Analytics Dashboard', href: '/#features' },
        { name: 'Cloud Backup', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-bg-secondary/50 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <span className="text-xl font-extrabold gradient-text">TijaratPro</span>
            </Link>
            <p className="text-sm text-text-soft leading-relaxed">
              Smart ERP & POS solution designed specifically for Pakistani businesses. 
              Modernize your inventory, billing, and growth with cloud technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-soft hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-soft hover:bg-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-soft hover:bg-primary hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-6">
              <h4 className="text-white font-bold">{column.title}</h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-text-soft hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://wa.me/923000000000" className="flex items-center gap-3 text-sm text-text-soft hover:text-success transition-colors">
                  <MessageCircle size={18} />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@tijaratpro.com" className="flex items-center gap-3 text-sm text-text-soft hover:text-primary transition-colors">
                  <Mail size={18} />
                  <span>support@tijaratpro.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-soft">
                <Phone size={18} />
                <span>Rawalpindi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-text-soft">
            © {currentYear} TijaratPro. All rights reserved. Built for Pakistani businesses.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs text-text-soft hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-text-soft hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
