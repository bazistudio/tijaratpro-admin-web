import { AuthResponse, LoginCredentials } from './auth.types';

// Mock service for testing before real API is wired
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (credentials.identifier === 'admin@tijarat.local') { // Mock Super Admin
        return {
            user: { id: 'u1', email: 'admin@tijarat.local', name: 'Super Admin', role: 'super_admin', isActive: true },
            token: 'mock-jwt-token-superadmin',
        }
    }

    if (credentials.identifier === 'shop@tijarat.local') { // Mock Shop Admin
        return {
            user: { id: 'u2', email: 'shop@tijarat.local', name: 'Shop Admin', role: 'shop_admin', shopId: 'shop123', isActive: true },
            token: 'mock-jwt-token-shopadmin',
            shopId: 'shop123',
        }
    }

    if (credentials.identifier === '0300-0000000' && credentials.password === 'demo123') { // Demo Account
        return {
            user: { id: 'u-demo', email: 'demo@tijarat.local', name: 'Demo Admin', role: 'shop_admin', shopId: 'demo-shop-id', isActive: true },
            token: 'mock-jwt-token-demo',
            shopId: 'demo-shop-id',
        }
    }

    // Default mock response for any other login
    return {
      user: {
        id: 'mock-user-123',
        email: credentials.identifier,
        name: 'Mock User',
        role: 'shop_admin',
        shopId: 'mock-shop-456',
        isActive: true,
      },
      token: 'mock-jwt-token-123',
      shopId: 'mock-shop-456',
    };
  },
};
