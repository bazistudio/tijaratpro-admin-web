import React from 'react';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <Navbar />
    </header>
  );
};

export default Header;
