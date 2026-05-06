import React from 'react';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="bg-[#003049] text-white py-2 text-center text-sm font-medium">
        🚀 Launching Soon — <span className="text-[#0077B6] font-bold">Get Early Access</span> & Free 1-Month Trial! 
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
