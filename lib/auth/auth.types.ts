export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'shop_admin' | 'staff';
  shopId?: string;
  isActive: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  shopId?: string;
}

export interface LoginCredentials {
  identifier: string;
  password?: string;
}
