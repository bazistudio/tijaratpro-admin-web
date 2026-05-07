import React from 'react';
import { cookies } from 'next/headers';
import NavbarClient from './NavbarClient';

export const Header = async () => {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('tp_token');

  return (
    <NavbarClient isAuthenticated={isAuthenticated} />
  );
};

export default Header;
