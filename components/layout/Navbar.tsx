import React from 'react';

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-bold text-[#0077B6]">TijaratPro</div>
      <div className="hidden md:flex items-center gap-x-8">
        <a className="font-manrope text-sm font-semibold text-[#0077B6] border-b-2 border-[#0077B6] hover:text-[#003049] transition-colors" href="#">Home</a>
        <a className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors" href="#about">About</a>
        <a className="font-manrope text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors" href="#contact">Contact</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-[#0077B6] transition-colors">Login</button>
        <button className="px-5 py-2 bg-[#0077B6] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
