"use client";

import React from 'react';
import NavbarClient from './navbar-client';
import { useAuthStore } from '@/store/auth.store';

export const Header = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavbarClient isAuthenticated={isAuthenticated} />
  );
};

export default Header;
