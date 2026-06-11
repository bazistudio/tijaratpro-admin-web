"use client";

import React from 'react';
import NavbarClient from './navbar-client';
import { useAuth } from "@/lib/auth/AuthContext";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavbarClient isAuthenticated={isAuthenticated} />
  );
};

export default Header;
